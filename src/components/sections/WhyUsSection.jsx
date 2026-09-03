import { useEffect, useRef } from 'react';

const USPS = [
  {
    icon: '🎯',
    title: 'Custom-Built, Never Templated',
    desc: "Every website and video is built from scratch around your brand — no drag-and-drop templates, no cookie-cutter designs.",
    stat: '100% Custom',
  },
  {
    icon: '💬',
    title: 'You Talk Directly to Me',
    desc: 'No account managers, no outsourced teams. You work directly with the person building your project, start to finish.',
    stat: 'Direct Access',
  },
  {
    icon: '⚡',
    title: 'Fast, Transparent Turnaround',
    desc: "Clear timelines set before we start, with regular check-ins so you always know exactly where your project stands.",
    stat: 'Clear Timelines',
  },
  {
    icon: '🔁',
    title: 'Revisions Until You\'re Happy',
    desc: "We refine the design or edit together — your feedback shapes the final result, not just a one-and-done delivery.",
    stat: 'Unlimited Revisions',
  },
  {
    icon: '🌱',
    title: 'Growing With Every Project',
    desc: "As a new studio, every client gets full attention and effort — your project isn't just another number on a client list.",
    stat: 'Full Attention',
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
    <section id="why-us" className="section-padding">
      <div className="container-shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div>
            <p className="kicker-purple mb-3">✦ Why Choose Us</p>
            <h2 className="mb-4">
              <span className="text-gradient-hero">Built Around You,</span>
              <br />
              <span className="text-ink-primary">Not a Template</span>
            </h2>
            <p className="text-ink-secondary text-sm leading-relaxed max-w-md mb-8">
              Most agencies push you through a factory line. We take the time to understand your brand and build something that actually fits — websites and videos that feel custom because they are.
            </p>

            <a
              href="/#apply"
              className="btn-primary inline-flex text-sm px-7 py-3.5"
            >
              Get a Free Quote →
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







