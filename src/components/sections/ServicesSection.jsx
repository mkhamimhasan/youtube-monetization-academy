import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const SERVICES = [
  {
    icon: '🎯',
    title: 'CPM Optimization',
    desc: 'We reverse-engineer the YouTube algorithm to maximize your cost-per-mille — targeting high-value ad categories and seasonal revenue spikes.',
    tags: ['Ad Revenue', 'Algorithm', 'Analytics'],
    accent: '#4da6ff',
    border: 'rgba(0,102,255,0.3)',
    bg: 'rgba(0,102,255,0.05)',
  },
  {
    icon: '🤖',
    title: 'AI Content Strategy',
    desc: 'Proprietary AI tools analyze trending topics, competitor gaps, and audience psychology to generate content calendars that convert.',
    tags: ['AI Tools', 'Content Plan', 'SEO'],
    accent: '#a78bfa',
    border: 'rgba(124,58,237,0.3)',
    bg: 'rgba(124,58,237,0.05)',
  },
  {
    icon: '📈',
    title: 'Monetization Systems',
    desc: 'Beyond AdSense — channel memberships, Super Thanks, brand deals, course funnels, and affiliate stacks built into every video.',
    tags: ['Multi-Revenue', 'Brand Deals', 'Memberships'],
    accent: '#34d399',
    border: 'rgba(52,211,153,0.3)',
    bg: 'rgba(52,211,153,0.04)',
  },
  {
    icon: '🎬',
    title: 'Thumbnail & Title Lab',
    desc: 'A/B tested thumbnail systems and psychological title frameworks that deliver 35%+ CTR uplift within 90 days.',
    tags: ['CTR', 'A/B Testing', 'Design'],
    accent: '#fbbf24',
    border: 'rgba(251,191,36,0.3)',
    bg: 'rgba(251,191,36,0.04)',
  },
];

function TiltCard({ service, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };
  const onLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="relative rounded-card overflow-hidden transition-all duration-75"
      style={{
        border: `1px solid ${service.border}`,
        background: service.bg,
        transform: `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${hovered ? 1.02 : 1})`,
        boxShadow: hovered ? `0 0 28px ${service.accent}30` : 'none',
        animation: `fade-up 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="p-6">
        <div className="text-4xl mb-4">{service.icon}</div>
        <h3
          className="font-display text-base font-bold mb-3"
          style={{ color: service.accent }}
        >
          {service.title}
        </h3>
        <p className="text-ink-secondary text-sm leading-relaxed mb-4">
          {service.desc}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{
                color: service.accent,
                background: `${service.accent}15`,
                border: `1px solid ${service.accent}30`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Shimmer line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="section-padding" id="services">
      <div className="container-shell">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="kicker justify-center inline-flex mb-2">⚙️ What We Do</p>
          <h2 className="text-gradient-hero mb-4">
            Full-Stack YouTube Growth
          </h2>
          <p className="text-ink-secondary max-w-xl mx-auto text-sm leading-relaxed">
            Every lever that drives YouTube revenue — pulled together into one integrated system, managed by specialists who live inside the algorithm.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {SERVICES.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* CTA link */}
        <div className="text-center">
          <Link
            to={ROUTES.SERVICES}
            className="btn-ghost text-sm px-8 py-3"
          >
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
