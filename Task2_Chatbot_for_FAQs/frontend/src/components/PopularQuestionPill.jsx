import { motion } from 'framer-motion';

function PopularQuestionPill({ question, onClick }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      className="rounded-full border border-white/10 bg-[#08162f]/90 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:bg-[#0e1b3f]"
      onClick={onClick}
      title="Click to search this question"
    >
      {question}
    </motion.button>
  );
}

export default PopularQuestionPill;
