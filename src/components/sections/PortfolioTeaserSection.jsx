import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const PROJECTS = [
  {
    title: 'E-commerce Storefront',
    type: 'Website Concept',
    desc: 'A clean, conversion-focused online store layout — product grid, cart flow, and mobile-first checkout.',
    tags: ['React', 'Responsive', 'UI/UX'],
    accent: '#4da6ff',
  },
  {
    title: 'Brand Promo Edit',
    type: 'Video Editing',
    desc: 'A fast-paced promotional video sample — motion titles, sound design, and color grading for social reach.',
    tags: ['Motion Graphics', 'Color Grade', 'Sound Design'],
    accent: '#34d399',
  },
  {
    title: 'SaaS Landing Page',
    type: 'Website Concept',
    desc: 'A modern landing page layout built for a software product — clear hierarchy, fast load, strong CTA flow.',
    tags: ['Landing Page', 'Next.js', 'Conversion'],
    accent: '#a78bfa',
  },
];

function ProjectCard({ p }) {
  return (
    <div
      className="flex-shrink-0 w-72 md:w-80 rounded-card p-5 relative overflow-hidden"
      style={{
        background: 'rgba(5,10,24,0.85)',
        border: `1px solid ${p.accent}30`,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }}
      />

      <div className="mb-3">
        <span
          className="font-mono text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ color: p.accent, background: `${p.accent}18`, border: `1px solid ${p.accent}35` }}
        >
          {p.type}
        </span>
      </div>

      <h3 className="font-display text-base font-bold mb-2" style={{ color: p.accent }}>
        {p.title}
      </h3>
      <p className="text-ink-secondary text-xs leading-relaxed mb-4">
        {p.desc}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {p.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] px-2 py-0.5 rounded"
            style={{ color: p.accent, background: `${p.accent}12`, border: `1px solid ${p.accent}25` }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioTeaserSection() {
  const scrollRef = useRef(null);

  return (
    <section className="section-padding border-t border-line overflow-hidden" id="portfolio">
      <div className="container-shell mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <p className="kicker-amber mb-2">🎨 Our Work</p>
            <h2 className="text-gradient-hero">Sample Projects</h2>
            <p className="text-ink-secondary text-sm max-w-lg mt-2">
              A few concept builds showcasing our design and editing style — real client work coming soon.
            </p>
          </div>
          <Link to={ROUTES.PORTFOLIO} className="btn-ghost text-sm px-6 py-2.5 shrink-0">
            View Full Portfolio →
          </Link>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none pb-4 px-6 md:px-[calc((100vw-80rem)/2+2.5rem)]"
      >
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}

        {/* More coming card */}
        <Link
          to={ROUTES.PORTFOLIO}
          className="flex-shrink-0 w-48 rounded-card flex flex-col items-center justify-center gap-3 text-center p-6 group transition-all duration-200"
          style={{
            border: '1px dashed rgba(77,166,255,0.25)',
            background: 'rgba(0,102,255,0.03)',
          }}
        >
          <span className="text-3xl">📁</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-neon-blue-light group-hover:text-white transition-colors">
            More Projects Coming →
          </span>
        </Link>
      </div>
    </section>
  );
}