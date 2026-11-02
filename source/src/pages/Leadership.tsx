import { Link, useParams } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { photo, type Photo } from '@/src/data/media';
import { Figure, Breadcrumb, CtaBand, ArrowLink } from '@/src/components/ui';

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
function useLeadership(): Person[] {
  const { site, people } = useContent();

  if (people.length) {
    return people.map((p) => ({
      slug: personSlug(p.name),
      name: p.name,
      role: p.role,
      photo: p.portrait ?? (p.group === 'founder' ? photo.founder : photo.angelaChukwu),
      bio: p.bio,
    }));
  }
  return [makeFounder(site), ...team];
}

/* ------------------------------------------------------------- the index ---- */

export default function Leadership() {
  const { site } = useContent();
  const people = useLeadership();

  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb trail={[{ name: 'About', path: '/about' }, { name: 'Leadership' }]} />
        </div>
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">About {site.short} — Leadership</p>
          <h1 className="text-[38px] md:text-[50px] max-w-[18ch]">The people accountable for the work.</h1>
        </div>
      </section>

      <section className="band bg-paper">
        <div className="shell grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {people.map((p) => (
            <article key={p.slug}>
              <Link
                to={`/about/leadership/${p.slug}`}
                className="group block"
                aria-label={`Read ${p.name}'s profile`}
              >
                <div className="surface-gradient overflow-hidden rounded-[3px] aspect-[4/5]">
                  <img
                    src={p.photo.src}
                    alt={p.photo.alt}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="eyebrow mt-6 mb-2">{p.role}</p>
                <h2 className="text-[23px] md:text-[25px] group-hover:text-accent transition-colors">
                  {p.name}
                </h2>
              </Link>

              {/* The opening paragraph only. The rest is on the profile page. */}
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{p.bio[0]}</p>

              <ArrowLink to={`/about/leadership/${p.slug}`} className="mt-4">
                Read full profile
              </ArrowLink>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="Understand how we're held accountable.">
        <Link to="/about/governance" className="btn-accent">How We’re Governed</Link>
      </CtaBand>
    </>
  );
}

/* ------------------------------------------------------ one person's page ---- */

export function LeadershipProfile() {
  const { slug } = useParams();
  const { fromCms } = useContent();
  const people = useLeadership();
  const person = people.find((p) => p.slug === slug);

  /* The CMS may hold someone the code fallback does not. Until it answers we cannot
     tell a missing profile from one we have not heard about yet, so say nothing. */
  if (!person && !fromCms) {
    return <div className="shell band" aria-busy="true" aria-label="Loading profile" />;
  }

  if (!person) {
    return (
      <div className="shell band text-center">
        <h1 className="text-[32px] mb-4">Profile not found</h1>
        <Link to="/about/leadership" className="btn-outline mt-4">All leadership</Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb
            trail={[
              { name: 'About', path: '/about' },
              { name: 'Leadership', path: '/about/leadership' },
              { name: person.name },
            ]}
          />
        </div>
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">{person.role}</p>
          <h1 className="text-[36px] md:text-[46px] max-w-[20ch]">{person.name}</h1>
        </div>
      </section>

      <section className="band bg-paper">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Figure photo={person.photo} ratio="aspect-[4/5]" priority />
          </div>

          <div className="lg:col-span-7 max-w-[58ch]">
            <div className="space-y-5 text-[15.5px] leading-relaxed text-body">
              {person.bio.map((para, i) => <p key={i}>{para}</p>)}
            </div>

            <ArrowLink to="/about/leadership" className="mt-10">All leadership</ArrowLink>
          </div>
        </div>
      </section>

      <CtaBand title="Understand how we're held accountable.">
        <Link to="/about/governance" className="btn-accent">How We’re Governed</Link>
      </CtaBand>
    </>
  );
}
