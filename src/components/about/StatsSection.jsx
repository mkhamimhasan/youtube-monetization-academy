const STATS = [
  { value: '100%', label: 'Custom-Coded Builds', color: '#4da6ff' },
  { value: '48h', label: 'Avg. Response Time', color: '#00d4ff' },
  { value: '1-on-1', label: 'Direct Communication', color: '#a78bfa' },
  { value: 'Unlimited', label: 'Revisions on Studio Plan', color: '#fbbf24' },
  { value: '100%', label: 'Mobile-Responsive', color: '#34d399' },
  { value: 'Website + Video', label: 'Core Services', color: '#f43f5e' },
];

function StatBlock({ stat }) {
  return (
    <div className="glass-panel px-5 py-8 text-center">
      <span
        className="font-display text-2xl md:text-3xl font-black block mb-2"
        style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}55` }}
      >
        {stat.value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="section-padding ">
      <div className="container-shell">
        <div className="text-center mb-12">
          <p className="kicker justify-center inline-flex mb-2">📈 What You Get</p>
          <h2 className="text-gradient-hero mb-4">What You Can Expect</h2>
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


