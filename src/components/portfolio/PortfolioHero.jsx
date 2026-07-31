export default function PortfolioHero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-36 pb-16 md:pt-44 md:pb-20">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(251,191,36,0.08) 0%, transparent 70%)' }}
      />
      {/* Subtle grid texture for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-shell relative z-10 text-center">
        <p className="kicker-amber justify-center inline-flex mb-4">📁 Portfolio</p>
        <h1 className="mb-5">
          <span className="text-ink-primary">Work That</span>{' '}
          <span className="text-gradient-hero">Speaks for Itself</span>
        </h1>
        <p className="text-ink-secondary text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Websites, video edits, and brand identity projects — browse by category and see the
          craftsmanship behind each build.
        </p>
      </div>
    </section>
  );
}