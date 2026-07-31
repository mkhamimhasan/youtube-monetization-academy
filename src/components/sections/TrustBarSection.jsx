import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 240, suffix: '+', label: 'Channels Managed', color: '#4da6ff' },
  { value: 312, suffix: '%', label: 'Avg Revenue Growth', color: '#00d4ff' },
  { value: 4.8, suffix: 'x', label: 'CPM Multiplier', color: '#a78bfa' },
  { value: 98, suffix: '%', label: 'Client Retention', color: '#34d399' },
  { value: 12, suffix: 'M+', label: 'Views Generated', color: '#fbbf24' },
];

const LOGOS = [
  'MrBeast Labs','TechCreator Co.','Studio Nova','Apex Media','Creator HQ',
  'Neon Studios','Viral Works','Growth Guild','Pixel Agency','Stream Kings','Revenue Rush','View Masters',
];

function useCounter(target, decimals = 0, duration = 2000) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (ts) => {
          const progress = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(+(target * eased).toFixed(decimals));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals, duration]);
  return { count, ref };
}

function GlowOrb({ color }) {
  return (
    <div className="relative w-16 h-16 mx-auto" style={{ filter: `drop-shadow(0 0 14px ${color}99)` }}>
      <div className="absolute inset-0 rounded-full animate-spin-slow" style={{ border: `1.5px solid ${color}55`, borderTopColor: color }} />
      <div className="absolute inset-1 rounded-full animate-ping-slow" style={{ background: `${color}22` }} />
      <div className="absolute inset-2 rounded-full" style={{ background: `radial-gradient(circle at 32% 28%, #ffffff 0%, ${color} 35%, #050a18 100%)`, boxShadow: `inset -4px -6px 10px rgba(0,0,0,0.55), inset 3px 3px 6px rgba(255,255,255,0.35), 0 0 18px ${color}aa` }} />
    </div>
  );
}

function Stat({ value, suffix, label, color }) {
  const isDecimal = !Number.isInteger(value);
  const { count, ref } = useCounter(value, isDecimal ? 1 : 0);
  const useOrb = label === 'Channels Managed' || label === 'Views Generated';
  return (
    <div ref={ref} className="flex flex-col items-center text-center px-4">
      {useOrb && <div className="mb-2"><GlowOrb color={color} /></div>}
      <span className="font-display text-3xl md:text-4xl font-black mb-1" style={{ color, textShadow: `0 0 20px ${color}55` }}>{count}{suffix}</span>
      <span className="text-xs md:text-sm text-white/60 font-mono tracking-wide">{label}</span>
    </div>
  );
}

const COLORS = ['#4da6ff','#00d4ff','#a78bfa','#34d399','#fbbf24','#f87171'];

export default function TrustBarSection() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="relative border-y border-line py-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,102,255,0.04) 0%, transparent 70%)' }} />
      <div className="container-shell relative z-10">
        <div className="flex flex-wrap justify-center gap-8 md:gap-0 md:justify-between mb-10">
          {STATS.map((s) => (<Stat key={s.label} {...s} />))}
        </div>
      </div>
      <div className="neon-divider mx-6 mb-8" />
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 z-10 w-24 pointer-events-none" style={{ background: 'linear-gradient(to right, #050a18, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 z-10 w-24 pointer-events-none" style={{ background: 'linear-gradient(to left, #050a18, transparent)' }} />
        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {doubled.map((name, i) => (
            <div key={i} className="flex items-center gap-2.5 mx-8 shrink-0">
              <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length], boxShadow: `0 0 6px ${COLORS[i % COLORS.length]}` }} />
              <span className="font-mono text-sm font-semibold whitespace-nowrap tracking-wide" style={{ color: COLORS[i % COLORS.length] }}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
