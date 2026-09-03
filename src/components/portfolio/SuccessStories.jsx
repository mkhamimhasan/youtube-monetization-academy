import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// TODO: Replace with real client case studies once available.
// Each entry should only be added after client permission to share results/quotes.
export const SUCCESS_STORIES = [
  {
    id: 'placeholder-1',
    project: 'Website Redesign',
    category: 'E-commerce',
    summary: 'Full visual overhaul and mobile-first rebuild for a growing online store.',
    deliverables: ['Custom design', 'Responsive build', 'Performance optimization'],
    timeframe: '3 weeks',
    color: '#4da6ff',
  },
  {
    id: 'placeholder-2',
    project: 'Brand Identity + Landing Page',
    category: 'Startup Launch',
    summary: 'Logo, color system, and launch page built ahead of a product release.',
    deliverables: ['Logo design', 'Brand guidelines', 'Landing page'],
    timeframe: '2 weeks',
    color: '#a78bfa',
  },
  {
    id: 'placeholder-3',
    project: 'Video Editing Package',
    category: 'Content Creator',
    summary: 'Ongoing edit support for weekly long-form and short-form content.',
    deliverables: ['Color grading', 'Sound design', 'Caption + pacing edits'],
    timeframe: 'Ongoing',
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
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-1">{story.category}</p>
      <h3 className="font-display text-base font-bold text-ink-primary mb-4">{story.project}</h3>
      <p className="text-ink-secondary text-sm leading-relaxed mb-4">{story.summary}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {story.deliverables.map((d) => (
          <span
            key={d}
            className="font-mono text-[10px] px-2 py-0.5 rounded-full"
            style={{ color: story.color, background: `${story.color}15`, border: `1px solid ${story.color}35` }}
          >
            {d}
          </span>
        ))}
      </div>
      <p className="text-ink-muted text-xs">Tap to view details →</p>
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
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-1">{active.category}</p>
              <h3 className="font-display text-xl font-bold text-ink-primary mb-4">{active.project}</h3>
              <p className="text-ink-secondary text-sm leading-relaxed mb-6">{active.summary}</p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {active.deliverables.map((d) => (
                  <span
                    key={d}
                    className="font-mono text-xs px-2.5 py-1 rounded-full"
                    style={{ color: active.color, background: `${active.color}15`, border: `1px solid ${active.color}35` }}
                  >
                    {d}
                  </span>
                ))}
              </div>
              <div className=" pt-4">
                <p className="text-[10px] text-ink-muted">Timeframe</p>
                <p className="font-mono text-sm text-ink-secondary">{active.timeframe}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


