import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, ClipboardCopy } from 'lucide-react';

function ResponseCard({ response, onToggleFavorite, isFavorite = false }) {
  const copyAnswer = async () => {
    try {
      await navigator.clipboard.writeText(response.answer);
    } catch (error) {
      console.error('Copy failed', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      className="space-y-6 rounded-[32px] border border-white/10 bg-[#091231]/90 p-7 shadow-[0_30px_90px_rgba(17,32,81,0.28)]"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">Answer</p>
          <h3 className="text-2xl font-semibold text-white">Career advice delivered clearly</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyAnswer}
            className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/15"
          >
            <ClipboardCopy className="h-4 w-4" /> Copy Answer
          </button>
          {onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/30 hover:bg-[#0d1837]"
            >
              {isFavorite ? <BookmarkCheck className="h-4 w-4 text-cyan-300" /> : <Bookmark className="h-4 w-4" />}
              {isFavorite ? 'Saved' : 'Save Answer'}
            </button>
          )}
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-[#08112e]/95 p-6 text-slate-200">
        <p className="text-base leading-8 text-slate-100">{response.answer}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Category</p>
          <p className="mt-2 font-semibold text-white">{response.category}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Confidence</p>
          <p className="mt-2 font-semibold text-white">{response.confidence}%</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Similar</p>
          <div className="mt-2 space-y-1 text-sm text-slate-300">
            {response.similar_questions.map((text, index) => (
              <p key={`${text}-${index}`}>• {text}</p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ResponseCard;
