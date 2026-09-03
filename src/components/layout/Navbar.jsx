import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Overview',     to: ROUTES.HOME },
  { label: 'Capabilities', to: ROUTES.SERVICES },
  { label: 'Portfolio',    to: ROUTES.PORTFOLIO },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (!navRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#08080c]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent border-b border-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Clean Logo */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-3 group"
          onClick={() => setOpen(false)}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
          <span className="font-display font-bold text-sm tracking-widest uppercase text-white">
            MK Towfiq <span className="text-white/40 font-mono text-xs font-normal">/ Studio</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.HOME}
              className={({ isActive }) =>
                cn(
                  'text-xs font-mono tracking-widest uppercase transition-all duration-200',
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/#booking"
            className="px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white text-xs font-mono uppercase tracking-wider transition-all duration-200"
          >
            Consultation ↗
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-neutral-300 hover:text-white p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#08080c]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === ROUTES.HOME}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-mono tracking-widest uppercase py-2 border-b border-white/5',
                    isActive ? 'text-white font-bold' : 'text-neutral-400'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href="/#booking"
              onClick={() => setOpen(false)}
              className="mt-2 text-center py-3 rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold"
            >
              Book Consultation ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


