import { useEffect, useRef } from 'react';

const USPS = [
  {
    icon: '🧠',
    title: 'Algorithm-Native Strategy',
    desc: "We don't guess — we reverse-engineer YouTube's recommendation engine using first-party data and 240+ channel experiments to find what actually moves revenue.",
    stat: '3.2× faster growth',
  },
  {
    icon: '📡',
    title: 'Real-Time Revenue Intelligence',
    desc: 'Proprietary dashboard tracks CPM fluctuations, ad category bids, and seasonal demand curves — so we capitalize on revenue windows before your competitors notice them.',
    stat: '+$2.4 RPM average',
  },
  {
    icon: '🤝',
    title: 'Brand Deal Pipeline Included',
    desc: "Every package includes access to our brand partner network — we don't just optimize AdSense, we open direct sponsorship revenue streams averaging 4–8× AdSense rates.",
    stat: '$15K avg first deal',
  },
  {
    icon: '⚡',
    title: '90-Day Revenue Guarantee',
    desc: "If your revenue hasn't grown by at least 40% in 90 days, you don't pay for month 4. We put our fee on the line because our system consistently delivers.",
    stat: '98% hit target',
  },
  {
    icon: '🌐',
    title: 'Global Creator Roster',
    desc: 'Managing 240+ channels across 28 niches and 14 languages. Our cross-channel insights surface winning formats weeks before they trend in your niche.',
    stat: '28 niches mastered',
  },
];

function USPItem({ usp, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.style.opacity = '0';
    el.style.transform = 'translateX(-30px)';
    el.style.transition = 'none';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
          }, index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="flex gap-4 items-start group">
      {/* Neon checkmark / icon */}
      <div
        className="flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center text-xl"
        style={{
          background: 'rgba(0,102,255,0.1)',
          border: '1px solid rgba(0,102,255,0.25)',
          boxShadow: '0 0 12px rgba(0,102,255,0.15)',
        }}
      >
        {usp.icon}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-display text-sm font-bold text-ink-primary">
            {usp.title}
          </h3>
          <span
            className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0"
            style={{
              color: '#34d399',
              background: 'rgba(52,211,153,0.1)',
              border: '1px solid rgba(52,211,153,0.2)',
            }}
          >
            {usp.stat}
          </span>
        </div>
        <p className="text-ink-secondary text-sm leading-relaxed">{usp.desc}</p>
      </div>
    </div>
  );
}

export default function WhyUsSection() {
  return (
    <section id="why-us" className="section-padding border-t border-line">
      <div className="container-shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div>
            <p className="kicker-purple mb-3">✦ Why Choose Us</p>
            <h2 className="mb-4">
              <span className="text-gradient-hero">The Only Agency</span>
              <br />
              <span className="text-ink-primary">Built for Scale</span>
            </h2>
            <p className="text-ink-secondary text-sm leading-relaxed max-w-md mb-8">
              Most agencies optimize for views. We optimize for revenue per viewer — a fundamentally different discipline that changes every decision from thumbnail to end screen.
            </p>

            <a
              href="/#apply"
              className="btn-primary inline-flex text-sm px-7 py-3.5"
            >
              Apply for Free Audit →
            </a>
          </div>

          {/* Right — USP list */}
          <div className="flex flex-col gap-6">
            {USPS.map((usp, i) => (
              <USPItem key={usp.title} usp={usp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
