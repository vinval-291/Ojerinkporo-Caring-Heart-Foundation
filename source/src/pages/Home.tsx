import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { flagship, portfolioStory } from '@/src/data/programmes';
import { partnerIntro } from '@/src/data/stories';
import { photo } from '@/src/data/media';
import { Figure, SectionHead, ArrowLink, Stat, CtaBand, categoryTag } from '@/src/components/ui';

export default function Home() {
  const { site, programmes, headlineMetrics, stories: allStories, partners } = useContent();
  const stories = allStories.filter((s) => !s.draft);
  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      {/* Full-height hero. 74px is the sticky header above it (4px accent rule + 70px
          bar), so hero plus header fills exactly one screen and nothing is clipped.
          svh rather than vh: on phones, vh ignores the browser's address bar and the
          bottom of the hero ends up behind it. */}
      <section className="relative bg-ink text-white flex items-center min-h-[calc(100svh-74px)]">
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

        <div className="shell relative w-full py-16 md:py-20">
          <p className="eyebrow eyebrow-dark mb-6">{site.name}</p>
          {/* Set in capitals at the client's request. Capitals need a little letter
              spacing and more line height to stay readable at this size. */}
          <h1 className="text-white text-[34px] sm:text-[46px] lg:text-[56px] max-w-[18ch]
                         uppercase tracking-[0.01em] leading-[1.14]">
            Investing in people.
            <br />
            Building stronger communities.
          </h1>
          <p className="mt-5 text-[16px] md:text-[17px] text-white/75 max-w-[54ch] leading-relaxed">
            OCHF expands opportunity across Nigeria through enterprise funding,
            education and direct community investment.
          </p>
          {/* One button, one text link — the brief's homepage hero. Partner With Us is
              the page's closing CTA, so it does not need to be a second button up here. */}
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link to="/our-work" className="btn-accent">Explore Our Work</Link>
            <Link to="/partners" className="link-arrow link-arrow-dark">
              Partner With Us
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <p className="photo-credit">{photo.heroGrant.credit}</p>
      </section>

      {/* ------------------------------------------------- headline figures */}
      {/* On cream, not a navy band: the brief wants key numbers in the accent, and
          the accent on navy is 2.1:1. On cream the figures read at 7.8:1. */}
      <section className="bg-cream border-y border-rule">
        <div className="shell py-10 md:py-12">
          <h2 className="text-[22px] md:text-[26px] mb-8">
            Impact, measured beyond the grant.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            {headlineMetrics.map((m) => (
              <Stat key={m.label} metric={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ three pillars */}
      <section className="band bg-paper">
        <div className="shell">
          <SectionHead
            eyebrow="What we do"
            title="Three pillars. One direction."
            aside="Structured programmes built to grow — not a list of activities we happen to run."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <h3 className="text-[21px] mt-5 group-hover:text-accent transition-colors">{p.name}</h3>
                <p className="text-[13.5px] text-muted mt-2 leading-relaxed">
                  {p.focusAreas.join(' | ')}
                </p>
                <span className="link-arrow mt-3">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- flagship programme */}
      {/* Held inside the page gutter rather than bled to the window edge. The image is
          a 16:9 poster with its own wordmark and caption set into it, so a full-bleed
          panel cropped the sides off and cut the lettering in half. */}
      <section className="band-tight bg-surface">
        <div className="shell grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Figure photo={flagship.image} ratio="aspect-[16/9]" />

          <div className="max-w-[46ch]">
            <p className="eyebrow mb-4">{flagship.eyebrow}</p>
            <h2 className="text-[30px] md:text-[38px]">{flagship.title}</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-body">{flagship.body}</p>
            <ArrowLink to={flagship.cta.path} className="mt-7">{flagship.cta.label}</ArrowLink>
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
                    <p className={`eyebrow mb-2 ${i === 1 ? 'text-accent' : 'text-faint'}`}>{s.heading}</p>
                    <p className="text-[13.5px] text-body leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>

              <ArrowLink to={portfolioStory.cta.path} className="mt-10">{portfolioStory.cta.label}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- partnership */}
      <section className="band-tight bg-accent-tint">
        <div className="shell text-center">
          <h2 className="text-[28px] md:text-[36px] max-w-[24ch] mx-auto">{partnerIntro.title}</h2>
          <p className="mt-5 text-[14.5px] text-body/80 leading-relaxed max-w-[64ch] mx-auto">
            {partnerIntro.body}
          </p>
          {/* No button here. The page's single closing CTA is Partner With Us, and the
              brief allows one per page — two invitations to the same place is one too many. */}

          {partners.length > 0 && (
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {partners.map((p) => (
                <div key={p.name} className="h-16 flex items-center justify-center bg-surface/60 rounded-[3px] px-4">
                  <img src={p.logoUrl} alt={p.alt ?? p.name} className="max-h-8 w-auto object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ----------------------------------------------------- recent stories */}
      {stories.length > 0 && (
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
                <h3 className="text-[18px] mt-5 leading-snug group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
                <span className="link-arrow mt-3">Read story →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* --------------------------------------------------------------- CTA */}
      <CtaBand title="Help us expand what works." tone="ink">
        <Link to="/partners" className="btn-accent">Partner With Us</Link>
      </CtaBand>
    </>
  );
}
