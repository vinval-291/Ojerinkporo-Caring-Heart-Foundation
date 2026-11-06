import { Link } from 'react-router-dom';
import { Check, Mail, FileBarChart, Sprout } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { photo } from '@/src/data/media';
import { partnersPage } from '@/src/content/copy';
import { Accent, Arrow, ArrowLink, Breadcrumb, PartnerLogos, Reveal, SectionHead } from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';

/**
 * Partner With Us (master file 4.9) — where SMEDAN, banks and development partners are
 * sent. Not a donate page: what OCHF is, what it brings, what it is open to, and exactly
 * what to do next.
 *
 * No organisation is named as a partner and no logo shows unless a written agreement
 * exists (Part 1). The master file's enquiry form needs a real form handler and a named
 * mailbox; until one exists, the enquiry goes by email.
 */

/** The partner schema's "Type of partner" values, matched to the master file's six types. */
const typeCategory: Record<string, string> = {
  'Public institutions and agencies': 'Government',
  'Banks and private-sector organisations': 'Funder',
  'Development partners': 'Development organisation',
  'Cooperatives and trade associations': 'Cooperative',
  'Educational institutions': 'Educational institution',
  'Technical partners': 'Technical partner',
};

export default function Partners() {
  const { site, partners } = useContent();
  usePageMeta(partnersPage.title, partnersPage.description, photo.keynoteAlt.src);
  const subject = encodeURIComponent('Partnership enquiry');

  return (
    <>
      {/* The photograph runs off the right edge behind a sweeping curve. */}
      <header className="relative bg-brand-800 text-white overflow-hidden on-dark">
        <div className="shell relative z-10 pt-8"><Breadcrumb trail={[{ name: 'Partner With Us' }]} /></div>
        <div className="shell relative z-10 pt-12 pb-16 lg:pt-20 lg:pb-28">
          <div className="lg:max-w-[50%] fade-in flex flex-col gap-7">
            <p className="kicker text-lime-200">Partner with us</p>
            <h1 className="h-page">Partnerships that create <Accent>measurable impact.</Accent></h1>
            <p className="lede text-white/80 max-w-[50ch]">{partnersPage.intro}</p>
            <a href="#start" className="btn-lime self-start">Start a conversation <Arrow /></a>
          </div>
        </div>
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[46%] overflow-hidden"
          style={{ borderTopLeftRadius: '50% 60%', borderBottomLeftRadius: '50% 60%' }}>
          <img src={photo.keynoteAlt.src} alt={photo.keynoteAlt.alt} fetchPriority="high" decoding="async" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
        </div>
        <div className="lg:hidden shell pb-14">
          <img src={photo.keynoteAlt.src} alt={photo.keynoteAlt.alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" className="w-full aspect-[4/3] object-cover rounded-[24px]" />
        </div>
      </header>

      {/* ------------------------------------------- open to partnerships in */}
      <section className="shell pt-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5"><SectionHead kicker="Areas" title={<>We are open to <Accent tone="brand">partnerships in</Accent></>} /></div>
        <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {partnersPage.areas.map((a, i) => (
            <Reveal as="li" index={i % 2} key={a} className="flex items-center gap-3 rounded-[16px] bg-tint px-5 py-4 font-semibold text-brand-800">
              <Check className="w-5 h-5 shrink-0" aria-hidden="true" />{a}
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------- who we'd like to work with */}
      <section className="shell pt-24">
        <SectionHead align="center" kicker="Who we would like to work with" title={<>Six kinds of partner, <Accent tone="brand">one direction.</Accent></>} />
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partnersPage.types.map((t, i) => {
            const logos = partners.filter((p) => p.category === typeCategory[t]);
            return (
              <Reveal as="li" index={i % 3} key={t} className="rounded-[24px] border border-line p-7 flex flex-col gap-4 min-h-[150px]">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-lime text-lime-ink font-bold">{i + 1}</span>
                <h3 className="h-card text-brand-800">{t}</h3>
                {logos.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-4 items-center">
                    {logos.map((p) => <img key={p.name} src={p.logoUrl} alt={p.alt ?? p.name} loading="lazy" className="h-9 w-auto object-contain" />)}
                  </div>
                )}
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* ------------------------------------- what partners receive / we bring */}
      <section className="shell pt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal className="rounded-[28px] bg-tint p-8 md:p-12 flex flex-col gap-4">
          <FileBarChart className="w-9 h-9 text-brand-800" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="font-serif font-semibold text-[32px] text-brand-800">What partners receive</h2>
          <p className="text-[17px] text-muted leading-relaxed">{partnersPage.partnersReceive}</p>
        </Reveal>
        <Reveal index={1} className="rounded-[28px] bg-brand-900 text-white p-8 md:p-12 flex flex-col gap-4 on-dark">
          <Sprout className="w-9 h-9 text-lime" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="font-serif font-semibold text-[32px]">What we bring</h2>
          <p className="text-[17px] text-white/80 leading-relaxed">{partnersPage.whatWeBring}</p>
        </Reveal>
      </section>

      {/* Logos appear only once real, permissioned partners exist. */}
      {partners.length > 0 && (
        <section className="shell pt-24">
          <SectionHead title="Current partners" />
          <PartnerLogos partners={partners} className="mt-10" />
        </section>
      )}

      {/* ------------------------------------------------ start a conversation */}
      <section id="start" className="shell py-24 scroll-mt-28">
        <Reveal className="rounded-[28px] bg-brand-800 text-white p-8 sm:p-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center on-dark">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <h2 className="h-sec">Start <Accent>a conversation.</Accent></h2>
            <p className="lede text-white/80">{partnersPage.conversationBody}</p>
            <p className="text-[14.5px] text-white/65">{partnersPage.assessment}</p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4 lg:items-end">
            <a href={`mailto:${site.email}?subject=${subject}`} className="btn-lime"><Mail className="w-4 h-4" aria-hidden="true" /> Email a partnership enquiry</a>
            <p className="text-[14.5px] text-white/75 break-all">{site.email}</p>
            <ArrowLink to="/contact" light>Other ways to reach us</ArrowLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
