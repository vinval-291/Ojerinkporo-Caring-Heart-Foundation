import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { X, ArrowLeft, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { useContent } from '@/src/content/ContentProvider';
import { grantStatus } from '@/src/pages/Programme';
import { whoCanApply } from '@/src/content/copy';
import { ADMIN_ENDPOINT } from '@/src/admin/endpoint';
import { cn } from '@/src/lib/utils';
import { Arrow } from '@/src/components/ui';

/**
 * The Entrepreneurship Grant application, as a dialog.
 *
 * It opens by itself a moment after a visitor arrives — at most once every two weeks per
 * browser — and from any "Apply" button via `useApply()`. It exists only while the round
 * is open (the dashboard's "Applications are open now" toggle, until any closing date).
 *
 * Documents go up one at a time as PDFs, then the application is sent. Both land in the
 * dashboard's private "Grant applications" list through the dashboard's server
 * (api/content.ts); nothing is emailed, and nothing is stored in the browser.
 */

const SEEN_KEY = 'ochf-grant-popup-seen';
const SEEN_FOR = 14 * 86_400_000;
const MAX_MB = 5;

const STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta',
  'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina',
  'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];
const SECTORS = ['Food & agriculture', 'Agro-processing', 'Retail & trade', 'Manufacturing', 'Fashion & textiles', 'Technology', 'Services', 'Other'];
const STAGES = ['Idea', 'Early stage (under 2 years)', 'Established (2 years or more)'];
const DOCUMENTS: { name: string; label: string; required: boolean }[] = [
  { name: 'businessPlan', label: 'Business plan', required: true },
  { name: 'financials', label: 'Financial projections', required: true },
  { name: 'cacCertificate', label: 'CAC registration certificate', required: true },
  { name: 'letter1', label: 'Letter of recommendation 1', required: true },
  { name: 'letter2', label: 'Letter of recommendation 2', required: true },
  { name: 'otherDocument', label: 'Other supporting document (optional)', required: false },
];
const STEPS = ['About you', 'Your business', 'Documents'];

/* ------------------------------------------------------------- context */

const ApplyContext = createContext<{ open: () => void; available: boolean }>({ open: () => {}, available: false });
export const useApply = () => useContext(ApplyContext);

export function GrantApplicationProvider({ children }: { children: ReactNode }) {
  const { programmes, site } = useContent();
  const status = grantStatus(programmes.find((p) => p.slug === 'enterprise')?.application);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
    try { localStorage.setItem(SEEN_KEY, String(Date.now())); } catch { /* private window */ }
    window.setTimeout(() => opener.current?.focus(), 0);
  }, []);

  // Open once on arrival, after the page has settled. Never on top of the dashboard or
  // the Grants page itself, and not again for two weeks once seen.
  useEffect(() => {
    if (!status.open) return;
    if (/^\/(admin|our-work\/enterprise\/grants)/.test(location.pathname)) return;
    let seen = 0;
    try { seen = Number(localStorage.getItem(SEEN_KEY) ?? 0); } catch { /* ignore */ }
    if (Date.now() - seen < SEEN_FOR) return;
    const t = window.setTimeout(() => setIsOpen(true), 1800);
    return () => window.clearTimeout(t);
    // Only on first arrival, not on every navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.open]);

  return (
    <ApplyContext.Provider value={{ open, available: status.open }}>
      {children}
      {isOpen && status.open && <ApplicationDialog statusLabel={status.label} email={site.email} onClose={close} />}
    </ApplyContext.Provider>
  );
}

/* ------------------------------------------------------------- network */

async function post<T>(action: string, payload: Record<string, unknown>): Promise<T> {
  let res: Response;
  try {
    res = await fetch(ADMIN_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, payload }),
    });
  } catch {
    throw new Error('Could not reach the foundation’s server. Check your connection and try again.');
  }
  const isJson = (res.headers.get('content-type') ?? '').includes('application/json');
  const body = isJson ? await res.json().catch(() => null) : null;
  if (!body) throw new Error('The application service is not available right now.');
  if (!res.ok) throw new Error((body as { error?: string }).error ?? 'Something went wrong. Please try again.');
  return body as T;
}

const readFile = (file: File) => new Promise<string>((resolve, reject) => {
  const r = new FileReader();
  r.onload = () => resolve(String(r.result));
  r.onerror = () => reject(new Error(`Could not read ${file.name}.`));
  r.readAsDataURL(file);
});

/* -------------------------------------------------------------- dialog */

function ApplicationDialog({ statusLabel, email, onClose }: { statusLabel: string; email: string; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const dialog = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const startedAt = useRef(Date.now());

  // Lock the page, focus the dialog, Escape closes, Tab stays inside.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector<HTMLElement>('h2')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onClose();
      if (e.key !== 'Tab' || !dialog.current) return;
      const items = [...dialog.current.querySelectorAll<HTMLElement>('a, button, input, select, textarea')]
        .filter((n) => !n.hasAttribute('disabled') && n.offsetParent !== null);
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose, busy]);

  /** Checks only the fields on the visible step. */
  const stepValid = () => {
    const fs = form.current?.querySelector<HTMLFieldSetElement>(`fieldset[data-step="${step}"]`);
    if (!fs) return true;
    const fields = [...fs.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea')];
    for (const f of fields) { if (!f.checkValidity()) { f.reportValidity(); return false; } }
    return true;
  };

  const next = () => { setError(''); if (stepValid()) { setStep((s) => s + 1); dialog.current?.scrollTo({ top: 0 }); } };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    const input = e.target;
    if (!f) { input.setCustomValidity(''); return; }
    if (f.type !== 'application/pdf' && !/\.pdf$/i.test(f.name)) input.setCustomValidity('Please choose a PDF document.');
    else if (f.size > MAX_MB * 1024 * 1024) input.setCustomValidity(`This file is larger than ${MAX_MB} MB.`);
    else input.setCustomValidity('');
    input.reportValidity();
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!stepValid() || busy) return;
    setError('');
    const data = new FormData(e.currentTarget);
    try {
      const files: Record<string, string> = {};
      const chosen = DOCUMENTS.filter((d) => (data.get(d.name) as File | null)?.size);
      for (const [i, d] of chosen.entries()) {
        const file = data.get(d.name) as File;
        setBusy(`Uploading ${d.label.replace(' (optional)', '').toLowerCase()} (${i + 1} of ${chosen.length})…`);
        const { assetId } = await post<{ assetId: string }>('apply-upload', { data: await readFile(file), filename: file.name });
        files[d.name] = assetId;
      }
      setBusy('Sending your application…');
      const text = (k: string) => String(data.get(k) ?? '').trim();
      const result = await post<{ reference: string }>('apply', {
        fullName: text('fullName'), email: text('email'), phone: text('phone'), gender: text('gender'), state: text('state'),
        businessName: text('businessName'), cacNumber: text('cacNumber'), sector: text('sector'), stage: text('stage'),
        location: text('location'), employees: text('employees'), amountRequested: text('amountRequested'),
        useOfFunds: text('useOfFunds'), jobsPlan: text('jobsPlan'),
        citizen: data.get('citizen') === 'on', accurate: data.get('accurate') === 'on', consent: data.get('consent') === 'on',
        website: text('website'), startedAt: startedAt.current, files,
      });
      setReference(result.reference);
      try { localStorage.setItem(SEEN_KEY, String(Date.now())); } catch { /* ignore */ }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy('');
    }
  }

  const field = 'w-full px-4 py-3 bg-tint-50 border border-line rounded-[14px] text-[15.5px] text-ink focus:border-brand-800 focus:bg-white focus:ring-2 focus:ring-brand-800/20 outline-none transition';
  const label = 'block text-[14px] font-bold text-brand-800 mb-1.5';
  const req = <span className="text-[#9B2C1F]" aria-hidden="true"> *</span>;

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-brand-950/70 backdrop-blur-[2px] p-0 sm:p-6 fade-in"
      onMouseDown={(e) => { if (e.target === e.currentTarget && !busy) onClose(); }}>
      <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="apply-title"
        className="relative w-full sm:max-w-[760px] max-h-[94vh] overflow-y-auto bg-white rounded-t-[28px] sm:rounded-[28px] shadow-[0_40px_90px_-30px_rgba(5,26,58,0.7)]">

        {/* ---------------------------------------------------------- header */}
        <div className="sticky top-0 z-10 bg-brand-800 text-white px-6 sm:px-9 pt-6 pb-5 on-dark">
          <div className="flex items-start justify-between gap-4">
            <span className="tag bg-lime text-lime-ink">{statusLabel}</span>
            <button type="button" onClick={onClose} disabled={!!busy} aria-label="Close the application form"
              className="-mr-2 -mt-1 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-40">
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <h2 id="apply-title" tabIndex={-1} className="mt-3 font-serif font-semibold text-[28px] sm:text-[34px] leading-tight outline-none">
            Apply for the Entrepreneurship Grant
          </h2>
          {!reference && (
            <ol className="mt-4 flex gap-2" aria-label="Steps">
              {STEPS.map((s, i) => (
                <li key={s} aria-current={i === step ? 'step' : undefined}
                  className={cn('flex-1 rounded-full px-3 py-1.5 text-[12.5px] font-semibold text-center',
                    i === step ? 'bg-white text-brand-800' : i < step ? 'bg-lime/80 text-lime-ink' : 'bg-white/10 text-white/70')}>
                  {i + 1}. {s}
                </li>
              ))}
            </ol>
          )}
        </div>

        {reference ? (
          /* --------------------------------------------------------- success */
          <div className="px-6 sm:px-9 py-10 flex flex-col items-start gap-5">
            <CheckCircle2 className="w-12 h-12 text-brand-800" aria-hidden="true" />
            <p className="font-serif font-semibold text-[28px] text-brand-800">Your application has been received.</p>
            <p className="text-[16.5px] text-ink leading-relaxed">
              Keep your reference number and watch the contact details you gave us for official updates.
            </p>
            <p className="rounded-[16px] bg-tint px-5 py-4 font-mono text-[20px] font-bold text-brand-800 select-all">{reference}</p>
            <button type="button" onClick={onClose} className="btn-brand">Close</button>
          </div>
        ) : (
          <form ref={form} onSubmit={submit} noValidate={false} className="px-6 sm:px-9 py-7 flex flex-col gap-6">
            {step === 0 && (
              <p className="text-[15px] text-muted leading-relaxed">
                Growth funding of up to ₦3 million for registered Nigerian businesses, paired with 1:1 mentorship.
                <strong className="text-ink"> Who can apply:</strong> {whoCanApply}
              </p>
            )}

            {/* Bots fill every field; people never see this one. */}
            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor="ga-website">Leave this empty</label>
              <input id="ga-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {/* ------------------------------------------------- 1. about you */}
            <fieldset data-step="0" hidden={step !== 0} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <legend className="sr-only">About you</legend>
              <div className="sm:col-span-2"><label htmlFor="ga-name" className={label}>Full name{req}</label>
                <input id="ga-name" name="fullName" required maxLength={120} autoComplete="name" className={field} /></div>
              <div><label htmlFor="ga-email" className={label}>Email{req}</label>
                <input id="ga-email" name="email" type="email" required maxLength={160} autoComplete="email" className={field} /></div>
              <div><label htmlFor="ga-phone" className={label}>Phone{req}</label>
                <input id="ga-phone" name="phone" type="tel" required maxLength={40} autoComplete="tel" placeholder="+234" className={field} /></div>
              <div><label htmlFor="ga-state" className={label}>State of residence{req}</label>
                <select id="ga-state" name="state" required defaultValue="" className={field}>
                  <option value="" disabled>Select a state</option>{STATES.map((s) => <option key={s}>{s}</option>)}
                </select></div>
              <div><label htmlFor="ga-gender" className={label}>Gender</label>
                <select id="ga-gender" name="gender" defaultValue="" className={field}>
                  <option value="">Prefer not to say</option><option>Female</option><option>Male</option>
                </select></div>
            </fieldset>

            {/* --------------------------------------------- 2. your business */}
            <fieldset data-step="1" hidden={step !== 1} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <legend className="sr-only">Your business</legend>
              <div><label htmlFor="ga-business" className={label}>Business name{req}</label>
                <input id="ga-business" name="businessName" required maxLength={160} autoComplete="organization" className={field} /></div>
              <div><label htmlFor="ga-cac" className={label}>CAC registration number{req}</label>
                <input id="ga-cac" name="cacNumber" required maxLength={60} placeholder="e.g. BN 1234567 or RC 1234567" className={field} /></div>
              <div><label htmlFor="ga-sector" className={label}>Sector{req}</label>
                <select id="ga-sector" name="sector" required defaultValue="" className={field}>
                  <option value="" disabled>Select a sector</option>{SECTORS.map((s) => <option key={s}>{s}</option>)}
                </select></div>
              <div><label htmlFor="ga-stage" className={label}>Stage of the business{req}</label>
                <select id="ga-stage" name="stage" required defaultValue="" className={field}>
                  <option value="" disabled>Select a stage</option>{STAGES.map((s) => <option key={s}>{s}</option>)}
                </select></div>
              <div><label htmlFor="ga-location" className={label}>Where the business operates{req}</label>
                <input id="ga-location" name="location" required maxLength={120} placeholder="Town, State" className={field} /></div>
              <div><label htmlFor="ga-employees" className={label}>People employed now</label>
                <input id="ga-employees" name="employees" type="number" min={0} max={100000} inputMode="numeric" className={field} /></div>
              <div className="sm:col-span-2"><label htmlFor="ga-amount" className={label}>Amount requested (₦)</label>
                <input id="ga-amount" name="amountRequested" type="number" min={1} max={3000000} step={1000} inputMode="numeric" className={field} />
                <p className="mt-1 text-[13px] text-faint">Up to ₦3,000,000.</p></div>
              <div className="sm:col-span-2"><label htmlFor="ga-use" className={label}>What would the grant pay for?{req}</label>
                <textarea id="ga-use" name="useOfFunds" required maxLength={3000} rows={4} className={`${field} resize-y`} /></div>
              <div className="sm:col-span-2"><label htmlFor="ga-jobs" className={label}>How would it help the business grow and create jobs?{req}</label>
                <textarea id="ga-jobs" name="jobsPlan" required maxLength={3000} rows={4} className={`${field} resize-y`} /></div>
            </fieldset>

            {/* ------------------------------------- 3. documents & declarations */}
            <fieldset data-step="2" hidden={step !== 2} className="flex flex-col gap-5">
              <legend className="sr-only">Documents and declarations</legend>
              <p className="text-[14.5px] text-muted">PDF documents only, up to {MAX_MB} MB each.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DOCUMENTS.map((d) => (
                  <li key={d.name} className="rounded-[16px] border border-line p-4">
                    <label htmlFor={`ga-${d.name}`} className="flex items-center gap-2 text-[14px] font-bold text-brand-800 mb-2">
                      <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />{d.label}{d.required && req}
                    </label>
                    <input id={`ga-${d.name}`} name={d.name} type="file" accept="application/pdf,.pdf" required={d.required} onChange={onFile}
                      className="w-full text-[13.5px] text-muted file:mr-3 file:rounded-full file:border-0 file:bg-tint file:px-4 file:py-2 file:font-semibold file:text-brand-800" />
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 rounded-[16px] bg-tint-50 p-5">
                {[
                  ['citizen', 'I am a Nigerian citizen and the business is registered with the CAC.'],
                  ['accurate', 'The information and documents I have given are true and complete.'],
                  ['consent', 'I agree that OCHF may use this information to assess my application and contact me about it.'],
                ].map(([name, text]) => (
                  <label key={name} className="flex gap-3 text-[15px] text-ink leading-snug">
                    <input type="checkbox" name={name} required className="mt-0.5 w-5 h-5 accent-[var(--color-brand-800)] shrink-0" />{text}
                  </label>
                ))}
              </div>
              <p className="text-[13px] text-faint leading-relaxed">
                Please do not send sensitive personal details beyond what is asked. Applications are read only by the OCHF programme team. See our{' '}
                <a href="/privacy" target="_blank" rel="noopener" className="underline underline-offset-2 text-brand-800">privacy policy</a> (opens in a new tab).
              </p>
            </fieldset>

            {error && (
              <p role="alert" className="rounded-[14px] bg-[#FBEDEA] px-4 py-3 text-[14.5px] text-[#8A2A1C]">
                {error} If it keeps happening, email <a href={`mailto:${email}`} className="underline">{email}</a>.
              </p>
            )}
            {busy && <p role="status" className="flex items-center gap-2 text-[14.5px] font-semibold text-brand-800"><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />{busy}</p>}

            {/* ---------------------------------------------------- controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
              {step > 0
                ? <button type="button" onClick={() => setStep((s) => s - 1)} disabled={!!busy} className="btn-outline"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back</button>
                : <button type="button" onClick={onClose} className="font-semibold text-[15px] text-muted hover:text-brand-800">Not now</button>}
              {step < STEPS.length - 1
                ? <button type="button" onClick={next} className="btn-brand">Continue <Arrow /></button>
                : <button type="submit" disabled={!!busy} className="btn-brand disabled:opacity-60">Submit Application <Arrow /></button>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
