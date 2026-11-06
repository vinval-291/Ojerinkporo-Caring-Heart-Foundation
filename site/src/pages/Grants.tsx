
import { FileText, CalendarDays, CheckCircle2, Scale } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { photo } from '@/src/data/media';
import { annualGrants, grantsMeta, grantsPage, howAwardsAssessed, quarterlyGrants, whoCanApply } from '@/src/content/copy';
import { Accent, Arrow, ArrowLink, ClosingCta, PageHero, RecordCard, Reveal, SectionHead } from '@/src/components/ui';
import { grantStatus } from '@/src/pages/Programme';
import { cn } from '@/src/lib/utils';
import { usePageMeta } from '@/src/lib/meta';
import { useApply } from '@/src/components/GrantApplication';

const PROGRAMME = 'the Entrepreneurship Grant Programme';

/**
 * Grants & Opportunities — /our-work/enterprise/grants (master file 4.7).
 *
 * Shows exactly one status, taken from the Enterprise programme's "Applications are open
 * now" toggle in the dashboard. Open shows the closing date and an Apply button; closed
 * shows no Apply button at all. The third state ("Programme under review") waits for
 * leadership's written approval and is not built in.
 */
export default function Grants() {
  const { programmes, records } = useContent();
  const apply = useApply();
  usePageMeta(grantsMeta.title, grantsMeta.description, photo.sewing.src);

  const enterprise = programmes.find((p) => p.slug === 'enterprise');
  const status = grantStatus(enterprise?.application);
  const past = records.filter((r) => r.pillar.toLowerCase() === 'enterprise');

  return (
    <>
      <PageHero
        trail={[{ name: 'Our Work', path: '/our-work' }, { name: 'Enterprise', path: '/our-work/enterprise' }, { name: 'Grants' }]}
        kicker="Enterprise · Grants"
        title={<>Grants &amp; <Accent>Opportunities</Accent></>}
        lede={grantsPage.intro}
      />

      {/* ------------------------------------------------------------ status */}
      <section className="shell -mt-12 relative z-10">
        <Reveal className={cn('rounded-[28px] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-[0_24px_60px_-28px_rgba(13,59,122,0.45)]',
          status.open ? 'bg-white border-2 border-lime' : 'bg-white border border-line')}>
          <div className="lg:col-span-8 flex flex-col gap-4">
            <span className={cn('tag self-start', status.open ? 'bg-lime text-lime-ink' : 'bg-tint text-brand-800')}>{status.label}</span>
            <h2 className="font-serif font-semibold text-[34px] md:text-[42px] leading-tight text-brand-800">
              {status.open ? grantsPage.openTitle : grantsPage.closedTitle}
            </h2>
            <p className="lede text-muted max-w-[60ch]">
              {status.open
                ? `Applications for ${PROGRAMME} are ${status.deadline ? `open until ${status.deadline}` : 'open'}. Check eligibility and the documents you need before you apply.`
                : grantsPage.closedBody(PROGRAMME)}
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            {status.open
              ? <button type="button" onClick={apply.open} className="btn-brand">Apply for the Entrepreneurship Grant <Arrow /></button>
              : <a href="#past" className="btn-outline">View Past Programmes</a>}
          </div>
        </Reveal>
      </section>

      {/* -------------------------------------------------- the two grants */}
      <section className="shell pt-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Reveal className="rounded-[24px] bg-tint p-8 md:p-10 flex flex-col gap-4">
          <h2 className="font-serif font-semibold text-[30px] text-brand-800">{annualGrants.title}</h2>
          <p className="text-[16.5px] text-muted leading-relaxed">{annualGrants.body}</p>
          <p className="text-[15px] font-semibold text-brand-800">{annualGrants.terms}</p>
        </Reveal>
        <Reveal index={1} className="rounded-[24px] bg-tint p-8 md:p-10 flex flex-col gap-4">
          <h2 className="font-serif font-semibold text-[30px] text-brand-800">Quarterly Business Growth Grants</h2>
          <p className="text-[16.5px] text-muted leading-relaxed">{quarterlyGrants.short}</p>
        </Reveal>
      </section>

      {/* -------------------------------------- eligibility · documents */}
      <section className="shell pt-24 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 grid grid-cols-1 gap-6">
          <Reveal className="rounded-[24px] border border-line p-8 flex gap-5">
            <CheckCircle2 className="w-7 h-7 text-brand-800 shrink-0" aria-hidden="true" />
            <div><h3 className="h-card text-brand-800">Who can apply</h3><p className="mt-2 text-[16px] text-ink leading-relaxed">{whoCanApply}</p></div>
          </Reveal>
          <Reveal index={1} className="rounded-[24px] border border-line p-8 flex gap-5">
            <Scale className="w-7 h-7 text-brand-800 shrink-0" aria-hidden="true" />
            <div><h3 className="h-card text-brand-800">How awards are assessed</h3><p className="mt-2 text-[16px] text-ink leading-relaxed">{howAwardsAssessed}</p></div>
          </Reveal>
        </div>
        <Reveal index={2} className="lg:col-span-5 rounded-[24px] bg-brand-800 text-white p-8 on-dark">
          <h3 className="h-card">What an application needs</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {grantsPage.documents.map((d) => (
              <li key={d} className="flex gap-3 text-[15.5px]"><FileText className="w-5 h-5 text-lime shrink-0" aria-hidden="true" />{d}</li>
            ))}
          </ul>
          {!status.open && <p className="mt-6 pt-5 border-t border-white/15 text-[14.5px] text-white/75">{grantsPage.closedNote}</p>}
        </Reveal>
      </section>

      {/* ---------------------------------------------------- past programmes */}
      <section id="past" className="shell pt-24 scroll-mt-28">
        <SectionHead kicker="Previous programmes" title={<>Rounds already <Accent tone="brand">delivered.</Accent></>} />
        <div className="mt-10 flex flex-col gap-6">
          <Reveal className="rounded-[24px] border border-line overflow-hidden grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto bg-tint">
              <img src={photo.sewing.src} alt={photo.sewing.alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="md:col-span-7 p-8 md:p-10 flex flex-col gap-4">
              <span className="tag-tint self-start">Enterprise · 2026</span>
              <h3 className="font-serif font-semibold text-[30px] text-brand-800 leading-tight">2026 Entrepreneurship Grant</h3>
              <p className="flex items-center gap-2 text-[15px] text-muted"><CalendarDays className="w-4 h-4 text-brand-800" aria-hidden="true" />Awards presented on 2 January 2026</p>
              <p className="text-[16.5px] text-ink leading-relaxed">
                Growth funding of up to ₦3 million per business, paired with 1:1 mentorship.
              </p>
            </div>
          </Reveal>
          {past.map((r, i) => <RecordCard key={r.id} record={r} index={i % 3} showPillar={false} />)}
          <Reveal className="rounded-[24px] bg-tint p-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="h-card text-brand-800">Quarterly Business Growth Grant</h3>
              <p className="mt-1 text-[15.5px] text-muted">{quarterlyGrants.short}</p>
            </div>
            <ArrowLink to="/stories">Read programme updates</ArrowLink>
          </Reveal>
        </div>
      </section>

      <ClosingCta title={<>Questions about <Accent tone="brand">a grant?</Accent></>}
        action={{ label: 'Contact the Foundation', to: '/contact' }} secondary={{ label: 'The Enterprise pillar', to: '/our-work/enterprise' }} />
    </>
  );
}
