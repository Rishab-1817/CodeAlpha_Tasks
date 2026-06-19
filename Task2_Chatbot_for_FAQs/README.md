# CAREERWISE – AI-Powered Placement & Career Oracle

A polished full-stack AI FAQ chatbot built with React, Tailwind CSS, Framer Motion, FastAPI, and Sentence Transformers. It performs semantic search over 100+ curated placement and career questions, returning grounded answers from the dataset.

## Features

- Premium futuristic dashboard UI
- Semantic search with `all-MiniLM-L6-v2`
- NLTK preprocessing: tokenization, lowercasing, stopword removal, lemmatization
- Cosine similarity matching with Scikit-learn
- Confidence scoring
- Quick topics, popular questions, search history, copy answer
- Fully frontend/backend separated for Vercel + Render deployment

## Folder Structure

- `frontend/` – React application with Tailwind CSS and Framer Motion
- `backend/` – FastAPI server, semantic search logic, FAQ dataset
- `.gitignore` – shared ignore rules for Python and Node

## Setup

### Backend

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   ./.venv/Scripts/Activate.ps1
   ```
2. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Start the backend:
   ```bash
   uvicorn backend.main:app --reload --port 8000
   ```

### Frontend

1. Install Node dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### Environment

- Frontend expects the backend at `http://localhost:8000` by default.
- To override, create `.env` in `frontend/` with:
  ```env
  VITE_API_BASE_URL=http://localhost:8000
  ```

## Deployment

- Deploy `frontend/` to Vercel as a React app.
- Deploy `backend/` to Render as a Python FastAPI service.
- Ensure CORS is enabled on the backend (already configured).

## API

- `GET /` – health check
- `POST /search` – semantic FAQ search

Request body:

```json
{ "query": "How do I start DSA?" }
```

Response body:

```json
{
  "question": "How should I start DSA?",
  "answer": "Start with fundamentals...",
  "category": "DSA preparation",
  "confidence": 98.2,
  "similar_questions": ["How should I start DSA?", "Best roadmap for coding interviews?", "How do I study algorithms?"]
}
```
