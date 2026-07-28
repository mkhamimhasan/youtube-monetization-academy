import { useMemo, useState } from 'react';

const GROWTH_MULTIPLIER = 3.4; // avg client revenue multiplier per blueprint stats
const PLAN_FEE = { starter: 997, growth: 2497, elite: 5997 };

export default function ROICalculator() {
  const [revenue, setRevenue] = useState(3000);
  const [plan, setPlan] = useState('growth');

  const projected = useMemo(() => Math.round(revenue * GROWTH_MULTIPLIER), [revenue]);
  const monthlyGain = projected - revenue;
  const fee = PLAN_FEE[plan];
  const netGain = monthlyGain - fee;
  const roiMultiple = fee > 0 ? (monthlyGain / fee).toFixed(1) : '—';

  return (
    <section className="section-padding border-t border-line">
      <div className="container-shell">
        <div className="text-center mb-12">
          <p className="kicker-green justify-center inline-flex mb-2">🧮 ROI Calculator</p>
          <h2 className="text-gradient-hero mb-4">Estimate Your Growth</h2>
          <p className="text-ink-secondary text-sm max-w-lg mx-auto">
            Based on the average 3.4× revenue multiplier across our 240+ managed channels.
          </p>
        </div>

        <div className="max-w-2xl mx-auto glass-panel p-7 md:p-9">
          {/* Current revenue slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="revenue" className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                Current Monthly Revenue
              </label>
              <span className="font-display text-lg font-bold text-neon-blue-light">
                ${revenue.toLocaleString()}
              </span>
            </div>
            <input
              id="revenue"
              type="range"
              min={500}
              max={50000}
              step={500}
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full accent-[#4da6ff]"
            />
          </div>

          {/* Plan selector */}
          <div className="mb-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-3">Select Plan</p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(PLAN_FEE).map(([key, price]) => (
                <button
                  key={key}
                  onClick={() => setPlan(key)}
                  className="rounded-lg py-2.5 text-center transition-all duration-200 focus-neon"
                  style={{
                    border: `1px solid ${plan === key ? '#4da6ff' : 'rgba(255,255,255,0.08)'}`,
                    background: plan === key ? 'rgba(0,102,255,0.15)' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-primary capitalize">{key}</p>
                  <p className="font-mono text-[9px] text-ink-muted">${price.toLocaleString()}/mo</p>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-line">
            <div className="text-center">
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted mb-1">Projected Revenue</p>
              <p className="font-display text-2xl font-black text-neon-green">${projected.toLocaleString()}</p>
              <p className="text-[10px] text-ink-muted mt-0.5">per month</p>
            </div>
            <div className="text-center">
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted mb-1">Return on Fee</p>
              <p className="font-display text-2xl font-black text-neon-cyan">{roiMultiple}×</p>
              <p className="text-[10px] text-ink-muted mt-0.5">
                net gain ${netGain > 0 ? netGain.toLocaleString() : 0}/mo
              </p>
            </div>
          </div>

          <p className="text-[10px] text-ink-muted text-center mt-6">
            Estimate only, based on aggregate historical client performance — not a guarantee of future results.
          </p>
        </div>
      </div>
    </section>
  );
}
