import os
import requests
import streamlit as st
from gtts import gTTS
from pathlib import Path
import time
import json

try:
    LIBRETRANSLATE_URL = st.secrets["LIBRETRANSLATE_URL"]
except Exception:
    LIBRETRANSLATE_URL = "https://translate.argosopentech.com"
TRANSLATION_ENDPOINT = f"{LIBRETRANSLATE_URL}/translate"
DETECT_ENDPOINT = f"{LIBRETRANSLATE_URL}/detect"
LANGS_ENDPOINT = f"{LIBRETRANSLATE_URL}/languages"

AUDIO_DIR = Path("audio")
ASSETS_DIR = Path("assets")
AUDIO_DIR.mkdir(exist_ok=True)
ASSETS_DIR.mkdir(exist_ok=True)

FALLBACK_LANGUAGES = {
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "de": "German",
    "it": "Italian",
    "pt": "Portuguese",
    "zh": "Chinese",
    "ja": "Japanese",
    "ko": "Korean",
    "ru": "Russian",
}

# -----------------------
# Helper functions
# -----------------------

@st.cache_data(show_spinner=False)
def get_supported_languages():
    try:
        resp = requests.get(LANGS_ENDPOINT, timeout=6)
        resp.raise_for_status()
        items = resp.json()
        if isinstance(items, list):
            return {item["code"]: item["name"] for item in items if "code" in item and "name" in item}
        if isinstance(items, dict):
            return items
    except Exception:
        pass
    return FALLBACK_LANGUAGES


@st.cache_data(show_spinner=False)
def detect_language(text: str):
    if not text or not text.strip():
        return None
    try:
        resp = requests.post(DETECT_ENDPOINT, json={"q": text}, timeout=6)
        resp.raise_for_status()
        detections = resp.json()
        if isinstance(detections, list) and detections:
            return detections[0].get("language")
    except Exception:
        return None
    return None


def translate_text(text: str, source: str, target: str):
    try:
        payload = {"q": text, "source": source, "target": target, "format": "text"}
        resp = requests.post(TRANSLATION_ENDPOINT, json=payload, timeout=12)
        resp.raise_for_status()
        return {"success": True, "result": resp.json()}
    except requests.exceptions.RequestException as e:
        return {"success": False, "error": str(e)}


def save_tts_audio(text: str, lang_code: str, filename: str):
    try:
        tts = gTTS(text=text, lang=lang_code, slow=False)
        path = AUDIO_DIR / filename
        tts.save(str(path))
        return path
    except Exception:
        return None


def init_session_state():
    if "history" not in st.session_state:
        st.session_state.history = []
    if "stats" not in st.session_state:
        st.session_state.stats = {"total_translations": 0, "total_chars": 0}
    if "translation_output" not in st.session_state:
        st.session_state.translation_output = {"text": None, "pronunciation": None, "path": None}


# -----------------------
# Sample language-learning content
# -----------------------
TRAVEL_PHRASES = {
    "Greetings": [
        "Hello",
        "Good morning",
        "Good evening",
        "How are you?",
    ],
    "Emergency": [
        "I need help",
        "Call the police",
        "I need a doctor",
        "Where is the nearest hospital?",
    ],
    "Restaurant": [
        "A table for two, please",
        "The menu, please",
        "I am allergic to...",
        "Can I have the bill, please?",
    ],
    "Directions": [
        "Where is the train station?",
        "How do I get to the airport?",
        "Is it within walking distance?",
        "Turn left/right",
    ],
}

EXAMPLE_SENTENCES = {
    # For a few languages we provide canned examples (augmenting API responses).
    "en": ["I would like to order coffee.", "Where is the subway station?"],
    "es": ["¿Dónde está el baño?", "Quisiera una mesa para dos."],
}


# -----------------------
# Streamlit App UI
# -----------------------

def main():
    st.set_page_config(page_title="CodeAlpha Language Translator", layout="wide", page_icon=":globe_with_meridians:")
    init_session_state()

    languages = get_supported_languages()
    language_options = {"auto": "Auto-Detect"}
    language_options.update(languages)

    css_path = ASSETS_DIR / "style.css"
    if css_path.exists():
        with open(css_path, "r", encoding="utf-8") as f:
            st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

    with st.sidebar:
        st.title("CodeAlpha Translator")
        st.subheader("Translation History")
        if st.session_state.history:
            for item in reversed(st.session_state.history[-10:]):
                st.write(f"{item['source_lang_name']} → {item['target_lang_name']}: {item['input'][:60]} → {item['translated'][:60]}")
                st.caption(f"{item['time']}")
        else:
            st.write("No history yet")
        st.markdown("---")
        st.write(f"Total translations: {st.session_state.stats['total_translations']}")
        st.write(f"Total characters: {st.session_state.stats['total_chars']}")

    st.header(":page_facing_up: AI Language Learning Translator")

    col1, col2 = st.columns([2, 1])

    with col1:
        st.subheader("Enter text to translate")
        user_text = st.text_area("", height=160, placeholder="Type or paste text here...")
        st.write(f"Characters: {len(user_text)}")

        row1_col1, row1_col2 = st.columns(2)
        with row1_col1:
            source_lang = st.selectbox("Source language", options=list(language_options.keys()), format_func=lambda k: language_options[k], index=0)
        with row1_col2:
            target_keys = list(languages.keys())
            default_target_index = target_keys.index("en") if "en" in target_keys else 0
            target_lang = st.selectbox("Target language", options=target_keys, format_func=lambda k: languages[k], index=default_target_index)

        detected = None
        if user_text.strip():
            with st.spinner("Detecting language..."):
                detected = detect_language(user_text)
                time.sleep(0.2)
        detected_display = language_options.get(detected, languages.get(detected, "Unknown")) if detected else "—"
        st.write(f"Detected: {detected_display}")

        translate_btn = st.button("Translate")

        if translate_btn:
            if not user_text.strip():
                st.warning("Please enter text")
            else:
                with st.spinner("Translating..."):
                    src = detected if source_lang == "auto" and detected else source_lang
                    result = translate_text(user_text, src, target_lang)

                if not result["success"]:
                    st.error(f"Translation failed: {result.get('error')}")
                else:
                    res = result["result"]
                    translated_text = res.get("translatedText") if isinstance(res, dict) else str(res)
                    pronunciation = res.get("pronunciation") if isinstance(res, dict) else None

                    st.session_state.history.append({
                        "input": user_text,
                        "translated": translated_text,
                        "source_lang": src,
                        "target_lang": target_lang,
                        "source_lang_name": language_options.get(src, languages.get(src, src)),
                        "target_lang_name": languages.get(target_lang, target_lang),
                        "time": time.strftime("%Y-%m-%d %H:%M:%S"),
                    })
                    st.session_state.stats["total_translations"] += 1
                    st.session_state.stats["total_chars"] += len(user_text)

                    st.session_state.translation_output["text"] = translated_text
                    st.session_state.translation_output["pronunciation"] = pronunciation
                    tts_lang = target_lang
                    audio_file_name = f"tts_{int(time.time())}.mp3"
                    st.session_state.translation_output["path"] = save_tts_audio(translated_text, tts_lang, audio_file_name)

    # Right column: Translation output or learning tools
    with col2:
        if st.session_state.translation_output["text"]:
            # Show translation results
            st.subheader(":speech_balloon: Translation Output")
            st.text_area("", value=st.session_state.translation_output["text"], height=200, key="output_text", disabled=True)

            # Copy to clipboard button using a safer approach
            text_to_copy = st.session_state.translation_output["text"]
            text_json = json.dumps(text_to_copy)
            copy_js = f"""
            <button onclick="navigator.clipboard.writeText({text_json})">📋 Copy</button>
            """
            st.components.v1.html(copy_js)

            # Download button
            st.download_button("⬇️ Download TXT", data=st.session_state.translation_output["text"], file_name="translation.txt")

            # TTS Audio player
            if st.session_state.translation_output["path"]:
                st.audio(str(st.session_state.translation_output["path"]))
            else:
                st.info("TTS unavailable for this language.")

            # Pronunciation
            st.markdown(f"**Pronunciation:** {st.session_state.translation_output['pronunciation'] if st.session_state.translation_output['pronunciation'] else 'N/A'}")
        else:
            # Show learning tools by default
            st.subheader(":book: Language Learning Tools")
            st.write("Examples & Travel Phrases")

            # Examples: show example sentences for target language if present
            st.write("**Common Examples**")
            examples = EXAMPLE_SENTENCES.get(target_lang, [])
            if examples:
                for ex in examples:
                    st.write(f"- {ex}")
            else:
                st.write("No local examples available.")

            st.markdown("---")
            st.write("**Travel Phrases**")
            # Show categories and phrases; allow on-demand translation of these into target language
            for category, phrases in TRAVEL_PHRASES.items():
                with st.expander(category):
                    for p in phrases:
                        cols = st.columns([4, 1])
                        cols[0].write(p)
                        if cols[1].button(f"→", key=f"tp_{category}_{p}"):
                            with st.spinner("Translating..."):
                                src = "auto"
                                r = translate_text(p, src, target_lang)
                            if r["success"]:
                                translated = r["result"].get("translatedText")
                                st.success(f"**{translated}**")
                            else:
                                st.error("Translation failed.")

    # Footer / stats row
    st.markdown("---")
    st.write(f"Translated {st.session_state.stats['total_translations']} times — {st.session_state.stats['total_chars']} characters total.")


if __name__ == "__main__":
    main()
