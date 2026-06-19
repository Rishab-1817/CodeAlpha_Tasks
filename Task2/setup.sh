#!/bin/bash

echo ""
echo "============================================"
echo "   CAREERWISE - Quick Start Script"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not found. Please install Node.js 18+ from nodejs.org"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python not found. Please install Python 3.11+ from python.org"
    exit 1
fi

echo "✓ Node.js and Python found"
echo ""
echo "Starting CAREERWISE setup..."
echo ""

# Setup Backend
echo "[1/4] Setting up backend..."
cd backend
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi
echo "Activating virtual environment..."
source .venv/bin/activate
echo "Installing dependencies..."
pip install -q -r requirements.txt
echo "✓ Backend ready"
cd ..
echo ""

# Setup Frontend
echo "[2/4] Setting up frontend..."
cd frontend
echo "Installing npm dependencies..."
npm install -q
echo "✓ Frontend ready"
cd ..
echo ""

echo "============================================"
echo "   Setup Complete! 🎉"
echo "============================================"
echo ""
echo "Next steps:"
echo ""
echo "Terminal 1 - Run Backend:"
echo "   cd backend"
echo "   source .venv/bin/activate"
echo "   uvicorn main:app --reload --port 8000"
echo ""
echo "Terminal 2 - Run Frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "Then open http://localhost:5173 in your browser"
echo ""
