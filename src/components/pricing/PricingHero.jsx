export default function PricingHero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-36 pb-16 md:pt-44 md:pb-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,102,255,0.1) 0%, transparent 70%)',
        }}
      />
      <div className="container-shell relative z-10 text-center">
        <p className="kicker justify-center inline-flex mb-4">💰 Pricing</p>
        <h1 className="mb-5">
          <span className="text-ink-primary">Simple Pricing.</span>
          <br />
          <span className="text-gradient-hero">Quoted for Your Project.</span>
        </h1>
        <p className="text-ink-secondary text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Every website and video project is different — so pricing is scoped after a free discovery call.
          No templates, no hidden fees, no lock-in contracts.
        </p>
      </div>
    </section>
  );
}