/**
 * Single FAQ source. The previous build kept two diverging copies of this list
 * in Contact.tsx and FAQ.tsx.
 *
 * Updated for the new positioning:
 *  - grant eligibility is Nigeria-wide, not Ebonyi-only (client directive)
 *  - widows support described under Wellbeing, not as a standalone pillar
 *  - references to sections that do not exist have been corrected
 *
 * CMS NOTE: maps to an `faq` document type with an order field.
 */

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'What does Ojerinkporo Caring Hearts Foundation do?',
    a: 'OCHF expands access to opportunity through four programmes: Enterprise, Education, ' +
       'Agriculture and Wellbeing. We combine funding with structured support so that what we ' +
       'back keeps working after the grant is disbursed.',
  },
  {
    q: 'Where does the foundation work?',
    a: 'OCHF originated in Ebonyi State and remains headquartered there. Our programmes are ' +
       'open across Nigeria — the Entrepreneurship Grant Programme is not restricted to Ebonyi ' +
       'indigenes.',
  },
  {
    q: 'Who is eligible for the Entrepreneurship Grant?',
    a: 'Applicants must operate a business registered with the CAC, be a Nigerian citizen, hold ' +
       'a clear business plan, and demonstrate genuine need. Selection weighs job creation ' +
       "potential, originality, plan strength, founder experience and fit with OCHF's priorities.",
  },
  {
    q: 'How much is awarded, and what can it be used for?',
    a: 'Grants range from ₦1,000,000 to ₦3,000,000 per recipient, sized to the specific business ' +
       'and its evaluation. Funds support expansion of existing businesses with proof of concept, ' +
       'and working capital for start-ups.',
  },
  {
    q: 'Does the grant include mentorship?',
    a: 'Yes. Every funded business is paired 1:1 with mentorship. Funding alone rarely changes a ' +
       'business trajectory; funding with structured support does.',
  },
  {
    q: 'How do I apply?',
    a: 'Applications open by cycle. Current cycle status and the application route are published ' +
       'on the Enterprise programme page. Contact us directly if you need the form sent to you.',
  },
  {
    q: 'What educational support does the foundation offer?',
    a: 'The Education programme funds scholarships and related support for students whose ' +
       'progress is limited by cost rather than ability. Details of the current cycle are ' +
       'published on the Education programme page.',
  },
  {
    q: 'Does OCHF still support widows?',
    a: 'Yes. Support for widows and vulnerable households continues under the Wellbeing ' +
       'programme, and is reported as a measured outcome on our Impact page.',
  },
  {
    q: 'How does OCHF select beneficiaries?',
    a: 'Through documented assessment against published criteria for each programme, weighing ' +
       'demonstrated need, potential impact and fit with our programme priorities.',
  },
  {
    q: 'How are your impact figures verified?',
    a: 'Every number we publish is drawn from grant disbursement records, programme attendance ' +
       'registers and direct beneficiary follow-up, reviewed on a stated reporting schedule. ' +
       'Figures awaiting verification are shown as pending rather than estimated.',
  },
  {
    q: 'Can organisations partner with the foundation?',
    a: 'Yes. We work with cooperatives, development organisations, governments, educational ' +
       'institutions and technical partners. Reach us through the Partners page.',
  },
  {
    q: 'How can I support the work?',
    a: 'Through partnership, programme sponsorship or direct contribution. The Support page sets ' +
       'out the current routes.',
  },
  {
    q: 'How do I contact the foundation?',
    a: 'By email, phone, or the form on the Contact page. We respond to programme and partnership ' +
       'enquiries first.',
  },
];
