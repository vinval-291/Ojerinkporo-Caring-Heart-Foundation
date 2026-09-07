import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { photo } from '@/src/data/media';
import { Figure, Breadcrumb, CtaBand, AwaitingContent } from '@/src/components/ui';

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
  known: 'Iyke',
  role: 'Founder',
  quote: 'Service to humanity is the best work of life. We are the bridge to a better future.',
  expertise: ['Business Development', 'Real Estate', 'Telecommunications', 'Logistics', 'Oil & Gas'],
  bio: [
    `Mr. Ikechukwu Agwu — known as Iyke — is the founder of ${site.name}. He holds a degree in ` +
    'Pure and Applied Mathematics from the University of Ibadan, and has completed leadership ' +
    'and management programmes at Harvard University and other institutions internationally.',

    'He began Dav-Ric Nigeria Limited as a one-man startup in 2008. Today, as Chief Executive ' +
    'of DAVRIC International Limited, he leads an organisation of over 100 professionals working ' +
    'across business development, oil and gas, real estate, telecommunications and logistics.',

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
            <div className="mt-6 border-t-2 border-gold pt-5">
              <p className="eyebrow mb-3">Areas of expertise</p>
              <ul className="space-y-1.5">
                {founder.expertise.map((e) => (
                  <li key={e} className="text-[13.5px] text-body">{e}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 max-w-[58ch]">
            <p className="eyebrow mb-4">{founder.role}</p>
            <h2 className="text-[32px] md:text-[40px]">{founder.name}</h2>

            <blockquote className="mt-8 border-l-2 border-gold pl-6">
              <p className="font-serif italic text-[19px] md:text-[21px] text-ink leading-snug">
                "{founder.quote}"
              </p>
            </blockquote>

            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-body">
              {founder.bio.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-paper">
        <div className="shell">
          <AwaitingContent
            what="Leadership team and board"
            detail={
              'Profiles for the wider leadership team and board of trustees have not yet been ' +
              'supplied. Each will carry a name, role, and short professional biography in the ' +
              'same format as above.'
            }
          />
        </div>
      </section>

      <CtaBand title="Understand how we're held accountable.">
        <Link to="/about/governance" className="btn-gold">Governance</Link>
        <Link to="/impact" className="btn-outline">Impact & Evidence</Link>
      </CtaBand>
    </>
  );
}
