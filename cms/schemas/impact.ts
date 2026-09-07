import { defineField, defineType } from 'sanity';

/**
 * Impact figures.
 *
 * The website will not display a number unless `status` is "verified". This is
 * deliberate: the previous site animated 10,000+ lives impacted with nothing behind
 * it. Here the label and reporting period publish immediately, and the figure appears
 * only once someone has checked it against the records.
 */
export const impactMetric = defineType({
  name: 'impactMetric',
  title: 'Impact figure',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'What this figure counts',
      type: 'string',
      description: 'For example: Entrepreneurs supported, Jobs created or sustained.',
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: 'value',
      title: 'The figure',
      type: 'string',
      description:
        'Leave empty until it has been checked. The website shows a placeholder line ' +
        'instead of a number, which is honest and looks intentional.',
    }),
    defineField({
      name: 'prefix',
      title: 'Symbol before the figure',
      type: 'string',
      description: 'Usually ₦ for money figures. Leave empty otherwise.',
      options: { list: [{ title: '₦ (Naira)', value: '₦' }] },
    }),
    defineField({
      name: 'suffix',
      title: 'Text after the figure',
      type: 'string',
      description: 'For example: M for millions, or + for "or more".',
    }),
    defineField({
      name: 'period',
      title: 'Period this covers',
      type: 'string',
      description: 'For example: FY2025–26. Always say what window the figure describes.',
      initialValue: 'FY2025–26',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Verification status',
      type: 'string',
      description:
        'The website only prints the number when this is set to Verified. Until then it ' +
        'shows the label and the period with a "pending verification" note.',
      options: {
        list: [
          { title: 'Awaiting verification', value: 'pending' },
          { title: 'Verified — safe to publish', value: 'verified' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'source',
      title: 'Where this figure came from',
      type: 'text',
      rows: 2,
      description:
        'Which record was checked, and by whom. Not shown on the website — this is your ' +
        'own audit trail if anyone questions the number.',
    }),
    defineField({
      name: 'verifiedOn',
      title: 'Date verified',
      type: 'date',
    }),
    defineField({
      name: 'placement',
      title: 'Where it appears',
      type: 'string',
      options: {
        list: [
          { title: 'Homepage banner and Impact page', value: 'headline' },
          { title: 'Impact page only', value: 'impact' },
        ],
        layout: 'radio',
      },
      initialValue: 'impact',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Programme this belongs to',
      type: 'reference',
      to: [{ type: 'programme' }],
      description: 'Optional. Set this to group the figure under a pillar on the Impact page.',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 100,
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { label: 'label', value: 'value', prefix: 'prefix', status: 'status', period: 'period' },
    prepare: ({ label, value, prefix, status, period }) => ({
      title: label,
      subtitle:
        status === 'verified'
          ? `${prefix ?? ''}${value ?? '—'} · ${period} · published`
          : `${period} · awaiting verification`,
    }),
  },
});

export const milestone = defineType({
  name: 'milestone',
  title: 'Milestone',
  type: 'document',
  description: 'A dated moment in the foundation\'s history, shown on Impact and Our Story.',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (r) => r.required().regex(/^\d{4}$/, { name: 'four-digit year' }),
    }),
    defineField({
      name: 'body',
      title: 'What happened',
      type: 'text',
      rows: 3,
      description: 'One sentence. For example: Entrepreneurship Grant Programme launched — ₦100,000,000 committed.',
      validation: (r) => r.required().max(200),
    }),
  ],
  orderings: [
    { title: 'Year', name: 'year', by: [{ field: 'year', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'year', subtitle: 'body' },
  },
});
