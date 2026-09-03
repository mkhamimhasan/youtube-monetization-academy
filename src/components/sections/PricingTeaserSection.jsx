import { useState, useRef } from 'react';

const SERVICES = [
  { icon: '??', title: 'Website Creation', subtitle: 'Modern & Professional', desc: 'Stunning, fast and fully responsive websites with 3D animations and smooth effects.', features: ['Custom Design', '3D Animations', 'Mobile Responsive', 'SEO Optimized', 'Fast Loading'], accent: '#00d4ff', glow: 'rgba(0,212,255,0.2)', tag: 'Web Development' },
  { icon: '??', title: 'Video Creation', subtitle: 'Cinematic & Engaging', desc: 'AI-powered video editing, motion graphics and YouTube-ready content that keeps viewers hooked.', features: ['AI Video Editing', 'Motion Graphics', 'Thumbnail Design', 'YouTube Optimized', 'Voice Over'], accent: '#a78bfa', glow: 'rgba(167,139,250,0.2)', tag: 'Video Production' },
];

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const handleMouseMove = (e) => { const rect = cardRef.current.getBoundingClientRect(); setRotate({ x: (e.clientY - rect.top - rect.height / 2) / 15, y: -(e.clientX - rect.left - rect.width / 2) / 15 }); };
  return (
    <div ref={cardRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setRotate({ x: 0, y: 0 }); }} onMouseMove={handleMouseMove} className="relative flex flex-col rounded-3xl p-8 transition-all duration-300 cursor-pointer" style={{ background: 'linear-gradient(135deg, rgba(5,10,30,0.97) 0%, rgba(10,15,45,0.95) 100%)', border: `1px solid ${hovered ? service.accent : 'rgba(255,255,255,0.06)'}`, boxShadow: hovered ? `0 0 60px ${service.glow}, 0 30px 80px rgba(0,0,0,0.6)` : '0 8px 32px rgba(0,0,0,0.4)', transform: hovered ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.03) translateY(-8px)` : 'scale(1)', backdropFilter: 'blur(24px)' }}>
      <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ backgroundImage: `linear-gradient(${service.accent}12 1px, transparent 1px), linear-gradient(90deg, ${service.accent}12 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: hovered ? 0.4 : 0.15, transition: 'opacity 0.3s' }} />
      <div className="absolute top-0 left-12 right-12 h-px" style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`, opacity: hovered ? 1 : 0.2, transition: 'opacity 0.3s' }} />
      <div className="relative z-10 flex flex-col flex-1">
        <div className="inline-flex self-start items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full mb-6" style={{ background: `${service.accent}15`, color: service.accent, border: `1px solid ${service.accent}30` }}>{service.tag}</div>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-all duration-300" style={{ background: `linear-gradient(135deg, ${service.accent}20, ${service.accent}08)`, border: `1px solid ${service.accent}30`, boxShadow: hovered ? `0 0 30px ${service.accent}30` : 'none', transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)' }}>{service.icon}</div>
        <h3 className="text-2xl font-black text-white mb-1 tracking-tight">{service.title}</h3>
        <p className="font-mono text-xs mb-4" style={{ color: service.accent }}>{service.subtitle}</p>
        <p className="text-white/50 text-sm leading-relaxed mb-6">{service.desc}</p>
        <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${service.accent}40, transparent)` }} />
        <ul className="flex flex-col gap-2.5 mb-8 flex-1">{service.features.map((f) => (<li key={f} className="flex items-center gap-3 text-sm text-white/65"><span className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shrink-0" style={{ background: `${service.accent}20`, color: service.accent }}>?</span>{f}</li>))}</ul>
        <button className="w-full font-mono text-xs font-bold py-4 px-6 rounded-xl transition-all duration-300" style={{ background: hovered ? `linear-gradient(135deg, ${service.accent}, ${service.accent}bb)` : `${service.accent}10`, color: hovered ? '#020817' : service.accent, border: `1px solid ${service.accent}50`, boxShadow: hovered ? `0 0 30px ${service.accent}50` : 'none' }}>Learn More ?</button>
      </div>
    </div>
  );
}

export default function PricingTeaserSection() {
  return (
    <section className="section-padding  relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(0,212,255,0.04)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(167,139,250,0.04)' }} />
      </div>
      <div className="container-shell relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-cyan-400 border border-cyan-400/20 rounded-full px-4 py-2 mb-6" style={{ background: 'rgba(0,212,255,0.05)' }}>My Services</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">What I <span style={{ background: 'linear-gradient(135deg, #00d4ff, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Create</span></h2>
          <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">Turning your vision into reality with modern technology.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SERVICES.map((service) => (<ServiceCard key={service.title} service={service} />))}
        </div>
      </div>
    </section>
  );
}





