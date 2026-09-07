import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useContent } from '@/src/content/ContentProvider';
import { Breadcrumb } from '@/src/components/ui';

/**
 * Contact form.
 *
 * The previous build faked submission with setTimeout and told the user "Message
 * Delivered!" while discarding every enquiry. This form does not pretend: with no
 * endpoint configured it hands the user a working mailto: route instead.
 *
 * To make it a real form, set FORM_ENDPOINT to a Formspree URL or a Vercel serverless
 * function. The component will POST to it and report genuine success or failure.
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
      // No backend yet — open the user's mail client with the message intact
      // rather than silently swallowing it.
      const subject = encodeURIComponent(String(data.get('topic') || 'Website enquiry'));
      const body = encodeURIComponent(
        `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-rule bg-surface rounded-[3px] p-10 text-center">
        <h3 className="text-[22px] mb-3">Message sent.</h3>
        <p className="text-[14px] text-muted mb-6">
          We have your enquiry and will respond to {' '}
          <span className="text-ink">the address you gave</span>. Programme and partnership
          enquiries are answered first.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-outline">
          Send another
        </button>
      </div>
    );
  }

  const field = 'w-full px-4 py-3 bg-surface border border-rule rounded-[3px] text-[14px] ' +
                'focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="eyebrow block mb-2">Your name</label>
          <input id="name" name="name" type="text" required className={field} />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow block mb-2">Email address</label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="eyebrow block mb-2">Subject</label>
        <select id="topic" name="topic" required className={field} defaultValue="">
          <option value="" disabled>Select a subject</option>
          <option>Entrepreneurship Grant enquiry</option>
          <option>Scholarship enquiry</option>
          <option>Partnership proposal</option>
          <option>Media enquiry</option>
          <option>Supporting the foundation</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow block mb-2">Your message</label>
        <textarea id="message" name="message" rows={6} required className={cn(field, 'resize-y')} />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-[13px] text-[#A81E17]">
          That did not send. Please email {site.email} directly and we will pick it up there.
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-gold w-full sm:w-auto">
        {status === 'sending' ? 'Sending…' : FORM_ENDPOINT ? 'Send enquiry' : 'Send by email'}
      </button>

      {!FORM_ENDPOINT && (
        <p className="text-[12px] text-faint leading-relaxed">
          This opens your email application with the message ready to send, so nothing is lost in
          transit.
        </p>
      )}
    </form>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-rule">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-6 py-5 text-left group"
      >
        <span className="font-serif text-[17px] font-semibold text-ink group-hover:text-gold-ink transition-colors">
          {q}
        </span>
        <ChevronDown
          className={cn('w-4 h-4 text-muted shrink-0 mt-1 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>
      {open && <p className="pb-6 text-[14px] text-body leading-relaxed max-w-[64ch]">{a}</p>}
    </div>
  );
}

export default function Contact() {
  const { site, faqs } = useContent();
  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb trail={[{ name: 'Contact' }]} />
        </div>
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">Contact</p>
          <h1 className="text-[38px] md:text-[50px] max-w-[18ch]">Talk to the foundation.</h1>
          <p className="mt-6 lede">
            Programme enquiries, partnership proposals, media requests and applications for
            support. We answer programme and partnership enquiries first.
          </p>
        </div>
      </section>

      <section className="band bg-paper">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7"><ContactForm /></div>

          <aside className="lg:col-span-5 space-y-8">
            <div>
              <p className="eyebrow mb-5">Direct channels</p>
              <ul className="space-y-5">
                <li className="flex items-start gap-3.5">
                  <Mail className="w-4 h-4 text-gold-ink mt-1 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-faint mb-0.5">Email</p>
                    <a href={`mailto:${site.email}`} className="text-[14.5px] text-ink hover:text-gold-ink transition-colors break-all">
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <Phone className="w-4 h-4 text-gold-ink mt-1 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-faint mb-0.5">Telephone</p>
                    {site.phones.map((p) => (
                      <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-[14.5px] text-ink hover:text-gold-ink transition-colors">
                        {p}
                      </a>
                    ))}
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <MapPin className="w-4 h-4 text-gold-ink mt-1 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-faint mb-0.5">Head office</p>
                    <p className="text-[14.5px] text-ink leading-snug">{site.address}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-t border-rule pt-6">
              <p className="text-[13px] text-muted leading-relaxed">
                Office hours are Monday to Friday. Applications and reporting queries are handled
                by the programme team.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="faq" className="band bg-surface border-t border-rule scroll-mt-24">
        <div className="shell">
          <div className="max-w-[36ch] mb-10">
            <p className="eyebrow mb-4">Common questions</p>
            <h2 className="text-[30px] md:text-[38px]">Answers before you write.</h2>
          </div>

          <div className="max-w-[74ch] border-t border-rule">
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>
    </>
  );
}
