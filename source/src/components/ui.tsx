import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';
import type { Photo } from '@/src/data/media';
import type { Metric } from '@/src/data/impact';

/**
 * Colour for a programme or story category, taken from the OCHF mark.
 * Enterprise gold, Education navy, Agriculture green, Wellbeing teal — the
 * assignment carries information, so a reader learns the mapping by seeing it.
 */
const PILLAR_COLOURS = [
  'bg-gold text-ink',        // gold — the mark's highlight
  'bg-ink-soft text-white',  // navy — the wordmark
  'bg-green text-white',     // green — the largest family after navy
  'bg-teal text-white',      // teal — where navy turns to green
];

export function categoryTag(name: string, index = 0): string {
  const key = name.toLowerCase();
  if (key.includes('enterprise'))  return PILLAR_COLOURS[0];
  if (key.includes('education'))   return PILLAR_COLOURS[1];
  if (key.includes('agriculture')) return PILLAR_COLOURS[2];
  if (key.includes('wellbeing'))   return PILLAR_COLOURS[3];
  if (key.includes('foundation'))  return 'bg-ink text-white';
  // Renamed or newly added programmes still get a colour from the mark rather
  // than falling back to flat navy.
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
    <figure className={cn('relative overflow-hidden bg-ink/5 rounded-[3px]', ratio, className)}>
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

/**
 * Stand-in for photography OCHF has not supplied yet. Deliberately looks like a
 * brief, not like a design element — it tells the client exactly what to shoot.
 */
export function PhotoSlot({ brief, ratio = 'aspect-[4/3]', className }: {
  brief: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative rounded-[3px] border border-dashed border-rule bg-cream/40',
        'flex items-center justify-center p-8',
        ratio,
        className,
      )}
    >
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-ink max-w-[26ch] leading-relaxed">
        Photograph to be supplied
        <span className="block mt-2 font-sans normal-case tracking-normal text-[12px] font-normal text-muted">
          {brief}
        </span>
      </p>
    </div>
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
        <div className="flex items-baseline gap-1.5" aria-label={`${metric.label}: figure pending verification`}>
          {metric.prefix && (
            <span className={cn('figure-num', dark && 'figure-num-dark')}>{metric.prefix}</span>
          )}
          <span
            className={cn('inline-block h-px w-10 md:w-14 translate-y-[-0.35em]',
              dark ? 'bg-gold-lift/50' : 'bg-rule')}
            aria-hidden="true"
          />
          {metric.prefix && (
            <span className={cn('figure-num', dark && 'figure-num-dark')}>M</span>
          )}
        </div>
      ) : (
        // A verified figure reads in green — the mark's growth colour — so a checked
        // number is visibly different from one still awaiting verification.
        <p className={cn('figure-num', dark ? 'text-green-lift' : 'text-green-ink')}>
          {metric.prefix}{metric.value}
        </p>
      )}

      <p className={cn('figure-label', dark && 'text-white')}>{metric.label}</p>
      <p className={cn('figure-note', dark && 'text-white/45')}>
        {metric.period}{pending && ' · pending verification'}
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
    <section className={cn('band-tight', ink ? 'bg-ink' : 'bg-cream')}>
      <div className="shell text-center">
        <h2 className={cn('text-[26px] md:text-[34px] mb-8', ink && 'text-white')}>{title}</h2>
        <div className="flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </section>
  );
}

/**
 * Honest empty state for pages whose copy OCHF has not yet supplied. Used instead
 * of inventing programme detail, governance policy or beneficiary narratives.
 */
export function AwaitingContent({ what, detail }: { what: string; detail?: string }) {
  return (
    <div className="border border-dashed border-rule bg-surface rounded-[3px] p-8 md:p-12 max-w-[62ch]">
      <p className="eyebrow mb-3">In preparation</p>
      <h3 className="text-[21px] mb-3">{what}</h3>
      <p className="text-[14.5px] text-muted leading-relaxed">
        {detail ?? 'This section is being written with the foundation and will publish once confirmed.'}
      </p>
    </div>
  );
}
