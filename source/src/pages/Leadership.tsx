import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { photo } from '@/src/data/media';
import { Figure, Breadcrumb, CtaBand } from '@/src/components/ui';

/**
 * Founder profile.
 *
 * Confirmed by the client (7 September 2026): Mr. Ikechukwu Agwu is the founder and
 * visionary of the foundation. The previous build named a different person as founder
 * on one of its event pages; that attribution was incorrect and has been removed.
 * This page is the single source for founder attribution — do not reintroduce another.
 */
const makeFounder = (site: { name: string; short: string }) => ({
  name: 'Mr. Ikechukwu Agwu',
  role: 'Founder',
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
    'past three years, the Foundation has deployed more than ₦200 million across its ' +
    'programmes, translating his vision of empowerment into tangible impact.',
  ],
});

/**
 * Everyone else accountable for the work.
 *
 * The launch brief is blunt about why this section exists: one named person reads as
 * a personal project, three reads as an institution. An institutional reader checks.
 */
const team = [
  {
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

export default function Leadership() {
  const { site, people } = useContent();

  /* The CMS wins where it has someone; the code is the fallback. A person is only
     counted once they have a biography written — see the filter in ContentProvider. */
  const cmsFounder = people.find((p) => p.group === 'founder');
  const founder = cmsFounder
    ? { name: cmsFounder.name, role: cmsFounder.role, bio: cmsFounder.bio }
    : makeFounder(site);
  const founderPhoto = cmsFounder?.portrait ?? photo.founder;

  const cmsTeam = people.filter((p) => p.group !== 'founder');
  const members = cmsTeam.length
    ? cmsTeam.map((p) => ({ name: p.name, role: p.role, bio: p.bio, photo: p.portrait ?? photo.angelaChukwu }))
    : team;
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
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Figure photo={founderPhoto} ratio="aspect-[4/5]" priority />
          </div>

          <div className="lg:col-span-7 max-w-[58ch]">
            <p className="eyebrow mb-4">{founder.role}</p>
            <h2 className="text-[32px] md:text-[40px]">{founder.name}</h2>

            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-body">
              {founder.bio.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* Same weight as the founder's profile, mirrored: portrait right, text left. */}
      {members.map((member) => (
        <section key={member.name} className="band bg-surface border-t border-rule">
          <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 lg:order-1 max-w-[58ch]">
              <p className="eyebrow mb-4">{member.role}</p>
              <h2 className="text-[32px] md:text-[40px]">{member.name}</h2>

              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-body">
                {member.bio.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>

            <div className="lg:col-span-5 lg:order-2">
              <Figure photo={member.photo} ratio="aspect-[4/5]" />
            </div>
          </div>
        </section>
      ))}

      <CtaBand title="Understand how we're held accountable.">
        <Link to="/about/governance" className="btn-accent">How We’re Governed</Link>
      </CtaBand>
    </>
  );
}
