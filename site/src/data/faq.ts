/**
 * Single FAQ source. The previous build kept two diverging copies of this list
 * in Contact.tsx and FAQ.tsx.
 *
 * Updated for the new positioning:
 *  - grant eligibility is Nigeria-wide, not Ebonyi-only (client directive)
 *  - three pillars: Enterprise, Education, Community
 *  - references to sections that do not exist have been corrected
 *
 * CMS NOTE: maps to an `faq` document type with an order field.
 */

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  /* The master file's approved answers (4.10). Those that still carry a [CONFIRM] — grant
     amounts, application status, fees and how to verify a message — are held back until
     OCHF confirms them. The CMS list replaces this one whenever it has entries. */
  {
    q: 'What does OCHF fund?',
    a: 'OCHF invests in businesses, education and communities through three pillars: Enterprise, ' +
       'Education and Community. Each pillar has its own criteria. See Our Work for details.',
  },
  {
    q: 'Who can apply for an Entrepreneurship Grant?',
    a: 'Registered Nigerian businesses (CAC) with a clear business plan, a demonstrated need and the ' +
       'potential to create jobs. Each round states its own rules.',
  },
  {
    q: 'How can my organisation partner with OCHF?',
    a: 'Use the Partner With Us page or write to info@ojerinkporofoundation.com. We are open to ' +
       'partnerships in enterprise funding, entrepreneurship development, agribusiness, training and ' +
       'capacity building, research and data, community programmes and programme co-funding.',
  },
];
