import { useEffect, useState, useRef } from 'react';
import { useMotionValue, useSpring } from 'motion/react';

/**
 * Counts a figure up to its final value when it scrolls into view.
 *
 * Figures are authored in the CMS as free text — "350M+", "100+", "36+", "1:1" — so
 * this parses the leading number and animates that, leaving everything around it
 * untouched. A value with no leading number ("1:1") renders as written rather than
 * animating to nonsense.
 *
 * It animates once. A number that re-counted every time it scrolled past would read
 * as decoration; counting once reads as a figure being presented.
 */
export function CountUp({
  value,
  duration = 1.6,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const match = /^(\D*)(\d[\d,]*)(.*)$/.exec(value.trim());
  const target = match ? Number(match[2].replace(/,/g, '')) : null;
  const lead = match?.[1] ?? '';
  const tail = match?.[3] ?? '';

  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [shown, setShown] = useState(0);
  const [counting, setCounting] = useState(false);

  // Someone who asked for less motion gets the number, not the performance.
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  /* Counts once, when the figure first comes into view. The real value is in the DOM
     until then, so readers that never scroll (crawlers, screen readers) get the number. */
  useEffect(() => {
    if (target === null || reduceMotion) return;
    const el = ref.current;
    const begin = () => { setCounting(true); motionValue.set(target); };
    if (!el || typeof IntersectionObserver === 'undefined') {
      const t = window.setTimeout(begin, 250);
      return () => window.clearTimeout(t);
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { begin(); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, motionValue, reduceMotion]);

  useEffect(() => spring.on('change', (v) => setShown(Math.floor(v))), [spring]);

  // Anything we cannot parse is published exactly as the CMS holds it.
  if (target === null) return <span ref={ref} className={className}>{value}</span>;

  // Until the count actually starts, the real figure is on the page. Rendering 0
  // by default meant the homepage literally read "0M+" to anyone who had not
  // scrolled — including anything reading the page without a viewport.
  return (
    <span ref={ref} className={className}>
      {counting ? `${lead}${shown.toLocaleString()}${tail}` : value}
    </span>
  );
}
