import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

function ParticleBurst({ active }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const cx = W / 2, cy = H / 2;

    particlesRef.current = Array.from({ length: 80 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 5;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 4 + 1,
        alpha: 1,
        color: ['#0066ff','#00d4ff','#7c3aed','#4da6ff'][Math.floor(Math.random()*4)],
      };
    });

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.alpha -= 0.018;
        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }
      }
      if (alive) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function MagneticButton({ children, href, to }) {
  const btnRef = useRef(null);

  const onMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.25;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = 'translate(0, 0)';
  };

  const cls = "btn-primary text-base px-10 py-5 font-display tracking-wider transition-transform duration-150 inline-block";
  const style = { boxShadow: '0 0 40px rgba(0,102,255,0.5), 0 0 80px rgba(0,102,255,0.2)' };

  if (href) {
    return (
      <a ref={btnRef} href={href} className={cls} style={style} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </a>
    );
  }
  return (
    <Link ref={btnRef} to={to} className={cls} style={style} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </Link>
  );
}

export default function FinalCTASection() {
  const [burst, setBurst] = useState(false);
  const [spots] = useState(5); // "only 5 spots"
  const [seconds, setSeconds] = useState(3 * 3600 + 47 * 60 + 22); // countdown

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');

  return (
    <section
      id="apply"
      className="relative section-padding border-t border-line overflow-hidden"
    >
      {/* Particle burst canvas */}
      <ParticleBurst active={burst} />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,102,255,0.09) 0%, rgba(124,58,237,0.05) 50%, transparent 70%)',
        }}
      />

      <div className="container-shell relative z-10 text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span
            className="flex h-2 w-2 rounded-full animate-pulse-glow"
            style={{ background: '#f43f5e', boxShadow: '0 0 8px #f43f5e' }}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-neon-red font-bold">
            Only {spots} spots available this month
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-gradient-hero mb-4 max-w-3xl mx-auto">
          Ready to Turn Your Channel Into a Revenue Machine?
        </h2>
        <p className="text-ink-secondary text-sm max-w-xl mx-auto mb-8 leading-relaxed">
          Join 240+ creators who've scaled past $10K/month with our system. The free audit takes 45 minutes and leaves you with a concrete growth roadmap — even if you never become a client.
        </p>

        {/* Urgency countdown */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="font-mono text-[10px] text-ink-muted uppercase tracking-widest">
            Spots reset in:
          </span>
          <div className="flex items-center gap-1">
            {[h, m, s].map((unit, i) => (
              <span key={i} className="flex items-center gap-1">
                <span
                  className="font-mono text-sm font-black px-2 py-1 rounded"
                  style={{
                    color: '#00d4ff',
                    background: 'rgba(0,212,255,0.1)',
                    border: '1px solid rgba(0,212,255,0.25)',
                    minWidth: '36px',
                    textAlign: 'center',
                  }}
                >
                  {unit}
                </span>
                {i < 2 && <span className="font-mono text-xs text-ink-muted">:</span>}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          onMouseEnter={() => setBurst(false)}
        >
          <div onClick={() => { setBurst(false); setTimeout(() => setBurst(true), 50); }}>
            <MagneticButton href="/#apply">
              🚀 Apply for Free Revenue Audit
            </MagneticButton>
          </div>
          <MagneticButton to={ROUTES.CONTACT}>
            💬 Talk to Our Team
          </MagneticButton>
        </div>

        {/* Trust micro-copy */}
        <p className="font-mono text-[10px] text-ink-muted mt-6">
          No credit card required · 45-min session · 90-day revenue guarantee on paid plans
        </p>
      </div>
    </section>
  );
}
