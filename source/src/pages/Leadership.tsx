import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { photo } from '@/src/data/media';
import { Figure, Breadcrumb, CtaBand } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';

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
  bio: [
    `Mr. Ikechukwu Agwu is the founder of ${site.name}. He holds a degree in Pure and Applied ` +
    'Mathematics from the University of Ibadan, and has completed leadership and management ' +
    'programmes at Harvard University and other institutions internationally.',

    'He is Chief Executive of DAVRIC International Limited, which he built from a one-man ' +
    'startup in 2008 into an organisation of over 100 professionals.',

    `That operating experience shapes how ${site.short} is run. The foundation applies the same ` +
    'discipline it would apply to a business: fund what can grow, pair capital with support, ' +
    'and measure what actually happened.',
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
    bio: [
      'Professor Angela Unna Chukwu is a Professor of Statistics at the University of Ibadan, ' +
      'specialising in biostatistics, mathematical statistics and demography. Her work applies ' +
      'statistical methods to public health, clinical research and the life sciences.',

      'She holds a B.Sc. in Mathematics from the University of Calabar, and M.Sc. and Ph.D. ' +
      'degrees in Statistics from the University of Ibadan. She is a Fellow of the Royal ' +
      'Statistical Society.',

      'Through the University of Ibadan Research Foundation and the ARISE Network she has ' +
      'contributed to international research partnerships, public health initiatives and ' +
      'research capacity development across Africa, alongside teaching and postgraduate ' +
      'supervision.',
    ],
  },
];

export default function Leadership() {
  const { site } = useContent();
  const founder = makeFounder(site);
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
            <Figure photo={photo.founder} ratio="aspect-[4/5]" priority />
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

      <section className="band-tight bg-surface border-t border-rule">
        <div className="shell">
          <p className="eyebrow mb-10">Leadership team</p>

          {/* Two columns only once there is someone to put in the second one. */}
          <div className={cn('grid grid-cols-1 gap-12 lg:gap-16', team.length > 1 && 'lg:grid-cols-2')}>
            {team.map((member) => (
              <article
                key={member.name}
                className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-7 max-w-[62ch]"
              >
                <Figure photo={member.photo} ratio="aspect-square" className="sm:self-start" />

                <div>
                  <p className="eyebrow mb-3">{member.role}</p>
                  <h3 className="text-[23px] md:text-[26px]">{member.name}</h3>
                  <div className="mt-5 space-y-4 text-[14.5px] leading-relaxed text-body">
                    {member.bio.map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Understand how we're held accountable.">
        <Link to="/about/governance" className="btn-red">How We’re Governed</Link>
      </CtaBand>
    </>
  );
}
