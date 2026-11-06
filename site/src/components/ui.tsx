import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, MapPin, CalendarDays, Users, Quote, Banknote, Briefcase, GraduationCap,
  MapPinned, Hammer, BarChart3, HeartHandshake, HeartPulse, HandHeart, Sprout, type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import { cn } from '@/src/lib/utils';
import type { Photo } from '@/src/data/media';
import type { Metric } from '@/src/data/impact';
import type { Story } from '@/src/data/stories';
import type { Partner, ProgrammeRecord } from '@/src/content/ContentProvider';
import { CountUp } from '@/src/components/Counter';

/* ---------------------------------------------------------------- icons */

/** An icon for an impact figure, chosen from what its label counts. */
export function metricIcon(label: string): LucideIcon {
  const l = label.toLowerCase();
  if (/invest|fund|naira|₦/.test(l)) return Banknote;
  if (/entrepreneur|business/.test(l)) return Briefcase;
  if (/student|scholar|school/.test(l)) return GraduationCap;
  if (/communit|state|location/.test(l)) return MapPinned;
  if (/job/.test(l)) return Hammer;
  return BarChart3;
}

/** An icon for a programme, chosen from its name, so a new programme still gets one. */
export function programmeIcon(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (/enterprise|business|agri/.test(n)) return Briefcase;
  if (/educat|scholar|human capital/.test(n)) return GraduationCap;
  if (/health|wellbeing/.test(n)) return HeartPulse;
  if (/humanitarian|welfare|relief/.test(n)) return HandHeart;
  if (/communit/.test(n)) return HeartHandshake;
  return Sprout;
}

/* ----------------------------------------------------------- the map mask */

/**
 * A photograph shown inside the map of Nigeria from the OCHF logo.
 *
 * The logo PNG is transparent around the map, so it works as a CSS mask. The map sits
 * in the box (89, 65)–(437, 366) of the 500×500 file; the inner layer is sized and
 * offset so exactly that box fills this element, and the "OCHF" lettering below it
 * falls outside and is clipped. The white facet lines in the mark come through as
 * thin gaps, which is what gives the photograph its faceted edge.
 */
export function MapPhoto({ photo, className, priority = false }: { photo: Photo; className?: string; priority?: boolean }) {
  const mask: CSSProperties = {
    WebkitMaskImage: 'url(/images/ochf-logo.png)', maskImage: 'url(/images/ochf-logo.png)',
    WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
  };
  return (
    <div className={cn('relative aspect-[348/301] overflow-hidden', className)} role="img" aria-label={photo.alt}>
      <div className="absolute" style={{ ...mask, width: '143.68%', height: '166.1%', left: '-25.57%', top: '-21.6%' }}>
        {/* The photograph covers only the map's box inside the mask layer. */}
        <img src={photo.src} alt="" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined}
          decoding="async" referrerPolicy="no-referrer"
          className="absolute object-cover"
          style={{ width: '69.6%', height: '60.2%', left: '17.8%', top: '13%' }} />
      </div>
    </div>
  );
}

/** Small dots in the logo's colours, scattered around a hero. Decorative only. */
export function LogoDots({ className }: { className?: string }) {
  const dots = [
    'left-[4%] top-[12%] w-3.5 h-3.5 bg-lime float-slow',
    'right-[6%] top-[22%] w-3 h-3 bg-[#F2A93B] float-slower',
    'left-[44%] top-[6%] w-2.5 h-2.5 bg-[#4A90C2] float-slow',
    'right-[30%] bottom-[10%] w-3.5 h-3.5 bg-[#4A90C2] float-slower',
    'left-[10%] bottom-[14%] w-2.5 h-2.5 bg-[#2E9E4F] float-slow',
  ];
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
      {dots.map((d) => <span key={d} className={cn('absolute rounded-full', d)} />)}
    </div>
  );
}

/* --------------------------------------------------------------- pillars */

const NUMBER_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

/**
 * "Three pillars." — counted from the programmes in the CMS, so adding a programme in
 * the dashboard keeps every heading true without a code change.
 */
export function pillarsPhrase(n: number) {
  if (n === 1) return 'One pillar.';
  return `${NUMBER_WORDS[n] ?? n} pillars.`;
}

/** "Three pillars. One direction." with the second phrase in the accent. */
export function PillarsTitle({ count, tone = 'brand' }: { count: number; tone?: 'lime' | 'brand' }) {
  return <>{pillarsPhrase(count)} <Accent tone={tone}>One direction.</Accent></>;
}

/* --------------------------------------------------------- programme record */

const fmtDate = (d: string) => {
  if (!d) return '';
  const date = new Date(`${d}T00:00:00`);
  return Number.isNaN(date.getTime()) ? d : date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
};

/** One documented intervention: what, where, when, who, outcomes, and a quote if consented. */
export function RecordCard({ record, index = 0, showPillar = true }: { record: ProgrammeRecord; index?: number; showPillar?: boolean }) {
  const when = record.end ? `${fmtDate(record.start)} – ${fmtDate(record.end)}` : `${fmtDate(record.start)} – ongoing`;
  return (
    <Reveal as="article" index={index} className="rounded-[24px] border border-line bg-white overflow-hidden grid grid-cols-1 md:grid-cols-12">
      {record.image && (
        <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto bg-tint">
          <img src={record.image.src} alt={record.image.alt} loading="lazy" decoding="async" referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover" />
        </div>
      )}
      <div className={cn('p-7 md:p-9 flex flex-col gap-5', record.image ? 'md:col-span-7' : 'md:col-span-12')}>
        {showPillar && record.pillar && <span className="tag-tint self-start">{record.pillar}</span>}
        <h3 className="font-serif font-semibold text-[26px] md:text-[30px] leading-tight text-brand-800">{record.title}</h3>
        <dl className="flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-muted">
          {record.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-800" aria-hidden="true" /><dt className="sr-only">Where</dt><dd>{record.location}</dd></div>}
          {record.start && <div className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-brand-800" aria-hidden="true" /><dt className="sr-only">When</dt><dd>{when}</dd></div>}
          {record.beneficiaries && <div className="flex items-center gap-2"><Users className="w-4 h-4 text-brand-800" aria-hidden="true" /><dt className="sr-only">Reached</dt><dd>{record.beneficiaries}</dd></div>}
        </dl>
        <p className="text-[16.5px] leading-relaxed text-ink">{record.summary}</p>
        {record.outcomes.length > 0 && (
          <div>
            <p className="kicker text-brand-800/80 mb-3">Outcomes</p>
            <ul className="flex flex-col gap-2">
              {record.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-[15.5px] text-ink"><span className="mt-2 w-2 h-2 rounded-full bg-lime shrink-0" aria-hidden="true" />{o}</li>
              ))}
            </ul>
          </div>
        )}
        {record.testimonial && (
          <figure className="rounded-[18px] bg-tint p-6">
            <Quote className="w-5 h-5 text-brand-800" aria-hidden="true" />
            <blockquote className="mt-2 font-serif text-[20px] leading-snug text-brand-800">{record.testimonial}</blockquote>
            {record.testimonialName && <figcaption className="mt-3 text-[14px] text-faint">{record.testimonialName}</figcaption>}
          </figure>
        )}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ reveal */

let observer: IntersectionObserver | null = null;
function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); observer?.unobserve(e.target); }
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  );
  return observer;
}

/** Fades a block up once as it enters the viewport. Visible without JS. */
export function Reveal({
  as: Tag = 'div', index = 0, className, children, ...rest
}: {
  as?: 'div' | 'section' | 'article' | 'li' | 'figure' | 'a';
  index?: number;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    const obs = getObserver();
    if (!el) return;
    if (!obs) { el.classList.add('is-in'); return; }
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  const Any = Tag as unknown as 'div';
  return (
    <Any ref={ref as never} data-reveal="" className={className} style={{ '--reveal-i': index } as CSSProperties} {...rest}>
      {children}
    </Any>
  );
}

export const Arrow = ({ className }: { className?: string }) =>
  <ArrowRight className={cn('w-4 h-4', className)} aria-hidden="true" />;

/* ------------------------------------------------------------------- typing */

/** A headline whose last phrase is set in the lime (or brand blue) italic accent. */
export function Accent({ children, tone = 'lime' }: { children: ReactNode; tone?: 'lime' | 'brand' }) {
  return <span className={cn('accent-i', tone === 'lime' ? 'text-lime' : 'text-brand-800')}>{children}</span>;
}

export function SectionHead({
  kicker, title, lede, align = 'left', dark = false, action, className,
}: {
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
  action?: ReactNode;
  className?: string;
}) {
  const center = align === 'center';
  return (
    <Reveal className={cn(center ? 'text-center mx-auto max-w-[760px]' : 'flex flex-wrap items-end justify-between gap-6', className)}>
      <div className={cn(!center && 'max-w-[720px]')}>
        {kicker && <p className={cn('kicker mb-4', dark ? 'text-lime-200' : 'text-brand-800/80')}>{kicker}</p>}
        <h2 className={cn('h-sec', dark ? 'text-white' : 'text-brand-800')}>{title}</h2>
        {lede && <p className={cn('lede mt-5', center && 'mx-auto', 'max-w-[56ch]', dark ? 'text-white/75' : 'text-muted')}>{lede}</p>}
      </div>
      {action && !center && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

export function ArrowLink({
  to, children, light = false, external = false, className,
}: {
  to: string; children: ReactNode; light?: boolean; external?: boolean; className?: string;
}) {
  const cls = cn('link-arrow', light && 'link-arrow-light', className);
  const icon = external
    ? <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
    : <ArrowRight className="w-4 h-4" aria-hidden="true" />;
  return external
    ? <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>{children}{icon}</a>
    : <Link to={to} className={cls}>{children}{icon}</Link>;
}

export function Breadcrumb({ trail }: { trail: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13.5px] font-medium text-white/70">
      <ol className="flex flex-wrap items-center gap-2">
        <li className="flex items-center gap-2"><Link to="/" className="hover:text-white">Home</Link><span aria-hidden="true">›</span></li>
        {trail.map((t, i) => (
          <li key={t.name} className="flex items-center gap-2">
            {t.path ? <Link to={t.path} className="hover:text-white">{t.name}</Link> : <span aria-current="page" className="text-white">{t.name}</span>}
            {i < trail.length - 1 && <span aria-hidden="true">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ----------------------------------------------------------------- photos */

export function Pic({
  photo, className, priority = false, sizes, rounded = 'rounded-[20px]', caption = false,
}: {
  photo: Photo; className?: string; priority?: boolean; sizes?: string; rounded?: string; caption?: boolean;
}) {
  return (
    <figure className={cn('min-w-0', className)}>
      <div className={cn('relative overflow-hidden bg-tint h-full', rounded)}>
        <img
          src={photo.src}
          alt={photo.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          sizes={sizes}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
      {caption && photo.credit && (
        <figcaption className="mt-3 text-[13px] text-faint">{photo.credit.replace(/^OCHF Photography — /, '')}</figcaption>
      )}
    </figure>
  );
}

/**
 * Round portraits floating at the edges of a blue hero. Decorative: the real
 * photographs carry alt text, and they sit behind the text so nothing overlaps it.
 */
export function FloatingPhotos({ photos }: { photos: Photo[] }) {
  const spots = [
    'left-[3%] top-[70px] w-[200px] h-[200px] float-slow',
    'left-[16%] top-[30px] w-[86px] h-[86px] float-slower',
    'right-[7%] top-[44px] w-[132px] h-[132px] float-slower',
    'right-[2.5%] top-[240px] w-[210px] h-[210px] float-slow',
  ];
  return (
    <div aria-hidden="true" className="hidden xl:block absolute inset-0 pointer-events-none">
      <span className="absolute left-[10%] bottom-[120px] w-[120px] h-[120px] rounded-full bg-white/[0.06]" />
      <span className="absolute right-[22%] bottom-[56px] w-[70px] h-[70px] rounded-full bg-white/[0.06]" />
      {photos.slice(0, 4).map((p, i) => (
        <img key={p.src + i} src={p.src} alt="" loading="eager" decoding="async" referrerPolicy="no-referrer"
          className={cn('absolute rounded-full object-cover border-[6px] border-white/10', spots[i])} />
      ))}
    </div>
  );
}

/**
 * The blue band at the top of every inner page: breadcrumb, a serif headline with
 * its italic accent, and an optional lede. `photo` adds a rounded picture beside it.
 */
export function PageHero({
  trail, kicker, title, lede, photo, children, floating,
}: {
  trail: { name: string; path?: string }[];
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  photo?: Photo;
  children?: ReactNode;
  floating?: Photo[];
}) {
  return (
    <header className="relative bg-brand-800 text-white overflow-hidden on-dark">
      {floating && <FloatingPhotos photos={floating} />}
      <div className="shell relative pt-8"><Breadcrumb trail={trail} /></div>
      <div className={cn('shell relative pt-12 pb-20 lg:pt-16 lg:pb-28', photo && 'grid grid-cols-1 lg:grid-cols-12 gap-12 items-center')}>
        <div className={cn('fade-in', photo ? 'lg:col-span-6' : floating ? 'max-w-[860px] mx-auto text-center' : 'max-w-[860px]')}>
          {kicker && <p className="kicker text-lime-200 mb-5">{kicker}</p>}
          <h1 className="h-page">{title}</h1>
          {lede && <p className={cn('lede mt-7 text-white/80 max-w-[58ch]', floating && !photo && 'mx-auto')}>{lede}</p>}
          {children}
        </div>
        {photo && (
          <div className="lg:col-span-6">
            <Pic photo={photo} priority rounded="rounded-[28px]" className="aspect-[4/3]" sizes="(min-width:1024px) 50vw, 100vw" />
          </div>
        )}
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------- stats */

/**
 * One impact figure. An unverified figure shows a short rule where the number would
 * go — never a zero, never an estimate.
 */
export function Stat({ metric, dark = false, size = 'md' }: { metric: Metric; dark?: boolean; size?: 'md' | 'lg' }) {
  const pending = metric.status === 'pending' || !metric.value;
  const num = cn('font-serif font-semibold leading-none tabular-nums tracking-[-0.02em]',
    size === 'lg' ? 'text-[56px] md:text-[72px]' : 'text-[44px] md:text-[52px]',
    dark ? 'text-white' : 'text-brand-800');
  return (
    <div className="min-w-0">
      {pending ? (
        <div className="flex h-[44px] md:h-[52px] items-center gap-2" aria-label={`${metric.label}: awaiting verification`}>
          {metric.prefix && <span className={num}>{metric.prefix}</span>}
          <span className={cn('block h-[2px] w-12 rounded-full', dark ? 'bg-lime/60' : 'bg-line')} aria-hidden="true" />
        </div>
      ) : (
        <p className={num}>{metric.prefix}<CountUp value={metric.value} /></p>
      )}
      <p className={cn('mt-3 text-[15px]', dark ? 'text-white/80' : 'text-muted')}>{sentenceCase(metric.label)}</p>
    </div>
  );
}

/** CMS labels arrive in mixed case ("INVESTED IN COMMUNITIES", "Communities reached"). */
const sentenceCase = (s: string) => {
  const t = s.trim().toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
};

/** The white figures card that sits over the bottom edge of a blue hero. */
export function StatsCard({ metrics, note, className }: { metrics: Metric[]; note?: string; className?: string }) {
  if (!metrics.length) return null;
  return (
    <section aria-label="Impact to date" className={cn('shell relative z-10', className)}>
      <div className="bg-white rounded-[24px] shadow-[0_24px_60px_-24px_rgba(13,59,122,0.35)] px-6 py-9 sm:px-10 lg:px-14
                      grid grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))] gap-x-8 gap-y-9">
        {metrics.map((m, i) => (
          <div key={m.label} className={cn(i === 0 && 'col-span-2 lg:col-span-1')}>
            <Stat metric={m} />
          </div>
        ))}
      </div>
      {note && <p className="mt-4 text-center text-[13.5px] text-faint">{note}</p>}
    </section>
  );
}

/* ----------------------------------------------------------------- sections */

/** Before → intervention → result. A real sequence, so it is numbered. */
export function ProgressionStory({ stages, dark = false }: { stages: { heading: string; body: string }[]; dark?: boolean }) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stages.map((s, i) => (
        <Reveal as="li" index={i} key={s.heading}
          className={cn('rounded-[20px] p-7', dark ? 'bg-white/[0.06]' : i === 2 ? 'bg-brand-800 text-white' : 'bg-tint')}>
          <span className={cn('inline-flex w-9 h-9 items-center justify-center rounded-full text-[14px] font-bold',
            dark || i === 2 ? 'bg-lime text-lime-ink' : 'bg-white text-brand-800')}>{i + 1}</span>
          <p className={cn('mt-5 kicker', dark || i === 2 ? 'text-lime-200' : 'text-brand-800')}>{s.heading}</p>
          <p className={cn('mt-2 text-[16.5px] leading-relaxed', dark || i === 2 ? 'text-white/85' : 'text-ink')}>{s.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** Dated milestones on a vertical line with lime markers. */
export function Timeline({ items, dark = false }: { items: { year: string; body: string }[]; dark?: boolean }) {
  if (!items.length) return null;
  return (
    <ol className={cn('relative border-l-2 ml-3', dark ? 'border-white/15' : 'border-line')}>
      {items.map((m, i) => (
        <Reveal as="li" index={i} key={`${m.year}-${i}`} className="relative pl-10 pb-12 last:pb-0">
          <span aria-hidden="true" className={cn('absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-4',
            dark ? 'bg-lime border-brand-950' : 'bg-lime border-white')} />
          <p className={cn('font-serif font-semibold text-[34px] md:text-[40px] leading-none tabular-nums', dark ? 'text-white' : 'text-brand-800')}>{m.year}</p>
          <p className={cn('mt-3 text-[17px] leading-relaxed max-w-[54ch]', dark ? 'text-white/75' : 'text-muted')}>{m.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** Real, permissioned logos only. Nothing renders when there are none. */
export function PartnerLogos({ partners, className }: { partners: Partner[]; className?: string }) {
  if (!partners.length) return null;
  return (
    <ul className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4', className)}>
      {partners.map((p) => {
        const logo = <img src={p.logoUrl} alt={p.alt ?? p.name} loading="lazy" className="max-h-11 max-w-[70%] object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition" />;
        return (
          <li key={p.name}>
            {p.url
              ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="group h-28 flex items-center justify-center rounded-[20px] bg-white border border-line">{logo}</a>
              : <div className="group h-28 flex items-center justify-center rounded-[20px] bg-white border border-line">{logo}</div>}
          </li>
        );
      })}
    </ul>
  );
}

export function StoryCard({ story, index = 0 }: { story: Story; index?: number }) {
  return (
    <Reveal as="article" index={index} className="group relative flex flex-col rounded-[20px] border border-line bg-white overflow-hidden focus-within:ring-2 focus-within:ring-brand-800">
      <div className="relative aspect-[16/10] overflow-hidden bg-tint">
        <img src={story.image.src} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" className="img-zoom absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="p-6 flex flex-col gap-2.5 flex-1">
        <p className="text-[13.5px] font-semibold text-faint">Story · {story.category}{story.date && ` · ${story.date}`}</p>
        <h3 className="h-card text-ink">
          <Link to={`/stories/${story.slug}`} className="after:absolute after:inset-0 focus:outline-none">{story.title}</Link>
        </h3>
        {story.standfirst && <p className="text-[15px] text-muted leading-relaxed line-clamp-3">{story.standfirst}</p>}
        <span className="mt-auto pt-2 font-bold text-[15px] text-brand-800">Read more →</span>
      </div>
    </Reveal>
  );
}

/** A linked card with a photograph on tint — used for pillars and albums. */
export function TintCard({
  to, photo, title, body, cta = 'Learn more', index = 0, meta,
}: {
  to: string; photo?: Photo; title: string; body?: ReactNode; cta?: string; index?: number; meta?: string;
}) {
  return (
    <Reveal as="article" index={index} className="group relative card-tint flex flex-col gap-5 focus-within:ring-2 focus-within:ring-brand-800">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[16px] bg-white">
        {photo
          ? <img src={photo.src} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" className="img-zoom absolute inset-0 w-full h-full object-cover" />
          : <div className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-faint">Photographs to follow</div>}
      </div>
      <div className="px-3 pb-3 flex flex-col gap-2.5 flex-1">
        {meta && <p className="text-[13.5px] font-semibold text-faint">{meta}</p>}
        <h3 className="h-card text-brand-800">
          <Link to={to} className="after:absolute after:inset-0 rounded-[24px] focus:outline-none">{title}</Link>
        </h3>
        {body && <p className="text-[15.5px] text-muted leading-relaxed">{body}</p>}
        <span className="mt-auto pt-1 font-bold text-[15px] text-brand-800">{cta} →</span>
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------------- closing */

/** Every page ends with exactly one of these, carrying exactly one action. */
export function ClosingCta({
  title, action, secondary, body, tone = 'tint',
}: {
  title: ReactNode;
  action: { label: string; to: string };
  /** One text link beside the button — never a second filled button (master file Part 6). */
  secondary?: { label: string; to: string };
  body?: string;
  tone?: 'tint' | 'brand';
}) {
  const dark = tone === 'brand';
  return (
    <section className="shell py-20 md:py-24">
      <Reveal className={cn('rounded-[28px] px-6 py-14 sm:px-12 md:py-20 flex flex-col items-center text-center gap-6',
        dark ? 'bg-brand-800 text-white on-dark' : 'bg-tint')}>
        <h2 className={cn('serif-h text-[38px] sm:text-[52px] lg:text-[64px] max-w-[18ch]', dark ? 'text-white' : 'text-brand-800')}>{title}</h2>
        {body && <p className={cn('lede max-w-[52ch]', dark ? 'text-white/80' : 'text-muted')}>{body}</p>}
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          <Link to={action.to} className={dark ? 'btn-lime' : 'btn-brand'}>{action.label} <Arrow /></Link>
          {secondary && <ArrowLink to={secondary.to} light={dark}>{secondary.label}</ArrowLink>}
        </div>
      </Reveal>
    </section>
  );
}
