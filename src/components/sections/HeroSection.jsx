import { motion } from 'framer-motion';

const FOCUS_PILLARS = [
  {
    label: 'Direct Original Scoring',
    color: '#fbbf24',
    bgGlow: 'rgba(251, 191, 36, 0.15)',
    borderGlow: 'rgba(251, 191, 36, 0.8)',
    icon: (
      <svg className="w-4 h-4 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    label: 'Generative AI Pipelines',
    color: '#f43f5e',
    bgGlow: 'rgba(244, 63, 94, 0.15)',
    borderGlow: 'rgba(244, 63, 94, 0.8)',
    icon: (
      <svg className="w-4 h-4 text-rose-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
      </svg>
    ),
  },
  {
    label: 'Sci-Fi World Building',
    color: '#06b6d4',
    bgGlow: 'rgba(6, 182, 212, 0.15)',
    borderGlow: 'rgba(6, 182, 212, 0.8)',
    icon: (
      <svg className="w-4 h-4 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    label: 'Lossless Audio Master',
    color: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
    borderGlow: 'rgba(16, 185, 129, 0.8)',
    icon: (
      <svg className="w-4 h-4 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    label: 'Full-Stack Architecture',
    color: '#c084fc',
    bgGlow: 'rgba(192, 132, 252, 0.15)',
    borderGlow: 'rgba(192, 132, 252, 0.8)',
    icon: (
      <svg className="w-4 h-4 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between px-6 md:px-12 pt-28 pb-12 bg-[#120a14] text-white overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center no-repeat opacity-85 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2400&auto=format&fit=crop')`,
          filter: 'hue-rotate(300deg) saturate(1.4) contrast(1.15)',
        }}
      />

      {/* 
        ব্যালেন্সিং লেয়ার: বাম পাশের উজ্জ্বল ঘাসকে ডার্ক করে ডান পাশের পাথরের আলোর সাথে সমান করবে, 
        যাতে বামে অতিরিক্ত কুয়াশা না দেখায়।
      */}
      <div 
        className="absolute bottom-0 left-0 w-1/2 h-44 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(18, 10, 20, 0.55) 0%, transparent 70%)',
        }}
      />

      {/* Top Banner Tag */}
      <div className="relative z-10 flex justify-center w-full mb-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-medium text-neutral-200 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
          <span>Solo Creative Technologist Platform</span>
          <span className="text-white/40">•</span>
          <span className="text-pink-300 font-mono font-semibold">2026 Spec</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 font-display drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
          >
            The creative direction to build your next universe
          </motion.h1>

          <p className="text-neutral-200 text-base sm:text-lg md:text-xl max-w-xl font-normal leading-relaxed mb-8 drop-shadow-md">
            Cinema-grade audio-visual direction, original sound design, and speculative AI pipelines engineered for premium production.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#productions"
              className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-xs font-mono uppercase tracking-widest hover:bg-neutral-200 transition-all duration-200 shadow-2xl hover:scale-105 active:scale-95"
            >
              Explore Productions
            </a>
            <a
              href="mailto:mktowfiq.official@gmail.com"
              className="px-8 py-3.5 rounded-full bg-black/50 hover:bg-black/70 text-white font-medium text-xs font-mono uppercase tracking-widest backdrop-blur-md border border-white/25 transition-all duration-200 shadow-lg"
            >
              Direct Inquiry
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-end gap-3.5 w-full">
          {FOCUS_PILLARS.map((item, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-between w-full max-w-[340px] px-4 py-3 rounded-full bg-black/40 backdrop-blur-md transition-all duration-300 hover:scale-105"
              style={{
                border: `1.5px solid ${item.borderGlow}`,
                boxShadow: `0 0 16px ${item.bgGlow}`,
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-black/70 transition-all duration-300"
                  style={{
                    border: `1px solid ${item.color}`,
                    boxShadow: `0 0 10px ${item.color}`,
                  }}
                >
                  {item.icon}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-neutral-100 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>

              <span 
                className="w-2.5 h-2.5 rounded-full shrink-0 ml-3"
                style={{ 
                  backgroundColor: item.color, 
                  boxShadow: `0 0 10px ${item.color}` 
                }} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ribbon */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-white/90 drop-shadow-md">
        <span>Architected by MK Towfiq</span>
        <div className="flex items-center gap-6">
          <span className="hover:text-pink-300 transition-colors">Silent Legacy</span>
          <span className="text-white/40">•</span>
          <span className="hover:text-pink-300 transition-colors">Future Bangla</span>
          <span className="text-white/40">•</span>
          <span className="hover:text-pink-300 transition-colors">KatunTek</span>
        </div>
      </div>
    </section>
  );
}


