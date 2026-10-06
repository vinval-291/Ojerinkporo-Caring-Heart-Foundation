import { useEffect, useState, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

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
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (inView && target !== null) motionValue.set(target);
  }, [inView, target, motionValue]);

  useEffect(() => spring.on('change', (v) => setShown(Math.floor(v))), [spring]);

  // Anything we cannot parse is published exactly as the CMS holds it.
  if (target === null) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {lead}
      {shown.toLocaleString()}
      {tail}
    </span>
  );
}
