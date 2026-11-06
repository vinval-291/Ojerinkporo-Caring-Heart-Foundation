import { Link, useParams } from 'react-router-dom';
import { Coins, Users, ClipboardCheck, LineChart, CheckCircle2, Scale } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { galleryAlbums, img, type Photo } from '@/src/data/media';
import {
  annualGrants, quarterlyGrants, howWeSupport, whoCanApply, howAwardsAssessed, focusAreaCopy,
  pillarPages, pillarCards, pillarClosings, educationLookingAhead,
} from '@/src/content/copy';
import {
  Accent, ArrowLink, ClosingCta, TintCard, PageHero, Pic, RecordCard, Reveal, SectionHead, Stat, StoryCard,
} from '@/src/components/ui';
import { cn } from '@/src/lib/utils';
import { usePageMeta } from '@/src/lib/meta';

/** OCHF's own photographs for a pillar, drawn from the gallery (CMS albums first). */
function usePillarPhotos(match: RegExp, limit: number): Photo[] {
  const { albums } = useContent();
  const source = albums.length ? albums : galleryAlbums;
  return source
    .flatMap((a) => a.sets.filter((s) => match.test(s.name) || match.test(a.title)))
    .flatMap((s) => s.images.map((path) => ({ src: img(path), alt: `${s.name} — OCHF documentation`, credit: s.name })))
    .slice(0, limit);
}

const supportIcons = [Coins, Users, ClipboardCheck, LineChart];

/**
 * "Applications open until 12 March 2027" — the one status line (master file 4.7).
 *
 * Open while the dashboard's "Applications are open now" toggle is on, until the closing
 * date passes if one is set. The server applies the same rule before accepting an
 * application (api/content.ts), so the form can never take one for a closed round.
 */
export function grantStatus(application?: { open: boolean; deadline: string }) {
  const closed = { open: false, label: 'Applications closed', deadline: '' };
  if (!application?.open) return closed;
  if (!application.deadline) return { open: true, label: 'Applications open', deadline: '' };
  const d = new Date(`${application.deadline}T23:59:59+01:00`);
  if (Number.isNaN(d.getTime()) || d.getTime() < Date.now()) return closed;
  const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Lagos' });
  return { open: true, label: `Applications open until ${date}`, deadline: date };
}

/**
 * A pillar page. Enterprise follows the master file's order exactly (4.5): intro, focus
 * areas, the two grants, how we support businesses, who can apply, business stories,
 * closing. Education and Community follow 4.6. Copy comes from the master file; a pillar
 * added in the CMS falls back to its own name and summary.
 */
export default function Programme() {
  const { slug } = useParams();
  const { programmes, impactMetrics, records, stories } = useContent();
  const programme = programmes.find((p) => p.slug === slug);
  const page = programme ? pillarPages[programme.slug] : undefined;
  usePageMeta(page?.title ?? programme?.name ?? 'Our Work', page?.description ?? programme?.summary, programme?.image.src);

  const equipment = usePillarPhotos(/equipment/i, 4);
  const outreachPhotos = usePillarPhotos(/outreach/i, 5);

  if (!programme) {
    return (
      <div className="shell py-24">
        <h1 className="h-page text-brand-800 mb-6">Programme not found.</h1>
        <p className="lede text-muted mb-10">That programme does not exist. These are the pillars OCHF works through.</p>
        <div className="flex flex-wrap gap-3">
          {programmes.map((p) => <Link key={p.slug} to={`/our-work/${p.slug}`} className="btn-outline">{p.name}</Link>)}
        </div>
      </div>
    );
  }

  const index = programmes.indexOf(programme);
  const others = programmes.filter((p) => p.slug !== programme.slug);
  const isEnterprise = programme.slug === 'enterprise';
  const status = grantStatus(programme.application);
  const pillarRecords = records.filter((r) => r.pillar.toLowerCase() === programme.name.toLowerCase());
  const pillarStories = stories.filter((s) => !s.draft && s.category === programme.name);
  const areas = programme.focusAreas.filter((a) => focusAreaCopy[a]);
  // The figure that belongs on this page (master file 4.1: students → Education, communities → Community).
  const evidence = impactMetrics.filter((m) =>
    programme.slug === 'education' ? /student|school|institution/i.test(m.label)
      : programme.slug === 'community' ? /communit|household/i.test(m.label) : false);

  return (
    <>
      <PageHero
        trail={[{ name: 'Our Work', path: '/our-work' }, { name: programme.name }]}
        kicker={`Pillar ${index + 1} · ${programme.name}`}
        title={page ? page.heading : programme.name}
        lede={page ? page.lede : pillarCards[programme.slug] ?? programme.summary}
        photo={programme.image}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {programme.focusAreas.map((f) => <li key={f} className="tag-lime">{f}</li>)}
        </ul>
      </PageHero>

      {/* ------------------------------------------------------- focus areas */}
      {areas.length > 0 && (
        <section className="shell pt-24">
          <SectionHead kicker="Focus areas" title={<>What {programme.name} <Accent tone="brand">covers.</Accent></>} />
          <ol className={cn('mt-10 grid grid-cols-1 gap-5', areas.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
            {areas.map((area, i) => (
              <Reveal as="li" index={i} key={area} className="rounded-[24px] bg-tint p-8 flex flex-col gap-4">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-white text-brand-800 font-bold">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-serif font-semibold text-[28px] text-brand-800 leading-tight">{area}</h3>
                <p className="text-[15.5px] text-muted leading-relaxed">{focusAreaCopy[area]}</p>
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      {/* ===================================================== ENTERPRISE ONLY */}
      {isEnterprise && (
        <>
          {/* ------------------------------------------------- the two grants */}
          <section className="shell pt-24">
            <SectionHead kicker="Grants" title={<>Two ways we <Accent tone="brand">fund businesses.</Accent></>}
              action={<ArrowLink to="/our-work/enterprise/grants">Grants & Opportunities</ArrowLink>} />
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Reveal className="bg-brand-900 text-white rounded-[28px] p-8 md:p-10 flex flex-col gap-5 on-dark">
                <span className={cn('tag self-start', status.open ? 'bg-lime text-lime-ink' : 'bg-white/10 text-white')}>{status.label}</span>
                <h3 className="font-serif font-semibold text-[32px] leading-tight">{annualGrants.title}</h3>
                <p className="text-[16.5px] text-white/80 leading-relaxed">{annualGrants.body}</p>
                <p className="text-[15px] font-semibold text-lime-200">{annualGrants.terms}</p>
                <ArrowLink to="/our-work/enterprise/grants" light className="mt-auto">{status.open ? 'How to apply' : 'Past programmes and status'}</ArrowLink>
              </Reveal>
              <Reveal index={1} className="bg-tint rounded-[28px] p-8 md:p-10 flex flex-col gap-5">
                <span className="tag bg-white text-brand-800 self-start">{quarterlyGrants.eyebrow}</span>
                <h3 className="font-serif font-semibold text-[32px] leading-tight text-brand-800">Quarterly Business Growth Grants</h3>
                <p className="text-[16.5px] text-muted leading-relaxed">{quarterlyGrants.short}</p>
                <ArrowLink to="/stories" className="mt-auto">Meet the businesses</ArrowLink>
              </Reveal>
            </div>
          </section>

          {/* -------------------------------------- how we support businesses */}
          <section className="mt-24 bg-brand-950 text-white on-dark">
            <div className="shell py-24">
              <SectionHead dark align="center" kicker="How we support businesses" title={<>Funding. Capacity. <Accent>Accountability. Measurement.</Accent></>} />
              <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {howWeSupport.map((s, i) => {
                  const Icon = supportIcons[i];
                  return (
                    <Reveal as="li" index={i} key={s.step} className="rounded-[24px] bg-white/[0.06] p-7 flex flex-col gap-4">
                      <span className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-lime text-lime-ink"><Icon className="w-5 h-5" aria-hidden="true" /></span>
                      <h3 className="font-serif font-semibold text-[28px]">{s.step}</h3>
                      <p className="text-[15.5px] text-white/75 leading-relaxed">{s.body}</p>
                    </Reveal>
                  );
                })}
              </ol>
            </div>
          </section>

          {/* ------------------------------------ who can apply · assessment */}
          <section className="shell pt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal className="rounded-[24px] border border-line p-8 md:p-10 flex flex-col gap-4">
              <span className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-tint text-brand-800"><CheckCircle2 className="w-6 h-6" aria-hidden="true" /></span>
              <h3 className="font-serif font-semibold text-[30px] text-brand-800">Who can apply</h3>
              <p className="text-[16.5px] text-ink leading-relaxed">{whoCanApply}</p>
            </Reveal>
            <Reveal index={1} className="rounded-[24px] border border-line p-8 md:p-10 flex flex-col gap-4">
              <span className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-tint text-brand-800"><Scale className="w-6 h-6" aria-hidden="true" /></span>
              <h3 className="font-serif font-semibold text-[30px] text-brand-800">How awards are assessed</h3>
              <p className="text-[16.5px] text-ink leading-relaxed">{howAwardsAssessed}</p>
            </Reveal>
          </section>
        </>
      )}

      {/* --------------------------------------------- evidence (Edu, Comm) */}
      {evidence.length > 0 && (
        <section className="shell pt-24">
          <Reveal className="rounded-[28px] bg-tint p-8 md:p-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {evidence.map((m) => (
              <div key={m.label}>
                <Stat metric={m} size="lg" />
                {m.period && <p className="mt-1 text-[13px] text-faint">{m.period}</p>}
              </div>
            ))}
          </Reveal>
        </section>
      )}

      {/* ---------------------------------------- education: looking ahead */}
      {programme.slug === 'education' && (
        <section className="shell pt-24">
          <Reveal className="rounded-[28px] border border-line p-8 md:p-12 max-w-[900px]">
            <p className="kicker text-brand-800/80 mb-3">Future priorities</p>
            <h2 className="font-serif font-semibold text-[32px] text-brand-800">{educationLookingAhead.title}</h2>
            <p className="lede text-muted mt-4">{educationLookingAhead.body}</p>
          </Reveal>
        </section>
      )}

      {/* ------------------------------------------ community: photo essay */}
      {programme.slug === 'community' && outreachPhotos.length >= 3 && (
        <section className="shell pt-24">
          <SectionHead kicker="2026 Outreach" title={<>Direct support, <Accent tone="brand">in person.</Accent></>}
            action={<ArrowLink to="/gallery">See the full album</ArrowLink>} />
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-12 gap-4">
            <Reveal className="col-span-2 lg:col-span-7 lg:row-span-2"><Pic photo={outreachPhotos[0]} className="aspect-[4/3] lg:aspect-auto lg:h-full" /></Reveal>
            {outreachPhotos.slice(1, 5).map((p, i) => (
              <Reveal key={p.src} index={i + 1} className={cn('lg:col-span-5', i > 1 && 'hidden lg:block')}><Pic photo={p} className="aspect-[4/3]" /></Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------ documented work */}
      {pillarRecords.length > 0 && (
        <section className="shell pt-24">
          <SectionHead kicker="Programme records" title={<>{programme.name}, <Accent tone="brand">documented.</Accent></>}
            action={<ArrowLink to="/impact#records">All programme records</ArrowLink>} />
          <div className="mt-10 flex flex-col gap-6">
            {pillarRecords.map((r, i) => <RecordCard key={r.id} record={r} index={i % 3} showPillar={false} />)}
          </div>
        </section>
      )}

      {/* ------------------------- business stories: two complete ones or none */}
      {pillarStories.length >= 2 && (
        <section className="shell pt-24">
          <SectionHead kicker="Behind every number" title={<>Behind every number <Accent tone="brand">is a business.</Accent></>} />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillarStories.slice(0, 3).map((s, i) => <StoryCard key={s.slug} story={s} index={i} />)}
          </div>
        </section>
      )}

      {isEnterprise && equipment.length > 0 && (
        <section className="shell pt-24">
          <SectionHead title="Equipment for funded businesses" action={<ArrowLink to="/gallery">Open the gallery</ArrowLink>} />
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {equipment.map((p, i) => (
              <Reveal key={p.src} index={i}><Pic photo={p} className="aspect-square" sizes="(min-width:1024px) 25vw, 50vw" /></Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- other pillars */}
      {others.length > 0 && (
        <section className="shell pt-24">
          <SectionHead title="The other pillars" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {others.map((p, i) => (
              <TintCard key={p.slug} index={i} to={`/our-work/${p.slug}`} photo={p.image} title={p.name} body={pillarCards[p.slug] ?? p.focusAreas.join(' · ')} cta={`Explore ${p.name}`} />
            ))}
          </div>
        </section>
      )}

      {/* --------------------------------------------------------- closing */}
      {isEnterprise ? (
        // Only an open round gets an Apply button (master file 4.5, 4.7).
        <ClosingCta tone="brand" title={<>Ready to grow <Accent>your business?</Accent></>}
          action={status.open ? { label: 'Apply for a Grant', to: '/our-work/enterprise/grants' } : { label: 'See Past Programmes', to: '/our-work/enterprise/grants#past' }}
          secondary={{ label: 'Contact the Foundation', to: '/contact' }} />
      ) : (
        <ClosingCta title={pillarClosings[programme.slug]?.title ?? `Partner on ${programme.name}`}
          action={{ label: 'Discuss a Partnership', to: '/partners' }}
          secondary={{ label: 'Contact the Foundation', to: '/contact' }} />
      )}
    </>
  );
}
