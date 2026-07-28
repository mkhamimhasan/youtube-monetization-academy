import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { colors, bloom as bloomDefaults } from '@/theme/tokens';

/* ─── GSAP import (CDN-safe dynamic) ──────────────────────────────── */
let gsap;
(async () => { try { gsap = (await import('gsap')).gsap; } catch {} })();

/* ─── CONSTANTS ───────────────────────────────────────────────────── */
const PARTICLE_COUNT = 6000;
const NODE_COUNT     = 32;
const ARC_COUNT      = 12;

/* ─── Helper: random point on sphere ─────────────────────────────── */
function randomSpherePoint(radius) {
  const u = Math.random(), v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi   = Math.acos(2 * v - 1);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
}

/* ─── Helper: great-circle arc tube ──────────────────────────────── */
function createArc(a, b, radius) {
  const pts = [];
  for (let i = 0; i <= 40; i++) {
    const t  = i / 40;
    const v  = new THREE.Vector3().lerpVectors(a, b, t).normalize().multiplyScalar(radius * 1.04);
    pts.push(v);
  }
  return new THREE.CatmullRomCurve3(pts);
}

export default function HeroSection() {
  const canvasRef  = useRef(null);
  const sectionRef = useRef(null);

  /* ── Three.js Globe ─────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.clientWidth;
    const H = canvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    /* --- Inner glow sphere --- */
    const innerGeo = new THREE.SphereGeometry(2.3, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colors.neonBlue),
      transparent: true,
      opacity: 0.06,
      side: THREE.FrontSide,
    });
    scene.add(new THREE.Mesh(innerGeo, innerMat));

    /* --- Wireframe icosahedron globe --- */
    const globeGeo = new THREE.IcosahedronGeometry(2.5, 4);
    const edges    = new THREE.EdgesGeometry(globeGeo);
    const wireMat  = new THREE.LineBasicMaterial({
      color: new THREE.Color(colors.neonBlue),
      transparent: true,
      opacity: 0.35,
    });
    const globe = new THREE.LineSegments(edges, wireMat);
    scene.add(globe);

    /* --- Surface nodes --- */
    const nodeMat  = new THREE.MeshBasicMaterial({ color: new THREE.Color(colors.neonCyan) });
    const nodeGeo  = new THREE.SphereGeometry(0.045, 8, 8);
    const nodePositions = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const pos  = randomSpherePoint(2.5);
      const mesh = new THREE.Mesh(nodeGeo, nodeMat.clone());
      mesh.position.copy(pos);
      globe.add(mesh);
      nodePositions.push(pos);
    }

    /* --- Arc lines between nodes --- */
    for (let i = 0; i < ARC_COUNT; i++) {
      const a   = nodePositions[Math.floor(Math.random() * NODE_COUNT)];
      const b   = nodePositions[Math.floor(Math.random() * NODE_COUNT)];
      const crv = createArc(a, b, 2.5);
      const pts = crv.getPoints(40);
      const g   = new THREE.BufferGeometry().setFromPoints(pts);
      const m   = new THREE.LineBasicMaterial({
        color: new THREE.Color(colors.neonCyan),
        transparent: true,
        opacity: 0.3,
      });
      globe.add(new THREE.Line(g, m));
    }

    /* --- Ambient particles --- */
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 14;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: new THREE.Color(colors.neonBlueLight),
      size: 0.025,
      transparent: true,
      opacity: 0.55,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    /* --- Mouse parallax --- */
    let targetRX = 0, targetRY = 0;
    let currentRX = 0, currentRY = 0;
    const onMouseMove = (e) => {
      targetRX = ((e.clientY / window.innerHeight) - 0.5) * 0.4;
      targetRY = ((e.clientX / window.innerWidth)  - 0.5) * 0.6;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    /* --- Resize --- */
    const onResize = () => {
      const nW = canvas.clientWidth, nH = canvas.clientHeight;
      renderer.setSize(nW, nH);
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    /* --- Animate --- */
    let frame;
    const clock = new THREE.Clock();
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      // Auto-rotate + mouse parallax
      currentRX += (targetRX - currentRX) * 0.05;
      currentRY += (targetRY - currentRY) * 0.05;
      globe.rotation.y  = t * 0.08 + currentRY;
      globe.rotation.x  = currentRX;

      // Pulse node opacity
      globe.children.forEach((child, idx) => {
        if (child.isMesh) {
          child.material.opacity = 0.5 + 0.5 * Math.sin(t * 1.5 + idx * 0.4);
          child.material.transparent = true;
        }
      });

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  /* ── GSAP intro sequence ─────────────────────────────────────────── */
  useEffect(() => {
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const g = gsap || (await import('gsap')).gsap;
      const el = sectionRef.current;
      if (!el) return;

      const q = (sel) => el.querySelector(sel);
      const all = (sel) => el.querySelectorAll(sel);

      g.set([q('.hero-city'), q('.hero-grid'), q('.hero-canvas-wrap'), q('.hero-panels'), q('.hero-text'), q('.hero-ctas')], {
        opacity: 0,
      });

      const tl = g.timeline({ delay: 0.1 });
      tl.to(q('.hero-city'),       { opacity: 1,    duration: 0.7, ease: 'power2.out' })
        .to(q('.hero-grid'),       { opacity: 1,    duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to(q('.hero-canvas-wrap'),{ opacity: 1,    duration: 0.8, ease: 'power2.out' }, '-=0.3')
        .to(q('.hero-panels'),     { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12 }, '-=0.2')
        .to(q('.hero-text'),       { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .to(q('.hero-ctas'),       { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, '-=0.2');
    };
    run();
  }, []);

  /* ── Holo panel data ─────────────────────────────────────────────── */
  const panels = [
    { label: 'Revenue Growth',  value: '+312%', sub: 'Avg. client uplift',  accent: colors.neonCyan },
    { label: 'CPM Increase',    value: '4.8×',  sub: '12-month average',    accent: colors.neonPurpleLight },
    { label: 'Channels Managed',value: '240+',  sub: 'Global creator roster',accent: colors.neonAmber },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* L1 — Deep space base (always visible, BG color from body) */}

      {/* L2 — Cyberpunk city skyline (CSS drawn) */}
      <div
        className="hero-city absolute inset-0 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          style={{ height: '55%', opacity: 0.18 }}
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Buildings */}
          {[
            [0,220,60,180],[70,260,45,140],[125,200,80,200],[215,280,35,120],
            [260,180,70,220],[340,240,55,160],[405,200,90,200],[505,260,40,140],
            [555,170,75,230],[640,250,50,150],[700,200,65,200],[775,270,45,130],
            [830,190,80,210],[920,260,35,140],[965,180,70,220],[1045,240,55,160],
            [1110,200,90,200],[1210,265,40,135],[1260,175,75,225],[1345,255,95,145],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill="#0d1b3e" />
          ))}
          {/* Neon window dots */}
          {Array.from({ length: 180 }, (_, i) => (
            <rect
              key={`w${i}`}
              x={Math.random() * 1440}
              y={100 + Math.random() * 240}
              width={3}
              height={4}
              fill={i % 3 === 0 ? '#0066ff' : i % 3 === 1 ? '#00d4ff' : '#7c3aed'}
              opacity={0.4 + Math.random() * 0.5}
            />
          ))}
        </svg>
        {/* Horizon glow */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '35%',
            background: 'linear-gradient(to top, rgba(0,102,255,0.12) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* L3 — Neon perspective grid floor */}
      <div
        className="hero-grid absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ opacity: 0, height: '45%' }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0066ff" stopOpacity="0" />
              <stop offset="60%" stopColor="#0066ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0066ff" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {/* Converging horizontal lines */}
          {Array.from({ length: 14 }, (_, i) => {
            const y = 120 + i * 20;
            const fade = i / 14;
            return (
              <line
                key={`h${i}`}
                x1={0} y1={y} x2={800} y2={y}
                stroke="#0066ff"
                strokeOpacity={0.08 + fade * 0.3}
                strokeWidth={0.5}
              />
            );
          })}
          {/* Vanishing vertical lines */}
          {Array.from({ length: 19 }, (_, i) => {
            const xTop = 400 + (i - 9) * 14;
            const xBot = (i / 18) * 800;
            return (
              <line
                key={`v${i}`}
                x1={xTop} y1={120} x2={xBot} y2={400}
                stroke="#0066ff"
                strokeOpacity={0.18}
                strokeWidth={0.5}
              />
            );
          })}
        </svg>
      </div>

      {/* L4 — Three.js globe */}
      <div
        className="hero-canvas-wrap absolute inset-0 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* L5 — Floating holo panels */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {panels.map((p, i) => (
          <div
            key={i}
            className="hero-panels absolute animate-float"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              top: `${22 + i * 20}%`,
              left: i === 0 ? '5%' : i === 1 ? '78%' : '82%',
              animationDelay: `${i * 0.8}s`,
            }}
          >
            <div
              className="glass-panel px-4 py-3 min-w-[140px]"
              style={{
                borderColor: `${p.accent}40`,
                background: `rgba(5,10,24,0.75)`,
                backdropFilter: 'blur(12px)',
                boxShadow: `0 0 20px ${p.accent}22`,
              }}
            >
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted mb-0.5">
                {p.label}
              </p>
              <p
                className="font-display text-2xl font-black"
                style={{ color: p.accent }}
              >
                {p.value}
              </p>
              <p className="font-mono text-[9px] text-ink-muted mt-0.5">{p.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* L6 — Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
        }}
      />

      {/* L7 — Hero text & CTAs */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center min-h-screen px-6 pt-20 pb-16">
        {/* Eyebrow */}
        <div className="hero-text mb-6" style={{ opacity: 0, transform: 'translateY(24px)' }}>
          <span className="badge-cyan">⚡ Premium YouTube Growth Agency</span>
        </div>

        {/* Headline */}
        <div className="hero-text" style={{ opacity: 0, transform: 'translateY(24px)' }}>
          <h1 className="text-gradient-hero max-w-4xl mx-auto mb-2">
            Turn Views Into
          </h1>
          <h1
            className="max-w-4xl mx-auto mb-6"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 50%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              // Glitch effect via text-shadow
              filter: 'drop-shadow(0 0 12px rgba(0,102,255,0.5))',
            }}
          >
            Revenue Machines
          </h1>
          <p className="text-ink-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We engineer YouTube channels into automated revenue engines — CPM optimization, AI-powered content strategy, and monetization systems that scale while you sleep.
          </p>
        </div>

        {/* CTAs */}
        <div
          className="hero-ctas flex flex-col sm:flex-row gap-4 mt-8"
          style={{ opacity: 0, transform: 'translateY(16px)' }}
        >
          <a
            href="/#apply"
            className="btn-primary text-sm px-8 py-4 font-display tracking-wider"
            style={{ boxShadow: '0 0 28px rgba(0,102,255,0.4)' }}
          >
            🚀 Get Free Revenue Audit
          </a>
          <a
            href="/#reviews"
            className="btn-ghost text-sm px-8 py-4 font-display tracking-wider"
          >
            📊 See Client Results
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-ink-muted animate-bounce">
            <span className="font-mono text-[9px] uppercase tracking-widest">Scroll</span>
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
