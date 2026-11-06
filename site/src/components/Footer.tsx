import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { footerNav } from '@/src/data/site';
import { footer as footerCopy } from '@/src/content/copy';
import { ADMIN_ENDPOINT } from '@/src/admin/endpoint';
import { cn } from '@/src/lib/utils';

/**
 * Compact footer, per the launch brief: a newsletter sign-up, a short word about the
 * foundation, five quick links, the programme pillars and the contact details.
 * Registration details print in the bottom line once OCHF enters them in Foundation
 * details; until then nothing is printed.
 */
export function Footer() {
  const { site, programmes, institution, publications } = useContent();
  const [quick] = footerNav;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-white/75 on-dark">
      <div className="shell pt-16 pb-10">
        <Newsletter />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-14 pb-14 border-b border-white/10">
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
            <p className="text-[14.5px] leading-relaxed max-w-[46ch]">
              <span className="text-white font-medium">{site.name}</span> is {footerCopy.about.charAt(0).toLowerCase() + footerCopy.about.slice(1)}
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 self-start text-[14.5px] font-semibold text-lime hover:text-white">
              About the foundation <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
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
            <Link to="/privacy" className="hover:text-white">Privacy policy</Link>
            <Link to="/about/governance" className="hover:text-white">Governance</Link>
            {publications.length > 0 && <Link to="/resources" className="hover:text-white">Reports & publications</Link>}
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Newsletter sign-up. Addresses go to the dashboard's server (action `subscribe`), which
 * keeps them private and lists them under Newsletter subscribers in /admin.
 */
function Newsletter() {
  const { pathname } = useLocation();
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setState('sending');
    setError('');
    try {
      const res = await fetch(ADMIN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'subscribe', payload: { email: data.get('email'), website: data.get('website'), page: pathname } }),
      });
      const body = (res.headers.get('content-type') ?? '').includes('application/json') ? await res.json().catch(() => null) : null;
      if (!res.ok || !body) throw new Error(body?.error ?? 'The sign-up service is not available right now. Please try again later.');
      setState('done');
    } catch (err) {
      setError(err instanceof Error && err.message !== 'Failed to fetch' ? err.message : 'Could not reach the foundation’s server. Please try again.');
      setState('idle');
    }
  }

  return (
    <section aria-labelledby="newsletter-title"
      className="rounded-[28px] bg-brand-900 border border-white/10 p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-6">
        <p className="kicker text-lime-200">Newsletter</p>
        <h2 id="newsletter-title" className="mt-3 font-serif font-semibold text-[28px] md:text-[32px] leading-tight text-white">
          {footerCopy.newsletterTitle}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed max-w-[52ch]">{footerCopy.newsletterBody}</p>
      </div>
      <div className="lg:col-span-6">
        {state === 'done' ? (
          <p role="status" className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 text-white text-[15.5px]">
            <CheckCircle2 className="w-5 h-5 text-lime shrink-0" aria-hidden="true" />
            Thank you. You are on the list.
          </p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input id="newsletter-email" name="email" type="email" required autoComplete="email" placeholder="Your email address"
                className="w-full sm:flex-1 min-w-0 h-[52px] shrink-0 rounded-full bg-white px-6 text-[15.5px] text-ink placeholder:text-faint outline-none focus-visible:ring-4 focus-visible:ring-lime/60" />
              {/* Left empty by people; filled in by spam bots. */}
              <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <button type="submit" disabled={state === 'sending'} className={cn('btn-lime h-[52px] justify-center', state === 'sending' && 'opacity-70')}>
                {state === 'sending' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </div>
            {error && <p role="alert" className="text-[14px] text-[#FFB4A8]">{error}</p>}
            <p className="text-[13px] text-white/55">
              Unsubscribe at any time. See our <Link to="/privacy" className="underline underline-offset-2 hover:text-white">privacy policy</Link>.
            </p>
          </form>
        )}
      </div>
    </section>
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
