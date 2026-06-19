# Installation Guide

This guide provides step-by-step instructions for installing and running CodeAlpha Language Translator on different platforms.

## Table of Contents
- [Quick Start (All Platforms)](#quick-start)
- [Windows](#windows)
- [macOS](#macos)
- [Linux](#linux)
- [API Configuration](#api-configuration)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Internet connection (for translation API)

### Installation Steps

1. **Navigate to project directory:**
   ```bash
   cd CodeAlpha_LanguageTranslator
   ```

2. **Run setup script:**
   
   **Windows:**
   ```
   setup.bat
   ```
   
   **macOS/Linux:**
   ```bash
   bash setup.sh
   ```

3. **Start the application:**
   
   **Windows:**
   ```
   .venv\Scripts\activate.bat
   streamlit run app.py
   ```
   
   **macOS/Linux:**
   ```bash
   source .venv/bin/activate
   streamlit run app.py
   ```

4. **Open in browser:**
   - Streamlit will automatically open at `http://localhost:8501`
   - If not, manually visit the URL

## Windows

### Step-by-Step Manual Installation

1. **Install Python:**
   - Download from https://www.python.org/downloads/
   - Run installer
   - **Important:** Check "Add Python to PATH"
   - Click Install Now

2. **Verify installation:**
   ```
   python --version
   ```

3. **Create virtual environment:**
   ```
   python -m venv .venv
   ```

4. **Activate virtual environment:**
   ```
   .venv\Scripts\activate.bat
   ```
   
   You should see `(.venv)` in your terminal prompt

5. **Upgrade pip:**
   ```
   python -m pip install --upgrade pip
   ```

6. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

7. **Create .env file (optional):**
   ```
   copy .env.example .env
   ```

8. **Run the app:**
   ```
   streamlit run app.py
   ```

9. **Access the app:**
   - Browser should automatically open to `http://localhost:8501`
   - If not, manually navigate to this URL

### Troubleshooting Windows

- **"command not found: python"**
  - Add Python to PATH manually
  - Go to System Properties > Environment Variables
  - Add Python installation folder to PATH

- **"'streamlit' is not recognized"**
  - Ensure virtual environment is activated (you should see `(.venv)` in prompt)
  - Run: `pip install streamlit` manually

- **Port 8501 already in use**
  - Run: `streamlit run app.py --server.port 8502`

## macOS

### Step-by-Step Manual Installation

1. **Install Python (if not already installed):**
   ```bash
   # Using Homebrew (recommended)
   brew install python@3.11
   
   # Or download from https://www.python.org/downloads/
   ```

2. **Verify installation:**
   ```bash
   python3 --version
   ```

3. **Create virtual environment:**
   ```bash
   python3 -m venv .venv
   ```

4. **Activate virtual environment:**
   ```bash
   source .venv/bin/activate
   ```
   
   You should see `(.venv)` in your terminal prompt

5. **Upgrade pip:**
   ```bash
   pip install --upgrade pip
   ```

6. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

7. **Create .env file (optional):**
   ```bash
   cp .env.example .env
   ```

8. **Run the app:**
   ```bash
   streamlit run app.py
   ```

9. **Access the app:**
   - Browser should automatically open to `http://localhost:8501`
   - If not, manually navigate to this URL

### Troubleshooting macOS

- **"python3: command not found"**
  - Install Python via Homebrew: `brew install python@3.11`
  - Or download from https://www.python.org/

- **Permission denied for .venv/bin/activate**
  - Run: `chmod +x .venv/bin/activate`

- **Port 8501 already in use**
  - Run: `streamlit run app.py --server.port 8502`

## Linux

### Step-by-Step Manual Installation

#### Ubuntu/Debian

1. **Update package manager:**
   ```bash
   sudo apt-get update
   ```

2. **Install Python and pip:**
   ```bash
   sudo apt-get install python3 python3-pip python3-venv
   ```

3. **Create virtual environment:**
   ```bash
   python3 -m venv .venv
   ```

4. **Activate virtual environment:**
   ```bash
   source .venv/bin/activate
   ```

5. **Upgrade pip:**
   ```bash
   pip install --upgrade pip
   ```

6. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

7. **Create .env file (optional):**
   ```bash
   cp .env.example .env
   ```

8. **Run the app:**
   ```bash
   streamlit run app.py
   ```

#### Fedora/RHEL

```bash
sudo dnf install python3 python3-pip

# Then follow steps 3-8 above
```

#### Arch Linux

```bash
sudo pacman -S python python-pip

# Then follow steps 3-8 above
```

### Troubleshooting Linux

- **"python3: command not found"**
  - Ubuntu/Debian: `sudo apt-get install python3`
  - Fedora/RHEL: `sudo dnf install python3`
  - Arch: `sudo pacman -S python`

- **"pip: command not found"**
  - Ubuntu/Debian: `sudo apt-get install python3-pip`
  - Fedora/RHEL: `sudo dnf install python3-pip`
  - Arch: `sudo pacman -S python-pip`

- **Permission denied for virtual environment**
  - Run: `chmod +x .venv/bin/activate`

- **Port 8501 already in use**
  - Run: `streamlit run app.py --server.port 8502`

## API Configuration

### LibreTranslate (Default)

No configuration needed! The app uses the public LibreTranslate API by default.

**To use a self-hosted instance:**
1. Edit `.env`:
   ```
   LIBRETRANSLATE_URL=http://your-instance:5000
   ```

2. Or set Streamlit secret in `~/.streamlit/secrets.toml`:
   ```toml
   LIBRETRANSLATE_URL = "http://your-instance:5000"
   ```

### Google Cloud Translate

1. Create a Google Cloud project
2. Enable Cloud Translation API
3. Download service account JSON file
4. Set environment variable:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/key.json"
   ```
5. Uncomment in `requirements.txt`:
   ```
   google-cloud-translate>=3.9.0
   ```
6. Modify `translate_text()` function in `app.py`

### Microsoft Translator

1. Create Azure account
2. Create a Translator resource
3. Get API key
4. Add to `.env`:
   ```
   MICROSOFT_TRANSLATOR_KEY=your_key
   MICROSOFT_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
   ```
5. Uncomment in `requirements.txt`:
   ```
   azure-cognitiveservices-language-translator>=0.2.0
   ```
6. Modify `translate_text()` function in `app.py`

## Troubleshooting

### Common Issues

**Issue: "ModuleNotFoundError: No module named 'streamlit'"**
- Ensure virtual environment is activated
- Run: `pip install -r requirements.txt`

**Issue: "Connection error" when translating**
- Check internet connection
- Verify LibreTranslate endpoint is accessible
- Try different LibreTranslate instance

**Issue: "ImportError: No module named 'gTTS'"**
- Run: `pip install gTTS`

**Issue: App doesn't open automatically in browser**
- Manually navigate to `http://localhost:8501`
- Check terminal output for any errors

**Issue: TTS not working**
- gTTS may not support your language
- Try downloading TTS without slow parameter in code
- Use alternative TTS service

**Issue: Translation takes too long**
- Public LibreTranslate may be rate-limited
- Use self-hosted instance or pay API
- Add caching with `@st.cache_data`

### Getting Help

1. Check README.md for feature documentation
2. Review LibreTranslate documentation: https://libretranslate.com
3. Check Streamlit documentation: https://docs.streamlit.io
4. Open an issue on GitHub

## Next Steps

After successful installation:
1. Try translating some text
2. Test the TTS feature
3. Explore travel phrases
4. Check translation history
5. Download translations
6. Customize style in `assets/style.css`

Enjoy learning languages!
