import { useEffect, useRef, useState } from 'react';

const VALUES = [
  { icon: '📊', title: 'Data Over Opinion', desc: 'Every recommendation traces back to a number. We kill our own favorite ideas the moment the data disagrees.', accent: '#4da6ff' },
  { icon: '🔎', title: 'Radical Transparency', desc: "You see the same dashboard we do. No black-box reporting, no vanity metrics dressed up as wins.", accent: '#00d4ff' },
  { icon: '🤝', title: 'Creator-First, Always', desc: 'You keep 100% creative control. We never chase a strategy that compromises your voice for short-term revenue.', accent: '#a78bfa' },
  { icon: '⚡', title: 'Speed With Discipline', desc: 'We move fast on what the data supports and slow down deliberately on anything that risks channel health.', accent: '#fbbf24' },
  { icon: '🛡️', title: 'Skin in the Game', desc: 'Our 90-day guarantee means we lose money when you underperform. That keeps every incentive aligned.', accent: '#34d399' },
  { icon: '🌱', title: 'Compounding Over Quick Wins', desc: "We optimize for the channel you'll have in three years, not the screenshot you could post next week.", accent: '#f43f5e' },
];

function ValueCard({ value, index }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, (index % 3) * 90);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card p-6 transition-all duration-300"
      style={{
        borderColor: hovered ? `${value.accent}55` : undefined,
        boxShadow: hovered ? `0 0 24px ${value.accent}22` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div
        className="h-10 w-10 rounded-lg flex items-center justify-center text-lg mb-4"
        style={{ background: `${value.accent}18`, border: `1px solid ${value.accent}40` }}
      >
        {value.icon}
      </div>
      <h3 className="font-display text-sm font-bold mb-2" style={{ color: value.accent }}>
        {value.title}
      </h3>
      <p className="text-ink-secondary text-sm leading-relaxed">{value.desc}</p>
    </div>
  );
}

export default function CoreValuesSection() {
  return (
    <section className="section-padding ">
      <div className="container-shell">
        <div className="text-center mb-12">
          <p className="kicker-amber justify-center inline-flex mb-2">💎 Core Values</p>
          <h2 className="text-gradient-hero mb-4">What Actually Guides Us</h2>
          <p className="text-ink-secondary text-sm max-w-xl mx-auto">
            Not laminated poster values — the six principles that shape every strategy call we run.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <ValueCard key={v.title} value={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}



