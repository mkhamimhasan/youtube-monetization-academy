import { Mail, MessageCircle, Clock, Youtube, Instagram, Linkedin, Twitter } from 'lucide-react';

const CONTACT_ITEMS = [
  { icon: Mail, label: 'Email', value: 'hello@yta.agency', href: 'mailto:hello@yta.agency', color: '#4da6ff' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us directly', href: 'https://wa.me/1234567890', color: '#25d366' },
  { icon: Clock, label: 'Response Time', value: 'Within 1 business day', href: null, color: '#fbbf24' },
];

const SOCIALS = [
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter/X', href: '#' },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-5">
      {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, color }) => {
        const content = (
          <div
            className="flex items-start gap-3.5 p-4 rounded-card border border-white/5 bg-white/[0.02] transition-colors duration-200"
            style={{ borderColor: `${color}25` }}
          >
            <div
              className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${color}18`, border: `1px solid ${color}35` }}
            >
              <Icon className="h-4 w-4" style={{ color }} />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">{label}</p>
              <p className="text-ink-primary text-sm font-semibold mt-0.5">{value}</p>
            </div>
          </div>
        );
        return href ? (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="focus-neon rounded-card hover:opacity-90 transition-opacity">
            {content}
          </a>
        ) : (
          <div key={label}>{content}</div>
        );
      })}

      {/* Socials */}
      <div className="pt-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-3">Follow Along</p>
        <div className="flex items-center gap-3">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="h-9 w-9 flex items-center justify-center rounded-lg glass-panel text-ink-muted hover:text-neon-blue-light hover:shadow-neon-blue transition-all duration-200 focus-neon"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}



