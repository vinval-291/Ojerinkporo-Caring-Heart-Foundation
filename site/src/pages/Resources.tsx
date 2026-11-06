import { FileText, Download } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { Accent, ArrowLink, ClosingCta, PageHero, Reveal, SectionHead } from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';

/** The order document types appear in. Anything else falls under "Other". */
const KINDS = ['Annual report', 'Impact summary', 'Programme report', 'Registration document', 'Policy', 'Other'];

/**
 * Resources & publications: annual reports, programme reports, impact summaries and
 * institutional documents, published from the dashboard as PDFs. Until the first one
 * is published the page says so plainly; it is not linked from the menus until then.
 */
export default function Resources() {
  const { site, publications, institution } = useContent();
  usePageMeta('Resources & Publications', `Annual reports, programme reports, impact summaries and institutional documents from ${site.name}.`);

  const groups = KINDS
    .map((kind) => ({ kind, items: publications.filter((p) => (KINDS.includes(p.kind) ? p.kind : 'Other') === kind) }))
    .filter((g) => g.items.length);

  return (
    <>
      <PageHero
        trail={[{ name: 'About', path: '/about' }, { name: 'Resources' }]}
        kicker="Resources & publications"
        title={<>Reports and <Accent>documents.</Accent></>}
        lede="Annual reports, programme reports, impact summaries and institutional documents, published so that partners, funders and the public can check our work for themselves."
      />

      <section className="shell py-24 flex flex-col gap-20">
        {groups.length === 0 ? (
          <Reveal className="rounded-[28px] bg-tint p-10 md:p-14 max-w-[820px]">
            <FileText className="w-8 h-8 text-brand-800" aria-hidden="true" />
            <h2 className="mt-5 font-serif font-semibold text-[32px] text-brand-800">No reports have been published here yet.</h2>
            <p className="mt-4 lede text-muted">
              Reports and institutional documents will be published here as they are released.
              To request a document now, contact the foundation.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              <ArrowLink to="/contact">Contact the foundation</ArrowLink>
              <ArrowLink to="/impact">See our impact figures</ArrowLink>
            </div>
          </Reveal>
        ) : (
          groups.map((g) => (
            <div key={g.kind}>
              <SectionHead title={g.kind === 'Other' ? 'Other documents' : `${g.kind}s`} />
              <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {g.items.map((p, i) => (
                  <Reveal as="li" index={i % 2} key={p.id}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="group h-full flex gap-5 rounded-[24px] border border-line bg-white p-7 hover:border-brand-800 transition-colors">
                      <span className="inline-flex w-12 h-12 shrink-0 items-center justify-center rounded-[14px] bg-tint text-brand-800">
                        <FileText className="w-6 h-6" aria-hidden="true" />
                      </span>
                      <span className="flex flex-col gap-2 min-w-0 flex-1">
                        <span className="text-[13.5px] font-semibold text-faint">
                          {p.kind}{p.year && ` · ${p.year}`} · PDF{p.sizeKb > 0 && `, ${p.sizeKb >= 1024 ? `${(p.sizeKb / 1024).toFixed(1)} MB` : `${p.sizeKb} KB`}`}
                        </span>
                        <span className="h-card text-brand-800 group-hover:underline underline-offset-4">{p.title}</span>
                        {p.summary && <span className="text-[15px] text-muted leading-relaxed">{p.summary}</span>}
                        <span className="mt-auto pt-2 inline-flex items-center gap-2 font-bold text-[15px] text-brand-800">
                          <Download className="w-4 h-4" aria-hidden="true" /> Open the document
                        </span>
                      </span>
                    </a>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))
        )}

        {institution.registration && (
          <Reveal className="rounded-[24px] bg-brand-800 text-white p-8 md:p-10 on-dark">
            <p className="kicker text-lime-200 mb-3">Registration</p>
            <p className="text-[17px] leading-relaxed whitespace-pre-line">{institution.registration}</p>
          </Reveal>
        )}
      </section>

      <ClosingCta title={<>Understand how we're <Accent tone="brand">held accountable.</Accent></>} action={{ label: 'How We’re Governed', to: '/about/governance' }} />
    </>
  );
}
