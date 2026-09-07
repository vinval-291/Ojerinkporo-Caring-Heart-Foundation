/**
 * The four programme pillars.
 *
 * Client directive: "Take out Widows Support, start with Entrepreneurship Grants,
 * Scholarships and Community Outreach." Widows support is no longer a top-level
 * pillar — it is now a measured outcome under Wellbeing (see impact.ts).
 *
 * Enterprise carries full detail from the visual guide. The other three await
 * client copy; their `detail` is null and the page renders an honest
 * "programme detail in preparation" state rather than invented claims.
 *
 * CMS NOTE: maps to a `programme` document type.
 */

import { photo, type Photo } from './media';

export interface ProgrammeDetail {
  modelEyebrow: string;
  modelTitle: string;
  /** Two headline terms shown large in the dark band. */
  terms: { value: string; label: string }[];
  panels: { heading: string; body: string }[];
  /** Values intentionally empty until verified — the label and note still publish. */
  metrics: { label: string; value?: string; note?: string }[];
  ctaTitle: string;
  ctaPrimary: { label: string; path: string };
}

export interface Programme {
  slug: string;
  name: string;
  tag: string;
  summary: string;
  blurb: string;
  image: Photo;
  detail: ProgrammeDetail | null;
}

export const programmes: Programme[] = [
  {
    slug: 'enterprise',
    name: 'Enterprise',
    tag: 'Business growth, grants & jobs',
    blurb: 'Business growth, grants and jobs.',
    summary:
      'Business growth, grants and jobs. OCHF backs Nigerian entrepreneurs with catalytic ' +
      'funding and structured support built to create employment and lasting enterprises.',
    image: photo.workshopFloor,
    detail: {
      modelEyebrow: 'The grant model',
      modelTitle: 'Catalytic funding, paired with real support.',
      terms: [
        {
          value: '₦1M–₦3M',
          label: "Per recipient, sized to the business's specific needs and evaluation.",
        },
        {
          value: '1:1',
          label: 'Mentorship paired with every funded business, not funding alone.',
        },
      ],
      panels: [
        {
          heading: 'Eligibility',
          body: 'Registered business (CAC) · Nigerian citizen · clear business plan · demonstrated need.',
        },
        {
          heading: 'Selection criteria',
          body: "Job creation potential · originality · plan strength · founder experience · fit with OCHF's programme priorities.",
        },
      ],
      metrics: [
        { label: 'Businesses funded to date', note: 'Pending verification' },
        { label: 'Jobs created or sustained', note: 'Pending verification' },
        { label: 'Average revenue growth',    note: 'Pending verification' },
        { label: 'Application-to-award rate', note: 'Pending verification' },
      ],
      ctaTitle: 'Ready to grow your business?',
      ctaPrimary: { label: 'Apply for the Grant', path: '/support/apply' },
    },
  },
  {
    slug: 'education',
    name: 'Education',
    tag: 'Access, learning & opportunity',
    blurb: 'Access, learning and opportunity.',
    summary:
      'Access, learning and opportunity. OCHF funds scholarships and educational support for ' +
      'students whose progress is limited by cost rather than ability.',
    image: photo.keynote,
    detail: null,
  },
  {
    slug: 'agriculture',
    name: 'Agriculture',
    tag: 'Food systems & livelihoods',
    blurb: 'Food systems and livelihoods.',
    summary:
      'Food systems and livelihoods. OCHF supports farmers and agricultural value chains to ' +
      'strengthen food security and build durable rural incomes.',
    image: photo.equipmentHandover,
    detail: null,
  },
  {
    slug: 'wellbeing',
    name: 'Wellbeing',
    tag: 'Community health & resilience',
    blurb: 'Community health and resilience.',
    summary:
      'Community health and resilience. OCHF delivers health, care and household support to ' +
      'communities carrying the heaviest need.',
    image: photo.guests,
    detail: null,
  },
];

export const getProgramme = (slug?: string) =>
  programmes.find((p) => p.slug === slug);

/** Flagship programme block on the homepage. */
export const flagship = {
  eyebrow: 'Flagship programme',
  title: 'Backing entrepreneurs who create jobs.',
  body:
    "Through OCHF's Entrepreneurship Grant Programme, businesses receive catalytic funding — " +
    '₦1,000,000 to ₦3,000,000 per recipient — alongside structured mentorship designed to ' +
    'strengthen operations, create employment and build sustainable enterprises.',
  note: 'Funding range confirmed from the current programme · outcome figures pending verification.',
  cta: { label: 'Explore the Programme', path: '/our-work/enterprise' },
  image: photo.heroGrant,
};

/**
 * Portfolio story structure shown on the homepage and Enterprise page.
 * Marked illustrative — do not publish named beneficiary figures until verified.
 */
export const portfolioStory = {
  eyebrow: 'Portfolio story',
  title: 'From production constraint to growing enterprise.',
  stages: [
    { heading: 'Before OCHF',      body: 'Manual production capped growth at local scale.' },
    { heading: 'OCHF intervention', body: 'Entrepreneurship grant plus equipment and mentorship.' },
    { heading: 'Result',            body: 'Expanded capacity, new hires, new markets.' },
  ],
  figures: [
    { value: '3',  label: 'New employees' },
    { value: '2×', label: 'Production capacity' },
    { value: '2',  label: 'New markets entered' },
  ],
  note: 'Illustrative structure — publish only with verified beneficiary figures.',
  cta: { label: 'Meet more entrepreneurs', path: '/stories' },
  image: photo.chequeDetail,
};
