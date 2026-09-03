import { useState } from 'react';
import { ANCHORS } from '@/config/routes';

const PLANS = [
  {
    name: 'Starter',
    price: 'Custom',
    period: 'quote',
    tagline: 'For landing pages & short-form edits',
    features: [
      'Single-page website (React / Next.js)',
      'Mobile-responsive & SEO-ready',
      'Up to 3 revision rounds',
      'Short-form video edit (up to 5 min)',
      'Captions & basic motion graphics',
      'Email support',
    ],
    accent: '#4da6ff',
    popular: false,
  },
  {
    name: 'Growth',
    price: 'Custom',
    period: 'quote',
    tagline: 'For full sites & content series',
    features: [
      'Multi-page website (up to 8 pages)',
      'Custom UI design — zero templates',
      'CMS integration (if needed)',
      'Up to 5 revision rounds',
      'Video editing for YouTube / Reels / Ads',
      'Sound design & colour grading',
      'Bi-weekly check-in calls',
    ],
    accent: '#00d4ff',
    popular: true,
  },
  {
    name: 'Studio',
    price: 'Custom',
    period: 'quote',
    tagline: 'For brands that need everything',
    features: [
      'Everything in Growth',
      'Full brand identity system',
      'E-commerce or booking integration',
      'Unlimited revision rounds',
      'Ongoing video editing retainer',
      'Priority turnaround (48h response)',
      'Direct 1-on-1 communication',
    ],
    accent: '#a78bfa',
    popular: false,
  },
];

const COMPARISON_ROWS = [
  { label: 'Custom-coded (no templates)', starter: true, growth: true, studio: true },
  { label: 'Mobile-responsive', starter: true, growth: true, studio: true },
  { label: 'SEO setup', starter: true, growth: true, studio: true },
  { label: 'Pages included', starter: '1', growth: 'Up to 8', studio: 'Unlimited' },
  { label: 'Revision rounds', starter: '3', growth: '5', studio: 'Unlimited' },
  { label: 'Video editing', starter: 'Basic', growth: 'Full', studio: 'Full + retainer' },
  { label: 'Brand identity', starter: false, growth: false, studio: true },
  { label: 'E-commerce / booking', starter: false, growth: true, studio: true },
  { label: 'Response time', starter: 'Standard', growth: 'Standard', studio: '48h priority' },
];

function Cell({ value }) {
  if (value === true) return <span className="text-neon-green">✓</span>;
  if (value === false) return <span className="text-ink-muted">—</span>;
  return <span className="text-ink-secondary text-xs">{value}</span>;
}

function PlanCard({ plan }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-card p-7 flex flex-col transition-all duration-300"
      style={{
        background: hovered ? `${plan.accent}0d` : 'rgba(5,10,24,0.7)',
        border: `1px solid ${hovered || plan.popular ? plan.accent : `${plan.accent}55`}`,
        boxShadow: hovered ? `0 0 32px ${plan.accent}28` : 'none',
        transform: plan.popular ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      {plan.popular && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
          style={{
            color: '#050a18',
            background: plan.accent,
            boxShadow: `0 0 16px ${plan.accent}80`,
          }}
        >
          Most Popular
        </div>
      )}

      <p
        className="font-mono text-[10px] uppercase tracking-widest font-bold mb-1"
        style={{ color: plan.accent }}
      >
        {plan.name}
      </p>
      <div className="flex items-end gap-1 mb-1">
        <span className="font-display text-3xl font-black" style={{ color: plan.accent }}>
          {plan.price}
        </span>
        <span className="font-mono text-xs text-ink-muted mb-1">{plan.period}</span>
      </div>
      <p className="font-body text-xs text-ink-muted mb-5">{plan.tagline}</p>

      <ul className="flex flex-col gap-2.5 mb-7 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-ink-secondary">
            <svg
              className="h-3.5 w-3.5 mt-0.5 shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              style={{ color: plan.accent }}
            >
              <path
                d="M3 8l3.5 3.5L13 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      
        <a href={ANCHORS.APPLY}
        className="block text-center font-body text-xs font-bold py-3 px-6 rounded-lg transition-all duration-200"
        style={{
          background: hovered || plan.popular ? plan.accent : 'transparent',
          color: hovered || plan.popular ? '#050a18' : plan.accent,
          border: `1px solid ${plan.accent}`,
          boxShadow: hovered ? `0 0 16px ${plan.accent}55` : 'none',
        }}
      >
        Get a Quote →
      </a>
    </div>
  );
}

export default function PricingCards() {
  return (
    <section className="section-padding " id="pricing-cards">
      <div className="container-shell">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-16">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        {/* Comparison table */}
        <div className="glass-panel p-4 md:p-6 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left py-3 px-3 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  Feature
                </th>
                <th className="py-3 px-3 font-mono text-[10px] uppercase tracking-widest text-neon-blue-light">
                  Starter
                </th>
                <th className="py-3 px-3 font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
                  Growth
                </th>
                <th className="py-3 px-3 font-mono text-[10px] uppercase tracking-widest text-neon-purple-light">
                  Studio
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label} className="border-b border-line-faint last:border-0">
                  <td className="py-3 px-3 text-xs text-ink-secondary">{row.label}</td>
                  <td className="py-3 px-3 text-center">
                    <Cell value={row.starter} />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <Cell value={row.growth} />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <Cell value={row.studio} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}


