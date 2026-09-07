import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { flagship, portfolioStory } from '@/src/data/programmes';
import { partnerIntro } from '@/src/data/stories';
import { photo } from '@/src/data/media';
import { Figure, SectionHead, ArrowLink, Stat, CtaBand, categoryTag } from '@/src/components/ui';

export default function Home() {
  const { site, programmes, headlineMetrics, stories, partners } = useContent();
  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section className="relative bg-ink text-white">
        <div className="absolute inset-0">
          <img
            src={photo.heroGrant.src}
            alt={photo.heroGrant.alt}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Left-weighted scrim keeps the headline legible without flattening the photo. */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />
        </div>

        <div className="shell relative py-24 md:py-36 lg:py-44">
          <p className="eyebrow eyebrow-dark mb-6">{site.name}</p>
          <h1 className="text-white text-[38px] sm:text-[52px] lg:text-[62px] max-w-[16ch] leading-[1.06]">
            Investing in people.
            <br />
            Building stronger communities.
          </h1>
          <p className="mt-7 text-[16px] md:text-[17px] text-white/75 max-w-[54ch] leading-relaxed">
            {site.name} expands access to opportunity through enterprise, education,
            agriculture and community development.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/impact" className="btn-gold">Explore Our Impact</Link>
            <Link to="/partners" className="btn-ghost">Partner With {site.short}</Link>
          </div>
        </div>

        <p className="photo-credit">{photo.heroGrant.credit}</p>
      </section>

      {/* ------------------------------------------------- headline figures */}
      <section className="band-ink border-t border-rule-dark">
        <div className="shell py-12 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            {headlineMetrics.map((m) => (
              <Stat key={m.label} metric={m} dark />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- four pillars */}
      <section className="band bg-paper">
        <div className="shell">
          <SectionHead
            eyebrow="What we do"
            title="Four pillars, one direction."
            aside="Structured programmes built to grow — not a list of activities we happen to run."
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programmes.map((p, idx) => (
              <Link key={p.slug} to={`/our-work/${p.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-[3px] bg-ink/5 aspect-[4/3]">
                  <img
                    src={p.image.src}
                    alt={p.image.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  <span className={`absolute bottom-0 left-0 text-[9.5px] font-semibold uppercase tracking-[0.14em] px-3 py-2 ${categoryTag(p.name, idx)}`}>
                    {p.name}
                  </span>
                </div>
                <h3 className="text-[19px] mt-5 group-hover:text-gold-ink transition-colors">{p.name}</h3>
                <p className="text-[13.5px] text-muted mt-1.5 leading-relaxed">{p.blurb}</p>
                <span className="link-arrow mt-3">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- flagship programme */}
      <section className="bg-surface">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Figure photo={flagship.image} ratio="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[520px]" />

          <div className="flex items-center px-6 md:px-14 lg:px-20 py-16 lg:py-24">
            <div className="max-w-[46ch]">
              <p className="eyebrow mb-4">{flagship.eyebrow}</p>
              <h2 className="text-[30px] md:text-[38px]">{flagship.title}</h2>
              <p className="mt-6 text-[15px] leading-relaxed text-body">{flagship.body}</p>
              <p className="mt-5 text-[12.5px] text-faint italic leading-relaxed">{flagship.note}</p>
              <ArrowLink to={flagship.cta.path} className="mt-7">{flagship.cta.label}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- portfolio story */}
      <section className="band bg-paper">
        <div className="shell">
          {/* No character-width cap here: the heading is a single line in the visual
              guide, and a 42ch limit broke it across three. It still wraps on narrow
              screens, where one line will not fit. */}
          <div className="text-center max-w-5xl mx-auto">
            <p className="eyebrow mb-4">{portfolioStory.eyebrow}</p>
            <h2 className="text-[28px] md:text-[36px] text-balance">{portfolioStory.title}</h2>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Figure photo={portfolioStory.image} ratio="aspect-[5/4]" />

            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {portfolioStory.stages.map((s, i) => (
                  <div key={s.heading} className="rule-top">
                    <p className={`eyebrow mb-2 ${i === 1 ? 'text-gold-ink' : 'text-faint'}`}>{s.heading}</p>
                    <p className="text-[13.5px] text-body leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-10">
                {portfolioStory.figures.map((f) => (
                  <div key={f.label}>
                    <p className="figure-num text-[32px]">{f.value}</p>
                    <p className="text-[12px] text-muted mt-2">{f.label}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-[12.5px] text-faint italic">{portfolioStory.note}</p>
              <ArrowLink to={portfolioStory.cta.path} className="mt-5">{portfolioStory.cta.label}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- partnership */}
      <section className="band-tight bg-cream">
        <div className="shell text-center">
          <h2 className="text-[28px] md:text-[36px] max-w-[24ch] mx-auto">{partnerIntro.title}</h2>
          <p className="mt-5 text-[14.5px] text-body/80 leading-relaxed max-w-[64ch] mx-auto">
            {partnerIntro.body}
          </p>
          <Link to="/partners" className="btn-gold mt-9">Partner With Us</Link>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {partners.length > 0
              ? partners.map((p) => (
                  <div key={p.name} className="h-16 flex items-center justify-center bg-surface/60 rounded-[3px] px-4">
                    <img src={p.logoUrl} alt={p.alt ?? p.name} className="max-h-8 w-auto object-contain" />
                  </div>
                ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 flex items-center justify-center border border-dashed border-gold/30 rounded-[3px]"
                  >
                    <span className="text-[10px] uppercase tracking-[0.14em] text-gold-ink/50">
                      Partner logo
                    </span>
                  </div>
                ))}
          </div>
          <p className="mt-5 text-[11.5px] text-gold-ink/60 italic">{partnerIntro.note}</p>
        </div>
      </section>

      {/* ----------------------------------------------------- recent stories */}
      <section className="band bg-paper">
        <div className="shell">
          <SectionHead eyebrow="From the field" title="Recent stories." />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((s, i) => (
              <Link key={s.slug} to={`/stories/${s.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-[3px] bg-ink/5 aspect-[16/10]">
                  <img
                    src={s.image.src}
                    alt={s.image.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                  <span className={`absolute bottom-0 left-0 text-[9.5px] font-semibold uppercase tracking-[0.14em] px-3 py-2 ${categoryTag(s.category, i)}`}>
                    {s.category}
                  </span>
                </div>
                <h3 className="text-[18px] mt-5 leading-snug group-hover:text-gold-ink transition-colors">
                  {s.title}
                </h3>
                <span className="link-arrow mt-3">Read story →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- CTA */}
      <CtaBand title="Help us expand what works." tone="ink">
        <Link to="/partners" className="btn-gold">Become a Partner</Link>
        <Link to="/support" className="btn-ghost">Support Our Work</Link>
      </CtaBand>
    </>
  );
}
