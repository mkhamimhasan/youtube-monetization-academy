import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const SUCCESS_STORIES = [
  {
    id: 'finance-flux',
    channel: 'Finance Flux',
    niche: 'Personal Finance',
    before: '$1,200/mo',
    after: '$18,400/mo',
    growth: '+1,433%',
    quote: 'YTA rebuilt our entire ad category strategy in the first month. Revenue per view nearly quadrupled before subscriber count moved at all.',
    timeframe: '6 months',
    color: '#4da6ff',
  },
  {
    id: 'homecraft-daily',
    channel: 'HomeCraft Daily',
    niche: 'DIY & Home',
    before: '$2,800/mo',
    after: '$21,900/mo',
    growth: '+682%',
    quote: 'The brand deal pipeline alone paid for the entire engagement in month two. Now it\'s 40% of our monthly revenue.',
    timeframe: '4 months',
    color: '#a78bfa',
  },
  {
    id: 'techbyte-review',
    channel: 'TechByte Reviews',
    niche: 'Tech Reviews',
    before: '$5,100/mo',
    after: '$34,700/mo',
    growth: '+580%',
    quote: 'We thought we were already optimized. YTA found $12K/month in CPM we were leaving on the table from mis-tagged content.',
    timeframe: '5 months',
    color: '#34d399',
  },
];

function StoryCard({ story, onOpen }) {
  return (
    <motion.button
      layout
      onClick={() => onOpen(story)}
      className="glass-card text-left p-6 w-full transition-colors duration-300"
      style={{ borderColor: `${story.color}30` }}
      whileHover={{ y: -4, boxShadow: `0 0 26px ${story.color}22` }}
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-1">{story.niche}</p>
      <h3 className="font-display text-base font-bold text-ink-primary mb-4">{story.channel}</h3>
      <div className="flex items-center gap-3 mb-4">
        <div>
          <p className="text-[10px] text-ink-muted">Before</p>
          <p className="font-mono text-sm text-ink-secondary">{story.before}</p>
        </div>
        <span className="text-ink-muted">→</span>
        <div>
          <p className="text-[10px] text-ink-muted">After</p>
          <p className="font-mono text-sm font-bold" style={{ color: story.color }}>{story.after}</p>
        </div>
      </div>
      <span
        className="font-mono text-xs font-bold px-2.5 py-1 rounded-full"
        style={{ color: story.color, background: `${story.color}15`, border: `1px solid ${story.color}35` }}
      >
        {story.growth} revenue
      </span>
      <p className="text-ink-muted text-xs mt-4">Tap to read the full story →</p>
    </motion.button>
  );
}

export default function SuccessStoriesGrid({ stories = SUCCESS_STORIES }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stories.map((s) => (
          <StoryCard key={s.id} story={s} onOpen={setActive} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              className="relative glass-panel max-w-md w-full p-8"
              style={{ borderColor: `${active.color}40` }}
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 text-ink-muted hover:text-ink-primary transition-colors focus-neon rounded"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-1">{active.niche}</p>
              <h3 className="font-display text-xl font-bold text-ink-primary mb-4">{active.channel}</h3>
              <p className="text-ink-secondary text-sm leading-relaxed italic mb-6">"{active.quote}"</p>
              <div className="flex items-center justify-between border-t border-line pt-4">
                <div>
                  <p className="text-[10px] text-ink-muted">Revenue Growth</p>
                  <p className="font-display text-lg font-bold" style={{ color: active.color }}>{active.growth}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-ink-muted">Timeframe</p>
                  <p className="font-mono text-sm text-ink-secondary">{active.timeframe}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
