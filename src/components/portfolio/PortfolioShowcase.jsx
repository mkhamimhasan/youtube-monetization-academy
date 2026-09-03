import { useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import BeforeAfterSlider from './BeforeAfterSlider';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'website', label: 'Websites' },
  { key: 'video', label: 'Video Editing' },
  { key: 'brand', label: 'Brand Identity' },
  { key: 'before-after', label: 'Before & After' },
];

const ITEMS = [
  { id: 1, type: 'website', title: 'Portfolio Site — Creative Studio', tag: 'Website', accent: '#4da6ff', seed: 'web1', meta: 'Custom design · Responsive build' },
  { id: 2, type: 'website', title: 'E-commerce Landing — Skincare Brand', tag: 'Website', accent: '#4da6ff', seed: 'web2', meta: 'Conversion-focused layout' },
  { id: 3, type: 'website', title: 'SaaS Landing Page — Analytics Tool', tag: 'Website', accent: '#4da6ff', seed: 'web3', meta: 'Modern UI · Fast load' },
  { id: 4, type: 'video', title: 'Product Launch Video — Tech Gadget', tag: 'Video Editing', accent: '#fbbf24', seed: 'vid1', meta: 'Motion graphics · Sound design' },
  { id: 5, type: 'video', title: 'Brand Story Reel — Fashion Label', tag: 'Video Editing', accent: '#fbbf24', seed: 'vid2', meta: 'Color grading · Pacing edit' },
  { id: 6, type: 'video', title: 'Event Highlight Edit — Corporate Summit', tag: 'Video Editing', accent: '#fbbf24', seed: 'vid3', meta: 'Multi-cam sync · Captions' },
  { id: 7, type: 'brand', title: 'Visual Identity — Coffee Roastery', tag: 'Brand Identity', accent: '#a78bfa', seed: 'brand1', meta: 'Logo · Color system · Guidelines' },
  { id: 8, type: 'brand', title: 'Brand Refresh — Fitness App', tag: 'Brand Identity', accent: '#a78bfa', seed: 'brand2', meta: 'Logo redesign · Typography' },
  { id: 9, type: 'before-after', title: 'Website Redesign — Local Bakery', tag: 'Before & After', accent: '#34d399', slider: { before: 'Old Site', after: 'New Site', metric: 'Full redesign · Mobile-first' } },
  { id: 10, type: 'before-after', title: 'Raw Footage → Final Cut', tag: 'Before & After', accent: '#34d399', slider: { before: 'Raw Footage', after: 'Edited Version', metric: 'Color grade · Sound mix · Pacing' } },
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
      style={{ borderColor: `${item.accent}30`, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
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
    <section className="section-padding " id="portfolio-showcase">
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


