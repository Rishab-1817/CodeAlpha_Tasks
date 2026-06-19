# ⚡ CAREERWISE – Quick Start Guide

## 🎯 Get it running in 2 minutes

### Step 1: Open Terminal 1 (Backend)

```powershell
# Navigate to project
cd "c:\Users\Rishu Jha\OneDrive\Desktop\chatbot"

# Go to backend
cd backend

# Create virtual environment
python -m venv .venv

# Activate it (Windows PowerShell)
.\.venv\Scripts\Activate.ps1

# Install dependencies (this may take 1-2 minutes)
pip install -r requirements.txt

# Start the API server
uvicorn main:app --reload --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

✅ Backend is ready. Leave this terminal running.

---

### Step 2: Open Terminal 2 (Frontend)

```powershell
# Navigate to project
cd "c:\Users\Rishu Jha\OneDrive\Desktop\chatbot"

# Go to frontend
cd frontend

# Install dependencies (1-2 minutes)
npm install

# Start the dev server
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

✅ Frontend is ready.

---

### Step 3: Open Your Browser

Click on the link in Terminal 2 or go to:
```
http://localhost:5173
```

🎉 **CAREERWISE is now live!**

---

## 🧪 Test It Out

1. **Click a Quick Topic** (left sidebar)
   - Example: "DSA Roadmap"
   - Should instantly show an answer

2. **Click a Popular Question** (left sidebar bottom)
   - Example: "How do I start DSA?"
   - Should fetch and display answer

3. **Type a question** in the search box
   - Example: "How do I prepare for interviews?"
   - Should return related answer

4. **Copy an answer**
   - Click "Copy Answer" button
   - Answer is now in your clipboard

---

## ⚙️ If Something Goes Wrong

**Backend won't start?**
```powershell
# Check if port 8000 is free
netstat -ano | findstr :8000

# If it's busy, use a different port
uvicorn main:app --reload --port 8001
```

**Frontend shows "Cannot reach API"?**
- Make sure backend is running (check Terminal 1)
- Check .env.local file has:
  ```env
  VITE_API_BASE_URL=http://localhost:8000
  ```

**npm install fails?**
```powershell
# Try clearing cache
npm cache clean --force
npm install
```

**Python packages fail to install?**
```powershell
# Make sure you're in the virtual environment
.\.venv\Scripts\Activate.ps1

# Try updating pip
python -m pip install --upgrade pip

# Then install again
pip install -r requirements.txt
```

---

## 📱 Project Files Summary

```
✅ Backend ready:
   - FastAPI server running
   - NLTK preprocessor active
   - Sentence Transformer loaded
   - 100+ FAQs indexed

✅ Frontend ready:
   - React dashboard loaded
   - Tailwind CSS styled
   - Animations working
   - Connected to backend API

✅ Data ready:
   - FAQ dataset with 100+ questions
   - 20 categories covered
   - Semantic embeddings cached
```

---

## 🔗 Useful URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **API Health:** http://localhost:8000 (should return JSON)
- **API Search:** POST http://localhost:8000/search

---

## 📖 Need Help?

- **Setup issues?** → See GETTING_STARTED.md
- **Project overview?** → See README.md
- **Deployment guide?** → See GETTING_STARTED.md (Deployment section)
- **Docker?** → Run `docker-compose up`

---

## 🚀 Next Steps

1. ✅ Backend running on port 8000
2. ✅ Frontend running on port 5173
3. ✅ Both connected and working
4. **Then:** Deploy to production
   - Frontend → Vercel
   - Backend → Render
   - (See GETTING_STARTED.md for details)

---

## ⏱️ Timing Expectations

- **First backend start:** 30-60 seconds (downloads embedding model)
- **First search:** 100-200ms
- **Subsequent searches:** <50ms
- **npm install:** 2-3 minutes
- **pip install:** 1-2 minutes

---

## 💡 Pro Tips

- Leave both terminals open while developing
- The backend auto-reloads on code changes
- The frontend hot-reloads on code changes
- NLTK data is downloaded automatically on first run
- Embedding model is cached locally after first use

---

**Ready to go! 🎉**

Start with Step 1 above and you'll have CAREERWISE running in under 5 minutes.

Questions? Check the documentation files or review the code comments.

Happy coding! 🚀
