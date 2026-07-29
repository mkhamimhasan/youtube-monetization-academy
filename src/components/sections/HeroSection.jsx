import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { colors, bloom as bloomDefaults } from '@/theme/tokens';

/* ─── GSAP import (CDN-safe dynamic) ──────────────────────────────── */
let gsap;
(async () => { try { gsap = (await import('gsap')).gsap; } catch {} })();

/* ─── CONSTANTS ───────────────────────────────────────────────────── */
const PARTICLE_COUNT = 6000;
const NODE_COUNT     = 32;
const ARC_COUNT      = 12;

/* ─── FIRE GLOBE PALETTE ──────────────────────────────────────────── */
const FIRE = {
  core:      0xff4d00, // inner glow sphere
  wireframe: 0xffae00, // icosahedron wireframe
  node:      0xffcc55, // surface nodes
  arc:       0xff5500, // arc lines between nodes
  particle:  0xffb347, // fallback ambient particle color
};
// Multi-stop gradient used for per-particle fire coloring (hot core -> ember)
const FIRE_STOPS = [
  new THREE.Color(0xffee00), // yellow-white hot
  new THREE.Color(0xff9500), // orange
  new THREE.Color(0xff3d00), // red-orange
  new THREE.Color(0x8a0000), // deep ember
];

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

  /* ── Three.js Globe (glowing fire sun + bloom) ─────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.clientWidth;
    const H = canvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    /* --- Lights (drive the emissive core + rim glow) --- */
    scene.add(new THREE.AmbientLight(0x552200, 1.2));
    const keyLight = new THREE.PointLight(0xff9500, 3.4, 20);
    keyLight.position.set(3, 2, 3);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xff6a00, 1.6, 20);
    rimLight.position.set(-3, -1, -2);
    scene.add(rimLight);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    const GLOBE_R = 1.7;

    /* --- Solid emissive core (the "sun") --- */
    const coreGeo = new THREE.SphereGeometry(GLOBE_R, 64, 64);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x220400,
      emissive: new THREE.Color(0xff8c00),
      emissiveIntensity: 0.45,
      roughness: 0.55,
      metalness: 0.1,
      transparent: true,
      opacity: 0.95,
    });
    globeGroup.add(new THREE.Mesh(coreGeo, coreMat));

    /* --- Bright hotspot (fixed on the sphere, rotates with it — the "sun flare" patch) --- */
    const hotspotGeo = new THREE.SphereGeometry(GLOBE_R * 0.32, 24, 24);
    const hotspotMat = new THREE.MeshBasicMaterial({
      color: 0xffffcc,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const hotspot = new THREE.Mesh(hotspotGeo, hotspotMat);
    hotspot.position.set(GLOBE_R * 0.55, GLOBE_R * 0.2, GLOBE_R * 0.8);
    globeGroup.add(hotspot);

    /* --- Lat/long wireframe grid --- */
    const gridGeo = new THREE.SphereGeometry(GLOBE_R * 1.005, 32, 24);
    const gridMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(FIRE.wireframe),
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    globeGroup.add(new THREE.Mesh(gridGeo, gridMat));

    /* --- Outer atmosphere glow (rim-light shader) --- */
    const atmGeo = new THREE.SphereGeometry(GLOBE_R * 1.18, 48, 48);
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { glowColor: { value: new THREE.Color(0xff5500) } },
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

    /* --- Orbital fire rings (comet trail effect around the globe) --- */
    function createOrbitRing(radius, tiltX, tiltZ) {
      const pts = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
      }
      const curve = new THREE.CatmullRomCurve3(pts, true);
      const tubeGeo = new THREE.TubeGeometry(curve, 128, 0.006, 6, true);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0xff8c00,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(tubeGeo, tubeMat);
      mesh.rotation.x = tiltX;
      mesh.rotation.z = tiltZ;
      scene.add(mesh);
      return { mesh, curve };
    }
    const orbitRings = [
      createOrbitRing(GLOBE_R * 1.35, 0.45, 0.15),
      createOrbitRing(GLOBE_R * 1.55, -0.35, 0.5),
    ];
    const orbitEmberGeo = new THREE.SphereGeometry(0.022, 8, 8);
    const orbitEmbers = orbitRings.map((ring) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0xffee00, transparent: true, opacity: 0.95 });
      const mesh = new THREE.Mesh(orbitEmberGeo, mat);
      scene.add(mesh);
      return { ring, mesh, progress: Math.random(), speed: 0.05 + Math.random() * 0.04 };
    });

    /* --- Surface nodes (embers) --- */
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

    /* --- Arc lines between nodes (fire trails) --- */
    for (let i = 0; i < ARC_COUNT; i++) {
      const a   = nodePositions[Math.floor(Math.random() * NODE_COUNT)];
      const b   = nodePositions[Math.floor(Math.random() * NODE_COUNT)];
      const crv = createArc(a, b, GLOBE_R * 1.01);
      const pts = crv.getPoints(40);
      const g   = new THREE.BufferGeometry().setFromPoints(pts);
      const m   = new THREE.LineBasicMaterial({
        color: new THREE.Color(FIRE.arc),
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      globeGroup.add(new THREE.Line(g, m));
    }

    /* --- Ambient particles (fire gradient: hot core -> ember) --- */
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

    /* --- Bloom post-processing (the glow bleed that makes it look like a sun) --- */
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(W, H), 0.9, 0.55, 0.28);
    composer.addPass(bloomPass);

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
      composer.setSize(nW, nH);
    };
    window.addEventListener('resize', onResize);

    /* --- Animate --- */
    let frame;
    const clock = new THREE.Clock();
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();

      // Auto-rotate + mouse parallax
      currentRX += (targetRX - currentRX) * 0.05;
      currentRY += (targetRY - currentRY) * 0.05;
      globeGroup.rotation.y = t * 0.08 + currentRY;
      globeGroup.rotation.x = currentRX;

      // Pulse node opacity (flickering ember effect)
      nodeMeshes.forEach((mesh, idx) => {
        mesh.material.opacity = 0.5 + 0.5 * Math.sin(t * 1.5 + idx * 0.4);
      });

      // Orbit embers traveling along their ring paths
      orbitEmbers.forEach((oe) => {
        oe.progress += dt * oe.speed;
        if (oe.progress > 1) oe.progress -= 1;
        const p = oe.ring.curve.getPointAt(oe.progress).clone();
        p.applyEuler(oe.ring.mesh.rotation);
        oe.mesh.position.copy(p);
      });

      composer.render();
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
    { label: 'Revenue Growth',  value: '+312%', sub: 'Avg. client uplift',  accent: '#ffb347' },
    { label: 'CPM Increase',    value: '4.8×',  sub: '12-month average',    accent: '#ff6a00' },
    { label: 'Channels Managed',value: '240+',  sub: 'Global creator roster',accent: '#ffee00' },
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
            <rect key={i} x={x} y={y} width={w} height={h} fill="#1a0a05" />
          ))}
          {/* Neon window dots */}
          {Array.from({ length: 180 }, (_, i) => (
            <rect
              key={`w${i}`}
              x={Math.random() * 1440}
              y={100 + Math.random() * 240}
              width={3}
              height={4}
              fill={i % 3 === 0 ? '#ff3d00' : i % 3 === 1 ? '#ff9500' : '#ffee00'}
              opacity={0.4 + Math.random() * 0.5}
            />
          ))}
        </svg>
        {/* Horizon glow */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '35%',
            background: 'linear-gradient(to top, rgba(255,90,0,0.18) 0%, transparent 100%)',
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
              <stop offset="0%" stopColor="#ff6a00" stopOpacity="0" />
              <stop offset="60%" stopColor="#ff6a00" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ff6a00" stopOpacity="0.5" />
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
                stroke="#ff6a00"
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
                stroke="#ff6a00"
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
          <span
            className="badge-cyan"
            style={{
              color: '#ffb347',
              borderColor: 'rgba(255,140,0,0.4)',
              background: 'rgba(255,90,0,0.08)',
              boxShadow: '0 0 16px rgba(255,90,0,0.25)',
              textShadow: '0 0 8px rgba(255,140,0,0.5)',
            }}
          >
            ⚡ Premium YouTube Growth Agency
          </span>
        </div>

        {/* Headline */}
        <div className="hero-text" style={{ opacity: 0, transform: 'translateY(24px)' }}>
          <h1 className="text-gradient-hero max-w-4xl mx-auto mb-2">
            Turn Views Into
          </h1>
          <h1
            className="max-w-4xl mx-auto mb-6"
            style={{
              background: 'linear-gradient(135deg, #ffee00 0%, #ff9500 50%, #ff3d00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              // Glitch effect via text-shadow
              filter: 'drop-shadow(0 0 12px rgba(255,90,0,0.6))',
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
            style={{
              background: 'linear-gradient(135deg, #ff9500 0%, #ff3d00 100%)',
              boxShadow: '0 0 28px rgba(255,90,0,0.45)',
            }}
          >
            🚀 Get Free Revenue Audit
          </a>
          <a
            href="/#reviews"
            className="btn-ghost text-sm px-8 py-4 font-display tracking-wider"
            style={{
              borderColor: 'rgba(255,140,0,0.4)',
              color: '#ffb347',
            }}
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