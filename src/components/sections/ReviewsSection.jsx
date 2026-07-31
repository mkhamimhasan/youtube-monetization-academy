const WHAT_TO_EXPECT = [
  { icon: '💬', title: 'Direct Communication', desc: "You'll work with me directly — no account managers, no middlemen." },
  { icon: '🔁', title: 'Unlimited Revisions', desc: 'We refine the work together until it truly matches your vision.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Clear timelines and regular updates, so you always know where things stand.' },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="section-padding border-t border-line overflow-hidden">
      <div className="container-shell">
        <div className="text-center mb-12">
          <p className="kicker-purple mb-2">⭐ Client Reviews</p>
          <h2 className="text-gradient-hero mb-4">Testimonials Coming Soon</h2>
          <p className="text-ink-secondary text-sm max-w-lg mx-auto leading-relaxed">
            I'm just getting started and building out my client list — check back soon for real reviews.
            In the meantime, here's what you can expect when working together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {WHAT_TO_EXPECT.map((item) => (
            <div
              key={item.title}
              className="glass-panel text-center py-6 px-4"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-display text-sm font-bold text-ink-primary mb-2">{item.title}</h3>
              <p className="text-ink-secondary text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="font-mono text-[11px] text-ink-muted">
            Want to be one of my first clients? Let's talk 👇
          </p>
        </div>
      </div>
    </section>
  );
}