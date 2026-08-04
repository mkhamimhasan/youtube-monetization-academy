export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-36 pb-20 md:pt-44 md:pb-28">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,58,237,0.1) 0%, transparent 70%)' }}
      />
      <div className="container-shell relative z-10 text-center">
        <p className="kicker-purple justify-center inline-flex mb-4">⚙️ Our Services</p>
        <h1 className="mb-5">
          <span className="text-ink-primary">Websites & Videos</span>
          <br />
          <span className="text-gradient-hero">That Convert</span>
        </h1>
        <p className="text-ink-secondary text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Custom websites, scroll-stopping videos, and content that turns viewers into paying clients — built by specialists who live inside the algorithm.
        </p>
      </div>
    </section>
  );
}