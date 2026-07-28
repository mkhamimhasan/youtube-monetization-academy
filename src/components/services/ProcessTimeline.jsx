import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: '01', title: 'Free Audit Call', desc: '45-minute deep dive into your current CPM, revenue gaps, and competitor landscape.', color: '#4da6ff' },
  { num: '02', title: 'Strategy Roadmap', desc: 'A custom 90-day plan covering CPM targets, content calendar, and monetization stack.', color: '#00d4ff' },
  { num: '03', title: 'System Install', desc: 'We implement tracking, thumbnail testing, and monetization systems on your channel.', color: '#a78bfa' },
  { num: '04', title: 'Optimize & Scale', desc: 'Monthly cycles refine what\'s working; brand deal pipeline opens once metrics qualify.', color: '#fbbf24' },
  { num: '05', title: 'Compound Growth', desc: 'Quarterly reviews benchmark you against 240+ channels to keep unlocking new revenue.', color: '#34d399' },
];

export default function ProcessTimeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        }
      );

      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding border-t border-line relative">
      <div className="container-shell">
        <div className="text-center mb-16">
          <p className="kicker-amber justify-center inline-flex mb-2">🗺️ Our Process</p>
          <h2 className="text-gradient-hero mb-4">From Audit to Compounding Growth</h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-line" />
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, #0066ff, #7c3aed)', scaleY: 0 }}
          />

          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => (stepRefs.current[i] = el)}
                className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                  <div className="glass-panel p-5 inline-block text-left max-w-sm">
                    <span
                      className="font-mono text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: step.color }}
                    >
                      Step {step.num}
                    </span>
                    <h3 className="font-display text-sm font-bold text-ink-primary mt-1 mb-2">{step.title}</h3>
                    <p className="text-ink-secondary text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Node */}
                <div
                  className="hidden md:flex h-4 w-4 rounded-full shrink-0 z-10"
                  style={{ background: step.color, boxShadow: `0 0 14px ${step.color}` }}
                />

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
