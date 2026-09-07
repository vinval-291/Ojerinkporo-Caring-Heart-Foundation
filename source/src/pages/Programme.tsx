import { Link, useParams } from 'react-router-dom';
import { getProgramme, portfolioStory, programmes } from '@/src/data/programmes';
import { Figure, Breadcrumb, ArrowLink, CtaBand, AwaitingContent } from '@/src/components/ui';

export default function Programme() {
  const { slug } = useParams();
  const programme = getProgramme(slug);

  if (!programme) {
    return (
      <div className="shell band text-center">
        <h1 className="text-[32px] mb-4">Programme not found</h1>
        <p className="lede mx-auto mb-8">
          That programme does not exist. These are the four OCHF works through.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {programmes.map((p) => (
            <Link key={p.slug} to={`/our-work/${p.slug}`} className="btn-outline">{p.name}</Link>
          ))}
        </div>
      </div>
    );
  }

  const { detail } = programme;

  return (
    <>
      {/* ---------------------------------------------------------- header */}
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb
            trail={[
              { name: 'Our Work', path: '/our-work' },
              { name: programme.name },
            ]}
          />
        </div>

        <div className="shell grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-14 md:py-20">
          <div className="max-w-[46ch]">
            <p className="eyebrow mb-5">Our Work — Programme</p>
            <h1 className="text-[42px] md:text-[54px]">{programme.name}</h1>
            <p className="mt-6 text-[15.5px] leading-relaxed text-body">{programme.summary}</p>
          </div>

          <Figure photo={programme.image} ratio="aspect-[16/10]" priority />
        </div>
      </section>

      {detail ? (
        <>
          {/* ------------------------------------------------- the model */}
          <section className="band-ink text-white">
            <div className="shell py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="eyebrow eyebrow-dark mb-4">{detail.modelEyebrow}</p>
                <h2 className="text-white text-[26px] md:text-[30px] leading-tight">
                  {detail.modelTitle}
                </h2>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {detail.terms.map((t) => (
                  <div key={t.value}>
                    <p className="font-serif text-[30px] md:text-[34px] text-gold-lift leading-none tracking-tight">
                      {t.value}
                    </p>
                    <p className="mt-3 text-[13.5px] text-white/65 leading-relaxed">{t.label}</p>
                  </div>
                ))}

                {detail.panels.map((p) => (
                  <div key={p.heading} className="border-t border-rule-dark pt-5">
                    <p className="font-semibold text-[14px] text-white mb-2">{p.heading}</p>
                    <p className="text-[13px] text-white/60 leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------------------------------------- metric strip */}
          <section className="bg-paper border-b border-rule">
            <div className="shell py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {detail.metrics.map((m) => (
                <div key={m.label}>
                  <span className="block h-px w-8 bg-rule mb-4" aria-hidden="true" />
                  <p className="text-[13px] font-semibold text-ink">{m.label}</p>
                  {m.note && <p className="figure-note">{m.note}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* -------------------------------------------- portfolio story */}
          <section className="band bg-paper">
            <div className="shell grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <Figure photo={portfolioStory.image} ratio="aspect-[5/4]" />

              <div className="max-w-[46ch]">
                <p className="eyebrow mb-4">{portfolioStory.eyebrow}</p>
                <h2 className="text-[26px] md:text-[32px]">{portfolioStory.title}</h2>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {portfolioStory.stages.map((s, i) => (
                    <div key={s.heading} className="rule-top">
                      <p className={`eyebrow mb-2 ${i === 1 ? 'text-gold-ink' : 'text-faint'}`}>
                        {s.heading}
                      </p>
                      <p className="text-[13px] text-body leading-relaxed">{s.body}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-[12.5px] text-faint italic">{portfolioStory.note}</p>
              </div>
            </div>
          </section>

          <CtaBand title={detail.ctaTitle}>
            <Link to={detail.ctaPrimary.path} className="btn-gold">{detail.ctaPrimary.label}</Link>
            <Link to="/our-work" className="btn-outline">Explore Other Programmes</Link>
          </CtaBand>
        </>
      ) : (
        <>
          <section className="band bg-paper">
            <div className="shell">
              <AwaitingContent
                what={`${programme.name} programme detail`}
                detail={
                  `The ${programme.name} pillar is live in the foundation's work, but its programme ` +
                  `model, eligibility and reporting figures have not yet been supplied for ` +
                  `publication. This page will carry the same structure as Enterprise once ` +
                  `OCHF confirms the detail.`
                }
              />
              <ArrowLink to="/our-work/enterprise" className="mt-8">
                See the Enterprise programme
              </ArrowLink>
            </div>
          </section>

          <CtaBand title="Work with us on this programme.">
            <Link to="/partners" className="btn-gold">Become a Partner</Link>
            <Link to="/our-work" className="btn-outline">Explore Other Programmes</Link>
          </CtaBand>
        </>
      )}
    </>
  );
}
