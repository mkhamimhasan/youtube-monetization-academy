import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const CASES = [
  {
    channel: 'TechExplained',
    niche: 'Tech Education',
    before: { revenue: '$1,200', cpm: '$3.20', views: '180K' },
    after:  { revenue: '$8,900', cpm: '$11.40',views: '940K' },
    growth: '+641%',
    months: 7,
    accent: '#4da6ff',
    tag: 'CPM + Content Strategy',
  },
  {
    channel: 'FinanceWithMike',
    niche: 'Personal Finance',
    before: { revenue: '$3,100', cpm: '$5.80', views: '310K' },
    after:  { revenue: '$22,400', cpm: '$18.60', views: '1.4M' },
    growth: '+622%',
    months: 9,
    accent: '#34d399',
    tag: 'Brand Deals + AdSense',
  },
  {
    channel: 'GadgetGuru',
    niche: 'Consumer Tech',
    before: { revenue: '$800',  cpm: '$2.10', views: '95K' },
    after:  { revenue: '$5,600', cpm: '$9.80', views: '620K' },
    growth: '+600%',
    months: 6,
    accent: '#a78bfa',
    tag: 'Thumbnail Lab + SEO',
  },
];

function MiniBarChart({ before, after, accent }) {
  const maxVal = Math.max(parseInt(after.replace(/[^0-9]/g, '')), 100);
  const beforePct = (parseInt(before.replace(/[^0-9]/g, '')) / maxVal) * 100;
  const afterPct  = 100;

  return (
    <div className="flex items-end gap-2 h-12 mt-2">
      <div className="flex flex-col items-center gap-1">
        <div
          className="w-6 rounded-sm"
          style={{ height: `${beforePct * 0.48}px`, background: 'rgba(100,116,139,0.5)' }}
        />
        <span className="font-mono text-[8px] text-ink-muted">Before</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div
          className="w-6 rounded-sm"
          style={{
            height: `${afterPct * 0.48}px`,
            background: accent,
            boxShadow: `0 0 8px ${accent}88`,
          }}
        />
        <span className="font-mono text-[8px] text-ink-muted">After</span>
      </div>
    </div>
  );
}

function CaseCard({ c }) {
  return (
    <div
      className="flex-shrink-0 w-72 md:w-80 rounded-card p-5 relative overflow-hidden"
      style={{
        background: 'rgba(5,10,24,0.85)',
        border: `1px solid ${c.accent}30`,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }}
      />

      {/* Channel info */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span
            className="font-display text-sm font-bold"
            style={{ color: c.accent }}
          >
            {c.channel}
          </span>
          <span
            className="font-mono text-[9px] font-black px-2 py-0.5 rounded-full"
            style={{ color: c.accent, background: `${c.accent}18`, border: `1px solid ${c.accent}35` }}
          >
            {c.growth}
          </span>
        </div>
        <span className="font-mono text-[9px] text-ink-muted uppercase tracking-wider">
          {c.niche} · {c.months} months
        </span>
      </div>

      {/* Metric rows */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {['revenue', 'cpm', 'views'].map((key) => (
          <div key={key} className="text-center">
            <p className="font-mono text-[8px] text-ink-muted uppercase mb-0.5">{key}</p>
            <p className="font-mono text-[10px] text-ink-muted line-through">{c.before[key]}</p>
            <p
              className="font-mono text-xs font-bold"
              style={{ color: c.accent }}
            >
              {c.after[key]}
            </p>
          </div>
        ))}
      </div>

      {/* Mini bar chart */}
      <div className="flex items-end gap-4">
        <div>
          <p className="font-mono text-[9px] text-ink-muted mb-1">Revenue ▲</p>
          <MiniBarChart before={c.before.revenue} after={c.after.revenue} accent={c.accent} />
        </div>
        <div className="ml-auto text-right">
          <span
            className="font-mono text-[9px] px-2 py-0.5 rounded"
            style={{ color: c.accent, background: `${c.accent}12`, border: `1px solid ${c.accent}25` }}
          >
            {c.tag}
          </span>
        </div>
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
            <p className="kicker-amber mb-2">📊 The Numbers Speak</p>
            <h2 className="text-gradient-hero">Client Case Studies</h2>
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
        {CASES.map((c) => (
          <CaseCard key={c.channel} c={c} />
        ))}

        {/* View more card */}
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
            6 More Case Studies →
          </span>
        </Link>
      </div>
    </section>
  );
}
