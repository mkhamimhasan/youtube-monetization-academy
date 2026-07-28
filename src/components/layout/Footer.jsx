import { Link } from 'react-router-dom';
import { Zap, Youtube, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import { ROUTES, ANCHORS } from '@/config/routes';

const SOCIALS = [
  { icon: Youtube,   label: 'YouTube',   href: '#', color: 'hover:text-red-400  hover:shadow-[0_0_12px_rgba(239,68,68,0.5)]' },
  { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:text-pink-400 hover:shadow-[0_0_12px_rgba(236,72,153,0.5)]' },
  { icon: Linkedin,  label: 'LinkedIn',  href: '#', color: 'hover:text-neon-blue-light hover:shadow-neon-blue' },
  { icon: Twitter,   label: 'Twitter/X', href: '#', color: 'hover:text-sky-400  hover:shadow-[0_0_12px_rgba(56,189,248,0.5)]' },
  { icon: Facebook,  label: 'Facebook',  href: '#', color: 'hover:text-blue-400 hover:shadow-[0_0_12px_rgba(96,165,250,0.5)]' },
];

const NAV_COLS = [
  {
    heading: 'Company',
    links: [
      { label: 'Home',      to: ROUTES.HOME },
      { label: 'About Us',  to: ROUTES.ABOUT },
      { label: 'Services',  to: ROUTES.SERVICES },
      { label: 'Portfolio', to: ROUTES.PORTFOLIO },
      { label: 'Pricing',   to: ROUTES.PRICING },
      { label: 'Contact',   to: ROUTES.CONTACT },
    ],
  },
  {
    heading: 'Quick Links',
    links: [
      { label: 'Why Choose Us', to: ANCHORS.WHY_US },
      { label: 'Client Reviews', to: ANCHORS.REVIEWS },
      { label: 'FAQ',            to: ANCHORS.FAQ },
      { label: 'Apply Now',      to: ANCHORS.APPLY },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line overflow-hidden">
      {/* Neon top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #0066ff 30%, #7c3aed 70%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,102,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-shell relative z-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Col 1 — Logo + tagline + socials */}
          <div className="md:col-span-1">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 mb-4 focus-neon rounded w-fit">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cta-gradient shadow-neon-blue">
                <Zap className="h-4 w-4 text-white" />
              </span>
              <span className="font-display text-sm font-black tracking-wider text-ink-primary">
                YTA<span className="text-neon-blue-light">.</span>AGENCY
              </span>
            </Link>
            <p className="text-ink-secondary text-xs leading-relaxed mb-5 max-w-[220px]">
              Premium YouTube monetization strategy for creators ready to scale revenue, CPM, and audience.
            </p>

            {/* Social row */}
            <div className="flex items-center gap-3 flex-wrap">
              {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`h-8 w-8 flex items-center justify-center rounded-lg glass-panel text-ink-muted transition-all duration-200 ${color} focus-neon`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.heading}>
              <p className="kicker mb-4">{col.heading}</p>
              <ul className="space-y-2">
                {col.links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-ink-secondary hover:text-neon-blue-light text-xs font-body transition-colors duration-200 focus-neon rounded"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact col */}
          <div>
            <p className="kicker mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@yta.agency"
                  className="text-ink-secondary hover:text-neon-blue-light text-xs transition-colors duration-200 focus-neon rounded block"
                >
                  hello@yta.agency
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-neon-whatsapp hover:opacity-80 transition-opacity focus-neon rounded"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neon-whatsapp/20 text-[10px]">💬</span>
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="neon-divider my-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] text-ink-muted">
            © {year} YTA.Agency — All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-mono text-[10px] text-ink-muted hover:text-ink-secondary transition-colors duration-200 focus-neon rounded"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
