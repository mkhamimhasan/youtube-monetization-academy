import { useRef, useState, useCallback } from 'react';

/**
 * BeforeAfterSlider — drag/touch handle reveals "after" over "before".
 * Used to showcase website redesigns and video colour-grade transformations.
 */
export default function BeforeAfterSlider({
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeBg = 'linear-gradient(135deg, #1e293b 0%, #050a18 100%)',
  afterBg = 'linear-gradient(135deg, #0f2a4a 0%, #0066ff 60%, #00d4ff 100%)',
  caption,
  beforeContent,
  afterContent,
}) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    updateFromClientX(e.clientX ?? e.touches?.[0]?.clientX);
    e.preventDefault();
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX ?? e.touches?.[0]?.clientX);
  };
  const stopDrag = () => { dragging.current = false; };

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        className="relative h-56 md:h-72 rounded-card overflow-hidden select-none cursor-ew-resize border border-line"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={stopDrag}
      >
        {/* Before layer */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-4"
          style={{ background: beforeBg }}
        >
          {/* Mock "before" UI skeleton */}
          <div className="flex flex-col gap-2 opacity-40">
            <div className="h-2 w-24 rounded bg-white/30" />
            <div className="h-2 w-40 rounded bg-white/20" />
            <div className="h-2 w-32 rounded bg-white/20" />
          </div>
          {beforeContent}
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
            {beforeLabel}
          </span>
        </div>

        {/* After layer (clipped) */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-4"
          style={{
            background: afterBg,
            clipPath: `inset(0 ${100 - pos}% 0 0)`,
          }}
        >
          {/* Mock "after" UI skeleton — cleaner, sharper */}
          <div className="flex flex-col gap-2">
            <div className="h-2 w-24 rounded bg-white/80" />
            <div className="h-2 w-40 rounded bg-white/50" />
            <div className="h-2 w-32 rounded bg-white/40" />
          </div>
          {afterContent}
          <span className="font-mono text-[10px] uppercase tracking-widest text-white">
            {afterLabel}
          </span>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/90 pointer-events-none"
          style={{ left: `${pos}%` }}
        >
          {/* Handle knob */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(0,102,255,0.9)',
              boxShadow: '0 0 0 2px rgba(255,255,255,0.8), 0 0 20px rgba(0,102,255,0.5)',
            }}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5h12M1 5l3-3M1 5l3 3M13 5l-3-3M13 5l-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Before/After badges */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span
            className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded"
            style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.5)' }}
          >
            Before
          </span>
        </div>
        <div
          className="absolute top-3 pointer-events-none transition-opacity duration-200"
          style={{ right: `${100 - pos}%`, paddingRight: '0.75rem', opacity: pos > 15 ? 1 : 0 }}
        >
          <span
            className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded"
            style={{ background: 'rgba(0,102,255,0.7)', color: 'white' }}
          >
            After
          </span>
        </div>
      </div>

      {caption && (
        <p className="text-center text-xs text-ink-muted mt-3 font-mono">{caption}</p>
      )}
    </div>
  );
}