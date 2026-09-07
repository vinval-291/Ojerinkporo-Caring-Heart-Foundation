/**
 * Field stories and updates — the "Recent stories" row on the homepage and the
 * Stories index.
 *
 * The three entries below match the visual guide. Their bodies are marked
 * `draft: true` because OCHF has not yet supplied the written pieces — the index
 * publishes the card, the article page says plainly that the piece is in
 * preparation rather than inventing beneficiary narratives.
 *
 * CMS NOTE: maps to a `story` document type with a `published` boolean.
 */

import { photo, type Photo } from './media';

export interface Story {
  slug: string;
  category: 'Enterprise' | 'Education' | 'Agriculture' | 'Wellbeing' | 'Foundation';
  title: string;
  standfirst: string;
  date: string;
  image: Photo;
  /** True until OCHF supplies the written piece. */
  draft: boolean;
  body?: string[];
}

export const stories: Story[] = [
  {
    slug: 'where-our-entrepreneurs-are-now',
    category: 'Enterprise',
    title: 'Where our entrepreneurs are now',
    standfirst:
      'Following up with the first cohort of Entrepreneurship Grant recipients — what the ' +
      'funding changed, and what it did not.',
    date: '2026',
    image: photo.workshopFloor,
    draft: true,
  },
  {
    slug: 'building-stronger-agricultural-value-chains',
    category: 'Agriculture',
    title: 'Building stronger agricultural value chains',
    standfirst:
      'How support at the processing stage changes what a farming household can earn from ' +
      'the same harvest.',
    date: '2026',
    image: photo.equipmentHandover,
    draft: true,
  },
  {
    slug: 'inside-ochfs-latest-programme',
    category: 'Foundation',
    title: "Inside OCHF's latest programme",
    standfirst:
      'A look at how a programme moves from design to disbursement, and the checks applied ' +
      'at each stage.',
    date: '2026',
    image: photo.chequePresentation,
    draft: true,
  },
];

export const getStory = (slug?: string) => stories.find((s) => s.slug === slug);

/**
 * Partner organisations.
 *
 * Visual guide: "Real, permissioned partner logos only — never stock logos."
 * Empty until OCHF supplies logos with permission to display them.
 */
export const partners: {
  name: string;
  logoUrl: string;
  alt?: string;
  url?: string;
  category?: string;
}[] = [];

export const partnerIntro = {
  title: 'Impact scales through partnership.',
  body:
    'We collaborate with cooperatives, development organisations, governments, educational ' +
    'institutions and technical partners to expand opportunity and build sustainable programmes.',
  note: 'Real, permissioned partner logos only — never stock logos.',
};
