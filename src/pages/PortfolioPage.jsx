import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PRODUCTIONS = [
  // Silent Legacy (3 Videos)
  {
    id: 'gBG1k5r0DyA',
    title: 'EDM Festival Cinematic Live Set (128 BPM)',
    pillar: 'Silent Legacy',
    category: 'Audio Production',
    tag: 'Original Audio',
    spec: 'Lossless Master',
    url: 'https://youtu.be/gBG1k5r0DyA',
  },
  {
    id: 'k4T0bHE3r4I',
    title: 'Cinematic Movement I — Immersive Sound',
    pillar: 'Silent Legacy',
    category: 'Audio Production',
    tag: 'Visual Direction',
    spec: '4K Cinema Spec',
    url: 'https://youtu.be/k4T0bHE3r4I',
  },
  {
    id: 'xnA-_l37hYE',
    title: 'Atmospheric Scoring & Ambient Synthesis',
    pillar: 'Silent Legacy',
    category: 'Audio Production',
    tag: 'Sound Design',
    spec: 'Bespoke Synth',
    url: 'https://youtu.be/xnA-_l37hYE',
  },

  // Future Bangla (3 Videos)
  {
    id: 'lFQqM3ekEu4',
    title: 'ChatGPT vs Gemini vs Claude (2026 AI Battle)',
    pillar: 'Future Bangla',
    category: 'Generative AI',
    tag: 'AI Benchmark',
    spec: 'Multimodal Research',
    url: 'https://youtu.be/lFQqM3ekEu4',
  },
  {
    id: 'Aa5bmegQfMM',
    title: 'Synthetic Metropolis 2099 — Neural Cinema',
    pillar: 'Future Bangla',
    category: 'Generative AI',
    tag: 'AI Cinema',
    spec: 'Generative Pipeline',
    url: 'https://youtu.be/Aa5bmegQfMM',
  },
  {
    id: 'sdqzq5oehFs',
    title: 'Silicon Consciousness & Autonomous Worlds',
    pillar: 'Future Bangla',
    category: 'Generative AI',
    tag: 'AI Narrative',
    spec: 'Speculative Script',
    url: 'https://youtu.be/sdqzq5oehFs',
  },

  // KatunTek (3 Videos)
  {
    id: 'tCl3zcD5UuI',
    title: 'Structural Assembly & Procedural Motion',
    pillar: 'KatunTek',
    category: '3D Simulation',
    tag: '3D Simulation',
    spec: 'Spatial Geometry',
    url: 'https://youtu.be/tCl3zcD5UuI',
  },
  {
    id: 'wD-Uyel70zg',
    title: 'Kinetic Dynamics & Hardware Architecture',
    pillar: 'KatunTek',
    category: '3D Simulation',
    tag: 'Motion Design',
    spec: 'Technical Media',
    url: 'https://youtu.be/wD-Uyel70zg',
  },
  {
    id: 'SIlGuYe6NPc',
    title: 'Spatial Geometry & Engine Simulation',
    pillar: 'KatunTek',
    category: '3D Simulation',
    tag: 'Tech Visuals',
    spec: 'Procedural Render',
    url: 'https://youtu.be/SIlGuYe6NPc',
  },
];

const FILTERS = ['All Pillars', 'Silent Legacy', 'Future Bangla', 'KatunTek'];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All Pillars');

  const filtered = activeFilter === 'All Pillars'
    ? PRODUCTIONS
    : PRODUCTIONS.filter((item) => item.pillar === activeFilter);

  return (
    <main className="min-h-screen bg-[#fbf9f6] text-[#1a1615] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 font-semibold mb-3 block">
            Official Production Index
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 mb-5 font-display">
            Selected Video IP Archive
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg">
            Nine flagship audio-visual productions engineered across original sound synthesis, generative intelligence, and 3D simulation.
          </p>
        </div>

        {/* Magnific Editorial Filter Pills */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full bg-neutral-200/80 backdrop-blur-md">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-neutral-900 text-white shadow-md'
                      : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-300/60'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* 9 Video Cards Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.a
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Thumbnail Layer */}
                <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Floating Play Badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-xl">
                      <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Pillar Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md">
                      {item.pillar}
                    </span>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 font-semibold mb-2">
                      <span className="text-pink-600">{item.tag}</span>
                      <span>{item.spec}</span>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 line-clamp-2 group-hover:text-pink-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-4 mt-4  flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>Direct YouTube Master</span>
                    <span className="group-hover:translate-x-1 transition-transform">↗</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}


