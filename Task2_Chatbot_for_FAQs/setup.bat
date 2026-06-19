@echo off
echo.
echo ============================================
echo   CAREERWISE - Quick Start Script
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not found. Please install Node.js 18+ from nodejs.org
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Python not found. Please install Python 3.11+ from python.org
    pause
    exit /b 1
)

echo ✓ Node.js and Python found
echo.
echo Starting CAREERWISE setup...
echo.

REM Setup Backend
echo [1/4] Setting up backend...
cd backend
if not exist ".venv" (
    echo Creating virtual environment...
    python -m venv .venv
)
echo Activating virtual environment...
call .venv\Scripts\activate.bat
echo Installing dependencies...
pip install -q -r requirements.txt
echo ✓ Backend ready
cd ..
echo.

REM Setup Frontend
echo [2/4] Setting up frontend...
cd frontend
echo Installing npm dependencies...
call npm install -q
echo ✓ Frontend ready
cd ..
echo.

echo ============================================
echo   Setup Complete! 🎉
echo ============================================
echo.
echo Next steps:
echo.
echo Terminal 1 - Run Backend:
echo   cd backend
echo   .\.venv\Scripts\activate.bat
echo   uvicorn main:app --reload --port 8000
echo.
echo Terminal 2 - Run Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Then open http://localhost:5173 in your browser
echo.
pause
