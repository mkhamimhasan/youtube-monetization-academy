export default function FinalCTASection() {
  return (
    <section 
      id="booking"
      className="relative w-full min-h-[500px] sm:min-h-[580px] flex items-center justify-center overflow-hidden bg-[#120e18]"
    >
      {/* Magnific Real Sunset Atmosphere */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-85"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2400&auto=format&fit=crop')`,
          filter: 'hue-rotate(295deg) saturate(1.5) contrast(1.2)',
        }}
      />

      {/* Center Cinematic Typography & Pill Button */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[-0.04em] text-white mb-8 font-sans drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
          Be Magnific
        </h2>

        <a
          href="mailto:mktowfiq.official@gmail.com"
          className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-black/90 text-white font-medium text-sm hover:bg-black transition-all duration-200 border border-white/20 shadow-2xl hover:scale-105 active:scale-95"
        >
          <span>Start creating</span>
          <span className="text-pink-400 font-bold">→</span>
        </a>
      </div>

      {/* Top & Bottom Seamless Dark Edge Blends */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#fbf9f6] via-[#fbf9f6]/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent z-10 pointer-events-none" />
    </section>
  );
}




