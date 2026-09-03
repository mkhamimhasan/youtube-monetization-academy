import { useState } from 'react';

const FAQS = [
  {
    q: 'What is your operational model and collaboration format?',
    a: 'Direct single-operator collaboration. Zero account managers, zero bloated meetings. Engagements operate on focused weekly sprints with dedicated GitHub repository access, private cloud staging environments, and direct asynchronous communication.',
    color: '#0891b2',
    border: 'rgba(8, 145, 178, 0.35)',
    glow: 'rgba(8, 145, 178, 0.12)',
    icon: (
      <svg className="w-5 h-5 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    q: 'How are intellectual property (IP) and commercial rights handled?',
    a: 'Full unencumbered commercial transfer upon delivery. You retain 100% legal ownership of source code repositories, generative weights, 3D assets, and lossless audio masters.',
    color: '#d97706',
    border: 'rgba(217, 119, 6, 0.35)',
    glow: 'rgba(217, 119, 6, 0.12)',
    icon: (
      <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    q: 'What is the typical production timeline for bespoke builds?',
    a: 'High-speed React platforms typically ship in 2-3 weeks. Multimodal generative series, custom acoustic scoring, and spatial visual assets require 3-6 weeks depending on pipeline complexity.',
    color: '#e11d48',
    border: 'rgba(225, 29, 72, 0.35)',
    glow: 'rgba(225, 29, 72, 0.12)',
    icon: (
      <svg className="w-5 h-5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    q: 'Do you offer custom scopes outside predefined capabilities?',
    a: 'Yes. For speculative concepts, generative workflow installations, or specialized interactive exhibitions, custom technical architectures are engineered following discovery.',
    color: '#059669',
    border: 'rgba(5, 150, 105, 0.35)',
    glow: 'rgba(5, 150, 105, 0.12)',
    icon: (
      <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    q: 'How do we get started?',
    a: 'Initiate direct communication through the inquiry portal. Specifications are audited within 24 hours to coordinate architecture and schedule delivery sprints.',
    color: '#7c3aed',
    border: 'rgba(124, 58, 237, 0.35)',
    glow: 'rgba(124, 58, 237, 0.12)',
    icon: (
      <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="relative w-full bg-[#fbf9f6] text-[#121110] py-32 px-6 md:px-12 overflow-hidden ">
      {/* Precision World Mesh Coordinates (60 FPS) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.06) 1.5px, transparent 1.5px)`,
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-neutral-300/40 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header with Swiss Clean Font */}
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 font-semibold mb-3">
            Inquiries & Protocol
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] text-neutral-950 font-sans leading-none">
            Frequently Addressed
          </h2>
        </div>

        {/* Wide Full-Density FAQ Stack */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="group rounded-3xl bg-white transition-all duration-300 overflow-hidden"
                style={{
                  border: `1.5px solid ${isOpen ? faq.color : faq.border}`,
                  boxShadow: isOpen ? `0 14px 35px -5px ${faq.glow}` : `0 4px 18px -4px ${faq.glow}`,
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-6 px-7 sm:px-9 flex items-center justify-between text-left gap-6"
                >
                  <div className="flex items-center gap-5">
                    <div 
                      className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ filter: `drop-shadow(0 0 6px ${faq.color}80)` }}
                    >
                      {faq.icon}
                    </div>

                    <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 font-sans">
                      {faq.q}
                    </span>
                  </div>

                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-mono font-bold transition-all duration-300 shadow-sm"
                    style={{
                      backgroundColor: isOpen ? faq.color : '#f3f1ec',
                      color: isOpen ? '#ffffff' : '#666666',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-7 sm:px-9 pb-7 pt-2 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed  pl-16 sm:pl-20 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}




