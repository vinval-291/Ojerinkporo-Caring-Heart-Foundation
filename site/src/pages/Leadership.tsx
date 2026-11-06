import { Link, useParams } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { photo, type Photo } from '@/src/data/media';
import { Accent, ArrowLink, ClosingCta, PageHero, Pic, Reveal, SectionHead } from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';

/**
 * Leadership.
 *
 * The index carries a portrait, a role and the opening paragraph; the full profile
 * lives on its own page. Four full biographies stacked down one page buried the
 * names, which are the part an institutional reader is checking for.
 *
 * Confirmed by the client (7 September 2026): Mr. Ikechukwu Agwu is the founder and
 * visionary of the foundation. The previous build named a different person as founder
 * on one of its event pages; that attribution was incorrect and has been removed.
 */

export interface Person {
  slug: string;
  name: string;
  role: string;
  /** founder · leadership (management) · board (trustees) — decides the section. */
  group: 'founder' | 'leadership' | 'board';
  photo: Photo;
  bio: string[];
}

/**
 * Addresses are built from the name, since the CMS has no slug field for a person.
 * Honorifics come off first: /about/leadership/prof-angela-unna-chukwu would date
 * the moment a title changed.
 */
export const personSlug = (name: string) =>
  name
    .replace(/^(Mr|Mrs|Ms|Miss|Dr|Prof|Professor|Engr|Chief|Barr|Hon)\.?\s+/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/* ---------------------------------------------------- the code fallback ---- */

const makeFounder = (site: { name: string; short: string }): Person => ({
  slug: 'ikechukwu-agwu',
  name: 'Mr. Ikechukwu Agwu',
  role: 'Founder',
  group: 'founder',
  photo: photo.founder,
  // As supplied by the client, October 2026.
  bio: [
    'Mr. Ikechukwu Agwu is a Nigerian entrepreneur, business leader and philanthropist ' +
    'committed to creating opportunities and driving meaningful change.',

    'A graduate of Pure and Applied Mathematics from the University of Ibadan, he has also ' +
    'completed leadership and management programmes at Harvard University and other ' +
    'international institutions.',

    'In 2008, he founded Dav-Ric Nigeria Limited as a one-man venture, growing it into DAVRIC ' +
    'Group, a diversified enterprise spanning multiple industries, with operations across two ' +
    'continents and a workforce of over 100 professionals.',

    'Guided by his belief that success should create opportunities for others, he established ' +
    `${site.name} to advance entrepreneurship, education and community development. Over the ` +
    'past three years, the Foundation has deployed more than ₦250 million across its ' +
    'programmes, translating his vision of empowerment into tangible impact.',
  ],
});

const team: Person[] = [
  {
    slug: 'angela-unna-chukwu',
    name: 'Prof. Angela Unna Chukwu',
    role: 'Director of Programmes',
    group: 'leadership',
    photo: photo.angelaChukwu,
    // As supplied by the client, October 2026.
    bio: [
      'Professor Angela Unna Chukwu is a distinguished statistician, researcher and educator at ' +
      'the University of Ibadan, Nigeria, with expertise in biostatistics, mathematical ' +
      'statistics and demography.',

      'She holds a B.Sc. in Mathematics from the University of Calabar, an M.Sc. and Ph.D. in ' +
      'Statistics from the University of Ibadan, and is a Fellow of the Royal Statistical Society.',

      'Her career spans academic research, public health and international research ' +
      'collaboration, including contributions to the University of Ibadan Research Foundation ' +
      'and initiatives focused on advancing research capacity across Africa.',

      'As Director of Programmes at Ojerinkporo Caring Hearts Foundation, she brings her ' +
      'analytical expertise and commitment to evidence-based development to the Foundation’s ' +
      'work in entrepreneurship, education and community empowerment.',
    ],
  },
];

/** One list, used by both the index and the profile pages so they cannot disagree. */
export function useLeadership(): Person[] {
  const { site, people } = useContent();

  if (people.length) {
    return people.map((p) => ({
      slug: personSlug(p.name),
      name: p.name,
      role: p.role,
      group: p.group,
      photo: p.portrait ?? (p.group === 'founder' ? photo.founder : photo.angelaChukwu),
      bio: p.bio,
    }));
  }
  return [makeFounder(site), ...team];
}

/* ------------------------------------------------------------- the index ---- */

/** The sections of the leadership structure, in order. A section with nobody in it is not shown. */
export const LEADERSHIP_GROUPS: { group: Person['group']; title: string; blurb: string }[] = [
  { group: 'founder', title: 'Founder', blurb: 'Who established the foundation.' },
  { group: 'leadership', title: 'Management', blurb: 'The team that runs the foundation’s programmes.' },
  { group: 'board', title: 'Board of Trustees', blurb: 'The trustees who oversee the foundation.' },
];

export default function Leadership() {
  const { site } = useContent();
  const people = useLeadership();
  usePageMeta('Leadership', `The founder, management and trustees accountable for the work of ${site.name}.`);
  const groups = LEADERSHIP_GROUPS.map((g) => ({ ...g, people: people.filter((p) => p.group === g.group) })).filter((g) => g.people.length);

  return (
    <>
      <PageHero
        trail={[{ name: 'About', path: '/about' }, { name: 'Leadership' }]}
        kicker={`About ${site.short} — Leadership`}
        title={<>The people accountable <Accent>for the work.</Accent></>}
        lede="The foundation’s leadership and governance structure: who founded it, who runs its programmes, and who holds it to account."
      />

      {groups.map((g, gi) => (
        <section key={g.group} className={gi === 0 ? 'shell pt-24' : 'shell pt-20'}>
          <SectionHead title={g.title} lede={g.blurb} />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {g.people.map((p, i) => (
              <Reveal as="article" index={i} key={p.slug} className="group relative card-tint flex flex-col gap-5 focus-within:ring-2 focus-within:ring-brand-800">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-white">
                  <img src={p.photo.src} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer"
                    className="img-zoom absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="px-3 pb-3 flex flex-col gap-2.5 flex-1">
                  <span className="tag bg-white text-brand-800 self-start">{p.role}</span>
                  <h3 className="font-serif font-semibold text-[28px] text-brand-800 leading-tight">
                    <Link to={`/about/leadership/${p.slug}`} className="after:absolute after:inset-0 focus:outline-none">{p.name}</Link>
                  </h3>
                  {/* The opening paragraph only. The rest is on the profile page. */}
                  <p className="text-[15px] text-muted leading-relaxed line-clamp-4">{p.bio[0]}</p>
                  <span className="mt-auto pt-1 font-bold text-[15px] text-brand-800">Read full profile →</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
      <div className="pb-4" />

      <ClosingCta title={<>Understand how we're <Accent tone="brand">held accountable.</Accent></>} action={{ label: 'How We’re Governed', to: '/about/governance' }} />
    </>
  );
}

/* ------------------------------------------------------ one person's page ---- */

export function LeadershipProfile() {
  const { slug } = useParams();
  const { loaded } = useContent();
  const people = useLeadership();
  const person = people.find((p) => p.slug === slug);
  usePageMeta(person ? `${person.name}, ${person.role}` : 'Leadership', person?.bio[0], person?.photo.src);

  /* The CMS may hold someone the code fallback does not. Until it answers we cannot
     tell a missing profile from one we have not heard about yet, so say nothing. */
  if (!person && !loaded) return <div className="shell py-24" aria-busy="true" aria-label="Loading profile" />;

  if (!person) {
    return (
      <div className="shell py-24">
        <h1 className="h-page text-brand-800 mb-8">Profile not found.</h1>
        <Link to="/about/leadership" className="btn-brand">All leadership</Link>
      </div>
    );
  }

  const [opening, ...rest] = person.bio;

  return (
    <>
      <PageHero
        trail={[{ name: 'About', path: '/about' }, { name: 'Leadership', path: '/about/leadership' }, { name: person.name }]}
        kicker={person.role}
        title={person.name}
      />

      <section className="shell py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <Pic photo={person.photo} priority className="aspect-[4/5]" rounded="rounded-[28px]" sizes="(min-width:1024px) 40vw, 100vw" />
        </div>
        <div className="lg:col-span-7">
          {opening && <p className="font-serif text-[26px] md:text-[30px] leading-[1.35] text-brand-800">{opening}</p>}
          {rest.length > 0 && (
            <div className="mt-10 space-y-5 text-[17.5px] leading-[1.8] text-ink max-w-[62ch]">
              {rest.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          )}
          <ArrowLink to="/about/leadership" className="mt-12">All leadership</ArrowLink>
        </div>
      </section>

      <ClosingCta title={<>Understand how we're <Accent tone="brand">held accountable.</Accent></>} action={{ label: 'How We’re Governed', to: '/about/governance' }} />
    </>
  );
}
