import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
  const { partners } = useContent();
  return (
    <>
      {/* Hero built to the client's reference: text left, photograph right behind a
          curved edge. The curve is a CSS border-radius on the image panel rather than
          an image mask, so it survives any photograph OCHF puts behind it. */}
      <section className="bg-cream border-b border-rule overflow-hidden">
        <div className="shell pt-8">
          <Breadcrumb trail={[{ name: 'Partners' }]} />
        </div>

        {/* From lg the photograph is taken out of the shell and pinned to the right of
            the window, so it runs off the edge as in the reference rather than stopping
            at the gutter. The curve is a border-radius on its left corners only. */}
        <div className="relative">
          <div className="shell relative z-10 py-14 lg:py-28">
            <div className="lg:max-w-[46%]">
              <div className="flex items-center gap-4 mb-6">
                <p className="eyebrow whitespace-nowrap">Partner with us</p>
                <span className="h-px flex-1 max-w-[160px] bg-accent/35" aria-hidden="true" />
              </div>

              <h1 className="text-[34px] md:text-[44px] lg:text-[50px] leading-[1.1] max-w-[15ch]">
                Greater impact through{' '}
                <span className="font-serif italic font-normal text-accent">partnership.</span>
              </h1>

              <p className="mt-6 text-[16px] md:text-[17px] leading-relaxed text-body max-w-[44ch]">
                {partnerIntro.body}
              </p>

              <Link to="/contact" className="btn-ink mt-9">
                Contact Our Team
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50%] overflow-hidden"
            style={{ borderTopLeftRadius: '38% 60%', borderBottomLeftRadius: '38% 60%' }}
          >
            <img
              src={photo.keynoteAlt.src}
              alt={photo.keynoteAlt.alt}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Below lg the curve would crop faces awkwardly, so the photograph sits square. */}
        <div className="lg:hidden shell pb-12">
          <img
            src={photo.keynoteAlt.src}
            alt={photo.keynoteAlt.alt}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full aspect-[16/10] object-cover rounded-[3px]"
          />
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

      {/* Partner logos appear only once real, permissioned logos exist. */}
      {partners.length > 0 && (
        <section className="band-tight bg-cream">
          <div className="shell text-center">
            <p className="eyebrow mb-8">Current partners</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-3xl mx-auto">
              {partners.map((p) => (
                <div key={p.name} className="h-20 flex items-center justify-center bg-surface rounded-[3px] px-5">
                  <img src={p.logoUrl} alt={p.alt ?? p.name} className="max-h-10 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand title="Let's talk about working together." tone="ink">
        <Link to="/contact" className="btn-accent">Contact Our Team</Link>
      </CtaBand>
    </>
  );
}
