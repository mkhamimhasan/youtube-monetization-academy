import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { colors, bloom as bloomDefaults } from '@/theme/tokens';

/* ─── GSAP import (CDN-safe dynamic) ──────────────────────────────── */
let gsap;
(async () => { try { gsap = (await import('gsap')).gsap; } catch {} })();

const FIRE = {
  core:      0x2d0a5e,
  wireframe: 0x4da6ff,
  node:      0xa78bfa,
  arc:       0x7c3aed,
  particle:  0x00d4ff,
};
const FIRE_STOPS = [
  new THREE.Color(0xffffff),
  new THREE.Color(0x00d4ff),
  new THREE.Color(0x7c3aed),
  new THREE.Color(0x1a0a3e),
];

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ─── Device tier detection ────────────────────────────────────
       Mobile / low-end devices get a lighter scene: fewer particles,
       lower-poly geometry, no bloom post-processing, capped DPR.
       This is what was blowing up Total Blocking Time on mobile. */
    const isMobile   = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
    const lowPower   = (navigator.hardwareConcurrency || 8) <= 4;
    const isLite     = isMobile || lowPower;

    const PARTICLE_COUNT = isLite ? 900  : 6000;
    const NODE_COUNT     = isLite ? 16   : 32;
    const ARC_COUNT      = isLite ? 6    : 12;
    const USE_BLOOM      = !isLite;

    let cancelled = false;
    let cleanupFns = [];

    // Defer the heavy scene build until the browser is idle so it
    // doesn't block the main thread during initial load/paint.
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1));
    const cancelIdle = window.cancelIdleCallback || clearTimeout;
    const idleHandle = idle(() => {
      if (cancelled) return;
      buildScene();
    });

    function buildScene() {

    const W = canvas.clientWidth;
    const H = canvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isLite, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLite ? 1 : 2));
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 10.5);

    scene.add(new THREE.AmbientLight(0x1a1a3e, 1.2));
    const keyLight = new THREE.PointLight(0x7c3aed, 3.4, 20);
    keyLight.position.set(3, 2, 3);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x00d4ff, 1.6, 20);
    rimLight.position.set(-3, -1, -2);
    scene.add(rimLight);

    const globeGroup = new THREE.Group();
    globeGroup.position.set(0, -0.35, 0);
    scene.add(globeGroup);
    const GLOBE_R = 1.3;

    const coreGeo = new THREE.SphereGeometry(GLOBE_R, isLite ? 28 : 64, isLite ? 28 : 64);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a2e,
      emissive: new THREE.Color(0x7c3aed),
      emissiveIntensity: 0.32,
      roughness: 0.55,
      metalness: 0.1,
      transparent: true,
      opacity: 0.95,
    });
    globeGroup.add(new THREE.Mesh(coreGeo, coreMat));

    const hotspotGeo = new THREE.SphereGeometry(GLOBE_R * 0.22, isLite ? 12 : 24, isLite ? 12 : 24);
    const hotspotMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const hotspot = new THREE.Mesh(hotspotGeo, hotspotMat);
    hotspot.position.set(GLOBE_R * 0.55, GLOBE_R * 0.2, GLOBE_R * 0.8);
    globeGroup.add(hotspot);

    const gridGeo = new THREE.SphereGeometry(GLOBE_R * 1.005, isLite ? 16 : 32, isLite ? 12 : 24);
    const gridMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(FIRE.wireframe),
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    globeGroup.add(new THREE.Mesh(gridGeo, gridMat));

    const atmGeo = new THREE.SphereGeometry(GLOBE_R * 1.18, isLite ? 20 : 48, isLite ? 20 : 48);
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { glowColor: { value: new THREE.Color(0x7c3aed) } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(glowColor, intensity * 1.1);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    globeGroup.add(new THREE.Mesh(atmGeo, atmMat));

    function createOrbitRing(radius, tiltX, tiltZ) {
      const pts = [];
      const segments = isLite ? 48 : 128;
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
      }
      const curve = new THREE.CatmullRomCurve3(pts, true);
      const tubeGeo = new THREE.TubeGeometry(curve, segments, 0.006, 5, true);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(tubeGeo, tubeMat);
      mesh.rotation.x = tiltX;
      mesh.rotation.z = tiltZ;
      globeGroup.add(mesh);
      return { mesh, curve };
    }
    const orbitRings = [
      createOrbitRing(GLOBE_R * 1.35, 0.45, 0.15),
      createOrbitRing(GLOBE_R * 1.55, -0.35, 0.5),
    ];
    const orbitEmberGeo = new THREE.SphereGeometry(0.022, 8, 8);
    const orbitEmbers = orbitRings.map((ring) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
      const mesh = new THREE.Mesh(orbitEmberGeo, mat);
      globeGroup.add(mesh);
      return { ring, mesh, progress: Math.random(), speed: 0.05 + Math.random() * 0.04 };
    });

    const nodeGeo  = new THREE.SphereGeometry(0.045, 8, 8);
    const nodeMeshes = [];
    const nodePositions = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const pos  = randomSpherePoint(GLOBE_R * 1.01);
      const mat  = new THREE.MeshBasicMaterial({ color: new THREE.Color(FIRE.node), transparent: true, opacity: 0.95 });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.copy(pos);
      globeGroup.add(mesh);
      nodeMeshes.push(mesh);
      nodePositions.push(pos);
    }

    for (let i = 0; i < ARC_COUNT; i++) {
      const a   = nodePositions[Math.floor(Math.random() * NODE_COUNT)];
      const b   = nodePositions[Math.floor(Math.random() * NODE_COUNT)];
      const crv = createArc(a, b, GLOBE_R * 1.01);
      const pts = crv.getPoints(isLite ? 20 : 40);
      const g   = new THREE.BufferGeometry().setFromPoints(pts);
      const m   = new THREE.LineBasicMaterial({
        color: new THREE.Color(FIRE.arc),
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      globeGroup.add(new THREE.Line(g, m));
    }

    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pColors    = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 14;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const t   = Math.random();
      const idx = t * (FIRE_STOPS.length - 1);
      const c   = FIRE_STOPS[Math.floor(idx)]
        .clone()
        .lerp(FIRE_STOPS[Math.min(Math.ceil(idx), FIRE_STOPS.length - 1)], idx % 1);
      pColors[i * 3]     = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.025,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    let composer = null;
    if (USE_BLOOM) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloomPass = new UnrealBloomPass(new THREE.Vector2(W, H), 0.5, 0.5, 0.65);
      composer.addPass(bloomPass);
    }

    let targetRX = 0, targetRY = 0;
    let currentRX = 0, currentRY = 0;
    const onMouseMove = (e) => {
      targetRX = ((e.clientY / window.innerHeight) - 0.5) * 0.4;
      targetRY = ((e.clientX / window.innerWidth)  - 0.5) * 0.6;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      const nW = canvas.clientWidth, nH = canvas.clientHeight;
      renderer.setSize(nW, nH);
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      if (composer) composer.setSize(nW, nH);
    };
    window.addEventListener('resize', onResize);

    let frame;
    const clock = new THREE.Clock();
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();

      currentRX += (targetRX - currentRX) * 0.05;
      currentRY += (targetRY - currentRY) * 0.05;
      globeGroup.rotation.y = t * 0.08 + currentRY;
      globeGroup.rotation.x = currentRX;

      nodeMeshes.forEach((mesh, idx) => {
        mesh.material.opacity = 0.5 + 0.5 * Math.sin(t * 1.5 + idx * 0.4);
      });

      orbitEmbers.forEach((oe) => {
        oe.progress += dt * oe.speed;
        if (oe.progress > 1) oe.progress -= 1;
        const p = oe.ring.curve.getPointAt(oe.progress).clone();
        p.applyEuler(oe.ring.mesh.rotation);
        oe.mesh.position.copy(p);
      });

      if (composer) composer.render();
      else renderer.render(scene, camera);
    };
    tick();

    cleanupFns.push(() => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    });
    } // end buildScene

    return () => {
      cancelled = true;
      cancelIdle(idleHandle);
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  useEffect(() => {
    const run = async () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const g = gsap || (await import('gsap')).gsap;
      const el = sectionRef.current;
      if (!el) return;

      const q = (sel) => el.querySelector(sel);

      g.set([q('.hero-city'), q('.hero-grid'), q('.hero-canvas-wrap'), q('.hero-panels'), q('.hero-text'), q('.hero-bottom-cards')], {
        opacity: 0,
      });

      const tl = g.timeline({ delay: 0.1 });
      tl.to(q('.hero-city'),         { opacity: 1,    duration: 0.7, ease: 'power2.out' })
        .to(q('.hero-grid'),         { opacity: 1,    duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to(q('.hero-canvas-wrap'),  { opacity: 1,    duration: 0.8, ease: 'power2.out' }, '-=0.3')
        .to(q('.hero-panels'),       { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12 }, '-=0.2')
        .to(q('.hero-text'),         { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .to(q('.hero-bottom-cards'), { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
    };
    run();
  }, []);

  /* ── UPDATED: clearer panel data ─────────────────────────────────── */
  const panels = [
    { label: 'Response Time',   value: '48h',    sub: 'Avg. turnaround',   accent: '#4da6ff' },
    { label: 'Revisions',       value: '3–∞',    sub: 'Depending on plan', accent: '#a78bfa' },
    { label: 'Communication',   value: '1-on-1', sub: 'Direct with you',   accent: '#00d4ff' },
  ];

  const whyUsNormal = [
    { icon: '💬', text: 'Direct 1-on-1 communication' },
    { icon: '🎯', text: 'Custom-coded — no templates' },
  ];

  const whyUsPremium = [
    { icon: '💬', text: 'Direct 1-on-1 communication' },
    { icon: '🔁', text: 'Unlimited revisions' },
  ];

  const process = [
    { num: '01', text: 'Brief & discovery call' },
    { num: '02', text: 'Design & prototype' },
    { num: '03', text: 'Build & revise' },
    { num: '04', text: 'Deliver & support' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* L2 — Cyberpunk city skyline */}
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
          {[
            [0,220,60,180],[70,260,45,140],[125,200,80,200],[215,280,35,120],
            [260,180,70,220],[340,240,55,160],[405,200,90,200],[505,260,40,140],
            [555,170,75,230],[640,250,50,150],[700,200,65,200],[775,270,45,130],
            [830,190,80,210],[920,260,35,140],[965,180,70,220],[1045,240,55,160],
            [1110,200,90,200],[1210,265,40,135],[1260,175,75,225],[1345,255,95,145],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill="#0a0a1f" />
          ))}
          {Array.from({ length: 180 }, (_, i) => (
            <rect
              key={`w${i}`}
              x={Math.random() * 1440}
              y={100 + Math.random() * 240}
              width={3}
              height={4}
              fill={i % 3 === 0 ? '#0066ff' : i % 3 === 1 ? '#4da6ff' : '#00d4ff'}
              opacity={0.4 + Math.random() * 0.5}
            />
          ))}
        </svg>
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '35%',
            background: 'linear-gradient(to top, rgba(124,58,237,0.14) 0%, transparent 100%)',
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
              <stop offset="0%" stopColor="#4da6ff" stopOpacity="0" />
              <stop offset="60%" stopColor="#4da6ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4da6ff" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {Array.from({ length: 14 }, (_, i) => {
            const y = 120 + i * 20;
            const fade = i / 14;
            return (
              <line key={`h${i}`} x1={0} y1={y} x2={800} y2={y}
                stroke="#4da6ff" strokeOpacity={0.08 + fade * 0.3} strokeWidth={0.5} />
            );
          })}
          {Array.from({ length: 19 }, (_, i) => {
            const xTop = 400 + (i - 9) * 14;
            const xBot = (i / 18) * 800;
            return (
              <line key={`v${i}`} x1={xTop} y1={120} x2={xBot} y2={400}
                stroke="#4da6ff" strokeOpacity={0.18} strokeWidth={0.5} />
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

      {/* Vignette behind text */}
      <div
        className="absolute inset-0 pointer-events-none z-[15]"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 50% 48%, rgba(4,6,14,0.55) 0%, rgba(4,6,14,0.15) 55%, transparent 75%)',
        }}
      />

      {/* L5 — Floating holo panels — UPDATED for better readability */}
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
              className="solid-panel px-4 py-3 min-w-[148px]"
              style={{
                borderColor: `${p.accent}45`,
                boxShadow: `0 0 24px ${p.accent}28`,
              }}
            >
              {/* Label — accent color, fully visible */}
              <p
                className="font-mono text-[10px] uppercase tracking-widest mb-1"
                style={{ color: p.accent, opacity: 0.9 }}
              >
                {p.label}
              </p>
              {/* Value — large, bright */}
              <p
                className="font-display text-2xl font-black leading-none"
                style={{ color: p.accent, textShadow: `0 0 18px ${p.accent}88` }}
              >
                {p.value}
              </p>
              {/* Sub — light slate, clearly readable */}
              <p
                className="font-mono text-[10px] mt-1 leading-snug"
                style={{ color: '#94a3b8' }}
              >
                {p.sub}
              </p>
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

      {/* L7 — Hero text, CTAs, and bottom cards */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center min-h-screen px-6 pt-20 pb-20">

        {/* Eyebrow badge */}
        <div className="hero-text mb-6" style={{ opacity: 0, transform: 'translateY(24px)' }}>
          <span className="badge-cyan">
            ⚡ Website Creation & Video Editing
          </span>
        </div>

        {/* Headline */}
        <div className="hero-text" style={{ opacity: 0, transform: 'translateY(24px)' }}>
          <h1 className="text-gradient-hero max-w-4xl mx-auto mb-2">
            Turn Ideas Into
          </h1>
          <h1
            className="max-w-4xl mx-auto mb-6"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #4da6ff 50%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 12px rgba(124,58,237,0.5))',
            }}
          >
            Finished Work
          </h1>
          <p className="text-ink-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We build websites, edit video, and craft brand identities — clean, custom-coded work
            with clear pricing and direct communication from start to finish.
          </p>
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

      {/* ── Below globe: Why Choose Us + Our Process ─────────────────── */}
      <div
        className="hero-bottom-cards relative z-20 w-full px-6 pb-20"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">

          {/* Why Choose Us — Normal */}
          <div
            className="rounded-xl px-6 py-5 text-left"
            style={{
              background: 'rgba(77,166,255,0.05)',
              border: '0.5px solid rgba(77,166,255,0.22)',
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#4da6ff' }}>
              ✦ Why Choose Us
            </p>
            <span
              className="inline-block font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ background: 'rgba(77,166,255,0.1)', color: '#4da6ff', border: '0.5px solid rgba(77,166,255,0.3)' }}
            >
              Normal
            </span>
            <ul className="space-y-3">
              {whyUsNormal.map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm" style={{ color: '#e2e8f0' }}>
                  <span>{icon}</span><span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Choose Us — Premium */}
          <div
            className="rounded-xl px-6 py-5 text-left"
            style={{
              background: 'rgba(124,58,237,0.07)',
              border: '0.5px solid rgba(167,139,250,0.35)',
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: '#a78bfa' }}>
              ✦ Why Choose Us
            </p>
            <span
              className="inline-block font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full mb-4"
              style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa', border: '0.5px solid rgba(167,139,250,0.4)' }}
            >
              ⭐ Premium
            </span>
            <ul className="space-y-3">
              {whyUsPremium.map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm" style={{ color: '#c4b5fd' }}>
                  <span>{icon}</span><span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}