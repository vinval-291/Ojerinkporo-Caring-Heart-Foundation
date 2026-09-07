import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { photo } from '@/src/data/media';
import { Figure, Breadcrumb, CtaBand, AwaitingContent } from '@/src/components/ui';

/** "Our Story" — how and why OCHF was founded. */
export default function Story() {
  const { site, milestones } = useContent();
  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb trail={[{ name: 'About', path: '/about' }, { name: 'Our Story' }]} />
        </div>
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">About {site.short} — Our Story</p>
          <h1 className="text-[38px] md:text-[50px] max-w-[18ch]">
            It started in Ebonyi. It did not stop there.
          </h1>
          <p className="mt-6 lede">
            {site.name} was formally inaugurated in 2024 in the Amas Autonomous Community,
            Ebonyi State — and has been building structured programmes ever since.
          </p>
        </div>
      </section>

      <section className="band bg-paper">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 max-w-[62ch] space-y-6 text-[15px] leading-relaxed text-body">
            <p>
              The foundation was inaugurated in 2024 before hundreds of community members, with a
              stated commitment to education, enterprise, health and community development. The
              first day was not ceremonial alone: food and school supplies were distributed to
              over 100 households, and the foundation's liaison office was dedicated.
            </p>
            <p>
              In 2025 OCHF launched its Entrepreneurship Grant Programme, committing ₦100,000,000
              to Nigerian businesses. That programme now sets the pattern for how the foundation
              works — capital paired with mentorship, awarded against published criteria, and
              followed up rather than forgotten.
            </p>
            <p>
              Ebonyi State remains home. But the work is national: the grant programme is open to
              Nigerian entrepreneurs, wherever they build.
            </p>
          </div>

          <div className="lg:col-span-5">
            <Figure photo={photo.guests} ratio="aspect-[4/5]" />
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="shell py-16 md:py-20">
          <p className="eyebrow eyebrow-dark mb-8">Milestones</p>
          <ol className="border-t border-rule-dark">
            {milestones.map((m) => (
              <li
                key={m.year}
                className="grid grid-cols-[64px_1fr] md:grid-cols-[110px_1fr] gap-6 py-5 border-b border-rule-dark"
              >
                <span className="font-serif text-[19px] font-semibold text-gold-lift tabular-nums">
                  {m.year}
                </span>
                <span className="text-[14px] text-white/70 leading-relaxed">{m.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band bg-paper">
        <div className="shell">
          <AwaitingContent
            what="The founding account, in full"
            detail={
              "A longer first-person account of why the foundation was established — the need it " +
              'was created to answer, and the decision to begin — is being written with the ' +
              'founder. It will publish here.'
            }
          />
        </div>
      </section>

      <CtaBand title="See where the work stands now.">
        <Link to="/impact" className="btn-gold">Impact & Evidence</Link>
        <Link to="/our-work" className="btn-outline">Our Programmes</Link>
      </CtaBand>
    </>
  );
}
