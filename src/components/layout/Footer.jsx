import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

export default function Footer() {
  return (
    <footer className="w-full bg-[#08080a] text-white pt-20 pb-16 px-6 md:px-12 border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-white" />
            <span className="font-display font-bold text-lg tracking-wider uppercase text-white">
              MK Towfiq
            </span>
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
            Architecting cinema-grade audio-visuals, bespoke generative pipelines, and hyper-optimized digital platforms.
          </p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[11px] font-mono text-neutral-400">
              English (Global)
            </span>
          </div>
        </div>

        {/* Links Right Columns */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 font-sans">
          <div className="flex flex-col gap-3 text-xs">
            <span className="font-semibold text-pink-400 mb-1 font-display">IP & Media</span>
            <a href="https://youtube.com/@SilentLegacyStudio" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">Silent Legacy</a>
            <a href="https://youtube.com/@FutureBanglaS" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">Future Bangla</a>
            <a href="https://youtube.com/@KatunTek" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">KatunTek</a>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <span className="font-semibold text-pink-400 mb-1 font-display">Capabilities</span>
            <span className="text-neutral-400">Generative AI</span>
            <span className="text-neutral-400">Audio Synthesis</span>
            <span className="text-neutral-400">React Architecture</span>
            <span className="text-neutral-400">Color Mastering</span>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <span className="font-semibold text-pink-400 mb-1 font-display">Platform</span>
            <Link to={ROUTES.HOME} className="text-neutral-400 hover:text-white transition-colors">Overview</Link>
            <Link to={ROUTES.SERVICES} className="text-neutral-400 hover:text-white transition-colors">Capabilities</Link>
            <Link to={ROUTES.PORTFOLIO} className="text-neutral-400 hover:text-white transition-colors">Portfolio</Link>
            <a href="/#booking" className="text-neutral-400 hover:text-white transition-colors">Consultation</a>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <span className="font-semibold text-pink-400 mb-1 font-display">Connect</span>
            <a href="mailto:mktowfiq.official@gmail.com" className="text-neutral-400 hover:text-white transition-colors">Direct Mail</a>
            <a href="https://youtube.com/@SilentLegacyStudio" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-4">
        <span>© 2026 MK Towfiq. All rights reserved.</span>
        <div className="flex gap-6">
          <span>Privacy Architecture</span>
          <span>Terms of Production</span>
        </div>
      </div>
    </footer>
  );
}



