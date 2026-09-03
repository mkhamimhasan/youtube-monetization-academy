import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const ARCHITECTURES = [
  {
    id: 'technest-ai',
    num: '01',
    category: 'Full-Stack Engine',
    title: 'TechNest Platform',
    stat: 'Sub-800ms',
    statLabel: 'LCP Engine',
    accent: '#06b6d4',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    tags: ['React 19', 'Firestore', 'Edge Cache'],
  },
  {
    id: 'silent-legacy',
    num: '02',
    category: 'Audio Architecture',
    title: 'Silent Legacy',
    stat: '48kHz / 24-Bit',
    statLabel: 'Lossless Audio',
    accent: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    tags: ['Synthesizers', 'Acoustics', 'Atmosphere'],
  },
  {
    id: 'future-bangla',
    num: '03',
    category: 'Generative Intelligence',
    title: 'Future Bangla',
    stat: '100% Neural',
    statLabel: 'Render Output',
    accent: '#f43f5e',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
    tags: ['Sci-Fi IP', 'Multimodal', 'Cinema Model'],
  },
];

export default function PortfolioTeaserSection() {
  return (
    <section className="relative w-full bg-[#eceae5] text-[#121110] py-28 px-6 md:px-12 border-none outline-none -mt-px">
      <div className="max-w-7xl mx-auto">
        {/* Awwwards-style Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 font-semibold mb-4 block">
              Curated Production Index // 2026
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-neutral-900 leading-[1.05]">
              Architectural Builds
            </h2>
          </div>
          <Link
            to={ROUTES.PORTFOLIO || '/portfolio'}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-neutral-900 text-white text-xs font-mono tracking-widest uppercase hover:bg-neutral-800 transition-all shadow-md"
          >
            <span>Complete Index</span>
            <span>↗</span>
          </Link>
        </div>

        {/* Paul Kalkbrenner / Holographik Monolith Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARCHITECTURES.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col bg-[#dedad2] rounded-[2.5rem] overflow-hidden border border-neutral-300/80 hover:border-neutral-500 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl"
            >
              {/* Top Monolith Art Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Metric Pill (Awwwards Style) */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: item.accent }}
                  />
                  <span className="text-[10px] font-mono tracking-wider text-white uppercase font-bold">
                    {item.stat}
                  </span>
                </div>

                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/60 block mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Bottom Spec Sheet */}
              <div className="p-7 flex flex-col justify-between flex-grow">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-6">
                  <span>METRIC: {item.statLabel}</span>
                  <span className="font-bold text-neutral-800">#{item.num}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-neutral-900/5 text-neutral-700 font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}