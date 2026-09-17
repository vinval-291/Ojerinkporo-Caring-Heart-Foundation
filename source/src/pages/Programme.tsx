import { Link, useParams } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { portfolioStory } from '@/src/data/programmes';
import { Figure, Breadcrumb, CtaBand, categoryTag } from '@/src/components/ui';

export default function Programme() {
  const { slug } = useParams();
  // Read from content (CMS when connected) rather than the local file, so a programme
  // edited in the dashboard is what this page shows.
  const { programmes } = useContent();
  const index = programmes.findIndex((p) => p.slug === slug);
  const programme = programmes[index];

  if (!programme) {
    return (
      <div className="shell band text-center">
        <h1 className="text-[32px] mb-4">Programme not found</h1>
        <p className="lede mx-auto mb-8">
          That programme does not exist. These are the pillars OCHF works through.
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
  const others = programmes.filter((p) => p.slug !== programme.slug);

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
            <p className="eyebrow mb-5">Our Work — Pillar</p>
            <h1 className="text-[42px] md:text-[54px]">{programme.name}</h1>
            <p className="mt-6 text-[15.5px] leading-relaxed text-body">{programme.summary}</p>
          </div>

          <Figure photo={programme.image} ratio="aspect-[16/10]" priority />
        </div>
      </section>

      {/* ------------------------------------------------------- focus areas */}
      <section className="band-tight bg-surface border-b border-rule">
        <div className="shell">
          <p className="eyebrow mb-8">Focus areas</p>
          <ul
            className={`grid grid-cols-1 gap-6 ${
              programme.focusAreas.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
            }`}
          >
            {programme.focusAreas.map((area) => (
              <li
                key={area}
                className={`pillar-bar pillar-${programme.slug} pt-5 font-serif text-[22px] md:text-[26px] font-semibold text-ink`}
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {detail && (
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

          {/* -------------------------------------------- portfolio story */}
          {programme.slug === 'enterprise' && (
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
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ---------------------------------------------------- other pillars */}
      {others.length > 0 && (
        <section className="band bg-paper">
          <div className="shell">
            <p className="eyebrow mb-8">The other pillars</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {others.map((p) => (
                <Link key={p.slug} to={`/our-work/${p.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-[3px] bg-ink/5 aspect-[16/9]">
                    <img
                      src={p.image.src}
                      alt={p.image.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                    <span className={`absolute bottom-0 left-0 text-[9.5px] font-semibold uppercase tracking-[0.14em] px-3 py-2 ${categoryTag(p.name, programmes.indexOf(p))}`}>
                      {p.name}
                    </span>
                  </div>
                  <h3 className="text-[21px] mt-5 group-hover:text-gold-ink transition-colors">{p.name}</h3>
                  <p className="text-[13.5px] text-muted mt-2">{p.focusAreas.join(' | ')}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand title={detail ? detail.ctaTitle : 'Work with us on this pillar.'}>
        {detail ? (
          <Link to={detail.ctaPrimary.path} className="btn-gold">{detail.ctaPrimary.label}</Link>
        ) : (
          <Link to="/partners" className="btn-gold">Become a Partner</Link>
        )}
        <Link to="/contact" className="btn-outline">Contact the Foundation</Link>
      </CtaBand>
    </>
  );
}
