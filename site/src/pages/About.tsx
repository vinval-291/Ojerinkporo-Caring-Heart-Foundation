import { Link } from 'react-router-dom';
import { Search, Coins, Handshake, LineChart } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { photo } from '@/src/data/media';
import { outreach } from '@/src/content/photos';
import { about, governance, pillarCards } from '@/src/content/copy';
import { useLeadership, LEADERSHIP_GROUPS } from '@/src/pages/Leadership';
import {
  Accent, ArrowLink, ClosingCta, PageHero, Pic, PillarsTitle, Reveal, SectionHead, pillarsPhrase, programmeIcon,
} from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';

/**
 * About — the five-section institutional profile from the master file (4.3): who we
 * are and our story, mission and vision, how we work, who we serve, the pillars, then
 * leadership, governance and accountability.
 *
 * No founding year (the registration certificate settles it) and no count of states
 * (the ledger settles it). Core values and objectives appear only once OCHF enters its
 * approved wording in Foundation details.
 */

const stepIcons = [Search, Coins, Handshake, LineChart];

export default function About() {
  const { programmes, milestones, institution, publications } = useContent();
  const people = useLeadership();
  usePageMeta(about.title, about.description, photo.guests.src);

  const structure = LEADERSHIP_GROUPS
    .map((g) => ({ ...g, people: people.filter((p) => p.group === g.group) }))
    .filter((g) => g.people.length);

  const nav = [
    ['story', 'Our story'], ['mission', 'Mission & vision'], ['approach', 'How we work'], ['who-we-serve', 'Who we serve'],
    ...(institution.values.length ? [['values', 'Core values']] : []),
    ...(institution.objectives.length ? [['objectives', 'Objectives']] : []),
    ['pillars', 'Our pillars'], ['leadership', 'Leadership & governance'], ['accountability', 'Accountability'],
  ];

  return (
    <>
      <PageHero
        trail={[{ name: 'About' }]}
        kicker="About OCHF"
        title={<>About <Accent>OCHF.</Accent></>}
        lede={about.intro}
        photo={photo.guests}
      />

      <nav aria-label="On this page" className="shell pt-10">
        <ul className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {nav.map(([id, label]) => (
            <li key={id} className="shrink-0"><a href={`#${id}`} className="tag-tint hover:bg-brand-800 hover:text-white transition-colors">{label}</a></li>
          ))}
        </ul>
      </nav>

      {/* ------------------------------------------------------------ story */}
      <section id="story" className="shell pt-16 scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <Reveal className="lg:col-span-6 flex flex-col gap-6">
          <p className="kicker text-brand-800/80">Our story</p>
          <h2 className="h-sec text-ink">Built in <Accent tone="brand">community.</Accent></h2>
          <div className="space-y-5 text-[17.5px] leading-[1.75] text-muted max-w-[60ch]">
            {about.story.map((p) => <p key={p}>{p}</p>)}
          </div>
          <ArrowLink to="/about/story">Read the full story</ArrowLink>
        </Reveal>
        {milestones.length > 0 && (
          <ol className="lg:col-span-6 flex flex-col gap-3 self-center">
            {milestones.map((m, i) => (
              <Reveal as="li" index={i} key={`${m.year}-${i}`} className="flex gap-6 rounded-[20px] border border-line p-6">
                <span className="font-serif font-semibold text-[30px] leading-none text-brand-800 tabular-nums">{m.year}</span>
                <span className="text-[16px] text-muted leading-relaxed">{m.body}</span>
              </Reveal>
            ))}
          </ol>
        )}
      </section>

      {/* -------------------------------------------------- mission & vision */}
      <section id="mission" className="shell pt-24 scroll-mt-28 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal className="bg-brand-800 text-white rounded-[28px] p-10 md:p-14 on-dark">
          <span className="tag-lime">Mission</span>
          <p className="mt-6 font-serif text-[28px] md:text-[34px] leading-[1.25]">{about.mission}</p>
        </Reveal>
        <Reveal index={1} className="bg-tint rounded-[28px] p-10 md:p-14">
          <span className="tag bg-white text-brand-800">Vision</span>
          <p className="mt-6 font-serif text-[28px] md:text-[34px] leading-[1.25] text-brand-800">{about.vision}</p>
        </Reveal>
      </section>

      {/* ------------------------------------------------------- how we work */}
      <section id="approach" className="mt-24 scroll-mt-28 bg-brand-950 text-white on-dark">
        <div className="shell py-24">
          <SectionHead dark align="center" kicker="How we work" title={<>Identify. Invest. <Accent>Support. Measure.</Accent></>} />
          <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {about.howWeWork.map((a, i) => {
              const Icon = stepIcons[i];
              return (
                <Reveal as="li" index={i} key={a.step} className="rounded-[24px] bg-white/[0.06] p-7 flex flex-col gap-4">
                  <span className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-lime text-lime-ink"><Icon className="w-5 h-5" aria-hidden="true" /></span>
                  <h3 className="font-serif font-semibold text-[30px]">{a.step}</h3>
                  <p className="text-[15.5px] text-white/75 leading-relaxed">{a.body}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------ who we serve */}
      <section id="who-we-serve" className="shell pt-24 scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <Reveal className="lg:col-span-5">
          <Pic photo={outreach.handover} className="aspect-[4/3]" rounded="rounded-[28px]" caption />
        </Reveal>
        <Reveal index={1} className="lg:col-span-7 flex flex-col gap-5">
          <p className="kicker text-brand-800/80">Who we serve</p>
          <p className="font-serif text-[26px] md:text-[32px] leading-[1.3] text-brand-800">{about.whoWeServe}</p>
        </Reveal>
      </section>

      {/* ------------------------------------------------- values (from CMS) */}
      {institution.values.length > 0 && (
        <section id="values" className="shell pt-24 scroll-mt-28">
          <SectionHead align="center" kicker="Core values" title={<>What we <Accent tone="brand">stand by.</Accent></>} />
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {institution.values.map((v, i) => (
              <Reveal as="li" index={i % 3} key={v.name} className="rounded-[24px] bg-tint p-8 flex flex-col gap-3">
                <h3 className="h-card text-brand-800">{v.name}</h3>
                {v.description && <p className="text-[15.5px] text-muted leading-relaxed">{v.description}</p>}
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {/* --------------------------------------------- objectives (from CMS) */}
      {institution.objectives.length > 0 && (
        <section id="objectives" className="shell pt-24 scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4"><SectionHead kicker="Objectives" title={<>What we set out <Accent tone="brand">to achieve.</Accent></>} /></div>
          <ol className="lg:col-span-8 flex flex-col gap-3">
            {institution.objectives.map((o, i) => (
              <Reveal as="li" index={i} key={o} className="flex gap-5 rounded-[20px] border border-line p-6">
                <span className="inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-tint text-brand-800 font-bold">{i + 1}</span>
                <span className="text-[16.5px] text-ink leading-relaxed">{o}</span>
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      {/* ----------------------------------------------------------- pillars */}
      <section id="pillars" className="shell pt-24 scroll-mt-28">
        <SectionHead align="center" kicker={`Our ${pillarsPhrase(programmes.length).replace('.', '').toLowerCase()}`}
          title={<PillarsTitle count={programmes.length} />} lede={about.pillarsLine} />
        <div className={`mt-12 grid grid-cols-1 gap-5 ${programmes.length > 3 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
          {programmes.map((p, i) => {
            const Icon = programmeIcon(p.name);
            return (
              <Reveal as="article" index={i} key={p.slug} className="group relative rounded-[24px] border border-line p-8 flex flex-col gap-4 focus-within:ring-2 focus-within:ring-brand-800">
                <span className="inline-flex w-12 h-12 items-center justify-center rounded-[16px] bg-tint text-brand-800"><Icon className="w-6 h-6" aria-hidden="true" /></span>
                <h3 className="font-serif font-semibold text-[28px] text-brand-800">{p.name}</h3>
                <p className="text-[15px] text-muted leading-relaxed flex-1">{pillarCards[p.slug] ?? p.summary}</p>
                <Link to={`/our-work/${p.slug}`} className="font-bold text-[15px] text-brand-800 after:absolute after:inset-0 focus:outline-none">Explore {p.name} →</Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------- leadership & governance */}
      <section id="leadership" className="shell pt-24 scroll-mt-28">
        <SectionHead kicker="Leadership & governance" title={<>Who leads, and <Accent tone="brand">who oversees.</Accent></>}
          action={<ArrowLink to="/about/leadership">Full leadership</ArrowLink>} />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {structure.flatMap((g) => g.people.map((p) => ({ p, title: g.title }))).slice(0, 4).map(({ p, title }, i) => (
              <Reveal key={p.slug} index={i} className="group relative flex items-center gap-5 rounded-[20px] bg-tint p-5 focus-within:ring-2 focus-within:ring-brand-800">
                <img src={p.photo.src} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" className="w-20 h-20 rounded-full object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-faint">{title} · {p.role}</p>
                  <Link to={`/about/leadership/${p.slug}`} className="block font-serif font-semibold text-[22px] text-brand-800 leading-tight after:absolute after:inset-0 focus:outline-none">{p.name}</Link>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal index={1} className="lg:col-span-4 rounded-[24px] bg-brand-800 text-white p-8 flex flex-col gap-4 on-dark">
            <p className="kicker text-lime-200">Governance</p>
            <p className="text-[16px] text-white/85 leading-relaxed">{governance.measurement}</p>
            {institution.registration && (
              <p className="text-[14.5px] text-white/75 border-t border-white/15 pt-4"><span className="font-bold text-white">Registration:</span> {institution.registration}</p>
            )}
            <Link to="/about/governance" className="btn-lime self-start mt-auto">Governance & policies</Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- accountability */}
      <section id="accountability" className="shell pt-24 scroll-mt-28">
        <Reveal className="rounded-[28px] bg-tint-50 border border-line p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="kicker text-brand-800/80 mb-4">Accountability</p>
            <h2 className="h-sec text-brand-800">Every number <Accent tone="brand">has a source.</Accent></h2>
            <p className="lede text-muted mt-5 max-w-[56ch]">{governance.measurement}</p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3 lg:items-end">
            <ArrowLink to="/impact#how-we-count">How we count</ArrowLink>
            <ArrowLink to="/about/governance">Governance & policies</ArrowLink>
            {publications.length > 0 && <ArrowLink to="/resources">Reports & publications</ArrowLink>}
          </div>
        </Reveal>
      </section>

      <ClosingCta title={<>See our programmes <Accent tone="brand">in practice.</Accent></>} action={{ label: 'Explore Our Work', to: '/our-work' }} />
    </>
  );
}
