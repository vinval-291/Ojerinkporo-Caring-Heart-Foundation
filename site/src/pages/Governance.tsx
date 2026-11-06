import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { governance } from '@/src/content/copy';
import { useLeadership, LEADERSHIP_GROUPS } from '@/src/pages/Leadership';
import { Accent, ArrowLink, ClosingCta, PageHero, Reveal } from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';

/**
 * Governance.
 *
 * Registration status, board composition, audit arrangements and policies are facts
 * about a real organisation, so nothing here is invented: every clause restates a
 * practice the foundation already states elsewhere on the site. The leadership
 * structure is drawn from the People in the CMS; registration details and
 * publications appear once OCHF has entered them.
 */
export default function Governance() {
  const { site, institution, publications } = useContent();
  const people = useLeadership();
  usePageMeta('Governance & Policies | OCHF', `How ${site.short} is governed: leadership structure, accountability, reporting, grant award standards and impact measurement.`);

  const structure = LEADERSHIP_GROUPS
    .map((g) => ({ ...g, people: people.filter((p) => p.group === g.group) }))
    .filter((g) => g.people.length);

  const sections = [
    { id: 'accountability', label: 'Institutional accountability', title: 'Open to the people we answer to.',
      body: [`Funders, partners and the communities we serve are entitled to know how ${site.short} is governed, who decides what, and how the money is accounted for.`] },
    { id: 'reporting', label: 'Measurement', title: 'Every figure has a source.', body: [governance.measurement] },
    { id: 'grant-awards', label: 'Grant award standard', title: 'Published criteria, applied consistently.',
      body: ['Entrepreneurship Grant awards are assessed against criteria published in advance on the programme page — job creation potential, originality, plan strength, founder experience and programme fit — and applicants must meet stated eligibility before assessment begins.'] },
    { id: 'impact', label: 'Impact measurement', title: 'Beyond the amount deployed.',
      body: ['Impact is more than the amount deployed. We track who our programmes reach, how support is used and what changes afterwards.'] },
    { id: 'questions', label: 'Questions or concerns', title: 'Questions or concerns.', body: [governance.questions] },
  ];
  const principles: [string, string][] = [
    ['Publish what can be verified', 'Every figure comes from disbursement records, programme registers or beneficiary follow-up. An unverified figure is never estimated.'],
    ['Criteria before decisions', 'Eligibility and selection criteria are published before an award cycle is assessed.'],
    ['Consent before publication', 'A beneficiary story or quotation is published only when the person in it has given consent.'],
  ];

  const contents = [
    ...(structure.length ? [{ id: 'structure', label: 'Leadership structure' }] : []),
    ...(institution.registration ? [{ id: 'registration', label: 'Registration' }] : []),
    ...sections.map(({ id, label }) => ({ id, label })),
    { id: 'principles', label: 'Governance principles' },
    ...(publications.length ? [{ id: 'reports', label: 'Reports & publications' }] : []),
  ];
  const n = (id: string) => contents.findIndex((c) => c.id === id) + 1;

  return (
    <>
      <PageHero
        trail={[{ name: 'About', path: '/about' }, { name: 'Governance' }]}
        kicker={`About ${site.short} — Governance`}
        title={<>Accountability, structure <Accent>and policies.</Accent></>}
        lede={`Funders, partners and the communities we serve are entitled to know how ${site.short} is governed, who decides what, and how the money is accounted for.`}
      />

      <section className="shell py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <nav aria-label="On this page" className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 card-tint p-6">
            <p className="kicker text-brand-800/80 mb-3 px-2">On this page</p>
            <ol className="flex flex-col gap-1">
              {contents.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex items-center gap-3 rounded-[12px] px-2 py-2.5 text-[15px] font-semibold text-brand-800 hover:bg-white">
                    <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-white text-[13px] tabular-nums">{i + 1}</span>{s.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* ------------------------------------------- leadership structure */}
          {structure.length > 0 && (
            <Reveal as="article" id="structure" className="scroll-mt-28 rounded-[24px] border border-line p-8 md:p-10">
              <p className="kicker text-brand-800/80 mb-3">§{n('structure')} · Leadership structure</p>
              <h2 className="font-serif font-semibold text-[30px] md:text-[36px] leading-tight text-brand-800">Who leads, and <Accent tone="brand">in what role.</Accent></h2>
              <div className="mt-8 flex flex-col gap-4">
                {structure.map((g) => (
                  <div key={g.group} className="rounded-[18px] bg-tint p-5">
                    <p className="font-bold text-brand-800">{g.title}</p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {g.people.map((p) => (
                        <li key={p.slug} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <Link to={`/about/leadership/${p.slug}`} className="font-semibold text-ink hover:underline underline-offset-4">{p.name}</Link>
                          <span className="text-[14.5px] text-muted">{p.role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <ArrowLink to="/about/leadership" className="mt-6">Full profiles</ArrowLink>
            </Reveal>
          )}

          {/* --------------------------------------------------- registration */}
          {institution.registration && (
            <Reveal as="article" id="registration" className="scroll-mt-28 rounded-[24px] border border-line p-8 md:p-10">
              <p className="kicker text-brand-800/80 mb-3">§{n('registration')} · Registration</p>
              <h2 className="font-serif font-semibold text-[30px] md:text-[36px] leading-tight text-brand-800">Legal registration.</h2>
              <p className="mt-5 text-[17px] leading-[1.75] text-ink whitespace-pre-line">{institution.registration}</p>
            </Reveal>
          )}

          {sections.map((s) => (
            <Reveal as="article" key={s.id} id={s.id} className="scroll-mt-28 rounded-[24px] border border-line p-8 md:p-10">
              <p className="kicker text-brand-800/80 mb-3">§{n(s.id)} · {s.label}</p>
              <h2 className="font-serif font-semibold text-[30px] md:text-[36px] leading-tight text-brand-800 max-w-[24ch]">{s.title}</h2>
              <div className="mt-5 space-y-4 text-[17px] leading-[1.75] text-muted max-w-[62ch]">
                {s.body.map((p) => <p key={p}>{p}</p>)}
              </div>
            </Reveal>
          ))}

          <Reveal as="article" id="principles" className="scroll-mt-28 rounded-[24px] bg-brand-800 text-white p-8 md:p-10 on-dark">
            <p className="kicker text-lime-200 mb-3">§{n('principles')} · Governance principles</p>
            <h2 className="font-serif font-semibold text-[30px] md:text-[36px] leading-tight">How decisions are <Accent>made and shown.</Accent></h2>
            <ol className="mt-8 grid grid-cols-1 gap-4">
              {principles.map(([h, b], j) => (
                <li key={h} className="flex gap-4 rounded-[18px] bg-white/[0.06] p-5">
                  <span className="inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-lime text-lime-ink font-bold">{j + 1}</span>
                  <div>
                    <p className="font-bold text-[17px]">{h}</p>
                    <p className="mt-1.5 text-[15.5px] text-white/75 leading-relaxed">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* --------------------------------------------------------- reports */}
          {publications.length > 0 && (
            <Reveal as="article" id="reports" className="scroll-mt-28 rounded-[24px] border border-line p-8 md:p-10">
              <p className="kicker text-brand-800/80 mb-3">§{n('reports')} · Reports & publications</p>
              <h2 className="font-serif font-semibold text-[30px] md:text-[36px] leading-tight text-brand-800">Read the reports.</h2>
              <ul className="mt-6 flex flex-col gap-2">
                {publications.slice(0, 4).map((p) => (
                  <li key={p.id}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-[14px] bg-tint px-4 py-3 font-semibold text-brand-800 hover:bg-tint-50">
                      <FileText className="w-5 h-5 shrink-0" aria-hidden="true" />{p.title}{p.year && <span className="text-faint font-medium">· {p.year}</span>}
                    </a>
                  </li>
                ))}
              </ul>
              <ArrowLink to="/resources" className="mt-6">All publications</ArrowLink>
            </Reveal>
          )}
        </div>
      </section>

      <ClosingCta title={<>Questions about <Accent tone="brand">how we operate?</Accent></>} action={{ label: 'Contact Our Team', to: '/contact' }} />
    </>
  );
}
