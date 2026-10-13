/**
 * Impact figures.
 *
 * The previous build animated 10,000+ / 500+ / 2,500+ / 150+ with nothing behind them.
 * Per the visual guide, every figure now publishes with the period it covers and its
 * verification state. Values are deliberately EMPTY until the foundation confirms them —
 * the label and the reporting period publish; the number waits.
 *
 * To publish a figure: fill `value` and change `status` to 'verified'.
 *
 * CMS NOTE: maps to an `impactMetric` document type with a required `period`
 * and `verifiedAt` field.
 */

export type MetricStatus = 'verified' | 'pending';

export interface Metric {
  label: string;
  /** Empty string renders as a placeholder rule, never as a fabricated number. */
  value: string;
  prefix?: string;
  period: string;
  status: MetricStatus;
}

/**
 * Headline band on the homepage.
 *
 * These mirror the figures held in the CMS, which is the source of truth. They are
 * repeated here because the CMS fetch can fail — a missing CORS origin for a new
 * domain is enough — and an empty fallback published nothing at all, so the site
 * silently showed five blank rules where its strongest evidence should be.
 *
 * Keep the two in step. Change a figure in the dashboard and change it here.
 */
export const headlineMetrics: Metric[] = [
  { label: 'Invested in communities', value: '250M+', prefix: '₦', period: '2024–2026', status: 'verified' },
  { label: 'Entrepreneurs supported', value: '100+', period: '2024–2026', status: 'verified' },
  { label: 'Students supported',      value: '200+', period: '2024–2026', status: 'verified' },
  { label: 'Communities reached',     value: '36+',  period: '2024–2026', status: 'verified' },
  { label: 'Jobs created or sustained', value: '70+', period: '2024–2026', status: 'verified' },
];

/** Full grid on the Impact page. */
export const impactMetrics: Metric[] = [...headlineMetrics];

/**
 * The three pillars and their focus areas, shown on the Impact page.
 * Replaces a table of empty figure rows, which read as unfinished.
 */
export const byPillar = [
  { pillar: 'Enterprise', rows: ['Entrepreneurship', 'Agribusiness', 'Technology'] },
  { pillar: 'Education',  rows: ['Scholarships', 'Training Programmes', 'Skills Development'] },
  { pillar: 'Community',  rows: ['Direct Support', 'Infrastructure'] },
];

export const methodology = {
  title: 'How we measure impact.',
  body:
    'Every number on this page is drawn from grant disbursement records, programme attendance ' +
    'registers, and direct beneficiary follow-up — reviewed on the reporting schedule stated ' +
    'beside each figure, never published as a running, unaudited count.',
};

export const milestones = [
  {
    year: '2024',
    body: 'Ojerinkporo Caring Hearts Foundation formally inaugurated.',
  },
  {
    year: '2025',
    body: 'Entrepreneurship Grant Programme launched — ₦100,000,000 committed.',
  },
  {
    year: '2026',
    body: 'First cohort of grant recipients report outcomes.',
  },
];
