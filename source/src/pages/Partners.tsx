import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { partnerIntro } from '@/src/data/stories';
import { photo } from '@/src/data/media';
import { Figure, Breadcrumb, CtaBand } from '@/src/components/ui';

const partnerTypes = [
  {
    name: 'Cooperatives',
    body: 'Farmer and trade cooperatives that extend programme reach into working communities.',
  },
  {
    name: 'Development organisations',
    body: 'Organisations with aligned programme priorities and complementary field capacity.',
  },
  {
    name: 'Government',
    body: 'State and local government partners on programme delivery and community access.',
  },
  {
    name: 'Educational institutions',
    body: 'Schools and tertiary institutions delivering scholarship and training programmes.',
  },
  {
    name: 'Technical partners',
    body: 'Specialists providing equipment, training and mentorship to funded businesses.',
  },
  {
    name: 'Funders',
    body: 'Organisations and individuals co-funding programmes at scale.',
  },
];

export default function Partners() {
  const { site, partners } = useContent();
  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb trail={[{ name: 'Partners' }]} />
        </div>
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">Partnership</p>
          <h1 className="text-[38px] md:text-[50px] max-w-[20ch]">{partnerIntro.title}</h1>
          <p className="mt-6 lede">{partnerIntro.body}</p>
        </div>
      </section>

      <section className="band bg-paper">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <Figure photo={photo.keynoteAlt} ratio="aspect-[4/5]" />
          </div>

          <div className="lg:col-span-7">
            <p className="eyebrow mb-8">Who we work with</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {partnerTypes.map((t) => (
                <div key={t.name} className="rule-top">
                  <h2 className="text-[17px] mb-2">{t.name}</h2>
                  <p className="text-[13.5px] text-muted leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner logos — empty until permissioned logos are supplied. */}
      <section className="band-tight bg-cream">
        <div className="shell text-center">
          <p className="eyebrow mb-8">Current partners</p>

          {partners.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-3xl mx-auto">
              {partners.map((p) => (
                <div key={p.name} className="h-20 flex items-center justify-center bg-surface rounded-[3px] px-5">
                  <img src={p.logoUrl} alt={p.alt ?? p.name} className="max-h-10 w-auto object-contain" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-3xl mx-auto">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 flex items-center justify-center border border-dashed border-gold/30 rounded-[3px]"
                  >
                    <span className="text-[10px] uppercase tracking-[0.14em] text-gold-ink/50">
                      Partner logo
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[12px] text-gold-ink/70 italic max-w-[48ch] mx-auto">
                {partnerIntro.note} Logos publish here once {site.short} confirms written
                permission from each partner.
              </p>
            </>
          )}
        </div>
      </section>

      <CtaBand title="Let's talk about working together." tone="ink">
        <Link to="/contact" className="btn-gold">Start a Conversation</Link>
        <Link to="/impact" className="btn-ghost">See Our Impact</Link>
      </CtaBand>
    </>
  );
}
