const VALUE_PROPS = [
  {
    id: 'legal',
    title: 'Legal Protection & IP Buyout',
    desc: 'Full intellectual property and commercial transfer upon sign-off. Every codebase, asset, and master belongs completely to you.',
    color: '#06b6d4', // Cyan
    border: 'rgba(6, 182, 212, 0.4)',
    glow: 'rgba(6, 182, 212, 0.18)',
    icon: (
      <svg className="w-5 h-5 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'security',
    title: 'Strict Security & NDA Protocol',
    desc: 'Enterprise-grade discretion on unreleased speculative tech, creative concepts, and confidential product architectures.',
    color: '#f59e0b', // Amber / Gold
    border: 'rgba(245, 158, 11, 0.4)',
    glow: 'rgba(245, 158, 11, 0.18)',
    icon: (
      <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: 'control',
    title: 'Direct Architectural Control',
    desc: 'Zero agency layers or junior handoffs. Single-point direct collaboration with the creative technologist from day one.',
    color: '#10b981', // Emerald Green
    border: 'rgba(16, 185, 129, 0.4)',
    glow: 'rgba(16, 185, 129, 0.18)',
    icon: (
      <svg className="w-5 h-5 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: 'engineering',
    title: 'Zero-Bloat Engineering',
    desc: 'Every web platform and media asset is engineered for maximum speed, 90+ Lighthouse scores, and sub-second responses.',
    color: '#f43f5e', // Rose / Red
    border: 'rgba(244, 63, 94, 0.4)',
    glow: 'rgba(244, 63, 94, 0.18)',
    icon: (
      <svg className="w-5 h-5 text-rose-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
      </svg>
    ),
  },
  {
    id: 'audio',
    title: 'Lossless Audio & 4K Masters',
    desc: 'Proprietary sound design, calibrated acoustics, and cinema-grade color mastered specifically for high-density displays.',
    color: '#c084fc', // Purple
    border: 'rgba(192, 132, 252, 0.4)',
    glow: 'rgba(192, 132, 252, 0.18)',
    icon: (
      <svg className="w-5 h-5 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    id: 'scale',
    title: 'Scale Without Compromise',
    desc: 'Built on future-proof modular stacks (React, Next.js, Cloud Workflows) capable of handling millions of organic views.',
    color: '#3b82f6', // Cobalt Blue
    border: 'rgba(59, 130, 246, 0.4)',
    glow: 'rgba(59, 130, 246, 0.18)',
    icon: (
      <svg className="w-5 h-5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2 5-2" />
        <path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2-5 2-5" />
      </svg>
    ),
  },
];

export default function ReviewsSection() {
  return (
    <section className="w-full bg-[#0c0b0e] text-white py-28 px-6 md:px-12  relative z-10 overflow-visible relative z-10 -mt-16 md:-mt-24 pt-20 md:pt-28 pb-16 bg-[#08080c]" style={{ clipPath: "ellipse(180% 100% at 50% 100%)" }}>
      {/* Centered Organic Atmosphere */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] max-w-[100vw] h-[450px] rounded-full blur-[90px] opacity-80 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(236,72,153,0.85) 0%, rgba(168,85,247,0.55) 45%, rgba(99,102,241,0.2) 65%, transparent 80%)'
        }}
      />
      <div 
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-[600px] max-w-[85vw] h-[80px] rounded-full blur-[30px] opacity-75 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(244,114,182,0.5) 40%, transparent 80%)'
        }}
      />
      {/* Magnific VFX - Ambient Nebula Flare */}
      <div 
        className="absolute -top-48 left-1/2 -translate-x-1/2 w-[1100px] max-w-[95vw] h-[450px] rounded-full blur-[90px] opacity-85 pointer-events-none z-0 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.85) 0%, rgba(168,85,247,0.5) 45%, rgba(99,102,241,0.2) 65%, transparent 80%)',
          animationDuration: '5s'
        }}
      />
      <div 
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[550px] max-w-[75vw] h-[160px] rounded-full blur-[40px] opacity-90 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(244,114,182,0.6) 40%, transparent 75%)'
        }}
      />

      {/* কনভেক্স ডোম আর্চ (যা সোজা কাট লাইন পুরোপুরি মুছে ফেলে ইমেজ ২-এর উত্তল কার্ভ তৈরি করে) */}
      <div 
        className="absolute -top-16 inset-x-0 h-16 pointer-events-none z-0"
        style={{
          background: '#08080c',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0'
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-pink-400 font-semibold mb-3 block">
            Quality Assurance // Production Standard
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Built for scale and uncompromising quality
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            Guaranteed production protocols, strict discretion, and precision engineering for every engagement.
          </p>
        </div>

        {/* 6 Individual Glowing Neon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUE_PROPS.map((card) => (
            <div
              key={card.id}
              className="group relative flex flex-col justify-between p-8 rounded-[2rem] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
              style={{
                border: `1.5px solid ${card.border}`,
                boxShadow: `0 8px 30px -5px ${card.glow}`,
              }}
            >
              {/* Corner Ambient Radial Glow */}
              <div 
                className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none blur-3xl opacity-20 group-hover:opacity-50 transition-opacity"
                style={{ background: card.color }}
              />

              <div>
                {/* Glowing Dark Icon Container */}
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#070609] mb-6 transition-transform group-hover:scale-110"
                  style={{
                    border: `1.5px solid ${card.color}`,
                    boxShadow: `0 0 14px ${card.color}, inset 0 0 8px ${card.color}40`,
                  }}
                >
                  {card.icon}
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                  {card.title}
                </h3>

                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Glowing Status Pill */}
              <div className="pt-6 mt-6  flex items-center gap-2">
                <span 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: card.color, boxShadow: `0 0 8px ${card.color}` }}
                />
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
                  Verified Protocol
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}






