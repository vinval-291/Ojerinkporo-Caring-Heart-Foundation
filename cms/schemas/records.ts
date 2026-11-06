import { defineField, defineType } from 'sanity';

/**
 * A programme record — one past intervention, documented.
 *
 * This is the foundation's institutional memory: what was done, where, when, for whom,
 * and what came of it. It answers the question a partner or donor asks after reading
 * the headline figures: "show me".
 *
 * Two honesty rules are built in. The number of beneficiaries shows on the website
 * only once someone has checked it ("figures checked"), and a testimonial shows only
 * when the person quoted has given consent.
 */
export const programmeRecord = defineType({
  name: 'programmeRecord',
  title: 'Programme record',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'What was done', type: 'string',
      description: 'e.g. "2026 Entrepreneurship Grant — first cohort".', validation: (r) => r.required().max(90) }),
    defineField({ name: 'pillar', title: 'Programme', type: 'string',
      description: 'The programme this belongs to, spelt exactly as it is on the website, e.g. Enterprise.',
      validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Where', type: 'string', description: 'e.g. Amas, Ebonyi State.' }),
    defineField({ name: 'startDate', title: 'Started', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'endDate', title: 'Finished', type: 'date', description: 'Leave empty if it is ongoing.' }),
    defineField({ name: 'summary', title: 'What happened', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'beneficiaries', title: 'Who it reached', type: 'string',
      description: 'In words, e.g. "24 businesses" or "112 households". Shown only once the figures are checked.' }),
    defineField({ name: 'figuresChecked', title: 'Figures checked against the records', type: 'boolean', initialValue: false }),
    defineField({ name: 'outcomes', title: 'Outcomes', type: 'array',
      description: 'One line per outcome, stated as fact.',
      of: [{ type: 'object', name: 'outcome', fields: [defineField({ name: 'text', title: 'Outcome', type: 'text', rows: 2 })],
        preview: { select: { title: 'text' } } }] }),
    defineField({ name: 'image', title: 'Photograph', type: 'documentaryImage' }),
    defineField({ name: 'testimonial', title: 'In their words', type: 'text', rows: 3,
      description: 'A short quotation from a beneficiary or partner. Shown only with their consent.' }),
    defineField({ name: 'testimonialName', title: 'Who said it', type: 'string', description: 'Name and role, e.g. "Grant recipient, Abakaliki".' }),
    defineField({ name: 'testimonialConsent', title: 'They agreed to be quoted', type: 'boolean', initialValue: false }),
    defineField({ name: 'published', title: 'Show on the website', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Newest first', name: 'start', by: [{ field: 'startDate', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', pillar: 'pillar', start: 'startDate', published: 'published', media: 'image' },
    prepare: ({ title, pillar, start, published, media }) => ({
      title, media,
      subtitle: `${pillar ?? ''}${start ? ` · ${String(start).slice(0, 4)}` : ''}${published ? '' : ' · hidden'}`,
    }),
  },
});

/**
 * A publication — an annual report, programme report, impact summary or registration
 * document, offered as a download on the Resources page.
 */
export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'kind', title: 'Type of document', type: 'string', validation: (r) => r.required(),
      options: { list: ['Annual report', 'Programme report', 'Impact summary', 'Registration document', 'Policy', 'Other'] } }),
    defineField({ name: 'year', title: 'Year', type: 'string',
      validation: (r) => r.regex(/^\d{4}$/, { name: 'four-digit year' }) }),
    defineField({ name: 'summary', title: 'What it covers', type: 'text', rows: 3 }),
    defineField({ name: 'file', title: 'The document (PDF)', type: 'file',
      options: { accept: 'application/pdf' }, validation: (r) => r.required() }),
    defineField({ name: 'published', title: 'Show on the website', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Position', type: 'number' }),
  ],
  orderings: [{ title: 'Newest first', name: 'year', by: [{ field: 'year', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', kind: 'kind', year: 'year', published: 'published' },
    prepare: ({ title, kind, year, published }) => ({
      title, subtitle: `${kind ?? ''}${year ? ` · ${year}` : ''}${published ? '' : ' · hidden'}`,
    }),
  },
});

/**
 * A grant application, sent by the public form on the website.
 *
 * Stored with an `applications.` id, which Sanity keeps private: anonymous readers of
 * the public dataset cannot see these documents. Editors change the status and notes;
 * everything the applicant sent is read-only.
 */
export const grantApplication = defineType({
  name: 'grantApplication',
  title: 'Grant application',
  type: 'document',
  fields: [
    defineField({ name: 'status', title: 'Status', type: 'string', initialValue: 'New',
      options: { list: ['New', 'Under review', 'Shortlisted', 'Not selected', 'Awarded'] } }),
    defineField({ name: 'notes', title: 'Assessment notes', type: 'text', rows: 4 }),
    ...([
      ['reference', 'Reference'], ['receivedAt', 'Received'], ['fullName', 'Applicant'], ['email', 'Email'],
      ['phone', 'Phone'], ['gender', 'Gender'], ['state', 'State'], ['businessName', 'Business'],
      ['cacNumber', 'CAC registration number'], ['sector', 'Sector'], ['stage', 'Stage'], ['location', 'Business location'],
    ] as const).map(([name, title]) => defineField({ name, title, type: 'string', readOnly: true })),
    defineField({ name: 'employees', title: 'Employees now', type: 'number', readOnly: true }),
    defineField({ name: 'amountRequested', title: 'Amount requested (₦)', type: 'number', readOnly: true }),
    defineField({ name: 'useOfFunds', title: 'What the grant would pay for', type: 'text', readOnly: true }),
    defineField({ name: 'jobsPlan', title: 'How it would create jobs', type: 'text', readOnly: true }),
    ...([
      ['businessPlan', 'Business plan'], ['financials', 'Financial projections'], ['cacCertificate', 'CAC certificate'],
      ['letter1', 'Letter of recommendation 1'], ['letter2', 'Letter of recommendation 2'], ['otherDocument', 'Other supporting document'],
    ] as const).map(([name, title]) => defineField({ name, title, type: 'file', readOnly: true })),
    ...(['citizen', 'accurate', 'consent'] as const).map((name) =>
      defineField({ name, title: { citizen: 'Nigerian citizen', accurate: 'Information is accurate', consent: 'Consented to processing' }[name], type: 'boolean', readOnly: true })),
  ],
  orderings: [{ title: 'Newest first', name: 'received', by: [{ field: 'receivedAt', direction: 'desc' }] }],
  preview: {
    select: { business: 'businessName', name: 'fullName', status: 'status', ref: 'reference' },
    prepare: ({ business, name, status, ref }) => ({ title: `${business ?? 'Application'} — ${name ?? ''}`, subtitle: `${ref ?? ''} · ${status ?? 'New'}` }),
  },
});
