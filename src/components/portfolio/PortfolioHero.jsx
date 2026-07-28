export default function PortfolioHero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-36 pb-16 md:pt-44 md:pb-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(251,191,36,0.08) 0%, transparent 70%)' }}
      />
      <div className="container-shell relative z-10 text-center">
        <p className="kicker-amber justify-center inline-flex mb-4">📁 Portfolio</p>
        <h1 className="mb-5">
          <span className="text-ink-primary">The Numbers</span>{' '}
          <span className="text-gradient-hero">Speak</span>
        </h1>
        <p className="text-ink-secondary text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          AI videos, thumbnail wins, Shorts strategy, and real client revenue transformations — filtered by
          showcase type, updated as results land.
        </p>
      </div>
    </section>
  );
}
