import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const CORE_SERVICES = [
  {
    id: '01',
    title: 'Hyper-Scale Code Architecture',
    desc: 'Bespoke React systems, edge caching, and zero-bloat interactive layers engineered for ultra-fast response times and effortless global scaling.',
    deliverable: 'Web Architecture',
    accent: '#06b6d4',
  },
  {
    id: '02',
    title: 'Acoustic Synthesis & Scoring',
    desc: 'Proprietary electronic music production, live festival soundscapes, and sensory-driven audio reactive compositions mastered for cinema presentation.',
    deliverable: 'Lossless Sound Master',
    accent: '#eab308',
  },
  {
    id: '03',
    title: 'Multimodal Generative Workflows',
    desc: 'End-to-end synthetic pipelines, AI world-building documentaries, and automated asset generation workflows deployed for cinematic IP.',
    deliverable: 'Neural Model Pipelines',
    accent: '#f43f5e',
  },
  {
    id: '04',
    title: 'Spatial Simulation & Motion Media',
    desc: 'Procedural 3D motion simulations, technological mechanics, and high-impact visual breakdowns engineered for breakthrough tech communication.',
    deliverable: 'Interactive 3D Assets',
    accent: '#10b981',
  },
];

export default function ServicesSection() {
  return (
    <section 
      id="services" 
      className="relative w-full bg-[#eceae5] text-[#121110] py-28 px-6 md:px-12 border-none outline-none -mt-px"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Intro */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 items-end">
          <div className="md:col-span-8">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 font-semibold mb-4 block">
              Engineered Capabilities
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-neutral-900 leading-[1.05]">
              Discipline & Practice
            </h2>
          </div>
          <div className="md:col-span-4">
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
              Merging technical full-stack architecture with cinema-grade audiovisual production to establish authoritative digital IP.
            </p>
          </div>
        </div>

        {/* Minimalist Swiss Service Rows (Paul Kalkbrenner Style) */}
        <div className="mb-16">
          {CORE_SERVICES.map((s) => (
            <div
              key={s.id}
              className="group py-10 border-b border-neutral-400/50 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-all duration-300 hover:bg-[#e4e1d9]/60 px-4 rounded-xl"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-sm font-bold text-neutral-400 group-hover:text-neutral-900 transition-colors">
                  /{s.id}
                </span>
              </div>

              <div className="md:col-span-5">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 group-hover:translate-x-2 transition-transform duration-300">
                  {s.title}
                </h3>
              </div>

              <div className="md:col-span-4">
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>

              <div className="md:col-span-2 flex md:justify-end items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: s.accent }}
                />
                <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-neutral-700">
                  {s.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Floating Glass Capsule Bar */}
        <div className="flex justify-center">
          <Link
            to={ROUTES.SERVICES || '/services'}
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-neutral-900 text-white font-mono text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl hover:scale-105"
          >
            <span>Explore Technical Matrix</span>
            <span className="text-neutral-400">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}