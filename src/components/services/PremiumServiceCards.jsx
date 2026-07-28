import { useRef, useState } from 'react';

const SERVICES = [
  {
    icon: '🎯',
    title: 'CPM Optimization',
    desc: 'We reverse-engineer the YouTube algorithm to maximize your cost-per-mille — targeting high-value ad categories and seasonal revenue spikes.',
    deliverables: ['Ad category targeting audit', 'Seasonal CPM calendar', 'Mid-roll placement optimization', 'Monthly RPM reporting'],
    accent: '#4da6ff',
  },
  {
    icon: '🤖',
    title: 'AI Content Strategy',
    desc: 'Proprietary AI tools analyze trending topics, competitor gaps, and audience psychology to generate content calendars that convert.',
    deliverables: ['Trend + gap analysis', 'AI-assisted content calendar', 'Competitor benchmarking', 'Retention curve modeling'],
    accent: '#a78bfa',
  },
  {
    icon: '📈',
    title: 'Monetization Systems',
    desc: 'Beyond AdSense — channel memberships, Super Thanks, brand deals, course funnels, and affiliate stacks built into every video.',
    deliverables: ['Multi-revenue stack build', 'Brand deal pipeline access', 'Membership tier design', 'Affiliate program setup'],
    accent: '#34d399',
  },
  {
    icon: '🎬',
    title: 'Thumbnail & Title Lab',
    desc: 'A/B tested thumbnail systems and psychological title frameworks that deliver 35%+ CTR uplift within 90 days.',
    deliverables: ['A/B thumbnail testing', 'Title framework library', 'CTR benchmarking', 'Design asset delivery'],
    accent: '#fbbf24',
  },
  {
    icon: '📊',
    title: 'Analytics & Reporting',
    desc: 'A live dashboard tracking CPM, RPM, retention, and revenue-per-viewer — the same data our strategists use internally.',
    deliverables: ['Live client dashboard', 'Weekly performance digest', 'Custom KPI tracking', 'Quarterly deep-dive review'],
    accent: '#00d4ff',
  },
  {
    icon: '🤝',
    title: 'Brand Partnership Desk',
    desc: 'Direct access to our vetted sponsor network, with outreach, rate negotiation, and contract review handled end-to-end.',
    deliverables: ['Sponsor matchmaking', 'Rate card negotiation', 'Contract review', 'Deliverable tracking'],
    accent: '#f43f5e',
  },
];

function ServiceCard({ service }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card p-7 transition-all duration-300"
      style={{
        borderColor: hovered ? `${service.accent}55` : undefined,
        boxShadow: hovered ? `0 0 26px ${service.accent}22` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div
        className="h-11 w-11 rounded-lg flex items-center justify-center text-xl mb-4"
        style={{ background: `${service.accent}18`, border: `1px solid ${service.accent}40` }}
      >
        {service.icon}
      </div>
      <h3 className="font-display text-base font-bold mb-2" style={{ color: service.accent }}>
        {service.title}
      </h3>
      <p className="text-ink-secondary text-sm leading-relaxed mb-4">{service.desc}</p>
      <ul className="space-y-1.5">
        {service.deliverables.map((d) => (
          <li key={d} className="flex items-center gap-2 text-xs text-ink-muted">
            <span className="h-1 w-1 rounded-full shrink-0" style={{ background: service.accent }} />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PremiumServiceCards() {
  return (
    <section className="section-padding border-t border-line" id="services-detail">
      <div className="container-shell">
        <div className="text-center mb-12">
          <p className="kicker-purple justify-center inline-flex mb-2">💠 Premium Services</p>
          <h2 className="text-gradient-hero mb-4">Six Systems, One Revenue Engine</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
