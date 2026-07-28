import { useEffect, useRef, useState } from 'react';
import img1 from '../../assets/images/hamim.png';
import img2 from '../../assets/images/mahadi.jpg';

const STATS = [
  { value: 240, suffix: '+', label: 'Channels Managed', color: '#4da6ff' },
  { value: 312, suffix: '%', label: 'Avg Revenue Growth', color: '#00d4ff' },
  { value: 4.8, suffix: '×', label: 'CPM Multiplier', color: '#a78bfa' },
  { value: 98, suffix: '%', label: 'Client Retention', color: '#34d399' },
  { value: 12, suffix: 'M+', label: 'Views Generated', color: '#fbbf24' },
];

const LOGOS = [
  'MrBeast Labs',
  'TechCreator Co.',
  'Studio Nova',
  'Apex Media',
  'Creator HQ',
  'Neon Studios',
  'Viral Works',
  'Growth Guild',
  'Pixel Agency',
  'Stream Kings',
  'Revenue Rush',
  'View Masters',
];

function useCounter(target, decimals = 0, duration = 2000) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          const step = (ts) => {
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setCount(+(target * eased).toFixed(decimals));

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [target, decimals, duration]);

  return { count, ref };
}

function Stat({ value, suffix, label, color }) {
  const isDecimal = !Number.isInteger(value);
  const { count, ref } = useCounter(value, isDecimal ? 1 : 0);

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-4">
      <span
        className="font-display text-3xl md:text-4xl font-black mb-1"
        style={{
          color,
          textShadow: `0 0 20px ${color}55`,
        }}
      >
        {label === 'Channels Managed' ? (
          <img
            src={img1}
            alt="Hamim"
            className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-blue-500"
          />
        ) : label === 'Views Generated' ? (
          <img
            src={img2}
            alt="Mahadi"
            className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-yellow-400"
          />
        ) : (
          <>
            {count}
            {suffix}
          </>
        )}
      </span>

      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        {label}
      </span>
    </div>
  );
}

export default function TrustBarSection() {
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section className="relative border-y border-line py-12 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,102,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-shell relative z-10">
        <div className="flex flex-wrap justify-center gap-8 md:gap-0 md:justify-between mb-10">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>

      <div className="neon-divider mx-6 mb-8" />

      <div className="relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 z-10 w-16 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #050a18, transparent)',
          }}
        />

        <div
          className="absolute right-0 top-0 bottom-0 z-10 w-16 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, #050a18, transparent)',
          }}
        />

        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {doubled.map((name, i) => (
            <div key={i} className="flex items-center gap-2 mx-8 shrink-0">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background:
                    i % 5 === 0
                      ? '#0066ff'
                      : i % 5 === 1
                      ? '#00d4ff'
                      : i % 5 === 2
                      ? '#7c3aed'
                      : i % 5 === 3
                      ? '#34d399'
                      : '#fbbf24',
                }}
              />

              <span className="font-mono text-xs text-ink-muted whitespace-nowrap tracking-wide">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}