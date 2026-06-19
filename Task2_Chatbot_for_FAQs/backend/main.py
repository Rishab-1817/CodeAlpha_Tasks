from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import re
from faq_dataset import faq_dataset

app = FastAPI(
    title='CAREERWISE FAQ AI Oracle',
    description='Semantic FAQ search API for placement and career guidance.',
    version='1.0.0',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class SearchPayload(BaseModel):
    query: str

class MobileSearchPayload(BaseModel):
    query: str

def preprocess_text(text: str) -> str:
    """Normalize text for vector search."""
    return ' '.join(re.findall(r"[a-zA-Z]+", text.lower()))


def create_faq_corpus(dataset):
    """Combine questions and alternate text into a single corpus entry per FAQ."""
    corpus = []
    for item in dataset:
        text = item['question']
        text += ' ' + ' '.join(item.get('alternate_questions', []))
        corpus.append(preprocess_text(text))
    return corpus

faq_corpus = create_faq_corpus(faq_dataset)
vectorizer = TfidfVectorizer(ngram_range=(1, 2), stop_words='english')
faq_embeddings = vectorizer.fit_transform(faq_corpus)


@app.get('/')
def root():
    return {'message': 'CAREERWISE FAQ AI Oracle is ready.', 'status': 'ok'}


@app.post('/search')
def search_faq(payload: SearchPayload):
    if not payload.query or not payload.query.strip():
        raise HTTPException(status_code=400, detail='Query cannot be empty.')

    query_text = preprocess_text(payload.query)
    query_embedding = vectorizer.transform([query_text])
    similarities = cosine_similarity(query_embedding, faq_embeddings)[0]
    best_idx = int(np.argmax(similarities))
    best_score = float(similarities[best_idx])
    best_faq = faq_dataset[best_idx]

    response = {
        'question': best_faq['question'],
        'answer': best_faq['answer'],
        'category': best_faq.get('category', 'General'),
        'confidence': round(best_score * 100, 1),
        'similar_questions': [best_faq['question']] + best_faq.get('alternate_questions', [])[:3],
    }
    return response
