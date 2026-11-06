import { Mail, Phone } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { photo } from '@/src/data/media';
import { Accent, ClosingCta, PageHero, Reveal } from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';

/**
 * Support OCHF — linked from the footer only (master file 4.11).
 *
 * One card: "Contribute directly". OCHF is approaching institutions, not asking the
 * public for gifts, so the header carries Partner With Us instead. No payment processor
 * and no bank details until the account and receipting are confirmed (Part 1).
 */
export default function Support() {
  const { site } = useContent();
  usePageMeta('Support OCHF | OCHF', `How to contribute to the programmes of ${site.name}.`);

  return (
    <>
      <PageHero
        trail={[{ name: 'Support OCHF' }]}
        kicker="Support OCHF"
        title={<>Contribute <Accent>directly.</Accent></>}
        lede="OCHF funds businesses, students and households against published criteria, and reports on what that produced."
      />

      <section className="shell py-24">
        <Reveal className="bg-brand-900 text-white rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 on-dark">
          <div className="relative min-h-[300px]">
            <img src={photo.sewing.src} alt={photo.sewing.alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col gap-6">
            <span className="tag-lime self-start">Contribute directly</span>
            <h2 className="h-sec">Contributions to the <Accent>programme fund.</Accent></h2>
            <p className="lede text-white/80">
              Individual contributions to the foundation’s programme fund. Contact us and we will send the
              current giving details and confirm receipt in writing.
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-[16px] bg-white/[0.08] px-5 py-4 font-semibold hover:bg-white/[0.14] break-all">
                  <Mail className="w-5 h-5 text-lime shrink-0" aria-hidden="true" />{site.email}
                </a>
              </li>
              {site.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, '')}`} className="flex items-center gap-3 rounded-[16px] bg-white/[0.08] px-5 py-4 font-semibold hover:bg-white/[0.14]">
                    <Phone className="w-5 h-5 text-lime shrink-0" aria-hidden="true" />{p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <ClosingCta title={<>Representing an <Accent tone="brand">organisation?</Accent></>}
        action={{ label: 'Partner With Us', to: '/partners' }} secondary={{ label: 'Explore Our Work', to: '/our-work' }} />
    </>
  );
}
