import { Link } from 'react-router-dom';
import { useContent } from '@/src/content/ContentProvider';
import { Accent, PageHero, Reveal } from '@/src/components/ui';
import { usePageMeta } from '@/src/lib/meta';

/**
 * Privacy policy.
 *
 * Describes only what the website actually does with personal information: the grant
 * application form, the newsletter sign-up and the contact form. It names no retention
 * period, officer or registration the foundation has not confirmed. OCHF should have it
 * reviewed against the Nigeria Data Protection Act 2023 before the site goes live, and
 * update the "Last updated" date whenever it changes.
 */
const UPDATED = '6 November 2026';

export default function Privacy() {
  const { site } = useContent();
  usePageMeta('Privacy Policy | OCHF', `How ${site.name} collects, uses and protects the personal information you share through this website.`);

  const sections: { id: string; title: string; body: React.ReactNode[] }[] = [
    {
      id: 'who-we-are', title: 'Who we are',
      body: [
        <>{site.name} (“{site.short}”, “we”) is a Nigerian nonprofit based in {site.address}. We are responsible for the personal information collected through this website.</>,
        'We handle personal information in line with the Nigeria Data Protection Act 2023.',
      ],
    },
    {
      id: 'what-we-collect', title: 'What we collect and why',
      body: [
        <><strong className="text-ink">Grant applications.</strong> Your name, contact details, gender and state; your business details; your answers about the grant; and the documents you upload. We use them to check eligibility, assess your application, contact you about it and keep a record of the grant round.</>,
        <><strong className="text-ink">Newsletter.</strong> Your email address and the page you signed up on. We use them only to send you news about the foundation’s work.</>,
        <><strong className="text-ink">Contact and partnership enquiries.</strong> The contact form opens your own email app, so your enquiry reaches us as an ordinary email with your name, email address, phone number if you give it, and your message. We use them to reply to you.</>,
        'We do not ask for, and ask you not to send, sensitive information such as health details, religious beliefs, bank details or identity numbers through this website.',
      ],
    },
    {
      id: 'legal-basis', title: 'Our basis for using it',
      body: [
        'We use your information because you have given your consent (for example, by ticking the declaration on the grant application or by subscribing), or because it is needed to respond to a request you made. You can withdraw consent at any time; this does not affect anything we did before you withdrew it.',
      ],
    },
    {
      id: 'storage', title: 'Where it is kept and who can see it',
      body: [
        'Grant applications and newsletter sign-ups are stored with Sanity, the content service that runs this website, in a private area that is not published on the site. Only authorised OCHF staff and the people assessing a grant round can read them.',
        'We do not sell your information or share it for marketing. We share it only where the law requires us to, or with your agreement.',
        'Sanity may store information on servers outside Nigeria. Where it does, we rely on the safeguards the Nigeria Data Protection Act 2023 requires for such transfers.',
      ],
    },
    {
      id: 'retention', title: 'How long we keep it',
      body: [
        'We keep grant applications for as long as we need them to run and account for the grant round, and newsletter addresses until you unsubscribe. We delete or anonymise information we no longer need.',
      ],
    },
    {
      id: 'your-rights', title: 'Your rights',
      body: [
        'You can ask us for a copy of the information we hold about you, ask us to correct it, ask us to delete it, object to our use of it or withdraw your consent. To unsubscribe from the newsletter, reply to any newsletter email or write to us.',
        <>To make a request, email <a href={`mailto:${site.email}?subject=Privacy%20request`} className="text-brand-800 font-semibold underline underline-offset-2">{site.email}</a> with the subject “Privacy request”. If you are not satisfied with our response, you may complain to the Nigeria Data Protection Commission.</>,
      ],
    },
    {
      id: 'cookies', title: 'Cookies and browser storage',
      body: [
        'This website does not use advertising or tracking cookies. It stores one small note in your browser so the grant application window is not shown to you again for two weeks. Staff who sign in to the content dashboard receive a sign-in cookie.',
      ],
    },
    {
      id: 'changes', title: 'Changes to this policy',
      body: [`We will update this page if the way we handle personal information changes. This version was last updated on ${UPDATED}.`],
    },
  ];

  return (
    <>
      <PageHero
        trail={[{ name: 'Privacy policy' }]}
        kicker="Privacy"
        title={<>Your information, <Accent>handled with care.</Accent></>}
        lede="What we collect through this website, why we collect it, and what you can ask us to do with it."
      />

      <section className="shell py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <nav aria-label="On this page" className="lg:col-span-3 lg:sticky lg:top-28 self-start">
          <p className="kicker text-brand-800 mb-4">On this page</p>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            {sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-muted hover:text-brand-800">{s.title}</a></li>)}
          </ul>
        </nav>
        <div className="lg:col-span-8 lg:col-start-5 flex flex-col gap-14">
          {sections.map((s, i) => (
            <Reveal key={s.id} index={i % 3}>
              <article id={s.id} className="scroll-mt-28">
                <h2 className="font-serif font-semibold text-[28px] md:text-[32px] leading-tight text-brand-800">{s.title}</h2>
                <div className="mt-4 flex flex-col gap-4 text-[16.5px] leading-relaxed text-muted max-w-[68ch]">
                  {s.body.map((p, j) => <p key={j}>{p}</p>)}
                </div>
              </article>
            </Reveal>
          ))}
          <p className="text-[14.5px] text-faint">
            Last updated {UPDATED}. Questions about this policy? <Link to="/contact" className="text-brand-800 font-semibold">Contact the foundation</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
