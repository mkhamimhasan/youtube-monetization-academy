const PILLARS = [
  { icon: '🔬', title: 'Diagnose', desc: 'We audit your last 50 videos, ad category mix, retention curves, and revenue-per-viewer to find the gaps costing you money today.' },
  { icon: '🛠️', title: 'Build', desc: 'We install the systems — CPM targeting, monetization stacks, thumbnail testing frameworks — tailored to your niche and audience.' },
  { icon: '📡', title: 'Compound', desc: 'Monthly optimization cycles, brand deal pipeline, and cross-channel benchmarking keep revenue growing quarter over quarter.' },
];

export default function ServiceOverview() {
  return (
    <section className="section-padding border-t border-line">
      <div className="container-shell">
        <div className="text-center mb-12">
          <p className="kicker justify-center inline-flex mb-2">🧭 How It Works</p>
          <h2 className="text-gradient-hero mb-4">Diagnose. Build. Compound.</h2>
          <p className="text-ink-secondary text-sm max-w-xl mx-auto">
            One integrated engagement, three phases, zero guesswork.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map((p) => (
            <div key={p.title} className="glass-panel p-7 text-center">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="font-display text-base font-bold text-ink-primary mb-2">{p.title}</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
