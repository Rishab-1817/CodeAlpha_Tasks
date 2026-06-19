# CAREERWISE Development

This is a production-ready AI FAQ chatbot for placement and career guidance.

## ⚡ Quick Start (60 seconds)

### Windows (PowerShell)
```powershell
# Backend (Terminal 1)
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend (Terminal 2)
cd frontend
npm install
npm run dev
```

### macOS/Linux (Bash)
```bash
# Backend (Terminal 1)
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend (Terminal 2)
cd frontend
npm install
npm run dev
```

### Or use the setup script
- **Windows:** Run `setup.bat`
- **macOS/Linux:** Run `bash setup.sh`

---

## 📖 Full Documentation

See [GETTING_STARTED.md](./GETTING_STARTED.md) for:
- Complete setup instructions
- Project structure
- API documentation
- Deployment guide
- Troubleshooting

---

## 🎯 What is CAREERWISE?

An AI-powered semantic FAQ chatbot that helps students prepare for placements by:
- Using Sentence Transformers to understand intent, not just keywords
- Returning grounded answers from a curated dataset of 100+ FAQs
- Providing confidence scores and similar questions
- Offering a premium, futuristic UI experience

**Example:**
- User: "How should I start DSA?"
- AI: Matches semantically similar questions → Returns best FAQ answer with 98.5% confidence

---

## 🚀 Stack

**Frontend:** React 18 + Tailwind CSS + Framer Motion + Vite  
**Backend:** FastAPI + Sentence Transformers + NLTK + Scikit-learn  
**Deployment:** Vercel (frontend) + Render (backend)

---

## 📋 Features

✅ Semantic search with embeddings  
✅ 100+ placement FAQs across 20 categories  
✅ Confidence scoring  
✅ Quick topics & popular questions  
✅ Search history  
✅ Copy answer button  
✅ Dark premium UI  
✅ Fully responsive  
✅ Ready for production  

---

## 🔧 Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

---

## 📞 Support

For detailed guides and troubleshooting, refer to `GETTING_STARTED.md`.
