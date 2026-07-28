import { useState } from 'react';
import { ANCHORS } from '@/config/routes';

const PLANS = [
  {
    name: 'Starter', price: '$997', period: '/month', tagline: 'For channels ready to grow',
    features: ['CPM audit & optimization', 'Monthly content calendar (8 videos)', 'Thumbnail design (4/month)', 'Analytics dashboard access', 'Email support'],
    accent: '#4da6ff', popular: false,
  },
  {
    name: 'Growth', price: '$2,497', period: '/month', tagline: 'Our most popular plan',
    features: ['Everything in Starter', 'AI content strategy system', 'Brand deal outreach (2/month)', 'Thumbnail Lab (unlimited A/B)', 'Shorts strategy & optimization', 'Bi-weekly strategy calls'],
    accent: '#00d4ff', popular: true,
  },
  {
    name: 'Elite', price: '$5,997', period: '/month', tagline: 'For serious revenue machines',
    features: ['Everything in Growth', 'Dedicated channel manager', 'Brand deal pipeline (unlimited)', 'Full monetization system build', 'Course / membership setup', 'Weekly CEO-level strategy calls', '90-day revenue guarantee'],
    accent: '#a78bfa', popular: false,
  },
];

const COMPARISON_ROWS = [
  { label: 'CPM Optimization', starter: true, growth: true, elite: true },
  { label: 'Monthly Content Calendar', starter: true, growth: true, elite: true },
  { label: 'AI Content Strategy', starter: false, growth: true, elite: true },
  { label: 'Brand Deal Pipeline', starter: false, growth: '2/mo', elite: 'Unlimited' },
  { label: 'Thumbnail Lab (A/B testing)', starter: '4/mo', growth: 'Unlimited', elite: 'Unlimited' },
  { label: 'Dedicated Channel Manager', starter: false, growth: false, elite: true },
  { label: 'Strategy Calls', starter: 'Async', growth: 'Bi-weekly', elite: 'Weekly' },
  { label: '90-Day Revenue Guarantee', starter: false, growth: false, elite: true },
];

function Cell({ value }) {
  if (value === true) {
    return <span className="text-neon-green">✓</span>;
  }
  if (value === false) {
    return <span className="text-ink-muted">—</span>;
  }
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
          style={{ color: '#050a18', background: plan.accent, boxShadow: `0 0 16px ${plan.accent}80` }}
        >
          Most Popular
        </div>
      )}
      <p className="font-mono text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: plan.accent }}>
        {plan.name}
      </p>
      <div className="flex items-end gap-1 mb-1">
        <span className="font-display text-3xl font-black" style={{ color: plan.accent }}>{plan.price}</span>
        <span className="font-mono text-xs text-ink-muted mb-1">{plan.period}</span>
      </div>
      <p className="font-body text-xs text-ink-muted mb-5">{plan.tagline}</p>

      <ul className="flex flex-col gap-2.5 mb-7 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs text-ink-secondary">
            <svg className="h-3.5 w-3.5 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none" style={{ color: plan.accent }}>
              <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={ANCHORS.APPLY}
        className="block text-center font-body text-xs font-bold py-3 px-6 rounded-lg transition-all duration-200"
        style={{
          background: hovered || plan.popular ? plan.accent : 'transparent',
          color: hovered || plan.popular ? '#050a18' : plan.accent,
          border: `1px solid ${plan.accent}`,
          boxShadow: hovered ? `0 0 16px ${plan.accent}55` : 'none',
        }}
      >
        {plan.name === 'Elite' ? 'Apply for Elite' : 'Get Started'} →
      </a>
    </div>
  );
}

export default function PricingCards() {
  return (
    <section className="section-padding border-t border-line" id="pricing-cards">
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
                <th className="text-left py-3 px-3 font-mono text-[10px] uppercase tracking-widest text-ink-muted">Feature</th>
                <th className="py-3 px-3 font-mono text-[10px] uppercase tracking-widest text-neon-blue-light">Starter</th>
                <th className="py-3 px-3 font-mono text-[10px] uppercase tracking-widest text-neon-cyan">Growth</th>
                <th className="py-3 px-3 font-mono text-[10px] uppercase tracking-widest text-neon-purple-light">Elite</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label} className="border-b border-line-faint last:border-0">
                  <td className="py-3 px-3 text-xs text-ink-secondary">{row.label}</td>
                  <td className="py-3 px-3 text-center"><Cell value={row.starter} /></td>
                  <td className="py-3 px-3 text-center"><Cell value={row.growth} /></td>
                  <td className="py-3 px-3 text-center"><Cell value={row.elite} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
