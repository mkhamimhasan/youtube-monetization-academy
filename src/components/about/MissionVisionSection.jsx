export default function MissionVisionSection() {
  return (
    <section className="section-padding  relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)' }}
      />
      <div className="container-shell relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="glass-card-blue p-8 md:p-10">
            <div
              className="h-11 w-11 rounded-lg flex items-center justify-center text-xl mb-5"
              style={{ background: 'rgba(0,102,255,0.12)', border: '1px solid rgba(0,102,255,0.3)' }}
            >
              🎯
            </div>
            <h3 className="font-display text-lg font-bold text-neon-blue-light mb-3">Our Mission</h3>
            <p className="text-ink-secondary text-sm leading-relaxed">
              To give serious YouTube creators the same revenue infrastructure that top media companies use —
              data-driven monetization strategy, multi-stream revenue architecture, and a partner who treats
              their channel like a real business, not a hobby.
            </p>
          </div>

          {/* Vision */}
          <div className="glass-card-purple p-8 md:p-10">
            <div
              className="h-11 w-11 rounded-lg flex items-center justify-center text-xl mb-5"
              style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)' }}
            >
              🔭
            </div>
            <h3 className="font-display text-lg font-bold text-neon-purple-light mb-3">Our Vision</h3>
            <p className="text-ink-secondary text-sm leading-relaxed">
              A future where independent creators can build durable, investable businesses on YouTube — where
              revenue per viewer, not just view count, is the metric every channel is built around. We want to
              be the reason 1,000 creators quit their day jobs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}



