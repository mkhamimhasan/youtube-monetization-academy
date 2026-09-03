import { motion } from 'framer-motion';

const CAPABILITIES = [
  {
    num: '01',
    pillar: 'FULL-STACK ARCHITECTURE',
    title: 'High-Performance Web Systems',
    desc: 'Engineering sub-second web platforms, bespoke React interfaces, and cloud architectures optimized for 90+ Lighthouse scores and international scale.',
    theme: {
      accent: '#06b6d4',
      border: 'rgba(6, 182, 212, 0.25)',
      glow: 'rgba(6, 182, 212, 0.15)',
      badgeBg: 'rgba(6, 182, 212, 0.08)',
      badgeText: '#0891b2',
      dot: '#06b6d4'
    },
    icon: (
      <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    deliverables: ['Custom Next.js / React', 'Tailwind Systems', 'Sub-800ms LCP Target', 'Vercel Cloud Deployment'],
  },
  {
    num: '02',
    pillar: 'ORIGINAL AUDIO & SCORING',
    title: 'Cinematic Soundscapes & Scoring',
    desc: 'Proprietary electronic music production, deep ambient festival sets, and audio-reactive compositions engineered through Silent Legacy.',
    theme: {
      accent: '#eab308',
      border: 'rgba(234, 179, 8, 0.3)',
      glow: 'rgba(234, 179, 8, 0.18)',
      badgeBg: 'rgba(234, 179, 8, 0.1)',
      badgeText: '#ca8a04',
      dot: '#eab308'
    },
    icon: (
      <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    deliverables: ['Lossless Master Spec', 'Audio-Reactive Sync', 'Custom Atmospheric Scoring', 'Bespoke Synth Engineering'],
  },
  {
    num: '03',
    pillar: 'GENERATIVE PIPELINES',
    title: 'Multimodal AI Visual Direction',
    desc: 'Bespoke generative pipelines for speculative fiction, sci-fi world-building, and procedural visual assets engineered through Future Bangla.',
    theme: {
      accent: '#f43f5e',
      border: 'rgba(244, 63, 94, 0.3)',
      glow: 'rgba(244, 63, 94, 0.18)',
      badgeBg: 'rgba(244, 63, 94, 0.08)',
      badgeText: '#e11d48',
      dot: '#f43f5e'
    },
    icon: (
      <svg className="w-6 h-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    deliverables: ['Custom Model Pipelines', 'Neural Narrative Scripting', 'Generative Concept Art', 'Automated Video Assembly'],
  },
  {
    num: '04',
    pillar: 'SPATIAL & MOTION MEDIA',
    title: '3D Simulation & Visual Engineering',
    desc: 'Procedural 3D motion simulations, technological breakdowns, and spatial visual assets engineered through KatunTek.',
    theme: {
      accent: '#10b981',
      border: 'rgba(16, 185, 129, 0.3)',
      glow: 'rgba(16, 185, 129, 0.18)',
      badgeBg: 'rgba(16, 185, 129, 0.08)',
      badgeText: '#059669',
      dot: '#10b981'
    },
    icon: (
      <svg className="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    deliverables: ['Procedural 3D Mechanics', 'Kinetic Motion Design', 'Technical Explainer Systems', 'Interactive WebGL Ready'],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#141212] pt-32 pb-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="max-w-4xl mb-20">
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 font-semibold mb-4 block">
            Technical & Creative Scope
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-950 font-display leading-[1.08] mb-6">
            Engineered Capabilities
          </h1>
          <p className="text-neutral-600 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
            A unified creative technologist practice bridging code architecture, lossless sound synthesis, and multimodal generative pipelines.
          </p>
        </div>

        {/* 4 Cards Grid with Distinct Color Glows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.num}
              className="group relative flex flex-col justify-between p-8 sm:p-12 rounded-[2rem] bg-white transition-all duration-300 hover:-translate-y-1.5"
              style={{
                border: `1.5px solid ${cap.theme.border}`,
                boxShadow: `0 10px 30px -10px ${cap.theme.glow}`,
              }}
            >
              {/* Corner Ambient Glow */}
              <div 
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ background: cap.theme.accent }}
              />

              <div>
                {/* Header: Glowing Icon & Category Badge */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-neutral-100">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center relative shadow-inner"
                    style={{
                      backgroundColor: '#0c0c10',
                      boxShadow: `0 0 20px ${cap.theme.glow}, inset 0 0 12px ${cap.theme.glow}`,
                      border: `1px solid ${cap.theme.border}`
                    }}
                  >
                    {cap.icon}
                  </div>

                  <span 
                    className="text-[10px] font-mono uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full"
                    style={{
                      backgroundColor: cap.theme.badgeBg,
                      color: cap.theme.badgeText,
                      border: `1px solid ${cap.theme.border}`
                    }}
                  >
                    {cap.pillar}
                  </span>
                </div>

                <span className="text-xs font-mono font-bold text-neutral-400 block mb-2">
                  SPEC // {cap.num}
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-4 font-display">
                  {cap.title}
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                  {cap.desc}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="pt-6 ">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-3 font-semibold">
                  Core Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cap.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs font-mono text-neutral-700">
                      <span 
                        className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: cap.theme.dot, boxShadow: `0 0 8px ${cap.theme.dot}` }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-10 sm:p-16 rounded-[2.5rem] bg-[#121114] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl border border-white/5">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
              Direct Technical Inquiry
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3 font-display">
              Have a bespoke project or release in mind?
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl font-normal">
              Available for high-stakes digital platform builds, original music commissions, and custom generative AI deployments.
            </p>
          </div>

          <a
            href="mailto:mktowfiq.official@gmail.com"
            className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all shrink-0 shadow-lg hover:scale-105 active:scale-95"
          >
            Initiate Project ?
          </a>
        </div>
      </div>
    </main>
  );
}



