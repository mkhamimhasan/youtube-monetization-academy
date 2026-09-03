const MODELS = [
  {
    name: 'Veo 3',
    spec: 'Generative Video',
    color: '#06b6d4',
    border: 'rgba(6, 182, 212, 0.4)',
    glow: 'rgba(6, 182, 212, 0.15)',
  },
  {
    name: 'Kling 3',
    spec: 'Motion AI',
    color: '#f97316',
    border: 'rgba(249, 115, 22, 0.4)',
    glow: 'rgba(249, 115, 22, 0.15)',
  },
  {
    name: 'Grok Imagine',
    spec: 'Diffusion',
    color: '#a855f7',
    border: 'rgba(168, 85, 247, 0.4)',
    glow: 'rgba(168, 85, 247, 0.15)',
  },
  {
    name: 'Seedream 5',
    spec: 'Neural Assets',
    color: '#f43f5e',
    border: 'rgba(244, 63, 94, 0.4)',
    glow: 'rgba(244, 63, 94, 0.15)',
  },
  {
    name: 'Native React',
    spec: 'Architecture',
    color: '#3b82f6',
    border: 'rgba(59, 130, 246, 0.4)',
    glow: 'rgba(59, 130, 246, 0.15)',
  },
  {
    name: 'Lossless Audio',
    spec: 'Mastering',
    color: '#10b981',
    border: 'rgba(16, 185, 129, 0.4)',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
];

export default function TrustBarSection() {
  return (
    <section className="relative w-full bg-[#fbf9f6] pb-16">
      {/* 
        ?????? ? ????? ??-??-?? ?????: 
        ???????? ???? ???? ?????? ?? ????? ????? ??? ?????????? ????? ???? ??? ???? 
        ??? ??? ????? ???? ????????? ??? ??????
      */}
      <div 
        className="w-full h-14 -mt-14 pointer-events-none"
        style={{
          backgroundColor: '#fbf9f6',
          maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-400 font-semibold">
            Powered by State-of-the-Art Media Models & Native Cloud Architectures
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {MODELS.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default border border-neutral-200/80"
              style={{
                borderColor: item.border,
                boxShadow: `0 4px 18px ${item.glow}`,
              }}
            >
              <div 
                className="w-1.5 h-1.5 rounded-full mb-2.5 transition-transform group-hover:scale-125"
                style={{ 
                  backgroundColor: item.color, 
                  boxShadow: `0 0 10px ${item.color}` 
                }} 
              />

              <span className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 group-hover:scale-105 transition-transform">
                {item.name}
              </span>

              <span 
                className="text-[10px] font-mono uppercase tracking-widest mt-1 font-semibold"
                style={{ color: item.color }}
              >
                {item.spec}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




