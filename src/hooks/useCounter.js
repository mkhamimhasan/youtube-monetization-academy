import { useEffect, useRef, useState } from 'react';

/**
 * useCounter — animates a number from 0 to `target` once the ref'd
 * element enters the viewport. Shared by Trust Bar, About stats, and
 * Portfolio counters so every animated number behaves identically.
 *
 * @param {number} target
 * @param {number} decimals
 * @param {number} duration ms
 */
export default function useCounter(target, decimals = 0, duration = 2000) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (ts) => {
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(+(target * eased).toFixed(decimals));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals, duration]);

  return { count, ref };
}
