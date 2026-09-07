/**
 * Loads the website's current content into Sanity.
 *
 * Run once, after creating the Sanity project:
 *     cd cms && npm run seed
 *
 * Safe to re-run: every document uses a fixed _id and `createOrReplace`, so a second
 * run updates rather than duplicating. It does NOT touch enquiries or anything you
 * have edited by hand under a different id.
 *
 * Uses the token stored by `sanity login` (~/.config/sanity/config.json), or
 * SANITY_AUTH_TOKEN if set. Plain JS so it runs under `node` with no build step.
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || 'essbj1jr';
const DATASET = process.env.SANITY_STUDIO_DATASET || 'production';

function authToken() {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN;
  try {
    const cfg = JSON.parse(readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'));
    if (cfg.authToken) return cfg.authToken;
  } catch { /* fall through */ }
  console.error('\n  No Sanity token found. Run `npx sanity login` first.\n');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-10-01',
  token: authToken(),
  useCdn: false,
});

const doc = (d) => d;

/* ------------------------------------------------------------- settings */

const settings = doc({
  _id: 'siteSettings',
  _type: 'siteSettings',
  name: 'Ojerinkporo Caring Hearts Foundation',
  short: 'OCHF',
  tagline: 'Investing in people. Building stronger communities.',
  intro:
    'Ojerinkporo Caring Hearts Foundation expands access to opportunity through ' +
    'enterprise, education, agriculture and community development.',
  address: 'Amas Autonomous Community, Ebonyi State, Nigeria',
  location: 'Ebonyi State, Nigeria',
  email: 'info@ojerinkporofoundation.com',
  phones: ['+234 806 666 7882', '+234 706 072 6910'],
  social: {},
  seoDescription:
    'Ojerinkporo Caring Hearts Foundation expands access to opportunity across Nigeria ' +
    'through enterprise, education, agriculture and community development.',
});

/* ----------------------------------------------------------- programmes */

const programmes = [
  {
    _id: 'programme-enterprise',
    _type: 'programme',
    name: 'Enterprise',
    slug: { _type: 'slug', current: 'enterprise' },
    order: 1,
    tag: 'Business growth, grants & jobs',
    summary:
      'Business growth, grants and jobs. OCHF backs Nigerian entrepreneurs with catalytic ' +
      'funding and structured support built to create employment and lasting enterprises.',
    modelTitle: 'Catalytic funding, paired with real support.',
    terms: [
      {
        _key: 'amount',
        value: '₦1M–₦3M',
        label: "Per recipient, sized to the business's specific needs and evaluation.",
      },
      {
        _key: 'mentorship',
        value: '1:1',
        label: 'Mentorship paired with every funded business, not funding alone.',
      },
    ],
    panels: [
      {
        _key: 'eligibility',
        heading: 'Eligibility',
        body: 'Registered business (CAC) · Nigerian citizen · clear business plan · demonstrated need.',
      },
      {
        _key: 'criteria',
        heading: 'Selection criteria',
        body: "Job creation potential · originality · plan strength · founder experience · fit with OCHF's programme priorities.",
      },
    ],
    // Deliberately empty: the old site pointed "Apply" at a personal LinkedIn profile.
    applicationUrl: undefined,
    applicationOpen: false,
  },
  {
    _id: 'programme-education',
    _type: 'programme',
    name: 'Education',
    slug: { _type: 'slug', current: 'education' },
    order: 2,
    tag: 'Access, learning & opportunity',
    summary:
      'Access, learning and opportunity. OCHF funds scholarships and educational support ' +
      'for students whose progress is limited by cost rather than ability.',
    applicationOpen: false,
  },
  {
    _id: 'programme-agriculture',
    _type: 'programme',
    name: 'Agriculture',
    slug: { _type: 'slug', current: 'agriculture' },
    order: 3,
    tag: 'Food systems & livelihoods',
    summary:
      'Food systems and livelihoods. OCHF supports farmers and agricultural value chains ' +
      'to strengthen food security and build durable rural incomes.',
    applicationOpen: false,
  },
  {
    _id: 'programme-wellbeing',
    _type: 'programme',
    name: 'Wellbeing',
    slug: { _type: 'slug', current: 'wellbeing' },
    order: 4,
    tag: 'Community health & resilience',
    summary:
      'Community health and resilience. OCHF delivers health, care and household support ' +
      'to communities carrying the heaviest need.',
    applicationOpen: false,
  },
];

/* -------------------------------------------------------------- figures */

/** Every figure starts unverified. Nothing publishes a number until it is checked. */
const metricSpecs = [
  ['invested',      'Invested in communities',   'FY2025–26',     'headline', '₦'],
  ['entrepreneurs', 'Entrepreneurs supported',   'FY2025–26',     'headline'],
  ['students',      'Students supported',        'FY2025–26',     'headline'],
  ['communities',   'Communities reached',       'FY2025–26',     'headline'],
  ['jobs',          'Jobs created or sustained', 'Once verified', 'headline'],
  ['families',      'Families supported',        'FY2025–26',     'impact'],
];

const metrics = metricSpecs.map(([id, label, period, placement, prefix], i) => ({
  _id: `impactMetric-${id}`,
  _type: 'impactMetric',
  label,
  period,
  placement,
  prefix,
  value: '',
  status: 'pending',
  order: (i + 1) * 10,
}));

const milestones = [
  {
    _id: 'milestone-2024',
    _type: 'milestone',
    year: '2024',
    body: 'Ojerinkporo Caring Hearts Foundation formally inaugurated.',
  },
  {
    _id: 'milestone-2025',
    _type: 'milestone',
    year: '2025',
    body: 'Entrepreneurship Grant Programme launched — ₦100,000,000 committed.',
  },
  {
    _id: 'milestone-2026',
    _type: 'milestone',
    year: '2026',
    body: 'First cohort of grant recipients report outcomes — figures pending verification.',
  },
];

/* --------------------------------------------------------------- people */

const people = [
  {
    _id: 'person-founder',
    _type: 'person',
    name: 'Mr. Ikechukwu Agwu',
    role: 'Founder',
    group: 'founder',
    order: 1,
    quote: 'Service to humanity is the best work of life. We are the bridge to a better future.',
    expertise: ['Business Development', 'Real Estate', 'Telecommunications', 'Logistics', 'Oil & Gas'],
    bio: [
      {
        _key: 'p1',
        _type: 'block',
        style: 'normal',
        children: [{
          _key: 's1',
          _type: 'span',
          text:
            'Mr. Ikechukwu Agwu — known as Iyke — is the founder of Ojerinkporo Caring Hearts ' +
            'Foundation. He holds a degree in Pure and Applied Mathematics from the University ' +
            'of Ibadan, and has completed leadership and management programmes at Harvard ' +
            'University and other institutions internationally.',
        }],
      },
      {
        _key: 'p2',
        _type: 'block',
        style: 'normal',
        children: [{
          _key: 's2',
          _type: 'span',
          text:
            'He began Dav-Ric Nigeria Limited as a one-man startup in 2008. Today, as Chief ' +
            'Executive of DAVRIC International Limited, he leads an organisation of over 100 ' +
            'professionals across business development, oil and gas, real estate, ' +
            'telecommunications and logistics.',
        }],
      },
    ],
  },
];

/* ------------------------------------------------------------------ faq */

const faqSource = [
  ['What does Ojerinkporo Caring Hearts Foundation do?',
   'OCHF expands access to opportunity through four programmes: Enterprise, Education, Agriculture and Wellbeing. We combine funding with structured support so that what we back keeps working after the grant is disbursed.'],
  ['Where does the foundation work?',
   'OCHF originated in Ebonyi State and remains headquartered there. Our programmes are open across Nigeria — the Entrepreneurship Grant Programme is not restricted to Ebonyi indigenes.'],
  ['Who is eligible for the Entrepreneurship Grant?',
   "Applicants must operate a business registered with the CAC, be a Nigerian citizen, hold a clear business plan, and demonstrate genuine need. Selection weighs job creation potential, originality, plan strength, founder experience and fit with OCHF's priorities."],
  ['How much is awarded, and what can it be used for?',
   'Grants range from ₦1,000,000 to ₦3,000,000 per recipient, sized to the specific business and its evaluation. Funds support expansion of existing businesses with proof of concept, and working capital for start-ups.'],
  ['Does the grant include mentorship?',
   'Yes. Every funded business is paired 1:1 with mentorship. Funding alone rarely changes a business trajectory; funding with structured support does.'],
  ['How do I apply?',
   'Applications open by cycle. Current cycle status and the application route are published on the Enterprise programme page. Contact us directly if you need the form sent to you.'],
  ['What educational support does the foundation offer?',
   'The Education programme funds scholarships and related support for students whose progress is limited by cost rather than ability.'],
  ['Does OCHF still support widows?',
   'Yes. Support for widows and vulnerable households continues under the Wellbeing programme, and is reported as a measured outcome on our Impact page.'],
  ['How does OCHF select beneficiaries?',
   'Through documented assessment against published criteria for each programme, weighing demonstrated need, potential impact and fit with our programme priorities.'],
  ['How are your impact figures verified?',
   'Every number we publish is drawn from grant disbursement records, programme attendance registers and direct beneficiary follow-up, reviewed on a stated reporting schedule. Figures awaiting verification are shown as pending rather than estimated.'],
  ['Can organisations partner with the foundation?',
   'Yes. We work with cooperatives, development organisations, governments, educational institutions and technical partners. Reach us through the Partners page.'],
  ['How can I support the work?',
   'Through partnership, programme sponsorship or direct contribution. The Support page sets out the current routes.'],
  ['How do I contact the foundation?',
   'By email, phone, or the form on the Contact page. We respond to programme and partnership enquiries first.'],
];

const faqs = faqSource.map(([question, answer], i) => ({
  _id: `faq-${i + 1}`,
  _type: 'faq',
  question,
  answer,
  order: (i + 1) * 10,
}));

/* ------------------------------------------------------------- stories */

const stories = [
  {
    _id: 'story-entrepreneurs-now',
    _type: 'story',
    title: 'Where our entrepreneurs are now',
    slug: { _type: 'slug', current: 'where-our-entrepreneurs-are-now' },
    category: 'Enterprise',
    date: '2026-01-15',
    standfirst:
      'Following up with the first cohort of Entrepreneurship Grant recipients — what the ' +
      'funding changed, and what it did not.',
    consent: false,
    published: false,
  },
  {
    _id: 'story-value-chains',
    _type: 'story',
    title: 'Building stronger agricultural value chains',
    slug: { _type: 'slug', current: 'building-stronger-agricultural-value-chains' },
    category: 'Agriculture',
    date: '2026-02-10',
    standfirst:
      'How support at the processing stage changes what a farming household can earn from ' +
      'the same harvest.',
    consent: false,
    published: false,
  },
  {
    _id: 'story-latest-programme',
    _type: 'story',
    title: "Inside OCHF's latest programme",
    slug: { _type: 'slug', current: 'inside-ochfs-latest-programme' },
    category: 'Foundation',
    date: '2026-03-01',
    standfirst:
      'A look at how a programme moves from design to disbursement, and the checks applied ' +
      'at each stage.',
    consent: false,
    published: false,
  },
];

/* ------------------------------------------------------------------ run */

async function run() {
  const all = [settings, ...programmes, ...metrics, ...milestones, ...people, ...faqs, ...stories];

  const tx = all.reduce((t, d) => t.createOrReplace(d), client.transaction());
  await tx.commit();

  console.log(`\n  Loaded ${all.length} documents into "${client.config().dataset}".\n`);
  console.log('  Next:');
  console.log('   1. Open the studio (npm run dev) and check Foundation details.');
  console.log('   2. Upload photographs — see the note below.');
  console.log('   3. Fill in impact figures and set each to Verified as they are checked.\n');
  console.log('  PHOTOGRAPHS: the old site hot-linked 62 images from postimg.cc, which');
  console.log('  throttles and has already lost some files. Run "bash export/download-media.sh"');
  console.log('  from the project root to archive what survives, then upload them into the');
  console.log('  Photo albums section of the studio.\n');
}

run().catch((err) => {
  console.error('\n  Seed failed:', err.message, '\n');
  process.exit(1);
});
