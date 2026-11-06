import { useContent } from '@/src/content/ContentProvider';
import { methodology } from '@/src/data/impact';
import { impactPage, definitions } from '@/src/content/copy';
import {
  Accent, ArrowLink, ClosingCta, PageHero, RecordCard, Reveal, SectionHead, Stat, StoryCard, Timeline, metricIcon,
} from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';

/**
 * Impact & Stories (master file 4.8) — "OCHF's strongest page for a funder".
 *
 * Only signed-off figures, in the same words as the homepage; the definitions behind
 * them; how figures are compiled and revised; documented programme records; milestones;
 * and the business stories once at least three are complete. Nothing is drawn as a
 * placeholder: a section with no data is left out.
 */
export default function Impact() {
  const { impactMetrics, milestones, records, stories: allStories } = useContent();
  usePageMeta(impactPage.title, impactPage.description);
  const stories = allStories.filter((s) => !s.draft);
  const period = impactMetrics.find((m) => m.period)?.period;

  return (
    <>
      <PageHero
        trail={[{ name: 'Our Work', path: '/our-work' }, { name: 'Impact & Stories' }]}
        kicker={impactPage.eyebrow}
        title={<>Our impact, <Accent>documented.</Accent></>}
        lede={impactPage.intro}
      />

      {/* ------------------------------------------------------------ figures */}
      {impactMetrics.length > 0 && (
        <section aria-label="Impact figures" className="shell -mt-14 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {impactMetrics.map((m, i) => {
              const Icon = metricIcon(m.label);
              return (
                <Reveal key={m.label} index={i % 3} className="bg-white rounded-[24px] p-8 shadow-[0_20px_50px_-24px_rgba(13,59,122,0.35)] flex flex-col gap-4">
                  <Icon className="w-8 h-8 text-brand-800" strokeWidth={1.5} aria-hidden="true" />
                  <Stat metric={m} size="lg" />
                  {m.period && <p className="-mt-2 text-[13px] text-faint">{m.period}</p>}
                </Reveal>
              );
            })}
          </div>
          {period && <p className="mt-5 text-center text-[13.5px] text-faint">Programme records, {period}.</p>}
        </section>
      )}

      {/* ------------------------------------------------------- how we count */}
      <section id="how-we-count" className="shell pt-24 scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <SectionHead kicker="How we count" title={methodology.title} />
          <p className="lede text-muted">{methodology.body}</p>
        </div>
        <Reveal index={1} className="lg:col-span-7">
          <dl className="rounded-[24px] border border-line divide-y divide-line">
            {definitions.map((d) => (
              <div key={d.figure} className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-6">
                <dt className="sm:col-span-4 font-bold text-brand-800">{d.figure}</dt>
                <dd className="sm:col-span-8 text-[15.5px] text-muted leading-relaxed">{d.definition}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ------------------------------------------------- programme records */}
      {records.length > 0 && (
        <section id="records" className="shell pt-24 scroll-mt-28">
          <SectionHead kicker="Programme records" title={<>What we did, <Accent tone="brand">where and when.</Accent></>}
            lede="Each intervention as documented: where it took place, when, who it reached and what came of it. Numbers appear only once checked against our records; quotations only with consent." />
          <div className="mt-12 flex flex-col gap-6">
            {records.map((r, i) => <RecordCard key={r.id} record={r} index={i % 3} />)}
          </div>
        </section>
      )}

      {/* --------------------------------------------- business stories (≥ 3) */}
      {stories.length >= 3 && (
        <section className="shell pt-24">
          <SectionHead kicker="Behind every number" title={impactPage.storiesTitle} action={<ArrowLink to="/stories">Read the business stories</ArrowLink>} />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.slice(0, 6).map((s, i) => <StoryCard key={s.slug} story={s} index={i % 3} />)}
          </div>
        </section>
      )}

      {/* ----------------------------------------------------- milestones */}
      {milestones.length > 0 && (
        <section className="mt-24 bg-brand-950 text-white on-dark">
          <div className="shell py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4"><SectionHead dark kicker="Milestones" title={<>The record <Accent>so far.</Accent></>} /></div>
            <div className="lg:col-span-8"><Timeline items={milestones} dark /></div>
          </div>
        </section>
      )}

      <ClosingCta title={<>Help us reach <Accent tone="brand">further.</Accent></>}
        body="With the right partners, we can support more entrepreneurs and generate better data."
        action={{ label: 'Discuss a Partnership', to: '/partners' }} secondary={{ label: 'Read the stories', to: '/stories' }} />
    </>
  );
}
