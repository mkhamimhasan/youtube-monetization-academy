import { useMemo, useState } from 'react';

const SERVICE_BASE = {
  website: { label: 'Website', min: 300, max: 3000 },
  video: { label: 'Video Editing', min: 80, max: 800 },
  both: { label: 'Website + Video', min: 350, max: 3500 },
};

const COMPLEXITY = {
  simple: { label: 'Simple', multiplier: 1 },
  standard: { label: 'Standard', multiplier: 1.8 },
  complex: { label: 'Complex', multiplier: 3 },
};

export default function ProjectEstimator() {
  const [service, setService] = useState('website');
  const [complexity, setComplexity] = useState('standard');

  const { low, high } = useMemo(() => {
    const base = SERVICE_BASE[service];
    const mult = COMPLEXITY[complexity].multiplier;
    return {
      low: Math.round(base.min * mult),
      high: Math.round(base.max * mult),
    };
  }, [service, complexity]);

  return (
    <section className="section-padding ">
      <div className="container-shell">
        <div className="text-center mb-12">
          <p className="kicker-green justify-center inline-flex mb-2">🧮 Project Estimator</p>
          <h2 className="text-gradient-hero mb-4">Get a Ballpark</h2>
          <p className="text-ink-secondary text-sm max-w-lg mx-auto">
            Select your service and complexity to see a ro
            ugh price range. Exact quotes are
            always scoped after a free discovery call.
          </p>
        </div>

        <div className="max-w-2xl mx-auto glass-panel p-7 md:p-9">
          <div className="mb-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-3">
              Service
            </p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(SERVICE_BASE).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setService(key)}
                  className="rounded-lg py-2.5 text-center transition-all duration-200"
                  style={{
                    border: `1px solid ${service === key ? '#4da6ff' : 'rgba(255,255,255,0.08)'}`,
                    background:
                      service === key ? 'rgba(0,102,255,0.15)' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-primary">
                    {label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-3">
              Complexity
            </p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(COMPLEXITY).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setComplexity(key)}
                  className="rounded-lg py-2.5 text-center transition-all duration-200"
                  style={{
                    border: `1px solid ${complexity === key ? '#00d4ff' : 'rgba(255,255,255,0.08)'}`,
                    background:
                      complexity === key ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-primary">
                    {label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6  text-center">
            <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted mb-2">
              Estimated Range
            </p>
            <p className="font-display text-4xl font-black text-neon-blue-light">
              ${low.toLocaleString()} – ${high.toLocaleString()}
            </p>
            <p className="text-[10px] text-ink-muted mt-2">
              Rough estimate only — final price is always confirmed before any work begins.
            </p>
          </div>

          
           <a href="#contact"
            className="mt-6 block text-center font-body text-xs font-bold py-3 px-6 rounded-lg transition-all duration-200"
            style={{
              background: '#4da6ff',
              color: '#050a18',
              border: '1px solid #4da6ff',
            }}
          >
            Book a Free Discovery Call →
          </a>
        </div>
      </div>
    </section>
  );
}


