import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { Mail, Phone } from 'lucide-react';
import { photo } from '@/src/data/media';
import { Figure, Breadcrumb, CtaBand, AwaitingContent } from '@/src/components/ui';

/**
 * Support page — replaces the previous Donate page.
 *
 * IMPORTANT: the previous build presented a donation form that collected no payment
 * details, transmitted nothing, and then told the donor "Your donation has been
 * received… A receipt has been sent to your email." That form has been removed
 * entirely rather than restyled.
 *
 * This page routes people to contact the foundation directly until a real payment
 * processor (Paystack or Flutterwave) is connected. Do not reinstate a payment UI
 * before the processor is live.
 */

const routes = [
  {
    title: 'Partner with us',
    body:
      'Organisations co-funding or co-delivering programmes at scale. We work with cooperatives, ' +
      'development organisations, government, educational institutions and technical partners.',
    cta: { label: 'Partnership enquiries', path: '/partners' },
  },
  {
    title: 'Sponsor a programme',
    body:
      'Fund a defined element of a programme — a grant award, a scholarship cohort, an equipment ' +
      'handover — and receive reporting on what it produced.',
    cta: { label: 'Discuss sponsorship', path: '/contact' },
  },
  {
    title: 'Contribute directly',
    body:
      'Individual contributions to the foundation’s programme fund. Contact us and we will send ' +
      'the current giving details and confirm receipt in writing.',
    cta: { label: 'Contact the foundation', path: '/contact' },
  },
];

export default function Support() {
  const { site } = useContent();
  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb trail={[{ name: 'Support' }]} />
        </div>
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">Support {site.short}</p>
          <h1 className="text-[38px] md:text-[50px] max-w-[20ch]">Help us expand what works.</h1>
          <p className="mt-6 lede">
            {site.short} funds businesses, students and households against published criteria, and
            reports on what that produced. Support goes into programmes, not into promises.
          </p>
        </div>
      </section>

      <section className="band bg-paper">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-8">Ways to support</p>
            <div className="border-t border-rule">
              {routes.map((r) => (
                <div key={r.title} className="py-7 border-b border-rule">
                  <h2 className="text-[21px] mb-2">{r.title}</h2>
                  <p className="text-[14px] text-muted leading-relaxed max-w-[56ch]">{r.body}</p>
                  <Link to={r.cta.path} className="btn-outline mt-5">{r.cta.label}</Link>
                </div>
              ))}
            </div>

            {/* Honest state: no payment processor is connected yet. */}
            <div className="mt-10">
              <AwaitingContent
                what="Online giving is not yet live"
                detail={
                  'We are not accepting card payments through this website yet. Rather than show ' +
                  'a payment form that cannot take money, we ask you to contact the foundation ' +
                  'directly — we will confirm every contribution in writing. Online giving will ' +
                  'open here once payment processing is connected.'
                }
              />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <Figure photo={photo.chequeDetail} ratio="aspect-[4/5]" />

            <div className="mt-8 bg-surface border border-rule rounded-[3px] p-7">
              <p className="eyebrow mb-5">Speak to us directly</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold-ink mt-1 shrink-0" aria-hidden="true" />
                  <a href={`mailto:${site.email}`} className="text-[14px] text-ink hover:text-gold-ink transition-colors break-all">
                    {site.email}
                  </a>
                </li>
                {site.phones.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-gold-ink mt-1 shrink-0" aria-hidden="true" />
                    <a href={`tel:${p.replace(/\s/g, '')}`} className="text-[14px] text-ink hover:text-gold-ink transition-colors">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand title="See what your support would fund.">
        <Link to="/our-work" className="btn-gold">Our Programmes</Link>
        <Link to="/impact" className="btn-outline">Impact & Evidence</Link>
      </CtaBand>
    </>
  );
}

/* ------------------------------------------------------------------- apply */

/**
 * Grant application route.
 *
 * The previous build pointed every "Apply Now" button at the developer's personal
 * LinkedIn profile. That link is gone. Replace `APPLICATION_URL` below with the real
 * application form when OCHF supplies it, and the page will switch automatically.
 */
const APPLICATION_URL = '';

export function Apply() {
  return (
    <>
      <section className="bg-paper border-b border-rule">
        <div className="shell pt-8">
          <Breadcrumb
            trail={[
              { name: 'Our Work', path: '/our-work' },
              { name: 'Enterprise', path: '/our-work/enterprise' },
              { name: 'Apply' },
            ]}
          />
        </div>
        <div className="shell pt-10 pb-14">
          <p className="eyebrow mb-5">Entrepreneurship Grant Programme</p>
          <h1 className="text-[38px] md:text-[50px] max-w-[20ch]">Apply for the grant.</h1>
          <p className="mt-6 lede">
            Awards of ₦1,000,000 to ₦3,000,000, paired with 1:1 mentorship, for Nigerian businesses
            that can demonstrate a plan, a need, and the potential to create jobs.
          </p>
        </div>
      </section>

      <section className="band bg-paper">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">What you will need</p>
            <ol className="border-t border-rule">
              {[
                ['Completed application form', 'Personal and business details in full.'],
                ['Business plan', 'Goals, market analysis and the strategy behind them.'],
                ['Financial projections', 'Expected revenue, expenses and cash flow.'],
                ['Two letters of recommendation', 'From people who can speak to your work and character.'],
                ['Supporting documentation', 'CAC registration, certifications, awards, media coverage.'],
              ].map(([title, body], i) => (
                <li key={title} className="grid grid-cols-[34px_1fr] gap-4 py-5 border-b border-rule">
                  <span className="font-serif text-[15px] text-gold-ink tabular-nums pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-semibold text-[15px] text-ink">{title}</p>
                    <p className="text-[13.5px] text-muted mt-0.5">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5">
            {APPLICATION_URL ? (
              <div className="bg-surface border border-rule rounded-[3px] p-8">
                <p className="eyebrow mb-4">Applications open</p>
                <p className="text-[14px] text-muted leading-relaxed mb-6">
                  Complete the application form to be considered for the current cycle.
                </p>
                <a href={APPLICATION_URL} target="_blank" rel="noopener noreferrer" className="btn-gold w-full">
                  Open the application form
                </a>
              </div>
            ) : (
              <AwaitingContent
                what="Cycle dates and application form"
                detail={
                  'The application route for the current cycle has not been published yet. ' +
                  'Contact the foundation and we will send you the form and the closing date ' +
                  'directly. Applications are open to Nigerian entrepreneurs, not to Ebonyi ' +
                  'indigenes only.'
                }
              />
            )}

            <Link to="/contact" className="btn-outline w-full mt-5">Request the application form</Link>
          </div>
        </div>
      </section>

      <CtaBand title="Read how the programme works first.">
        <Link to="/our-work/enterprise" className="btn-gold">The Enterprise Programme</Link>
        <Link to="/faq" className="btn-outline">Common Questions</Link>
      </CtaBand>
    </>
  );
}
