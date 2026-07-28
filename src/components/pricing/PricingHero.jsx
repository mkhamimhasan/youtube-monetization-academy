export default function PricingHero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-36 pb-16 md:pt-44 md:pb-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,102,255,0.1) 0%, transparent 70%)' }}
      />
      <div className="container-shell relative z-10 text-center">
        <p className="kicker justify-center inline-flex mb-4">💰 Pricing</p>
        <h1 className="mb-5">
          <span className="text-ink-primary">Transparent Pricing.</span>
          <br />
          <span className="text-gradient-hero">Guaranteed Results.</span>
        </h1>
        <p className="text-ink-secondary text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          No hidden fees, no lock-in contracts. Every plan ships with the 90-day revenue guarantee — hit 40%
          growth or don't pay for month four.
        </p>
      </div>
    </section>
  );
}
