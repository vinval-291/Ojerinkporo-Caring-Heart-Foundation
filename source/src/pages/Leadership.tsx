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

      <CtaBand title="Understand how we're held accountable.">
        <Link to="/about/governance" className="btn-red">How We’re Governed</Link>
      </CtaBand>
    </>
  );
}
