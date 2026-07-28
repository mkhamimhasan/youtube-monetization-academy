export default function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-36 pb-16 md:pt-44 md:pb-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(52,211,153,0.08) 0%, transparent 70%)' }}
      />
      <div className="container-shell relative z-10 text-center">
        <p className="kicker-green justify-center inline-flex mb-4">📡 Contact</p>
        <h1 className="mb-5">
          <span className="text-ink-primary">Let's Find the Revenue</span>
          <br />
          <span className="text-gradient-hero">You're Leaving on the Table</span>
        </h1>
        <p className="text-ink-secondary text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Apply below for a free 45-minute audit, or reach us directly — we typically respond within one
          business day.
        </p>
      </div>
    </section>
  );
}
