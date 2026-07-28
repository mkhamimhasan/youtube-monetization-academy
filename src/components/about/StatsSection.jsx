import useCounter from '@/hooks/useCounter';

const STATS = [
  { value: 4.2, prefix: '$', suffix: 'M+', decimals: 1, label: 'Client Revenue Generated', color: '#4da6ff' },
  { value: 240, suffix: '+', label: 'Channels Under Management', color: '#00d4ff' },
  { value: 28, suffix: '', label: 'Niches Served', color: '#a78bfa' },
  { value: 14, suffix: '', label: 'Languages Supported', color: '#fbbf24' },
  { value: 98, suffix: '%', label: 'Client Retention Rate', color: '#34d399' },
  { value: 7, suffix: ' yrs', label: 'In Business', color: '#f43f5e' },
];

function StatBlock({ stat }) {
  const isDecimal = stat.decimals > 0;
  const { count, ref } = useCounter(stat.value, isDecimal ? stat.decimals : 0);

  return (
    <div ref={ref} className="glass-panel px-5 py-8 text-center">
      <span
        className="font-display text-3xl md:text-4xl font-black block mb-2"
        style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}55` }}
      >
        {stat.prefix || ''}{count}{stat.suffix}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="section-padding border-t border-line">
      <div className="container-shell">
        <div className="text-center mb-12">
          <p className="kicker justify-center inline-flex mb-2">📈 By the Numbers</p>
          <h2 className="text-gradient-hero mb-4">Results, Not Rhetoric</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {STATS.map((s) => (
            <StatBlock key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
