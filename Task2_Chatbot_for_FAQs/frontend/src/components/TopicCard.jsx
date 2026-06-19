import { motion } from 'framer-motion';

function TopicCard({ topic, isActive, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      className={`flex w-full items-center justify-between rounded-3xl border px-4 py-4 text-left transition ${isActive ? 'border-cyan-400/60 bg-cyan-500/10 shadow-[0_20px_60px_rgba(45,199,255,0.18)]' : 'border-white/10 bg-[#07112b]/80 hover:border-cyan-400/30 hover:bg-[#0c1737]'}`}
      onClick={onClick}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-3 text-sm font-semibold text-white">
          <span>{topic.icon}</span>
          {topic.title}
        </div>
        <p className="text-xs text-slate-400">Instant guidance</p>
      </div>
      <div className="rounded-full bg-white/10 px-3 py-2 text-xs text-slate-300">Open</div>
    </motion.button>
  );
}

export default TopicCard;
