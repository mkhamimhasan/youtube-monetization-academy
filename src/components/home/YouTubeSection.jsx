import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PILLARS = [
  {
    id: 'silent-legacy',
    label: 'Silent Legacy',
    accentColor: '#f43f5e',
    kicker: 'Audio-Visual Direction & Original Music',
    headline: 'Cinematic Soundscapes & Sensory Immersion',
    desc: 'Proprietary electronic music production, deep ambient festival sets, and audio-reactive visuals mastered for high-fidelity presentation.',
    channelUrl: 'https://youtube.com/@SilentLegacyStudio',
    items: [
      { id: 'gBG1k5r0DyA', title: 'EDM Festival Cinematic Live Set (128 BPM)', tag: 'Original Audio' },
      { id: 'k4T0bHE3r4I', title: 'Cinematic Movement I', tag: 'Visual Direction' },
      { id: 'xnA-_l37hYE', title: 'Atmospheric Scoring', tag: 'Master Spec' },
    ],
  },
  {
    id: 'future-bangla',
    label: 'Future Bangla',
    accentColor: '#06b6d4',
    kicker: 'Speculative Tech & Generative AI',
    headline: 'Artificial Evolution & Cybernetic Realities',
    desc: 'Documentaries and conceptual visual series exploring futuristic technologies, AI intelligence, and simulated digital horizons.',
    channelUrl: 'https://youtube.com/@FutureBanglaS',
    items: [
      { id: 'lFQqM3ekEu4', title: 'ChatGPT vs Gemini vs Claude (2026 AI Battle)', tag: 'AI Benchmark' },
      { id: 'Aa5bmegQfMM', title: 'Synthetic Metropolis 2099', tag: 'AI Cinema' },
      { id: 'sdqzq5oehFs', title: 'Silicon Consciousness', tag: 'AI Narrative' },
    ],
  },
  {
    id: 'katuntek',
    label: 'KatunTek',
    accentColor: '#10b981',
    kicker: '3D Simulation & Creative Media',
    headline: 'Motion Engineering & Technological Breakdown',
    desc: 'Interactive 3D asset engineering, procedural visual breakdowns, and high-impact educational narratives.',
    channelUrl: 'https://youtube.com/@KatunTek',
    items: [
      { id: 'tCl3zcD5UuI', title: 'Structural Assembly', tag: '3D Simulation' },
      { id: 'wD-Uyel70zg', title: 'Kinetic Dynamics', tag: 'Motion Design' },
      { id: 'SIlGuYe6NPc', title: 'Spatial Geometry', tag: 'Tech Media' },
    ],
  },
];

export default function YouTubeSection() {
  const [activeId, setActiveId] = useState('silent-legacy');
  const activePillar = PILLARS.find((p) => p.id === activeId) || PILLARS[0];

  return (
    <section 
      id="media-suite" 
      className="relative w-full text-[#1a1615] pt-16 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#fbf9f6] via-[#f8f6f1] to-[#eceae5]"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-400 font-semibold mb-3 block">
            Media Suite // Cross-Domain Production
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 font-sans leading-[1.08] mb-5">
            One platform to direct everything
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg font-normal leading-relaxed">
            Pick your narrative domain. Original sound, generative intelligence, and high-fidelity video production.
          </p>
        </div>

        {/* Magnific-Style Pill Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-neutral-200/80 backdrop-blur-md shadow-inner border border-neutral-300/60">
            {PILLARS.map((pillar) => {
              const active = pillar.id === activeId;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveId(pillar.id)}
                  className={`px-7 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 font-bold ${
                    active
                      ? 'bg-neutral-950 text-white shadow-lg'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-300/50'
                  }`}
                >
                  {pillar.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase Feature Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch"
          >
            {/* Left Info Card */}
            <div className="lg:col-span-4 bg-[#0d0c10] text-white p-8 sm:p-10 rounded-[2.5rem] flex flex-col justify-between border border-white/10 shadow-2xl relative overflow-hidden group">
              <div 
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-700"
                style={{ background: activePillar.accentColor }}
              />

              <div className="relative z-10">
                <span 
                  className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold mb-3 block"
                  style={{ color: activePillar.accentColor }}
                >
                  {activePillar.kicker}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug mb-4 font-sans text-white">
                  {activePillar.headline}
                </h3>
                <p className="text-neutral-400 text-sm font-normal leading-relaxed">
                  {activePillar.desc}
                </p>
              </div>

              <div className="pt-6 mt-8  relative z-10">
                <a
                  href={activePillar.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold transition-all hover:gap-3"
                  style={{ color: activePillar.accentColor }}
                >
                  <span>Open Official Feed</span>
                  <span>?</span>
                </a>
              </div>
            </div>

            {/* Right 3 Big Showcase Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {activePillar.items.map((item) => (
                <a
                  key={item.id}
                  href={`https://www.youtube.com/watch?v=${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-white rounded-[2.25rem] overflow-hidden border border-neutral-300/70 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-grow bg-white">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
                        {item.tag}
                      </span>
                      <p className="text-sm sm:text-base font-bold text-neutral-900 line-clamp-2 leading-snug font-sans group-hover:text-neutral-950">
                        {item.title}
                      </p>
                    </div>

                    <div className="pt-5 mt-5  flex items-center justify-between">
                      <span 
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ 
                          backgroundColor: activePillar.accentColor, 
                          boxShadow: `0 0 10px ${activePillar.accentColor}` 
                        }} 
                      />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                        Watch Clip ?
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ????? ?????? ?????? ???? ?????? ???? ??????????? ???????????? */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#eceae5] to-transparent pointer-events-none" />
    </section>
  );
}


