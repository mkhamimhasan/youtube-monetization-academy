import { useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const MILESTONES = [
  { year: '2019', event: 'Started optimizing a single 40K-subscriber finance channel as a side project.' },
  { year: '2021', event: 'Crossed 50 managed channels after word-of-mouth referrals from early clients.' },
  { year: '2023', event: 'Built the proprietary CPM intelligence dashboard now used across every client account.' },
  { year: '2026', event: '240+ channels, 28 niches, 14 languages — and a 90-day revenue guarantee we still stand behind.' },
];

export default function FounderStory() {
  const textRef = useReveal();

  return (
    <section className="section-padding border-t border-line">
      <div className="container-shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left — narrative */}
          <div ref={textRef}>
            <p className="kicker-purple mb-3">✦ Founder Story</p>
            <h2 className="mb-5">
              <span className="text-ink-primary">From One Channel</span>
              <br />
              <span className="text-gradient-hero">To a Revenue System</span>
            </h2>
            <div className="space-y-4 text-ink-secondary text-sm leading-relaxed max-w-lg">
              <p>
                YTA.Agency didn't start as an agency. It started as a spreadsheet — a founder tracking CPM
                fluctuations for a friend's finance channel, trying to figure out why nearly identical videos
                earned wildly different ad revenue.
              </p>
              <p>
                The answer wasn't views. It was a dozen small, compounding decisions: ad category targeting,
                upload timing, retention curve shape, sponsorship positioning. None of it was visible in the
                standard YouTube Studio dashboard.
              </p>
              <p>
                So we built our own. What began as an internal tool for one client is now the intelligence
                layer behind every channel we manage — and the reason our clients grow revenue faster than
                their subscriber count.
              </p>
            </div>
          </div>

          {/* Right — milestone timeline */}
          <div className="glass-panel p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-neon-blue-light mb-6">
              Milestones
            </p>
            <div className="flex flex-col gap-6">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className="font-display text-xs font-black px-2.5 py-1 rounded-md"
                      style={{
                        color: '#4da6ff',
                        background: 'rgba(0,102,255,0.12)',
                        border: '1px solid rgba(0,102,255,0.25)',
                      }}
                    >
                      {m.year}
                    </span>
                    {i < MILESTONES.length - 1 && (
                      <span className="flex-1 w-px bg-line mt-2" />
                    )}
                  </div>
                  <p className="text-ink-secondary text-sm leading-relaxed pb-2">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
