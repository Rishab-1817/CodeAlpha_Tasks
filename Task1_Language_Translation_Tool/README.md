# CodeAlpha_LanguageTranslator

Professional AI Language Learning Translator built with Streamlit. Translate text between 100+ languages with automatic detection, TTS, travel phrases, and learning tools.

## Features

✨ **Core Translation**
- Translate text between 100+ languages using LibreTranslate API
- Automatic language detection (auto-detect source language)
- Real-time translation with error handling
- Support for multiple translation APIs (LibreTranslate, Google Translate, Microsoft Translator)

📚 **Learning Tools**
- Travel phrases in 4 categories: Greetings, Emergency, Restaurant, Directions
- Example sentences for common languages
- On-demand phrase translation

🔊 **Audio & Speech**
- Text-to-Speech (TTS) via gTTS for translated text
- Built-in audio player to listen to translations
- Support for 100+ languages for pronunciation

📊 **User Features**
- Translation history (last 10 translations in sidebar)
- Character counter (real-time)
- Copy translated text to clipboard with one click
- Download translations as TXT file
- Translation statistics (total count and character count)

🎨 **UI/UX**
- Responsive two-column layout
- Dark-mode compatible styling
- Sidebar with history and statistics
- Emoji icons for better visual appeal
- Loading indicators during translation

## Installation

### 1. Clone or Download the Repository

```bash
git clone https://github.com/yourusername/CodeAlpha_LanguageTranslator.git
cd CodeAlpha_LanguageTranslator
```

### 2. Create and Activate a Python Virtual Environment

**On Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. (Optional) Configure API

Copy `.env.example` to `.env` and edit if needed:

```bash
cp .env.example .env
```

**LibreTranslate (Default - Free, No Key Required):**
Edit `app.py` line 11 to use your preferred instance:
```python
LIBRETRANSLATE_URL = st.secrets.get("LIBRETRANSLATE_URL", "https://libretranslate.de")
```

**Alternative: Google Cloud Translate**
1. Create a Google Cloud project and enable Cloud Translation API
2. Download service account key (JSON)
3. Set environment variable: `GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json`
4. Modify translate_text() in app.py to use google.cloud.translate library

**Alternative: Microsoft Translator**
1. Get API key from Azure Cognitive Services
2. Set in .env: `MICROSOFT_TRANSLATOR_KEY=your_key`
3. Modify translate_text() in app.py to use microsoft.cognitiveservices

### 5. Run the Application

```bash
streamlit run app.py
```

The app will automatically open in your browser (default: `http://localhost:8501`)

## Usage

1. **Enter Text:** Paste or type text in the input area
2. **Select Languages:** Choose source (or use Auto-Detect) and target language
3. **Translate:** Click "Translate :rocket:" button
4. **Results:** View translation in the right column
5. **Actions:**
   - Copy translated text with the Copy button
   - Download as TXT file
   - Listen to pronunciation via audio player
6. **Learn:** View travel phrases and examples in the learning panel
7. **History:** Check sidebar for translation history and statistics

## Project Structure

```
CodeAlpha_LanguageTranslator/
├── app.py                 # Main Streamlit application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore rules
├── assets/
│   └── style.css         # Custom CSS styling
└── audio/                # Generated TTS audio files (runtime)
    └── .gitkeep
```

## Configuration

### Streamlit Secrets (Optional)

For production, use Streamlit secrets instead of .env:

1. Create `~/.streamlit/secrets.toml`:

```toml
LIBRETRANSLATE_URL = "https://libretranslate.de"
```

2. Reference in code:
```python
url = st.secrets.get("LIBRETRANSLATE_URL", "https://libretranslate.de")
```

### Custom CSS

Edit `assets/style.css` to customize appearance. Reload app to see changes.

## API Notes

### LibreTranslate (Recommended for Beginners)
- **Free:** No API key required
- **Public Instance:** https://libretranslate.de (rate-limited)
- **Languages:** 100+
- **Self-Hosted:** Deploy own instance for unlimited usage
- **Docs:** https://libretranslate.com

### Google Cloud Translate
- **Cost:** Pay-per-use (~$15 per 1M characters)
- **Accuracy:** Very high
- **Docs:** https://cloud.google.com/translate/docs

### Microsoft Translator
- **Cost:** Free tier (2M chars/month), then pay-per-use
- **Accuracy:** Very high
- **Docs:** https://learn.microsoft.com/en-us/azure/ai-services/translator/

## Troubleshooting

**Problem:** "Connection failed" error
- **Solution:** Check your internet connection and LibreTranslate endpoint is accessible
- **Test:** Open endpoint URL in browser

**Problem:** TTS audio not generating
- **Solution:** gTTS may not support all languages; check language code support
- **Workaround:** Use Google Translate API with TTS instead

**Problem:** App running slowly
- **Solution:** Reduce number of language fetch on startup; cache languages locally

**Problem:** "ImportError: No module named 'streamlit'"
- **Solution:** Ensure virtual environment is activated: `source .venv/bin/activate`

## Advanced Customization

### Adding New Travel Phrases

Edit TRAVEL_PHRASES dictionary in `app.py` (line ~122):

```python
TRAVEL_PHRASES = {
    "Your Category": ["Phrase 1", "Phrase 2"]
}
```

### Adding Example Sentences

Edit EXAMPLE_SENTENCES dictionary in `app.py` (line ~134):

```python
EXAMPLE_SENTENCES = {
    "en": ["Example 1", "Example 2"]
}
```

### Swapping Translation API

Replace the `translate_text()` function (line ~72) with your API:

```python
def translate_text(text: str, source: str, target: str):
    """Your custom API call here"""
    # ... API logic
    return {"success": True, "result": {"translatedText": translated}}
```

## Performance Tips

- Use LibreTranslate public instance for development
- Self-host LibreTranslate for production (avoid rate limits)
- Cache language list locally to speed up startup
- Use `st.cache_data` decorator for helper functions

## License

This project is provided as a learning and demonstration template. Feel free to use, modify, and distribute.

## Author

Built with ❤️ by CodeAlpha

## Contributing

Contributions welcome! Feel free to fork and submit pull requests.

## Support

For issues, questions, or suggestions:
1. Check the Troubleshooting section
2. Review LibreTranslate documentation
3. Open an issue on GitHub
