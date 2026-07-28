import { useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import BeforeAfterSlider from './BeforeAfterSlider';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'ai-video', label: 'AI Videos' },
  { key: 'thumbnail', label: 'Thumbnails' },
  { key: 'shorts', label: 'Shorts' },
  { key: 'before-after', label: 'Before & After' },
  { key: 'live', label: 'Live Projects' },
];

const ITEMS = [
  { id: 1, type: 'ai-video', title: 'AI Explainer — Personal Finance', tag: 'AI Video', accent: '#4da6ff', seed: 'aivid1', meta: '2.1M views · AI voice + b-roll pipeline' },
  { id: 2, type: 'ai-video', title: 'AI Voiceover Series — Tech News', tag: 'AI Video', accent: '#4da6ff', seed: 'aivid2', meta: '890K views · Daily automated upload' },
  { id: 3, type: 'thumbnail', title: 'A/B Test Winner — DIY Renovation', tag: 'Thumbnail', accent: '#fbbf24', seed: 'thumb1', meta: 'CTR 4.1% → 9.8%' },
  { id: 4, type: 'thumbnail', title: 'A/B Test Winner — Tech Review', tag: 'Thumbnail', accent: '#fbbf24', seed: 'thumb2', meta: 'CTR 3.4% → 7.6%' },
  { id: 5, type: 'thumbnail', title: 'A/B Test Winner — Finance Tips', tag: 'Thumbnail', accent: '#fbbf24', seed: 'thumb3', meta: 'CTR 2.9% → 8.2%' },
  { id: 6, type: 'shorts', title: 'Shorts Growth Sprint — Fitness', tag: 'Shorts', accent: '#00d4ff', seed: 'short1', meta: '14M views in 30 days' },
  { id: 7, type: 'shorts', title: 'Shorts Growth Sprint — Comedy', tag: 'Shorts', accent: '#00d4ff', seed: 'short2', meta: '9.2M views in 30 days' },
  { id: 8, type: 'before-after', title: 'Revenue Transformation — Finance Flux', tag: 'Before & After', accent: '#34d399', slider: { before: '$1,200/mo', after: '$18,400/mo', metric: 'RPM up 4.1× in 6 months' } },
  { id: 9, type: 'before-after', title: 'Revenue Transformation — TechByte', tag: 'Before & After', accent: '#34d399', slider: { before: '$5,100/mo', after: '$34,700/mo', metric: 'RPM up 3.8× in 5 months' } },
  { id: 10, type: 'live', title: 'HomeCraft Daily — Optimization Sprint', tag: 'Live Project', accent: '#a78bfa', seed: 'live1', meta: 'Week 6 of 12 · +210% MTD', live: true },
  { id: 11, type: 'live', title: 'Studio Nova — Brand Deal Rollout', tag: 'Live Project', accent: '#a78bfa', seed: 'live2', meta: 'Week 3 of 12 · 2 deals closed', live: true },
];

function GridCard({ item }) {
  if (item.type === 'before-after') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.35 }}
        className="glass-card p-5"
        style={{ borderColor: `${item.accent}30` }}
      >
        <p className="font-mono text-[9px] uppercase tracking-widest mb-2" style={{ color: item.accent }}>{item.tag}</p>
        <h3 className="font-display text-sm font-bold text-ink-primary mb-3">{item.title}</h3>
        <BeforeAfterSlider
          beforeLabel={item.slider.before}
          afterLabel={item.slider.after}
          afterColor={item.accent}
          metric={item.slider.metric}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35 }}
      className="glass-card overflow-hidden group"
      style={{ borderColor: `${item.accent}30` }}
      whileHover={{ y: -4 }}
    >
      <div className="relative h-40 -m-4 mb-3 overflow-hidden">
        <img
          src={`https://picsum.photos/seed/${item.seed}/480/320`}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, transparent 40%, ${item.accent}22 100%)` }}
        />
        {item.live && (
          <span className="absolute top-2 right-2 flex items-center gap-1.5 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-neon-green">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse-glow" />
            LIVE
          </span>
        )}
        <span
          className="absolute top-2 left-2 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full"
          style={{ color: item.accent, background: 'rgba(5,10,24,0.75)', border: `1px solid ${item.accent}50` }}
        >
          {item.tag}
        </span>
      </div>
      <div className="p-1">
        <h3 className="font-display text-sm font-bold text-ink-primary mb-1">{item.title}</h3>
        <p className="text-ink-muted text-xs">{item.meta}</p>
      </div>
    </motion.div>
  );
}

export default function PortfolioShowcase() {
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => (filter === 'all' ? ITEMS : ITEMS.filter((i) => i.type === filter)),
    [filter]
  );

  return (
    <section className="section-padding border-t border-line" id="portfolio-showcase">
      <div className="container-shell">
        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 scrollbar-none">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="relative font-mono text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-pill transition-colors duration-200 focus-neon"
              style={{
                color: filter === f.key ? '#fff' : '#4da6ff',
                background: filter === f.key ? 'rgba(0,102,255,0.3)' : 'rgba(0,102,255,0.1)',
                border: `1px solid ${filter === f.key ? '#4da6ff' : 'rgba(0,102,255,0.25)'}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map((item) => (
                <GridCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
