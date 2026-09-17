/**
 * The three programme pillars: Enterprise, Education, Community.
 *
 * Client directive (September 2026): "Three pillars. One direction." Agriculture is now
 * part of Enterprise (Agribusiness) and Wellbeing is part of Community (Direct Support).
 *
 * `focusAreas` are the client's own sub-headings for each pillar. The site renders them
 * wherever a pillar appears, so they are the one place to change them.
 *
 * CMS NOTE: maps to a `programme` document type. In the CMS the focus areas live in the
 * `tag` field, separated by " | ".
 */

import { photo, type Photo } from './media';

export interface ProgrammeDetail {
  modelEyebrow: string;
  modelTitle: string;
  /** Two headline terms shown large in the dark band. */
  terms: { value: string; label: string }[];
  panels: { heading: string; body: string }[];
  ctaTitle: string;
  ctaPrimary: { label: string; path: string };
}

export interface Programme {
  slug: string;
  name: string;
  /** Focus areas joined with " | " — shown in menus and cards. */
  tag: string;
  focusAreas: string[];
  summary: string;
  blurb: string;
  image: Photo;
  detail: ProgrammeDetail | null;
}

/** Split a " | " separated tag into its focus areas. */
export const splitFocusAreas = (tag: string) =>
  tag.split('|').map((s) => s.trim()).filter(Boolean);

const pillar = (p: Omit<Programme, 'tag' | 'blurb'>): Programme => ({
  ...p,
  tag: p.focusAreas.join(' | '),
  blurb: p.focusAreas.join(' · '),
});

export const programmes: Programme[] = [
  pillar({
    slug: 'enterprise',
    name: 'Enterprise',
    focusAreas: ['Entrepreneurship', 'Agribusiness', 'Technology'],
    summary:
      'OCHF backs Nigerian entrepreneurs, agribusinesses and technology ventures with ' +
      'catalytic funding and structured support built to create employment and lasting ' +
      'enterprises.',
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
      ctaTitle: 'Ready to grow your business?',
      ctaPrimary: { label: 'Apply for the Grant', path: '/support/apply' },
    },
  }),
  pillar({
    slug: 'education',
    name: 'Education',
    focusAreas: ['Scholarships', 'Training Programmes', 'Skills Development'],
    summary:
      'OCHF funds scholarships, training programmes and skills development for people whose ' +
      'progress is limited by cost rather than ability.',
    image: photo.keynote,
    detail: null,
  }),
  pillar({
    slug: 'community',
    name: 'Community',
    focusAreas: ['Direct Support', 'Infrastructure'],
    summary:
      'OCHF delivers direct support to households in need and invests in the infrastructure ' +
      'that communities depend on.',
    image: photo.guests,
    detail: null,
  }),
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
  cta: { label: 'Explore the Programme', path: '/our-work/enterprise' },
  image: photo.heroGrant,
};

/**
 * Portfolio story shown on the homepage and Enterprise page.
 *
 * The visual guide's version also carried three example figures (3 new employees,
 * 2× capacity, 2 new markets) marked "illustrative". Those were not real numbers for any
 * real business, so they have been removed rather than published as fact. The
 * before / intervention / result narrative describes the programme model and stays.
 */
export const portfolioStory = {
  eyebrow: 'Portfolio story',
  title: 'From production constraint to growing enterprise.',
  stages: [
    { heading: 'Before OCHF',       body: 'Manual production capped growth at local scale.' },
    { heading: 'OCHF intervention', body: 'Entrepreneurship grant plus equipment and mentorship.' },
    { heading: 'Result',            body: 'Expanded capacity, new hires, new markets.' },
  ],
  cta: { label: 'See the programme', path: '/our-work/enterprise' },
  image: photo.chequeDetail,
};
