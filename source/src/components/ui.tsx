import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';
import type { Photo } from '@/src/data/media';
import type { Metric } from '@/src/data/impact';

/**
 * Colour for a programme or story category, taken from the brand palette.
 * Enterprise gold, Education navy, Community bronze.
 */
const PILLAR_COLOURS = [
  'bg-gold text-ink',        // Enterprise — the logo gold, 10:1 with ink
  'bg-ink-soft text-white',  // Education — the wordmark navy
  'bg-bronze text-white',    // Community — the gradient's middle stop, 5:1
];

export function categoryTag(name: string, index = 0): string {
  const key = name.toLowerCase();
  if (key.includes('enterprise')) return PILLAR_COLOURS[0];
  if (key.includes('education'))  return PILLAR_COLOURS[1];
  if (key.includes('community'))  return PILLAR_COLOURS[2];
  if (key.includes('foundation')) return 'bg-ink text-white';
  return PILLAR_COLOURS[index % PILLAR_COLOURS.length];
}

/* ------------------------------------------------------------------ figures */

/**
 * Documentary photograph with the credit strip specified in the visual guide.
 * Every image on the site goes through here so no photo ships without a credit
 * and alt text.
 */
export function Figure({
  photo,
  ratio = 'aspect-[4/3]',
  className,
  priority = false,
}: {
  photo: Photo;
  ratio?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    /* The signature gradient sits behind every image, so a slot shows the brand
       while the photo loads — and still does if the photo never arrives. */
    <figure className={cn('surface-gradient relative overflow-hidden rounded-[3px]', ratio, className)}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover"
      />
      {photo.credit && <figcaption className="photo-credit">{photo.credit}</figcaption>}
    </figure>
  );
}

/* -------------------------------------------------------------------- typing */

export function SectionHead({
  eyebrow,
  title,
  aside,
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  aside?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-end md:justify-between gap-6', className)}>
      <div className="max-w-[34ch]">
        {eyebrow && <p className={cn('eyebrow mb-4', dark && 'eyebrow-dark')}>{eyebrow}</p>}
        <h2 className={cn('text-[30px] md:text-[42px]', dark && 'text-white')}>{title}</h2>
      </div>
      {aside && (
        <p className={cn('text-[14px] leading-relaxed max-w-[34ch]', dark ? 'text-white/60' : 'text-muted')}>
          {aside}
        </p>
      )}
    </div>
  );
}

export function ArrowLink({
  to, children, dark = false, external = false, className,
}: {
  to: string; children: ReactNode; dark?: boolean; external?: boolean; className?: string;
}) {
  const inner = (
    <>
      {children}
      {external
        ? <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        : <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />}
    </>
  );
  const cls = cn('link-arrow', dark && 'link-arrow-dark', className);
  return external
    ? <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link to={to} className={cls}>{inner}</Link>;
}

export function Breadcrumb({ trail }: { trail: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[12px] text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {item.path ? (
              <Link to={item.path} className="hover:text-ink transition-colors">{item.name}</Link>
            ) : (
              <span className="text-ink font-semibold">{item.name}</span>
            )}
            {i < trail.length - 1 && <span className="text-faint" aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* --------------------------------------------------------------------- stats */

/**
 * A single impact figure. When the value is unverified it renders a short rule
 * where the number will go — the label and reporting period still publish.
 * This is what keeps the site from asserting numbers nobody has checked.
 */
export function Stat({ metric, dark = false }: { metric: Metric; dark?: boolean }) {
  const pending = metric.status === 'pending' || !metric.value;

  return (
    <div>
      {pending ? (
        // ₦ and M sit in identical fixed-height boxes, centred on the same axis as the
        // rule. Aligning on the text baseline left them uneven, because the ₦ glyph does
        // not share the M's metrics.
        <div className="flex h-[30px] md:h-[40px] items-center gap-2" aria-label={metric.label}>
          {metric.prefix && (
            <span className={cn('figure-num flex h-full items-center', dark && 'figure-num-dark')}>
              {metric.prefix}
            </span>
          )}
          <span
            className={cn('block h-px w-10 md:w-14', dark ? 'bg-gold/50' : 'bg-rule')}
            aria-hidden="true"
          />
          {metric.prefix && (
            <span className={cn('figure-num flex h-full items-center', dark && 'figure-num-dark')}>
              M
            </span>
          )}
        </div>
      ) : (
        // A verified figure reads in gold — the palette's one accent — so a checked
        // number is visibly different from one still awaiting verification.
        // Only these gold weights work as text: 10:1 on ink, 4.9:1 on page.
        <p className={cn('figure-num', dark ? 'text-gold' : 'text-gold-ink')}>
          {metric.prefix}{metric.value}
        </p>
      )}

      <p className={cn('figure-label', dark && 'text-white')}>{metric.label}</p>
      <p className={cn('figure-note', dark && 'text-white/60')}>
        {metric.period}
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- CTA bands */

export function CtaBand({
  title, children, tone = 'cream',
}: {
  title: string; children: ReactNode; tone?: 'cream' | 'ink';
}) {
  const ink = tone === 'ink';
  return (
    <section className={cn('band-tight relative', ink ? 'band-ink' : 'bg-gold-tint')}>
      {/* The signature gradient, as a rule across the top of every strip. */}
      <span className="surface-gradient absolute inset-x-0 top-0 h-1" aria-hidden="true" />
      <div className="shell text-center">
        <h2 className={cn('text-[26px] md:text-[34px] mb-8', ink && 'text-white')}>{title}</h2>
        <div className="flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </section>
  );
}
