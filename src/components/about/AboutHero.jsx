export default function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-36 pb-20 md:pt-44 md:pb-28">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,102,255,0.1) 0%, transparent 70%)',
        }}
      />
      <div className="container-shell relative z-10 text-center">
        <p className="kicker justify-center inline-flex mb-4">ðŸš€ About YTA.Agency</p>
        <h1 className="mb-5">
          <span className="text-gradient-hero">We're Obsessed With</span>
          <br />
          <span className="text-ink-primary">One Number: Your Revenue</span>
        </h1>
        <p className="text-ink-secondary text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Architected for visionary creators and modern narrative universes.
        </p>
      </div>
    </section>
  );
}




