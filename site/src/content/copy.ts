/**
 * Approved wording from the OCHF Website Master File (2 November 2026).
 *
 * Every string here is pasted from the master file's "paste exactly" cells. Lines that
 * the file still marks [CONFIRM] are not here at all: the file's rule is "hide it, do not
 * fake it", so a fact only OCHF can supply stays off the site until it is supplied.
 *
 * Section numbers (4.1, 4.5 …) point back to the master file.
 */

/* ------------------------------------------------------------- 4.1 Home */

export const home = {
  // "Across Nigeria" is held back until the states list is ready (Part 1, F7).
  heroLine:
    'OCHF expands opportunity for Nigerian businesses and communities through enterprise ' +
    'funding, education and direct community investment.',
  impactHeading: 'Impact, measured beyond the grant.',
  impactLine: 'OCHF is already funding Nigerian businesses.',
  impactFootnote: 'Programme records, 2024–2026.',
  pillarsEyebrow: 'What we do',
  pillarsIntro:
    'Our work combines economic opportunity, access to education and community support to ' +
    'address immediate needs while investing in long-term progress.',
  partnershipTitle: 'Impact scales through partnership.',
  // "Works with" only about real relationships; until then, "open to working with" (4.1 note).
  partnershipBody:
    'OCHF is open to working with public institutions, private-sector organisations and ' +
    'development partners to expand the reach and effectiveness of programmes across ' +
    'enterprise, education and community development.',
  closingTitle: 'Let’s expand what already works.',
  closingBody:
    'We already fund businesses and report on the results. With the right partners, we can ' +
    'reach further, support more entrepreneurs and generate better data.',
};

/* ---------------------------------------------- pillar cards (4.1, 4.4) */

/** Card text for each pillar, by slug. A pillar added in the CMS falls back to its summary. */
export const pillarCards: Record<string, string> = {
  enterprise:
    'We back entrepreneurs with funding, capacity-building and opportunities that help ' +
    'businesses move from survival to sustainable growth.',
  education:
    'We expand access to education and practical skills that give young people more options ' +
    'for their future.',
  community:
    'OCHF responds to immediate needs while investing in the facilities and resources that ' +
    'help communities thrive over time.',
};

/** Page heading and introduction for each pillar page (4.5, 4.6). */
export const pillarPages: Record<string, { heading: string; lede: string; title: string; description: string }> = {
  enterprise: {
    heading: 'Supporting enterprise at every stage of growth.',
    lede: 'We invest in businesses with the potential to grow, create jobs and strengthen local economies.',
    title: 'Enterprise | Grants for Nigerian Businesses | OCHF',
    description: 'Annual Entrepreneurship Grants and Quarterly Business Growth Grants, paired with mentorship and monitored for results.',
  },
  education: {
    heading: 'Expanding access to learning and opportunity.',
    lede: 'We expand access to education and practical skills that give young people more options for their future.',
    title: 'Education | Scholarships & Skills | OCHF',
    description: 'Scholarships, training and skills that give young people more options.',
  },
  community: {
    heading: 'Stronger communities begin with practical support.',
    lede: 'OCHF responds to immediate needs while investing in the facilities and resources that help communities thrive over time.',
    title: 'Community | Direct Support & Infrastructure | OCHF',
    description: 'Practical support for families and investment in community facilities.',
  },
};

/** What each focus area means (4.5, 4.6). An area with no approved line shows its name only. */
export const focusAreaCopy: Record<string, string> = {
  Entrepreneurship: 'Funding and support for promising Nigerian businesses ready to grow.',
  Agribusiness: 'Support for entrepreneurs working across agriculture, processing, local production and value chains.',
  Technology: 'Future-facing programmes that expand access to digital skills, tools and enterprise opportunities.',
  Scholarships: 'Supporting students whose access to education is limited by financial circumstances.',
  'Training Programmes': 'Structured learning programmes that develop practical, employable skills.',
  'Direct Support': 'We provide practical support to children, families, widows, older people and others facing difficult circumstances.',
  'Community Infrastructure': 'We invest in facilities, equipment and community projects that improve access to essential services and opportunity.',
};

/** Pillar-page closings (4.6). Enterprise's closing depends on the grant status. */
export const pillarClosings: Record<string, { title: string }> = {
  education: { title: 'Partner on Education' },
  community: { title: 'Partner on Community' },
};

export const educationLookingAhead = {
  title: 'Looking ahead.',
  body:
    'Education and skills development remain important areas for planning and partnership. ' +
    'New initiatives and application details will be announced after internal approval.',
};

/* ------------------------------------------------------- grants (4.1, 4.5) */

export const quarterlyGrants = {
  eyebrow: 'Quarterly grants',
  title: 'Small capital. Real momentum.',
  // The cycle count and ₦10M total come from internal planning and are held back until
  // finance confirms them (4.1 note); the paragraph stands on its own.
  body:
    'OCHF’s Quarterly Business Growth Grant was created to widen access to business funding. By ' +
    'making smaller grants available more frequently, we support entrepreneurs at the stage where ' +
    'timely capital can unlock their next step.',
  short:
    'Smaller, more frequent grants designed to help early-stage businesses overcome immediate ' +
    'growth barriers and build momentum.',
};

export const annualGrants = {
  title: 'Annual Entrepreneurship Grants',
  body: 'Larger funding awards for promising Nigerian businesses with potential for growth and job creation.',
  terms: 'Up to ₦3M per recipient · 1:1 mentorship with every funded business',
};

export const howWeSupport = [
  { step: 'Funding', body: 'Grants targeted at specific growth needs.' },
  { step: 'Capacity', body: 'Business support, mentoring and access to expertise.' },
  { step: 'Accountability', body: 'Beneficiaries report how funds were used.' },
  { step: 'Measurement', body: 'We track business progress beyond the day the grant is paid.' },
];

export const whoCanApply =
  'Registered businesses (CAC), Nigerian citizens, with a clear business plan, a demonstrated need ' +
  'and potential to create jobs.';
export const howAwardsAssessed =
  'Job-creation potential, originality, strength of plan, founder experience and fit with OCHF’s ' +
  'programme priorities.';

/** Grants & Opportunities page (4.7). */
export const grantsPage = {
  heading: 'Grants & Opportunities',
  intro:
    'OCHF grant opportunities are announced through official channels. Each funding round has its ' +
    'own eligibility criteria, assessment process, deadline and reporting requirements. This page ' +
    'shows current opportunities and previous programmes.',
  openTitle: 'Applications Open',
  closedTitle: 'Applications Closed',
  closedBody: (programme: string) =>
    `There is no open application window for ${programme} at this time. Details of previous rounds ` +
    'and future announcements will be shared through OCHF’s official channels.',
  documents: [
    'Completed application form',
    'Business plan',
    'Financial projections',
    'Two letters of recommendation',
    'Supporting documentation',
  ],
  closedNote: 'Applications for this round are closed. Please do not send documents through the general contact form.',
};

/* ---------------------------------------------------------- 4.3 About */

export const about = {
  title: 'About OCHF | Mission, Vision & Leadership',
  description: 'The story, mission, leadership and approach of Ojerinkporo Caring Hearts Foundation.',
  intro:
    'Ojerinkporo Caring Hearts Foundation is a Nigerian nonprofit investing in people and ' +
    'communities through enterprise development, education and direct community support.',
  // No founding year until the certificate settles it (Part 1); no states count yet, so
  // the second paragraph keeps only its second sentence (4.3 note).
  story: [
    'Ojerinkporo Caring Hearts Foundation began with a commitment to serving communities in ' +
    'Ebonyi State. Its work has included entrepreneurship funding, support for widows and ' +
    'vulnerable households, and educational assistance.',
    'We are building on that experience through more structured programmes, better follow-up and ' +
    'stronger institutional partnerships.',
  ],
  // Drafts for leadership approval (master file Part 2, item 11).
  mission: 'To expand access to the capital, education and community resources people need to build better futures.',
  vision: 'A Nigeria where opportunity is not limited by circumstance.',
  howWeWork: [
    { step: 'Identify', body: 'We identify where targeted support can create meaningful progress.' },
    { step: 'Invest', body: 'We fund carefully designed programmes: grants, learning opportunities and community projects.' },
    { step: 'Support', body: 'We work with beneficiaries and partners to help resources turn into action.' },
    { step: 'Measure', body: 'We keep records, gather feedback and follow up to learn what changed.' },
  ],
  whoWeServe:
    'We support entrepreneurs, students, widows and other individuals and households whose progress ' +
    'is limited by cost, capital or circumstance. We work with partners to extend approaches that work.',
  pillarsLine: 'Explore how our programmes put these commitments into practice.',
};

export const governance = {
  measurement:
    'Every figure OCHF publishes is drawn from grant disbursement records, programme registers and ' +
    'beneficiary follow-up, and is shown with the period it covers.',
  questions: 'Write to info@ojerinkporofoundation.com.',
};

/* ---------------------------------------------------- 4.4 Our Work */

export const ourWork = {
  title: 'Our Work | Enterprise, Education & Community | OCHF',
  description: 'OCHF programmes supporting entrepreneurs, students and communities.',
  heading: 'Practical support. Lasting opportunity.',
};

/* ------------------------------------------------ 4.8 Impact & Stories */

export const impactPage = {
  title: 'Impact & Stories | OCHF',
  description: 'Documented stories and programme results from Ojerinkporo Caring Hearts Foundation.',
  eyebrow: 'Our Work · Impact & Stories',
  heading: 'Our impact, documented.',
  intro:
    'Financial support is only one part of the story. We record who our programmes reach, what ' +
    'support is provided and what beneficiaries report or show afterwards, so that we can see ' +
    'progress, understand gaps and improve what we do next.',
  storiesTitle: 'Behind every number is a business.',
};

/** "How we count" — the definitions the master file says to publish (Part 7). */
export const definitions = [
  { figure: 'Deployed / invested', definition: 'Total cash paid to beneficiaries or suppliers, from the ledger. In-kind support only if the valuation basis is stated.' },
  { figure: 'Businesses funded', definition: 'Unique businesses that received a grant, counted once each.' },
  { figure: 'Students supported', definition: 'Unique students who received a scholarship or school support.' },
  { figure: 'Communities reached', definition: 'Distinct named towns or wards with documented activity.' },
  { figure: 'Jobs reported', definition: 'New positions reported by supported businesses since support, with the period and a note that they are self-reported.' },
];

/* --------------------------------------------------- 4.9 Partner With Us */

export const partnersPage = {
  title: 'Partner With Us | Collaboration Opportunities | OCHF',
  description: 'Partnerships in enterprise, education, agriculture, research and community programmes.',
  heading: 'Partnerships that create measurable impact.',
  intro:
    'OCHF is open to working with public institutions, private-sector organisations and ' +
    'development partners to expand opportunity across enterprise, education and community ' +
    'development. We bring programme experience, local knowledge and a commitment to monitoring ' +
    'results. Partners may contribute funding, expertise, technology, equipment, training or ' +
    'implementation support.',
  areas: [
    'Enterprise funding', 'Entrepreneurship development', 'Agribusiness',
    'Training and capacity building', 'Research and data', 'Community programmes', 'Programme co-funding',
  ],
  // "Who we would like to work with", never "who we work with" (Part 1).
  types: [
    'Public institutions and agencies', 'Banks and private-sector organisations', 'Development partners',
    'Cooperatives and trade associations', 'Educational institutions', 'Technical partners',
  ],
  partnersReceive:
    'Partners receive structured reporting on what their support produced, with the figures and the ' +
    'period they cover.',
  whatWeBring:
    'We contribute on-the-ground programme experience, beneficiary engagement, local relationships ' +
    'and a willingness to design interventions around clear responsibilities and measurable ' +
    'objectives. The scope of any financial or in-kind contribution from OCHF is agreed separately ' +
    'for each partnership.',
  conversationTitle: 'Start a conversation.',
  conversationBody:
    'Tell us about your organisation, the issue you want to address and the support or ' +
    'collaboration you have in mind.',
  assessment:
    'We assess each proposal for fit, feasibility, safeguarding and likely impact. An enquiry does ' +
    'not guarantee a partnership.',
};

/* ---------------------------------------------------------- 4.10 Contact */

export const contact = {
  title: 'Contact OCHF | Programmes & Partnerships',
  description: 'Contact OCHF for programme, partnership, media and general enquiries.',
  heading: 'Contact OCHF',
  intro:
    'For programme enquiries, partnerships, media requests and general information, contact the ' +
    'OCHF team using the details below. We answer programme and partnership enquiries first.',
  enquiryTypes: [
    'Entrepreneurship Grant enquiry', 'Quarterly Business Growth Grant enquiry', 'Scholarship enquiry',
    'Partnership proposal', 'Media enquiry', 'Other',
  ],
  privacyLine:
    'We use the information you give us to reply to your enquiry. Please do not send sensitive ' +
    'personal details through this form.',
};

/* ---------------------------------------------------------- 4.11 Footer */

export const footer = {
  support: 'Support OCHF',
};

/** Page titles and descriptions for the pages not covered above (Part 5). */
export const homeMeta = {
  title: 'Ojerinkporo Caring Hearts Foundation | Enterprise, Education & Community',
  description: 'OCHF supports enterprise, education and communities in Nigeria through targeted programmes and partnerships.',
};
export const grantsMeta = {
  title: 'Grants & Opportunities | OCHF',
  description: 'Current and past OCHF grant rounds, with status and eligibility.',
};
