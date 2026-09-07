import { defineField, defineType } from 'sanity';

/**
 * Reusable image type. Every photograph on the site carries alt text and a documentary
 * credit — the credit strip in the visual guide. Alt text is required, which is how
 * the accessibility gap in the old build is prevented from recurring.
 */
export const documentaryImage = defineType({
  name: 'documentaryImage',
  title: 'Photograph',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Describe the photograph',
      type: 'string',
      description:
        'For people using screen readers, and shown if the image fails to load. ' +
        'Describe what is happening, e.g. "Grant recipients receiving business equipment".',
      validation: (r) => r.required().min(10).warning('Please describe the photograph.'),
    }),
    defineField({
      name: 'credit',
      title: 'Caption strip',
      type: 'string',
      description:
        'Printed over the bottom of the image. E.g. "OCHF Photography — Grant recipients, Ebonyi State".',
    }),
  ],
  preview: {
    select: { imageUrl: 'asset.url', title: 'alt' },
  },
});

/** A field story or programme update. */
export const story = defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Headline', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      options: { source: 'title', maxLength: 70 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Enterprise', 'Education', 'Agriculture', 'Wellbeing', 'Foundation'],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'standfirst',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown under the headline and on the story card.',
      validation: (r) => r.required().max(260),
    }),
    defineField({ name: 'image', title: 'Main photograph', type: 'documentaryImage' }),
    defineField({
      name: 'body',
      title: 'The story',
      type: 'array',
      of: [
        { type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'Heading', value: 'h2' }] },
        { type: 'documentaryImage' },
      ],
    }),
    defineField({
      name: 'consent',
      title: 'Do we have permission from the people in this story?',
      type: 'boolean',
      description:
        'Beneficiary stories publish only with the subject’s permission. The website will ' +
        'not show this story publicly unless this is ticked.',
      initialValue: false,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'published',
      title: 'Publish on the website',
      type: 'boolean',
      description: 'Leave off while drafting. The card will not appear until this is on.',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'date', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', category: 'category', published: 'published', media: 'image.asset' },
    prepare: ({ title, category, published, media }) => ({
      title,
      subtitle: `${category}${published ? '' : ' · draft'}`,
      media,
    }),
  },
});

/** Leadership, trustees, team. */
export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'E.g. Founder, Trustee, Programme Director.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'group',
      title: 'Shown under',
      type: 'string',
      options: {
        list: [
          { title: 'Founder', value: 'founder' },
          { title: 'Leadership team', value: 'leadership' },
          { title: 'Board of trustees', value: 'board' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'portrait', title: 'Photograph', type: 'documentaryImage' }),
    defineField({
      name: 'quote',
      title: 'Quotation',
      type: 'text',
      rows: 3,
      description: 'Optional. Shown pulled out beside the biography.',
    }),
    defineField({
      name: 'expertise',
      title: 'Areas of expertise',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }] }],
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 100 }),
  ],
  orderings: [
    { title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'portrait.asset' } },
});

/** Questions and answers. One source, used on Contact and anywhere else. */
export const faq = defineType({
  name: 'faq',
  title: 'Question & answer',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 5,
      validation: (r) => r.required(),
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 100 }),
  ],
  orderings: [
    { title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'question', subtitle: 'answer' } },
});
