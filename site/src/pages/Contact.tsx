import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Plus } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { Accent, Arrow, PageHero, Reveal, SectionHead } from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';
import { contact } from '@/src/content/copy';

/**
 * Contact. With no endpoint configured, submitting opens the visitor's mail client with
 * the message filled in, and never claims to have sent anything. Set FORM_ENDPOINT to
 * a real handler and the form will POST and report genuine success or failure.
 */
const FORM_ENDPOINT = '';
type Status = 'idle' | 'sending' | 'sent' | 'error';

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const { site } = useContent();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(String(data.get('topic') || 'Website enquiry'));
      const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) form.reset();
    } catch { setStatus('error'); }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-[20px] bg-tint p-10">
        <h3 className="font-serif font-semibold text-[30px] text-brand-800 mb-3">Message sent.</h3>
        <p className="text-[16px] text-muted mb-6">We have your enquiry and will respond to the address you gave. Programme and partnership enquiries are answered first.</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-outline">Send another</button>
      </div>
    );
  }

  const field = 'w-full px-5 py-3.5 bg-tint-50 border border-line rounded-[14px] text-[16px] text-ink focus:border-brand-800 focus:bg-white focus:ring-2 focus:ring-brand-800/20 outline-none transition';
  const label = 'block text-[14px] font-bold text-brand-800 mb-2';
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div><label htmlFor="name" className={label}>Your name</label><input id="name" name="name" type="text" autoComplete="name" required className={field} /></div>
        <div><label htmlFor="email" className={label}>Email address</label><input id="email" name="email" type="email" autoComplete="email" required className={field} /></div>
      </div>
      <div>
        <label htmlFor="topic" className={label}>Subject</label>
        <select id="topic" name="topic" required className={field} defaultValue="">
          <option value="" disabled>Select an enquiry type</option>
          {contact.enquiryTypes.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div><label htmlFor="message" className={label}>Your message</label><textarea id="message" name="message" rows={6} required className={`${field} resize-y`} /></div>
      {status === 'error' && <p role="alert" className="text-[14.5px] text-[#9B2C1F]">That did not send. Please email {site.email} directly and we will pick it up there.</p>}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" disabled={status === 'sending'} className="btn-brand">
          {status === 'sending' ? 'Sending…' : 'Send message'} <Arrow />
        </button>
        {!FORM_ENDPOINT && <p className="text-[13.5px] text-faint max-w-[44ch]">This opens your email application with the message ready to send, so nothing is lost in transit.</p>}
      </div>
      <p className="text-[13.5px] text-faint leading-relaxed max-w-[60ch]">{contact.privacyLine}</p>
    </form>
  );
}

export default function Contact() {
  const { site, faqs } = useContent();
  usePageMeta(contact.title, contact.description);

  const channels = [
    { icon: Mail, label: 'Email', lines: [{ text: site.email, href: `mailto:${site.email}` }] },
    { icon: Phone, label: 'Telephone', lines: site.phones.map((p) => ({ text: p, href: `tel:${p.replace(/\s/g, '')}` })) },
    { icon: MapPin, label: 'Head office', lines: [{ text: site.address, href: '' }] },
  ];

  return (
    <>
      <PageHero
        trail={[{ name: 'Contact' }]}
        kicker="Contact"
        title={<>Contact <Accent>OCHF.</Accent></>}
        lede={contact.intro}
      />

      <section className="shell -mt-14 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Direct channels lead: most people want an address, not a form. */}
        <aside className="lg:col-span-5 flex flex-col gap-4">
          {channels.map(({ icon: Icon, label, lines }) => (
            <div key={label} className="bg-white rounded-[24px] p-7 shadow-[0_20px_50px_-24px_rgba(13,59,122,0.35)] flex gap-5">
              <span className="inline-flex w-12 h-12 shrink-0 items-center justify-center rounded-full bg-lime text-lime-ink"><Icon className="w-5 h-5" aria-hidden="true" /></span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-faint">{label}</p>
                {lines.map((l) => l.href
                  ? <a key={l.text} href={l.href} className="block font-bold text-[19px] text-brand-800 hover:underline underline-offset-4 break-words">{l.text}</a>
                  : <p key={l.text} className="font-bold text-[17px] text-brand-800 leading-snug">{l.text}</p>)}
              </div>
            </div>
          ))}
          <p className="px-2 text-[14.5px] text-muted leading-relaxed">Office hours: Monday to Friday.</p>
        </aside>

        <div className="lg:col-span-7 bg-white rounded-[24px] border border-line p-7 md:p-10 shadow-[0_20px_50px_-24px_rgba(13,59,122,0.25)]">
          <h2 className="font-serif font-semibold text-[32px] text-brand-800 mb-8">Send a message.</h2>
          <ContactForm />
        </div>
      </section>

      {faqs.length > 0 && (
        <section id="faq" className="shell py-24 scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4"><SectionHead kicker="Common questions" title={<>Answers <Accent tone="brand">before you write.</Accent></>} /></div>
          <Reveal className="lg:col-span-8 flex flex-col gap-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-[20px] bg-tint open:bg-tint-50 open:ring-1 open:ring-line transition-colors">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-bold text-[17px] text-brand-800">{f.q}</span>
                  <span className="inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-full bg-white text-brand-800">
                    <Plus className="w-4 h-4 transition-transform group-open:rotate-45" aria-hidden="true" />
                  </span>
                </summary>
                <p className="px-6 pb-6 -mt-1 text-[16px] text-muted leading-relaxed max-w-[64ch]">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </section>
      )}
    </>
  );
}
