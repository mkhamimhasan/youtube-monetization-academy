import { useRef, useState, useCallback } from 'react';

/**
 * BeforeAfterSlider — drag/touch handle reveals "after" over "before".
 * Uses CSS gradient blocks as stand-ins for real screenshots (no binary
 * assets in this build), keeping the interaction fully functional.
 */
export default function BeforeAfterSlider({ beforeLabel = 'Before', afterLabel = 'After', beforeColor = '#1e293b', afterColor = '#0066ff', metric }) {
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
        className="relative h-56 md:h-64 rounded-card overflow-hidden select-none cursor-ew-resize border border-line"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={stopDrag}
      >
        {/* Before layer (full width) */}
        <div
          className="absolute inset-0 flex items-end p-4"
          style={{ background: `linear-gradient(135deg, ${beforeColor}, #050a18)` }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">{beforeLabel}</span>
        </div>

        {/* After layer (clipped by pos) */}
        <div
          className="absolute inset-0 flex items-end p-4"
          style={{
            background: `linear-gradient(135deg, ${afterColor}, #050a18)`,
            clipPath: `inset(0 0 0 ${pos}%)`,
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-white">{afterLabel}</span>
        </div>

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80"
          style={{ left: `${pos}%`, boxShadow: '0 0 12px rgba(255,255,255,0.6)' }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'rgba(0,102,255,0.85)', boxShadow: '0 0 16px rgba(0,102,255,0.6)' }}
          >
            ↔
          </div>
        </div>
      </div>

      {metric && (
        <p className="text-center text-xs text-ink-muted mt-3 font-mono">{metric}</p>
      )}
    </div>
  );
}
