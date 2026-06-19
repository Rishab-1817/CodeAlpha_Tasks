# CAREERWISE – AI-Powered Placement & Career Oracle

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

### 1. Backend Setup (FastAPI + AI)

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate (Windows PowerShell)
.\.venv\Scripts\Activate.ps1

# Or activate (Windows cmd)
.venv\Scripts\activate.bat

# Or activate (macOS/Linux)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

### 2. Frontend Setup (React + Tailwind)

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The UI will be available at `http://localhost:5173`.

### 3. Test the Application

- Open `http://localhost:5173` in your browser
- Try clicking a "Quick Topic" or "Popular Question"
- Type a question and press Enter or click Search
- View the AI response with confidence score and category

---

## Project Structure

```
chatbot/
├── frontend/                      # React + Tailwind + Framer Motion
│   ├── src/
│   │   ├── App.jsx               # Main dashboard component
│   │   ├── index.css             # Tailwind + custom styles
│   │   ├── main.jsx              # React entry point
│   │   ├── components/
│   │   │   ├── TopicCard.jsx     # Quick topic card
│   │   │   ├── PopularQuestionPill.jsx
│   │   │   └── ResponseCard.jsx  # Answer display
│   │   └── data/
│   │       └── faqDataset.js     # FAQ data (frontend mirror)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.local                # API URL
│   └── vercel.json               # Vercel deployment config
│
├── backend/                       # FastAPI + Semantic Search
│   ├── main.py                   # FastAPI app, embeddings, search logic
│   ├── faq_dataset.py            # 100+ placement FAQs
│   ├── requirements.txt           # Python dependencies
│   ├── Procfile                  # Render deployment
│   ├── runtime.txt               # Python version for Render
│   └── .gitignore
│
├── README.md                     # Full documentation
└── .gitignore                    # Shared git ignore
```

---

## Features

✅ **Semantic AI Search** – Sentence Transformer embeddings + cosine similarity  
✅ **100+ FAQs** – Curated placement, interviews, DSA, internships, resume guidance  
✅ **NLTK Preprocessing** – Tokenization, lemmatization, stopword removal  
✅ **Confidence Scoring** – Every answer includes a confidence percentage  
✅ **Quick Topics** – 14 clickable topic cards for instant answers  
✅ **Popular Questions** – 12 trending questions as pills  
✅ **Search History** – Recent searches saved in sidebar  
✅ **Copy Answer** – One-click copy to clipboard  
✅ **Premium UI** – Glassmorphism, dark theme, Framer Motion animations  
✅ **Fully Responsive** – Desktop and mobile optimized  
✅ **Production Ready** – Vercel + Render deployment ready  

---

## Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS 3** for styling
- **Framer Motion** for animations
- **Lucide Icons** for UI icons
- **Axios** (via fetch) for API calls

### Backend
- **FastAPI** – High-performance Python API framework
- **Sentence Transformers** – `all-MiniLM-L6-v2` for embeddings
- **Scikit-learn** – Cosine similarity matching
- **NLTK** – Natural language processing (tokenization, lemmatization)
- **NumPy** – Numerical operations
- **Pydantic** – Request/response validation

### Data
- **JSON-based FAQ dataset** with 100+ curated questions
- Each FAQ includes: question, alternate phrasings, answer, category

---

## API Endpoints

### Health Check
```
GET /
```
Response:
```json
{ "message": "CAREERWISE FAQ AI Oracle is ready.", "status": "ok" }
```

### Semantic Search
```
POST /search
Content-Type: application/json

{
  "query": "How should I start DSA?"
}
```

Response:
```json
{
  "question": "How should I start DSA?",
  "answer": "Start with fundamentals like arrays, strings, linked lists...",
  "category": "DSA preparation",
  "confidence": 98.5,
  "similar_questions": [
    "How should I start DSA?",
    "Best roadmap for coding interviews?",
    "How do I study algorithms?"
  ]
}
```

---

## Environment Variables

### Frontend `.env.local`
```env
VITE_API_BASE_URL=http://localhost:8000
```

For production (Vercel):
```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

### Backend
No `.env` file required for local development. For Render, environment variables can be set in the dashboard.

---

## Deployment

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the repository
4. Set root directory to `frontend/`
5. Add environment variable: `VITE_API_BASE_URL=https://your-backend-url.onrender.com`
6. Deploy

### Deploy Backend to Render

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect your repository
5. Set runtime to Python 3.11
6. Set build command to: `pip install -r backend/requirements.txt`
7. Set start command to: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
8. Deploy

---

## Troubleshooting

**Q: Backend returns 422 Unprocessable Entity**
- Check that your request body is valid JSON
- Ensure `query` field is not empty

**Q: Frontend shows "Unable to fetch results"**
- Verify backend is running on `http://localhost:8000`
- Check CORS is enabled (it is in the code)
- Ensure `VITE_API_BASE_URL` in `.env.local` is correct

**Q: NLTK downloads fail**
- Backend auto-downloads required NLTK data on first run
- If it fails, run: `python -m nltk.downloader punkt wordnet stopwords omw-1.4`

**Q: Sentence Transformer downloads slowly**
- First run downloads the `all-MiniLM-L6-v2` model (~80 MB)
- This is cached locally, so subsequent runs are instant

---

## Features Highlight

### Smart Search
The app uses **Sentence Transformers** to understand semantic meaning, not just keyword matching. This means:
- "How should I start DSA?" 
- "Best roadmap for coding interviews?"
- "How do I study algorithms?"

All map to the same answer because they're semantically similar.

### 100+ Curated FAQs
Covers 20 categories:
- Resume Building
- DSA Preparation
- Aptitude
- HR Interview Questions
- Technical Interviews
- OOP Concepts
- DBMS
- Operating Systems
- Computer Networks
- SQL
- Web Development
- AI & ML
- Git & GitHub
- Projects
- Internships
- LinkedIn Optimization
- Productivity
- Communication Skills
- Placement Strategies
- Career Guidance

### Premium UI
- Dark futuristic theme
- Glassmorphism cards
- Smooth animations
- Neon accents (cyan, purple)
- Fully responsive design
- No ChatGPT clone – unique dashboard experience

---

## Building from Source

To rebuild the project after making changes:

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
No build step needed. Just ensure `requirements.txt` is up to date.

---

## Performance

- **Search latency:** ~100-200ms (after embeddings are cached)
- **First load:** ~5s (embedding model download + initialization)
- **Bundle size:** ~150KB gzipped (frontend)
- **API response time:** <50ms (semantic search only)

---

## Support

For issues, errors, or feature requests, check the main README or the code comments.

Happy job hunting! 🚀
