import { defineField, defineType } from 'sanity';

/**
 * A programme pillar — Enterprise, Education, Agriculture, Wellbeing.
 *
 * `detail` is optional throughout. A programme with no grant model published simply
 * renders its summary and an honest "in preparation" note, rather than inventing
 * eligibility rules.
 */
export const programme = defineType({
  name: 'programme',
  title: 'Programme',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'model', title: 'How it works' },
    { name: 'seo', title: 'Search & sharing' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Programme name',
      type: 'string',
      group: 'basics',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      group: 'basics',
      options: { source: 'name', maxLength: 40 },
      description: 'Becomes ojerinkporofoundation.com/our-work/…',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'basics',
      description: 'Enterprise is 1. Lower numbers appear first.',
      initialValue: 10,
    }),
    defineField({
      name: 'tag',
      title: 'Short descriptor',
      type: 'string',
      group: 'basics',
      description: 'Three or four words, shown in the menu. E.g. "Business growth, grants & jobs".',
      validation: (r) => r.required().max(50),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      group: 'basics',
      description: 'Two sentences, shown at the top of the programme page.',
      validation: (r) => r.required().max(320),
    }),
    defineField({
      name: 'image',
      title: 'Main photograph',
      type: 'documentaryImage',
      group: 'basics',
    }),

    // ------------------------------------------------------------- the model
    defineField({
      name: 'modelTitle',
      title: 'How this programme works — heading',
      type: 'string',
      group: 'model',
      description: 'E.g. "Catalytic funding, paired with real support." Leave the whole tab empty if not ready.',
    }),
    defineField({
      name: 'terms',
      title: 'Headline terms',
      type: 'array',
      group: 'model',
      description: 'The two or three numbers that define the offer, e.g. ₦1M–₦3M and 1:1.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Figure', type: 'string', validation: (r) => r.required() },
            { name: 'label', title: 'What it means', type: 'text', rows: 2, validation: (r) => r.required() },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: 'panels',
      title: 'Eligibility and criteria',
      type: 'array',
      group: 'model',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required() },
            { name: 'body', title: 'Detail', type: 'text', rows: 3, validation: (r) => r.required() },
          ],
          preview: { select: { title: 'heading', subtitle: 'body' } },
        },
      ],
    }),
    defineField({
      name: 'applicationUrl',
      title: 'Application form link',
      type: 'url',
      group: 'model',
      description:
        'Where "Apply" sends people. Leave empty and the site will ask applicants to ' +
        'contact you instead — which is better than a link that goes nowhere.',
    }),
    defineField({
      name: 'applicationOpen',
      title: 'Applications currently open?',
      type: 'boolean',
      group: 'model',
      description: 'Turn this off when a cycle closes so the site stops inviting applications.',
      initialValue: false,
    }),
    defineField({
      name: 'applicationDeadline',
      title: 'Closing date',
      type: 'date',
      group: 'model',
      hidden: ({ document }) => !document?.applicationOpen,
    }),

    // ---------------------------------------------------------------- search
    defineField({
      name: 'seoDescription',
      title: 'Search description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'One sentence shown by Google and when the page is shared. Under 155 characters.',
      validation: (r) => r.max(155),
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'tag', media: 'image.asset' },
  },
});
