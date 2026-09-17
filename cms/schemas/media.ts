import { defineField, defineType } from 'sanity';

/**
 * A photo album — e.g. the 2024 inauguration.
 *
 * Uploading here solves the problem the old site had: 62 photographs hot-linked from a
 * free image host that throttles and expires them. Sanity serves uploads from its own
 * CDN, resized on demand, with no rate limit.
 */
export const galleryAlbum = defineType({
  name: 'galleryAlbum',
  title: 'Photo album',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Album title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      options: { source: 'title', maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (r) => r.required().regex(/^\d{4}$/, { name: 'four-digit year' }),
    }),
    defineField({
      name: 'description',
      title: 'What this album shows',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sets',
      title: 'Sections',
      type: 'array',
      description: 'Group photographs into sections, e.g. "Grant award presentations".',
      of: [
        {
          type: 'object',
          name: 'photoSet',
          fields: [
            defineField({ name: 'name', title: 'Section name', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'images',
              title: 'Photographs',
              type: 'array',
              of: [{ type: 'documentaryImage' }],
              options: { layout: 'grid' },
              validation: (r) => r.min(1),
            }),
          ],
          preview: {
            select: { title: 'name', images: 'images' },
            prepare: ({ title, images }) => ({
              title,
              subtitle: `${images?.length ?? 0} photographs`,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'published',
      title: 'Publish on the website',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', year: 'year', published: 'published' },
    prepare: ({ title, year, published }) => ({
      title,
      subtitle: `${year}${published ? '' : ' · draft'}`,
    }),
  },
});

/**
 * Partner organisations.
 *
 * `permission` is required and defaults to false. The website will not render a logo
 * without it — the visual guide is explicit that only permissioned partner logos may
 * appear, never stock ones.
 */
export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Organisation name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Preferably a transparent PNG or SVG.',
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.required() }),
      ],
    }),
    defineField({ name: 'url', title: 'Website', type: 'url' }),
    defineField({
      name: 'category',
      title: 'Type of partner',
      type: 'string',
      options: {
        list: [
          'Cooperative',
          'Development organisation',
          'Government',
          'Educational institution',
          'Technical partner',
          'Funder',
        ],
      },
    }),
    defineField({
      name: 'permission',
      title: 'Do we have written permission to display this logo?',
      type: 'boolean',
      description:
        'The website will not show this partner until this is ticked. Only real, ' +
        'permissioned partner logos may appear — never placeholders or stock marks.',
      initialValue: false,
      validation: (r) => r.required(),
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 100 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'logo.asset', permission: 'permission' },
    prepare: ({ title, subtitle, media, permission }) => ({
      title,
      subtitle: permission ? subtitle : `${subtitle ?? 'Partner'} · permission not confirmed`,
      media,
    }),
  },
});
