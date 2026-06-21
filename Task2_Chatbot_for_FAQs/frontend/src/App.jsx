import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock3, ChevronRight, Home, LayoutGrid, RefreshCcw, Search, Sparkles, Star } from 'lucide-react';
import { faqDataset } from './data/faqDataset';
import TopicCard from './components/TopicCard';
import PopularQuestionPill from './components/PopularQuestionPill';
import ResponseCard from './components/ResponseCard';
import GeometricAura from './components/GeometricAura';

const quickTopics = [
  { title: 'DSA Roadmap', icon: '🚀', query: 'How should I start DSA?' },
  { title: 'Resume Tips', icon: '📄', query: 'What should I include in my resume as a fresher?' },
  { title: 'First Internship Guide', icon: '💼', query: 'How can I get my first internship?' },
  { title: 'Aptitude Preparation', icon: '🎯', query: 'How can I prepare for aptitude rounds?' },
  { title: 'Web Development Roadmap', icon: '🌐', query: 'What should I practise for frontend interviews?' },
  { title: 'AI & ML Roadmap', icon: '🤖', query: 'Which AI and ML roadmap should I follow?' },
  { title: 'OOP Concepts', icon: '🧠', query: 'How do I revise OOP concepts effectively?' },
  { title: 'LinkedIn Optimization', icon: '🔗', query: 'How do I improve my LinkedIn profile?' },
  { title: 'Tell Me About Yourself', icon: '🎤', query: 'How do I answer Tell me about yourself?' },
  { title: 'Best Projects for Resume', icon: '🛠', query: 'How do I plan a project for my resume?' },
  { title: 'Programming Languages', icon: '💻', query: 'Which programming language should I choose for placements?' },
  { title: 'Placement Strategy', icon: '📈', query: 'How do I manage time while preparing for placements?' },
  { title: 'Operating Systems', icon: '⚙', query: 'How do I prepare for operating systems questions?' },
  { title: 'Computer Networks', icon: '🌐', query: 'What are common computer networks questions?' },
];

const popularQuestions = [
  'How do I start DSA?',
  'Which language should I choose?',
  'Is web development enough?',
  'How can I get internships?',
  'Should I do DSA before AI?',
  'Important DBMS topics?',
  'Resume format for freshers?',
  'How to answer Tell me about yourself?',
  'How many projects should I have?',
  'What are the most important CS subjects?',
  'How do I crack aptitude rounds?',
  'How do I improve my LinkedIn profile?',
];

const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const navItems = [
  { id: 'home', label: 'Home Oracle', icon: Home },
  { id: 'categories', label: 'Categories', icon: LayoutGrid },
  { id: 'recent', label: 'Recent Searches', icon: Clock3 },
  { id: 'favorites', label: 'Favorites', icon: Star },
];

const categoryEmojiMap = {
  'Resume building': '📄',
  'DSA preparation': '🚀',
  Aptitude: '🎯',
  'HR interview questions': '🎤',
  'Technical interviews': '💼',
  'OOP concepts': '🧩',
  DBMS: '🧠',
  'Operating Systems': '⚙️',
  'Computer Networks': '🌐',
  SQL: '🗄️',
  'Web Development': '💻',
  'AI and Machine Learning roadmap': '🤖',
  Projects: '🛠️',
  Productivity: '📈',
  'Career guidance': '✨',
  'LinkedIn optimization': '🔗',
  'Git and GitHub': '🐙',
  Internships: '💼',
};

function buildCategories(dataset) {
  const grouped = dataset.reduce((accumulator, item) => {
    const categoryName = item.category || 'General';
    if (!accumulator[categoryName]) {
      accumulator[categoryName] = [];
    }
    accumulator[categoryName].push(item);
    return accumulator;
  }, {});

  return Object.entries(grouped)
    .map(([title, items]) => ({
      title,
      emoji: categoryEmojiMap[title] || '📘',
      count: items.length,
      sample: items[0],
      questions: items.slice(0, 5),
    }))
    .sort((left, right) => left.title.localeCompare(right.title));
}

function App() {
  const [query, setQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeView, setActiveView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRecentIndex, setSelectedRecentIndex] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const title = 'CAREERWISE';
  const subtitle = 'Your Placement and Career Oracle';
  const categories = useMemo(() => buildCategories(faqDataset), []);

  const selectedFavorite = response ? favorites.find((item) => item.question === response.question) : null;

  const pushHistory = (queryLabel, result) => {
    setHistory((current) => [
      { query: queryLabel, response: result },
      ...current.filter((item) => item.query !== queryLabel),
    ].slice(0, 8));
  };

  const handleQuery = async (incomingQuery, options = {}) => {
    const finalQuery = incomingQuery || query;
    if (!finalQuery.trim()) {
      setError('Type a question or select a topic to get started.');
      return;
    }

    setLoading(true);
    setError('');
    setActiveTopic(null);
    try {
      const res = await fetch(`${apiBase}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: finalQuery }),
      });
      if (!res.ok) {
        const payload = await res.json();
        throw new Error(payload.detail || 'Unable to fetch results');
      }
      const data = await res.json();
      setResponse(data);
      setQuery(finalQuery);
      pushHistory(finalQuery, data);
      setSelectedRecentIndex(null);
      if (!options.switchTo) {
        setActiveView('home');
      }

      // ✅ AUTO-SCROLL TO ANSWER ON MOBILE
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          const answerElement = document.querySelector('.response-card-wrapper');
          if (answerElement) {
            answerElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 300);
      }
    } catch (err) {
      setError(err.message || 'Search failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (topic) => {
    setActiveTopic(topic.title);
    handleQuery(topic.query, { switchTo: 'home' });
  };

  const handlePopularClick = (question) => {
    setQuery(question);
    handleQuery(question, { switchTo: 'home' });
  };

  const handleClear = () => {
    setQuery('');
    setResponse(null);
    setError('');
    setActiveTopic(null);
    setSelectedRecentIndex(null);
  };

  const openCategory = (category) => {
    setSelectedCategory(category);
    setActiveView('categories');
    setSelectedRecentIndex(null);
  };

  const openRecent = (item, index) => {
    setActiveView('recent');
    setSelectedRecentIndex(index);
    setSelectedCategory(null);
    setQuery(item.query);
    setResponse(item.response);
    setError('');
  };

  const toggleFavorite = () => {
    if (!response) return;

    setFavorites((current) => {
      const exists = current.some((item) => item.question === response.question);
      if (exists) {
        return current.filter((item) => item.question !== response.question);
      }

      return [response, ...current].slice(0, 8);
    });
  };

  const renderHomeView = () => (
    <div className="space-y-6">
      <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Your Placement and Career Oracle</p>
          <h1 className="text-4xl font-semibold text-white sm:text-6xl">{title}</h1>
          <p className="max-w-2xl text-base text-slate-300 sm:text-lg">Ask anything about placements, interviews, DSA, internships, resumes, and career strategy.</p>
        </div>

        <div className="mx-auto mt-10 max-w-[920px] rounded-[32px] border border-white/10 bg-[#08112f]/85 p-4 shadow-[0_25px_80px_rgba(24,46,132,0.18)]">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0c1732]/80 px-4 py-4 shadow-[0_16px_45px_rgba(13,22,56,0.24)]">
            <motion.div
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-r from-cyan-500/10 via-transparent to-violet-500/10"
            />
            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center gap-3 rounded-3xl border border-white/10 bg-[#09162f] px-4 py-4">
                <Search className="h-5 w-5 text-cyan-300" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && handleQuery()}
                  placeholder="Ask anything about placements, interviews, DSA, internships, resumes..."
                  className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <button
                onClick={() => handleQuery()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Oracle Query
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {['Improve my resume', 'How do I prepare for DSA?', 'Getting Internships', 'HR Interview Tips', 'DBMS Questions'].map((item) => (
              <button
                key={item}
                onClick={() => handlePopularClick(item)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:bg-[#0f1a40]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {response ? (
        <div className="response-card-wrapper">
          <ResponseCard response={response} onToggleFavorite={toggleFavorite} isFavorite={Boolean(selectedFavorite)} />
        </div>
      ) : (
        <div className="rounded-[32px] border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-400">
          <p className="text-lg font-medium text-slate-200">Ask a placement or career question to unlock an answer.</p>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-400">The AI system searches only the dataset, so your answers stay grounded and reliable.</p>
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}
        </div>
      )}
    </div>
  );

  const renderCategoriesView = () => (
    <div className="mx-auto max-w-[1180px] space-y-6">
      <section className="rounded-[36px] border border-white/10 bg-white/5 p-7 shadow-glow backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Categories</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Browse over 100 placement FAQs</h2>
            <p className="mt-2 text-sm text-slate-400">Select a category to open its related questions. The layout is tuned to stay clean and centered like your reference.</p>
          </div>
          <Sparkles className="h-6 w-6 text-cyan-300/90" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <motion.button
              key={category.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => openCategory(category)}
              className={`group rounded-[28px] border p-5 text-left transition ${selectedCategory?.title === category.title ? 'border-cyan-400/50 bg-cyan-500/10 shadow-[0_20px_60px_rgba(45,199,255,0.12)]' : 'border-white/10 bg-[#08122f]/85 hover:border-cyan-400/30 hover:bg-[#0d1737]'}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 text-xl transition group-hover:border-cyan-400/20 group-hover:bg-white/10">
                    {category.emoji}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold leading-tight text-white">{category.title}</h3>
                    <p className="text-xs text-slate-400">{category.count} FAQs</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyan-300" />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {selectedCategory && (
        <section className="rounded-[36px] border border-white/10 bg-white/5 p-7 shadow-glow backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Selected Category</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{selectedCategory.emoji} {selectedCategory.title}</h3>
              <p className="mt-2 text-sm text-slate-400">Open any question below to jump back to the home answer card.</p>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-[#0d1837]"
            >
              Clear selection
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {selectedCategory.questions.map((item) => (
              <button
                key={item.question}
                onClick={() => handleQuery(item.question, { switchTo: 'home' })}
                className="rounded-[26px] border border-white/10 bg-[#08122f]/85 p-4 text-left transition hover:border-cyan-400/30 hover:bg-[#0d1737]"
              >
                <p className="text-sm font-medium text-white">{item.question}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{item.answer}</p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderRecentView = () => (
    <div className="mx-auto max-w-[1180px] space-y-6">
      <section className="rounded-[36px] border border-white/10 bg-white/5 p-7 shadow-glow backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Recent Searches</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Your recent semantic query records</h2>
            <p className="mt-2 text-sm text-slate-400">Click any record to reopen the answer. This screen is intentionally compact and list-focused.</p>
          </div>
          <button
            onClick={() => setHistory([])}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-[#0d1837]"
          >
            Clear History
          </button>
        </div>

        <div className="mt-8 space-y-3">
          {history.length ? history.map((item, index) => (
            <motion.div
              key={`${item.query}-${index}`}
              whileHover={{ scale: 1.01 }}
              className={`rounded-[28px] border p-4 transition ${selectedRecentIndex === index ? 'border-cyan-400/50 bg-cyan-500/10 shadow-[0_20px_60px_rgba(45,199,255,0.08)]' : 'border-white/10 bg-[#08122f]/85 hover:border-cyan-400/30 hover:bg-[#0d1737]'}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button className="flex flex-1 items-start gap-3 text-left" onClick={() => openRecent(item, index)}>
                  <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-300">
                    <Clock3 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">“{item.query}”</p>
                    <p className="mt-2 text-xs text-slate-400">{item.response.category} • {item.response.confidence}% confidence</p>
                  </div>
                </button>
                <button
                  onClick={() => openRecent(item, index)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-[#0d1837]"
                >
                  Ask Oracle
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )) : (
            <div className="rounded-[30px] border border-dashed border-white/10 bg-[#08122f]/70 p-8 text-center text-slate-400">
              No recent searches yet. Ask a question from Home or tap a quick topic.
            </div>
          )}
        </div>
      </section>

      {selectedRecentIndex !== null && history[selectedRecentIndex] && (
        <section className="rounded-[36px] border border-white/10 bg-white/5 p-7 shadow-glow backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Result Preview</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Recent question opened</h3>
              <p className="mt-2 text-sm text-slate-400">The result is shown directly below, matching the clean single-column behavior in your screenshot.</p>
            </div>
            <button
              onClick={() => setSelectedRecentIndex(null)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/30 hover:bg-[#0d1837]"
            >
              Hide preview
            </button>
          </div>
          <div className="mt-6">
            <ResponseCard response={history[selectedRecentIndex].response} onToggleFavorite={() => toggleFavorite(history[selectedRecentIndex].response)} isFavorite={isFavorite(history[selectedRecentIndex].response)} />
          </div>
        </section>
      )}
    </div>
  );

  const renderFavoritesView = () => (
    <div className="rounded-[36px] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">Favorites</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Saved answers</h2>
        </div>
        <Star className="h-6 w-6 text-cyan-300/90" />
      </div>

      <div className="mt-6 space-y-3">
        {favorites.length ? favorites.map((item) => (
          <button
            key={item.question}
            onClick={() => {
              setActiveView('home');
              setResponse(item);
            }}
            className="w-full rounded-[28px] border border-white/10 bg-[#08122f]/85 p-4 text-left transition hover:border-cyan-400/30 hover:bg-[#0d1837]"
          >
            <p className="text-sm font-medium text-white">{item.question}</p>
            <p className="mt-2 text-xs text-slate-400">{item.category} • {item.confidence}% confidence</p>
          </button>
        )) : (
          <div className="rounded-[30px] border border-dashed border-white/10 bg-[#08122f]/70 p-8 text-center text-slate-400">
            No favorites yet. Use the save button on an answer card to pin it here.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050913] p-4 text-white lg:p-6">
      <GeometricAura />
      <div className="relative z-10 mx-auto grid max-w-[1700px] gap-6 xl:grid-cols-[320px_1fr]">
        <aside className="flex h-auto flex-col gap-5 rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur-xl xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_25px_70px_rgba(84,95,255,0.16)]">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">AI Placement & Career Oracle</p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-50">CAREERWISE</h1>
            <p className="mt-2 text-sm text-slate-300">AI-Powered Placement & Career Oracle</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setError('');
                  }}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${isActive ? 'border-cyan-400/50 bg-cyan-500/10 text-white shadow-[0_20px_60px_rgba(45,199,255,0.12)]' : 'border-transparent bg-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white'}`}
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </button>
              );
            })}
          </nav>

          <section className="rounded-[32px] border border-white/10 bg-[#07102b]/90 p-4 shadow-[0_24px_60px_rgba(12,21,63,0.4)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">⚡ Quick Topics</p>
                <h2 className="mt-2 text-base font-semibold text-white">Popular placement prompts</h2>
              </div>
              <Sparkles className="h-5 w-5 text-cyan-300/90" />
            </div>
            <div className="scrollbar-thin mt-4 max-h-[290px] space-y-3 overflow-y-auto pr-1">
              {quickTopics.map((topic) => (
                <TopicCard
                  key={topic.title}
                  topic={topic}
                  isActive={activeTopic === topic.title}
                  onClick={() => handleTopicClick(topic)}
                />
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-white/10 bg-[#07102b]/90 p-4 shadow-[0_24px_60px_rgba(12,21,63,0.4)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">🔥 Popular Questions</p>
                <p className="mt-1 text-sm text-slate-300">Tap to fetch answers instantly.</p>
              </div>
              <RefreshCcw className="h-5 w-5 text-slate-400" />
            </div>
            <div className="scrollbar-thin max-h-[220px] space-y-3 overflow-y-auto pr-1">
              {popularQuestions.map((question) => (
                <PopularQuestionPill key={question} question={question} onClick={() => handlePopularClick(question)} />
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-white/10 bg-[#08132f]/90 p-4 shadow-[0_24px_60px_rgba(12,21,63,0.4)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Recent Searches</p>
                <p className="mt-1 text-sm text-slate-300">Click any record to reopen it.</p>
              </div>
              <button onClick={() => setHistory([])} className="text-xs text-cyan-300 transition hover:text-cyan-200">Clear</button>
            </div>
            <div className="scrollbar-thin max-h-[240px] space-y-3 overflow-y-auto pr-1">
              {history.length ? history.map((item, index) => (
                <button
                  key={`${item.query}-${index}`}
                  onClick={() => openRecent(item, index)}
                  className={`w-full rounded-3xl border p-4 text-left transition ${selectedRecentIndex === index ? 'border-cyan-400/50 bg-cyan-500/10' : 'border-white/5 bg-[#0d1736]/80 hover:border-cyan-400/30 hover:bg-[#101b3e]'}`}
                >
                  <p className="text-sm font-medium text-white">{item.query}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.response.category} • {item.response.confidence}%</p>
                </button>
              )) : (
                <p className="text-sm text-slate-400">Your recent AI interactions will appear here.</p>
              )}
            </div>
          </section>
        </aside>

        <main className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.25 }}
            >
              {activeView === 'categories'
                ? renderCategoriesView()
                : activeView === 'recent'
                  ? renderRecentView()
                  : activeView === 'favorites'
                    ? renderFavoritesView()
                    : renderHomeView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;