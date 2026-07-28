import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const PLANS = [
  {
    name: 'Starter',
    price: '$997',
    period: '/month',
    tagline: 'For channels ready to grow',
    features: [
      'CPM audit & optimization',
      'Monthly content calendar (8 videos)',
      'Thumbnail design (4/month)',
      'Analytics dashboard access',
      'Email support',
    ],
    cta: 'Get Started',
    accent: '#4da6ff',
    border: 'rgba(0,102,255,0.3)',
    bg: 'rgba(0,102,255,0.05)',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$2,497',
    period: '/month',
    tagline: 'Our most popular plan',
    features: [
      'Everything in Starter',
      'AI content strategy system',
      'Brand deal outreach (2/month)',
      'Thumbnail Lab (unlimited A/B)',
      'Shorts strategy & optimization',
      'Bi-weekly strategy calls',
    ],
    cta: 'Start Growing',
    accent: '#00d4ff',
    border: 'rgba(0,212,255,0.4)',
    bg: 'rgba(0,212,255,0.06)',
    popular: true,
  },
  {
    name: 'Elite',
    price: '$5,997',
    period: '/month',
    tagline: 'For serious revenue machines',
    features: [
      'Everything in Growth',
      'Dedicated channel manager',
      'Brand deal pipeline (unlimited)',
      'Full monetization system build',
      'Course / membership setup',
      'Weekly CEO-level strategy calls',
      '90-day revenue guarantee',
    ],
    cta: 'Apply for Elite',
    accent: '#a78bfa',
    border: 'rgba(124,58,237,0.35)',
    bg: 'rgba(124,58,237,0.05)',
    popular: false,
  },
];

function PlanCard({ plan }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-card p-6 flex flex-col transition-all duration-300"
      style={{
        background: hovered ? plan.bg : 'rgba(5,10,24,0.7)',
        border: `1px solid ${hovered ? plan.accent : plan.border}`,
        boxShadow: hovered ? `0 0 32px ${plan.accent}28` : 'none',
        transform: hovered ? (plan.popular ? 'scale(1.04)' : 'scale(1.02)') : plan.popular ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Popular badge */}
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

      {/* Top accent line */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${plan.accent}, transparent)`,
          opacity: plan.popular || hovered ? 1 : 0.4,
        }}
      />

      {/* Plan name */}
      <p
        className="font-mono text-[10px] uppercase tracking-widest font-bold mb-1"
        style={{ color: plan.accent }}
      >
        {plan.name}
      </p>

      {/* Price */}
      <div className="flex items-end gap-1 mb-1">
        <span
          className="font-display text-3xl font-black"
          style={{ color: plan.accent }}
        >
          {plan.price}
        </span>
        <span className="font-mono text-xs text-ink-muted mb-1">{plan.period}</span>
      </div>
      <p className="font-body text-xs text-ink-muted mb-5">{plan.tagline}</p>

      {/* Features */}
      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
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

      {/* CTA */}
      <Link
        to={ROUTES.PRICING}
        className="block text-center font-body text-xs font-bold py-3 px-6 rounded-lg transition-all duration-200"
        style={{
          background: hovered || plan.popular
            ? plan.accent
            : 'transparent',
          color: hovered || plan.popular ? '#050a18' : plan.accent,
          border: `1px solid ${plan.accent}`,
          boxShadow: hovered ? `0 0 16px ${plan.accent}55` : 'none',
        }}
      >
        {plan.cta} →
      </Link>
    </div>
  );
}

export default function PricingTeaserSection() {
  return (
    <section className="section-padding border-t border-line">
      <div className="container-shell">
        <div className="text-center mb-12">
          <p className="kicker mb-2">💰 Pricing</p>
          <h2 className="text-gradient-hero mb-4">Simple, Transparent Packages</h2>
          <p className="text-ink-secondary text-sm max-w-lg mx-auto">
            No hidden fees. No long-term lock-in. Cancel anytime — because we're confident our results will make you want to stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to={ROUTES.PRICING} className="btn-ghost text-sm px-8 py-3">
            Compare All Plans & Features →
          </Link>
        </div>
      </div>
    </section>
  );
}
