import { motion } from 'framer-motion';

const PILLARS = [
  {
    title: 'Silent Legacy',
    role: 'Cinematic Audio & Sound Design',
    desc: 'Proprietary electronic music production, deep ambient scoring, and sensory-driven audio compositions mastered for high-end cinematic media.',
  },
  {
    title: 'Future Bangla',
    role: 'Speculative Tech & Generative AI',
    desc: 'World-building documentaries exploring the frontiers of artificial general intelligence, cybernetics, and human evolutionary horizons.',
  },
  {
    title: 'KatunTek',
    role: '3D Simulation & Visual Media',
    desc: 'Precision visual engineering, procedural 3D motion simulations, and visual explanations of modern breakthrough technologies.',
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#08080c] text-white pt-32 pb-24 px-6 md:px-12 overflow-hidden">
      {/* Background Ambient Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-purple-500/10 via-pink-500/5 to-transparent blur-[140px] rounded-full" 
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono tracking-widest uppercase text-neutral-400 mb-6">
          Creative Technologist Manifesto
        </div>

        {/* Bold Statement */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-8 font-display leading-[1.1]">
          Architecting Worlds at the Intersection of Sound, AI, and Code.
        </h1>

        <p className="text-neutral-400 text-lg sm:text-xl font-normal leading-relaxed max-w-3xl mb-16">
          I am MK Towfiq — a solo creative director and technologist. I build digital intellectual property, direct multimodal AI pipelines, and engineer hyper-optimized web architectures for global productions.
        </p>

        {/* The 3 Core Pillars */}
        <div className="pt-12  mb-20">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-8">
            Primary Creative Pillars
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-pink-400 tracking-wider uppercase block mb-2">
                    {p.role}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {p.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0c0c12] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 font-display">
              Looking for Bespoke Technical or Visual Direction?
            </h3>
            <p className="text-neutral-400 text-sm max-w-xl">
              Available for select international collaborations, speculative AI installations, and flagship platform engineering.
            </p>
          </div>
          <a
            href="/#booking"
            className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all shrink-0"
          >
            Initiate Contact
          </a>
        </div>
      </div>
    </main>
  );
}


