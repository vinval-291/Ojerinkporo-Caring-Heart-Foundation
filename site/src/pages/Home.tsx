import { Link } from 'react-router-dom';
import { BadgeCheck, ListChecks, Handshake, UserCheck, Coins } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { flagship } from '@/src/data/programmes';
import { photo } from '@/src/data/media';
import { outreach } from '@/src/content/photos';
import { home, pillarCards, quarterlyGrants, homeMeta } from '@/src/content/copy';
import {
  Accent, Arrow, ArrowLink, LogoDots, MapPhoto, PartnerLogos, PillarsTitle, Reveal, SectionHead,
  StoryCard, metricIcon, programmeIcon,
} from '@/src/components/ui';
import { CountUp } from '@/src/components/Counter';
import { cn } from '@/src/lib/utils';
import { usePageMeta } from '@/src/lib/meta';

/**
 * Home, in the order the master file sets (4.1): hero, figures, pillars, quarterly
 * grants, the 2026 programme highlight, partnership, stories, closing band.
 *
 * Left out on purpose until OCHF supplies them: the named business story ("Behind every
 * number is a business" — hidden until a complete, consented story exists), the
 * quarterly cycle figures, and the grant's application status.
 */

/** Practices OCHF already publishes elsewhere, shown as four reasons to trust it. */
const trust = [
  { icon: BadgeCheck, title: 'Every number has a source', body: 'Figures come from disbursement records, registers and beneficiary follow-up.' },
  { icon: ListChecks, title: 'Published criteria', body: 'Grants are assessed against criteria published before each round.' },
  { icon: Handshake, title: 'Funding with mentorship', body: 'Every funded business is paired 1:1 with a mentor.' },
  { icon: UserCheck, title: 'Consent first', body: 'Names, photographs and stories publish only with permission.' },
];

export default function Home() {
  const { site, programmes, headlineMetrics, stories: allStories, partners } = useContent();
  usePageMeta(homeMeta.title, homeMeta.description, photo.grantRecipients.src);

  const stories = allStories.filter((s) => !s.draft).slice(0, 3);
  const proof = headlineMetrics.find((m) => /entrepreneur|business/i.test(m.label) && m.status === 'verified' && m.value);

  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden bg-tint-50">
        <div aria-hidden="true" className="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--color-line)_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(90deg,transparent,black_30%,black_70%,transparent)]" />
        <LogoDots />
        <div className="shell relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center pt-14 pb-20 lg:pt-20 lg:pb-28">
          <div className="lg:col-span-6 flex flex-col gap-7 fade-in">
            <span className="tag bg-white text-brand-800 self-start shadow-[0_6px_20px_-12px_rgba(13,59,122,0.5)]">
              <span className="w-2 h-2 rounded-full bg-lime mr-2" aria-hidden="true" />{site.name}
            </span>
            <h1 className="serif-h text-[42px] sm:text-[56px] lg:text-[64px] text-ink">
              Investing in people. Building stronger <Accent tone="brand">communities.</Accent>
            </h1>
            <p className="lede text-muted max-w-[48ch]">{home.heroLine}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/our-work" className="btn-brand">Explore Our Work <Arrow /></Link>
              <Link to="/partners" className="btn-outline bg-white">Partner With Us</Link>
            </div>
            {proof && (
              <div className="flex items-center gap-4 pt-2">
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-lime text-lime-ink" aria-hidden="true">
                  <BadgeCheck className="w-5 h-5" />
                </span>
                <p className="text-[15px] text-muted">
                  <strong className="text-ink">{proof.prefix}{proof.value}</strong> {proof.label.toLowerCase()}
                  {proof.period && <span className="text-faint"> · {proof.period}</span>}
                </p>
              </div>
            )}
          </div>

          <figure className="lg:col-span-6 relative">
            <span aria-hidden="true" className="absolute inset-[8%] rounded-full bg-tint" />
            <MapPhoto photo={photo.grantRecipients} priority className="relative w-full max-w-[640px] mx-auto drop-shadow-[0_30px_40px_rgba(13,59,122,0.25)]" />
            <figcaption className="relative mt-3 text-center text-[13px] text-faint">{photo.grantRecipients.credit}</figcaption>
          </figure>
        </div>
      </section>

      {/* ----------------------------------------------------------- trust row */}
      <section aria-labelledby="why-ochf" className="shell -mt-10 relative z-10">
        <h2 id="why-ochf" className="sr-only">Why OCHF</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trust.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" index={i} key={title}
              className="bg-white rounded-[24px] p-7 text-center flex flex-col items-center gap-3 shadow-[0_20px_50px_-28px_rgba(13,59,122,0.45)] border border-line/60">
              <span className="inline-flex w-14 h-14 items-center justify-center rounded-full bg-tint text-brand-800">
                <Icon className="w-7 h-7" aria-hidden="true" />
              </span>
              <h3 className="font-serif font-semibold text-[21px] text-brand-800">{title}</h3>
              <p className="text-[14.5px] text-muted leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------ impact */}
      {headlineMetrics.length > 0 && (
        <section aria-labelledby="impact-heading" className="shell pt-24">
          <SectionHead kicker={home.impactLine} title={<span id="impact-heading">Impact, measured <Accent tone="brand">beyond the grant.</Accent></span>}
            action={<ArrowLink to="/impact">Impact & Stories</ArrowLink>} />
          <Reveal className="mt-10 rounded-[28px] bg-tint px-6 py-8 sm:px-10 grid grid-cols-2 lg:grid-cols-5 gap-y-8">
            {headlineMetrics.map((m, i) => {
              const Icon = metricIcon(m.label);
              const pending = m.status === 'pending' || !m.value;
              return (
                <div key={m.label} className={cn('flex items-center gap-4 px-2 lg:px-5', i > 0 && 'lg:border-l lg:border-brand-800/10', i === 0 && 'col-span-2 lg:col-span-1')}>
                  <Icon className="w-9 h-9 text-brand-800 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <div className="min-w-0">
                    {pending ? (
                      <span className="block h-[2px] w-10 bg-line my-4" aria-label={`${m.label}: awaiting verification`} />
                    ) : (
                      <p className="font-serif font-semibold text-[32px] md:text-[36px] leading-none text-brand-800 tabular-nums">{m.prefix}<CountUp value={m.value} /></p>
                    )}
                    <p className="mt-1.5 text-[13.5px] text-muted leading-snug">{m.label.charAt(0).toUpperCase() + m.label.slice(1).toLowerCase()}</p>
                  </div>
                </div>
              );
            })}
          </Reveal>
          <p className="mt-4 text-[13.5px] text-faint">
            {home.impactFootnote} <Link to="/impact#how-we-count" className="font-semibold text-brand-800 underline underline-offset-4">How we count</Link>
          </p>
        </section>
      )}

      {/* -------------------------------------------------------- pillars */}
      <section className="shell pt-28">
        <SectionHead align="center" kicker={home.pillarsEyebrow} title={<PillarsTitle count={programmes.length} />} lede={home.pillarsIntro} />
        <div className={cn('mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5', programmes.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4')}>
          {programmes.map((p, i) => {
            const Icon = programmeIcon(p.name);
            return (
              <Reveal as="article" index={i} key={p.slug}
                className="group relative rounded-[24px] border border-line bg-white p-8 flex flex-col gap-4 hover:border-brand-800 hover:shadow-[0_24px_50px_-30px_rgba(13,59,122,0.5)] transition focus-within:ring-2 focus-within:ring-brand-800">
                <span className="inline-flex w-14 h-14 items-center justify-center rounded-[18px] bg-tint text-brand-800 group-hover:bg-lime group-hover:text-lime-ink transition-colors">
                  <Icon className="w-7 h-7" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="font-serif font-semibold text-[28px] text-brand-800">{p.name}</h3>
                <p className="text-[13.5px] font-semibold text-faint">{p.focusAreas.join(' · ')}</p>
                <p className="text-[15.5px] text-muted leading-relaxed">{pillarCards[p.slug] ?? p.summary}</p>
                <Link to={`/our-work/${p.slug}`} className="mt-auto font-bold text-[15px] text-brand-800 after:absolute after:inset-0 focus:outline-none">Explore {p.name} →</Link>
              </Reveal>
            );
          })}
        </div>

        {/* Quarterly grants sit under the pillars (4.1). */}
        <Reveal className="mt-6 rounded-[24px] bg-tint p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <span className="md:col-span-1 inline-flex w-14 h-14 items-center justify-center rounded-full bg-white text-brand-800">
            <Coins className="w-7 h-7" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div className="md:col-span-8">
            <p className="kicker text-brand-800/80">{quarterlyGrants.eyebrow}</p>
            <h3 className="mt-2 font-serif font-semibold text-[28px] text-brand-800">{quarterlyGrants.title}</h3>
            <p className="mt-2 text-[16px] text-muted leading-relaxed max-w-[64ch]">{quarterlyGrants.body}</p>
          </div>
          <div className="md:col-span-3 md:justify-self-end">
            <ArrowLink to="/stories">Meet the businesses</ArrowLink>
          </div>
        </Reveal>
      </section>

      {/* --------------------------------------------- 2026 programme highlight */}
      <section className="shell pt-28">
        <Reveal className="bg-brand-900 text-white rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 on-dark">
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col gap-6 justify-center">
            <span className="tag-lime self-start">{flagship.eyebrow}</span>
            <h2 className="h-sec">Backing businesses with <Accent>the potential to grow.</Accent></h2>
            <p className="lede text-white/80 max-w-[48ch]">{flagship.body}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-5 pt-2">
              <div>
                <p className="font-serif font-semibold text-[52px] leading-none tabular-nums">{flagship.award.figure}</p>
                <p className="mt-2 text-[14.5px] text-white/70">{flagship.award.note}</p>
              </div>
              <Link to={flagship.cta.path} className="btn-lime">{flagship.cta.label} <Arrow /></Link>
            </div>
          </div>
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            <img src={flagship.image.src} alt={flagship.image.alt} loading="lazy" decoding="async" referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover" />
            <p className="absolute left-4 bottom-4 tag bg-white/90 text-brand-800">{flagship.image.credit}</p>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------- partnership */}
      <section className="shell pt-28">
        <SectionHead kicker="Partnership" title={home.partnershipTitle} lede={home.partnershipBody}
          action={<ArrowLink to="/partners">Discuss a Partnership</ArrowLink>} />
        {/* Logos only where a written agreement exists (master file F12). */}
        <PartnerLogos partners={partners} className="mt-12" />
      </section>

      {/* -------------------------------------------------- from the field */}
      {/* Hidden with fewer than two complete items: no empty cards, no "coming soon" (4.11). */}
      {stories.length >= 2 && (
        <section className="shell pt-28">
          <SectionHead kicker="From the Field" title="Programme updates and stories."
            lede="Programme updates, beneficiary stories and lessons from our work." action={<ArrowLink to="/stories">All stories</ArrowLink>} />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((s, i) => <StoryCard key={s.slug} story={s} index={i} />)}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ closing band */}
      <section className="shell py-24">
        <Reveal className="relative overflow-hidden rounded-[28px] bg-tint grid grid-cols-1 lg:grid-cols-2 items-stretch">
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col gap-6 justify-center">
            <h2 className="h-sec text-ink">Let’s expand what <Accent tone="brand">already works.</Accent></h2>
            <p className="lede text-muted max-w-[46ch]">{home.closingBody}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to="/partners" className="btn-brand">Discuss a Partnership <Arrow /></Link>
              <ArrowLink to="/contact">Contact the Foundation</ArrowLink>
            </div>
          </div>
          <div className="relative min-h-[300px]">
            <img src={outreach.handover.src} alt={outreach.handover.alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            <span aria-hidden="true" className="hidden lg:block absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-tint to-transparent" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
