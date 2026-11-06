import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { footerNav } from '@/src/data/site';
import { cn } from '@/src/lib/utils';

/**
 * Compact footer, per the launch brief: five quick links, the programme pillars and the
 * contact details. Registration details print in the bottom line once OCHF enters them
 * in Foundation details; until then nothing is printed.
 */
export function Footer() {
  const { site, programmes, institution, publications } = useContent();
  const [quick] = footerNav;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-white/75 on-dark">
      <div className="shell pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link to="/" className="inline-flex items-center gap-3 self-start" aria-label={`${site.name}, home`}>
              <span className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                <img src={site.logo} alt="" width={34} height={34} className="w-[34px] h-[34px] object-contain" referrerPolicy="no-referrer" />
              </span>
              <span className="font-bold text-[22px] text-white">{site.short}</span>
            </Link>
            <p className="font-serif text-[26px] leading-snug text-sand max-w-[22ch]">
              Investing in people. <span className="accent-i text-lime">Building stronger communities.</span>
            </p>
            <p className="text-[14.5px] leading-relaxed">{site.name}</p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <p className="kicker text-lime-200 mb-5">{quick.heading}</p>
              <ul className="space-y-3">
                {quick.links.map((l) => (
                  <li key={l.path}><Link to={l.path} className="text-[15px] hover:text-white">{l.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kicker text-lime-200 mb-5">Our pillars</p>
              <ul className="space-y-3">
                {programmes.map((p) => (
                  <li key={p.slug}><Link to={`/our-work/${p.slug}`} className="text-[15px] hover:text-white">{p.name}</Link></li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="kicker text-lime-200 mb-5">Contact</p>
              <ul className="space-y-4 text-[14.5px]">
                <li className="flex gap-3"><Mail className="w-4 h-4 mt-1 text-lime shrink-0" aria-hidden="true" />
                  <a href={`mailto:${site.email}`} className="hover:text-white break-all">{site.email}</a></li>
                <li className="flex gap-3"><Phone className="w-4 h-4 mt-1 text-lime shrink-0" aria-hidden="true" />
                  <span className="flex flex-col">{site.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-white">{p}</a>)}</span></li>
                <li className="flex gap-3"><MapPin className="w-4 h-4 mt-1 text-lime shrink-0" aria-hidden="true" /><span>{site.address}</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row justify-between gap-3 text-[13px] text-white/55">
          <p>© {year} {site.name}. All rights reserved.{institution.registration && <> · {institution.registration}</>}</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <Link to="/about/governance" className="hover:text-white">Governance</Link>
            {publications.length > 0 && <Link to="/resources" className="hover:text-white">Reports & publications</Link>}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button type="button" aria-label="Back to top" tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn('fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center bg-lime text-lime-ink',
        'shadow-[0_12px_30px_-10px_rgba(5,26,58,0.6)] transition-[opacity,transform] duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none')}>
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
