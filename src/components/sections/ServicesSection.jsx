import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const SERVICES = [
  {
    icon: '🌐',
    title: 'Website Design & Development',
    desc: 'Custom-built websites — from simple landing pages to full business sites — designed to load fast, look sharp, and work on every device.',
    tags: ['Responsive', 'React / Next.js', 'SEO Ready'],
    accent: '#4da6ff',
    border: 'rgba(0,102,255,0.3)',
    bg: 'rgba(0,102,255,0.05)',
  },
  {
    icon: '🎬',
    title: 'Video Editing',
    desc: 'Clean, engaging edits for YouTube, social media, ads, and brand content — pacing, sound design, and captions handled end-to-end.',
    tags: ['YouTube', 'Reels/Shorts', 'Ads'],
    accent: '#a78bfa',
    border: 'rgba(124,58,237,0.3)',
    bg: 'rgba(124,58,237,0.05)',
  },
  {
    icon: '🎨',
    title: 'Motion Graphics & Color Grading',
    desc: 'Polished intros, lower-thirds, transitions, and cinematic color grading that give every project a professional, consistent look.',
    tags: ['Motion Design', 'Color Grade', 'Branding'],
    accent: '#34d399',
    border: 'rgba(52,211,153,0.3)',
    bg: 'rgba(52,211,153,0.04)',
  },
  {
    icon: '🛒',
    title: 'Landing Pages & E-commerce',
    desc: 'Conversion-focused landing pages and online stores built to turn visitors into customers, with clean checkout and fast performance.',
    tags: ['Conversion', 'E-commerce', 'UI/UX'],
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
            Websites & Videos, Done Right
          </h2>
          <p className="text-ink-secondary max-w-xl mx-auto text-sm leading-relaxed">
            From custom-built websites to polished video edits — everything your brand needs to look professional online, handled under one roof.
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