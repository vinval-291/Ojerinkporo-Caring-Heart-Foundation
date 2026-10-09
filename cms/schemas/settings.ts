import { defineField, defineType } from 'sanity';

/**
 * Foundation details — a singleton.
 *
 * Every appearance of the organisation's name, address, phone number and social links
 * on the website reads from this one document. That is what makes the three-way name
 * inconsistency in the old build impossible to repeat: change it here, it changes
 * everywhere.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Foundation details',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Name & identity', default: true },
    { name: 'contact', title: 'Contact details' },
    { name: 'social', title: 'Social profiles' },
    { name: 'seo', title: 'Search & sharing' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      group: 'identity',
      description:
        'The one correct spelling. Used everywhere on the site, so changing it here ' +
        'corrects every page at once.',
      initialValue: 'Ojerinkporo Caring Hearts Foundation',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'short',
      title: 'Short name',
      type: 'string',
      group: 'identity',
      initialValue: 'OCHF',
      validation: (r) => r.required().max(8),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'identity',
    }),
    defineField({
      name: 'tagline',
      title: 'Homepage headline',
      type: 'string',
      group: 'identity',
      initialValue: 'Investing in people. Building stronger communities.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Homepage introduction',
      type: 'text',
      rows: 3,
      group: 'identity',
      validation: (r) => r.required().max(240),
    }),

    // ------------------------------------------------------------- contact
    defineField({
      name: 'address',
      title: 'Head office address',
      type: 'text',
      rows: 3,
      group: 'contact',
      initialValue: 'Amas Autonomous Community, Ebonyi State, Nigeria',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Short location',
      type: 'string',
      group: 'contact',
      description: 'Shown in the footer. E.g. "Ebonyi State, Nigeria".',
      initialValue: 'Ebonyi State, Nigeria',
    }),
    defineField({
      name: 'email',
      title: 'Email address',
      type: 'string',
      group: 'contact',
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: 'phones',
      title: 'Telephone numbers',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'contact',
      validation: (r) => r.min(1),
    }),

    // -------------------------------------------------------------- social
    defineField({
      name: 'social',
      title: 'Social profiles',
      type: 'object',
      group: 'social',
      description:
        'Leave any of these empty and the icon simply will not appear. The old site had ' +
        'nine social icons that led nowhere.',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'twitter', title: 'X / Twitter', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
      ],
    }),

    // ----------------------------------------------------------------- seo
    defineField({
      name: 'seoDescription',
      title: 'Search description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'One sentence shown by Google and when the site is shared. Under 155 characters.',
      validation: (r) => r.max(155),
    }),
    defineField({
      name: 'shareImage',
      title: 'Sharing image',
      type: 'image',
      group: 'seo',
      description: 'Shown when a link to the site is posted. Ideally 1200 × 630 pixels.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Foundation details' }),
  },
});

/**
 * Website enquiries, written here by the contact form.
 *
 * Editors read these; nobody types one. Fields are read-only so a message cannot be
 * altered after it arrives.
 */
export const submission = defineType({
  name: 'submission',
  title: 'Enquiry',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({ name: 'name', title: 'From', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'topic', title: 'Subject', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 8 }),
    defineField({ name: 'receivedAt', title: 'Received', type: 'datetime' }),
    defineField({
      name: 'handled',
      title: 'Dealt with',
      type: 'boolean',
      readOnly: false,
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Newest first', name: 'received', by: [{ field: 'receivedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { name: 'name', topic: 'topic', handled: 'handled', receivedAt: 'receivedAt' },
    prepare: ({ name, topic, handled, receivedAt }) => ({
      title: `${name ?? 'Unknown'} — ${topic ?? 'Enquiry'}`,
      subtitle: `${receivedAt ? new Date(receivedAt).toLocaleDateString('en-GB') : ''}${handled ? ' · dealt with' : ' · new'}`,
    }),
  },
});
