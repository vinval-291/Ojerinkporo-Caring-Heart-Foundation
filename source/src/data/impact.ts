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

/** Headline band on the homepage. */
export const headlineMetrics: Metric[] = [
  { label: 'Invested in communities', value: '', prefix: '₦', period: 'FY2025–26', status: 'pending' },
  { label: 'Entrepreneurs supported', value: '', period: 'FY2025–26', status: 'pending' },
  { label: 'Students supported',      value: '', period: 'FY2025–26', status: 'pending' },
  { label: 'Communities reached',     value: '', period: 'FY2025–26', status: 'pending' },
  { label: 'Jobs created or sustained', value: '', period: 'Once verified', status: 'pending' },
];

/** Full grid on the Impact page. */
export const impactMetrics: Metric[] = [
  ...headlineMetrics,
  { label: 'Families supported', value: '', period: 'FY2025–26', status: 'pending' },
];

/** Breakdown by programme pillar. Widows support now sits here, under Wellbeing. */
export const byPillar = [
  {
    pillar: 'Enterprise',
    rows: [
      { label: 'Businesses funded', value: '' },
      { label: 'Jobs created', value: '' },
    ],
  },
  {
    pillar: 'Education',
    rows: [
      { label: 'Scholarships awarded', value: '' },
      { label: 'Schools reached', value: '' },
    ],
  },
  {
    pillar: 'Agriculture',
    rows: [
      { label: 'Farmers supported', value: '' },
      { label: 'Hectares reached', value: '' },
    ],
  },
  {
    pillar: 'Wellbeing',
    rows: [
      { label: 'Households reached', value: '' },
      { label: 'Widows supported', value: '' },
    ],
  },
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
    body: 'First cohort of grant recipients report outcomes — figures pending verification.',
  },
];
