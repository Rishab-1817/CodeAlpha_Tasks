@echo off
REM Setup script for CodeAlpha Language Translator on Windows

echo CodeAlpha Language Translator - Setup Script
echo ============================================

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH.
    echo Please install Python 3.8 or higher from https://www.python.org/
    pause
    exit /b 1
)

echo Python version:
python --version

REM Create virtual environment
echo Creating virtual environment...
python -m venv .venv

REM Activate virtual environment
echo Activating virtual environment...
call .venv\Scripts\activate.bat

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Copy .env file
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
)

echo.
echo Setup complete!
echo.
echo To start the app, run:
echo   .venv\Scripts\activate.bat
echo   streamlit run app.py
echo.
pause
