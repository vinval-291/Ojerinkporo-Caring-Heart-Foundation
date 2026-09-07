import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { photo } from '@/src/data/media';
import { Figure, ArrowLink, CtaBand, Breadcrumb } from '@/src/components/ui';

export default function About() {
  const { site, programmes } = useContent();
  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb trail={[{ name: 'About' }]} />
        </div>
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">About {site.short}</p>
          <h1 className="text-[38px] md:text-[50px] max-w-[20ch]">
            Who we are, and how we work.
          </h1>
          <p className="mt-6 lede">
            {site.name} expands access to opportunity through enterprise, education, agriculture
            and community development. We originated in Ebonyi State and work across Nigeria.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- who we are */}
      <section className="band bg-paper">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 max-w-[64ch] space-y-6 text-[15px] leading-relaxed text-body">
            <p>
              {site.name} is a Nigerian foundation working to widen access to opportunity for people
              whose progress is limited by capital, cost or circumstance rather than by ability.
            </p>
            <p>
              Our approach is deliberately structured. Rather than distributing relief and moving on,
              we back ventures and individuals with funding paired to mentorship, equipment,
              training or schooling — and then follow what happens. The Entrepreneurship Grant
              Programme, our flagship, commits ₦100,000,000 to Nigerian businesses in awards of
              ₦1,000,000 to ₦3,000,000, each one matched with 1:1 mentorship.
            </p>
            <p>
              We began in Ebonyi State and remain headquartered there. That is where we started,
              not the limit of where we work.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="border-t-2 border-gold pt-5">
              <p className="eyebrow mb-3">Mission</p>
              <p className="font-serif text-[19px] text-ink leading-snug">
                To expand access to opportunity through enterprise, education, agriculture and
                community development — and to report honestly on what that produces.
              </p>
            </div>
            <div className="border-t-2 border-green pt-5">
              <p className="eyebrow mb-3">Vision</p>
              <p className="font-serif text-[19px] text-ink leading-snug">
                Nigerian communities where opportunity is determined by capability, not by
                circumstance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ pillars */}
      <section className="band-tight bg-surface border-y border-rule">
        <div className="shell">
          <p className="eyebrow mb-8">The model</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {programmes.map((p) => (
              <div key={p.slug} className="rule-top">
                <h3 className="text-[18px] mb-2">{p.name}</h3>
                <p className="text-[13px] text-muted leading-relaxed">{p.tag}</p>
                <ArrowLink to={`/our-work/${p.slug}`} className="mt-3">Learn more</ArrowLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- evidence */}
      <section className="band bg-paper">
        <div className="shell grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Figure photo={photo.chequePresentation} ratio="aspect-[5/4]" />
          <div className="max-w-[46ch]">
            <p className="eyebrow mb-4">Accountability</p>
            <h2 className="text-[28px] md:text-[34px]">We publish what we can verify.</h2>
            <p className="mt-6 text-[14.5px] leading-relaxed text-body">
              Every figure we publish is drawn from grant disbursement records, programme registers
              and direct beneficiary follow-up, on a stated reporting schedule. Where a figure has
              not yet been verified, we say so rather than estimate it.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/impact" className="btn-outline">See the evidence</Link>
              <Link to="/about/governance" className="btn-outline">How we're governed</Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Work with us.">
        <Link to="/partners" className="btn-gold">Become a Partner</Link>
        <Link to="/about/leadership" className="btn-outline">Meet the Leadership</Link>
      </CtaBand>
    </>
  );
}
