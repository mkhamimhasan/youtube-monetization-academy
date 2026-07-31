import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { ROUTES, ANCHORS } from '@/config/routes';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home',     to: ROUTES.HOME },
  { label: 'About',   to: ROUTES.ABOUT },
  { label: 'Services',to: ROUTES.SERVICES },
  { label: 'Portfolio',to: ROUTES.PORTFOLIO },
  { label: 'Pricing', to: ROUTES.PRICING },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (!navRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const linkBase =
    'font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-200';
  const linkActive  = 'text-cyan-400';
  const linkInactive = 'text-white hover:text-cyan-400';

  return (
    <header
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass-nav'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="container-shell flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2 group focus-neon rounded"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cta-gradient shadow-neon-blue">
            <Zap className="h-4 w-4 text-white" />
          </span>
          <span className="font-display text-sm font-black tracking-wider text-ink-primary">
            MK<span className="text-neon-blue-light"> </span>Towfiq
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === ROUTES.HOME}
              className={({ isActive }) =>
                cn(linkBase, isActive ? linkActive : linkInactive)
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={ANCHORS.APPLY}
            className="glass-button text-xs px-5 py-2.5 focus-neon rounded-lg text-white font-bold"
          >
            Free Audit →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-ink-secondary hover:text-ink-primary transition-colors focus-neon rounded p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden glass-nav">
          <div className="container-shell flex flex-col gap-1 py-4">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === ROUTES.HOME}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    linkBase,
                    'block py-3 border-b border-line-faint',
                    isActive ? linkActive : linkInactive
                  )
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href={ANCHORS.APPLY}
              onClick={() => setOpen(false)}
              className="glass-button mt-3 text-xs w-full text-center py-3 focus-neon rounded-lg text-white font-bold"
            >
              Get Free Audit →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}