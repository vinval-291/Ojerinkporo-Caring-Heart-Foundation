/**
 * What the dashboard shows, section by section.
 *
 * Each section describes a document type in the client's language — no Sanity
 * vocabulary reaches the screen. Adding a field here adds it to the form; there are no
 * per-section form components to maintain.
 */

export type FieldKind =
  | 'text' | 'textarea' | 'richtext' | 'number' | 'date'
  | 'toggle' | 'select' | 'image' | 'tags' | 'list';

export interface Field {
  name: string;
  label: string;
  kind: FieldKind;
  help?: string;
  required?: boolean;
  options?: string[];
  /** For 'list': the shape of each row. */
  subFields?: { name: string; label: string; kind: 'text' | 'textarea' }[];
  /** Hide unless another field is truthy. */
  showWhen?: string;
  placeholder?: string;
}

export interface Section {
  key: string;
  type: string;
  /** Card title on the dashboard. */
  title: string;
  /** One line under the title. */
  blurb: string;
  /** Singletons open straight into the form; collections show a list first. */
  singleton?: boolean;
  /** Field used as the row title in list view. */
  titleField: string;
  subtitleField?: string;
  /** Verb on the "add" button, e.g. "Add a story". */
  addLabel?: string;
  fields: Field[];
}

export const sections: Section[] = [
  /* ------------------------------------------------------------- settings */
  {
    key: 'details',
    type: 'siteSettings',
    title: 'Foundation details',
    blurb: 'Name, address, phone numbers and email — used across the whole website.',
    singleton: true,
    titleField: 'name',
    fields: [
      { name: 'name', label: 'Full name of the foundation', kind: 'text', required: true,
        help: 'Change it here and it updates on every page of the website.' },
      { name: 'short', label: 'Short name', kind: 'text', required: true, help: 'Shown in the menu. e.g. OCHF' },
      { name: 'tagline', label: 'Homepage headline', kind: 'text', required: true },
      { name: 'intro', label: 'Homepage introduction', kind: 'textarea', required: true },
      { name: 'address', label: 'Head office address', kind: 'textarea', required: true },
      { name: 'location', label: 'Short location', kind: 'text', help: 'Shown in the footer. e.g. Ebonyi State, Nigeria' },
      { name: 'email', label: 'Email address', kind: 'text', required: true },
      { name: 'phones', label: 'Phone numbers', kind: 'tags', help: 'Type a number and press Enter to add it.' },
      { name: 'seoDescription', label: 'Description for Google', kind: 'textarea',
        help: 'One sentence, under 155 characters. Shown in search results and when the site is shared.' },
    ],
  },

  /* ------------------------------------------------------------- figures */
  {
    key: 'figures',
    type: 'impactMetric',
    title: 'Impact figures',
    blurb: 'The numbers on the homepage and Impact page. Nothing shows publicly until you mark it verified.',
    titleField: 'label',
    subtitleField: 'period',
    addLabel: 'Add a figure',
    fields: [
      { name: 'label', label: 'What this figure counts', kind: 'text', required: true,
        placeholder: 'e.g. Entrepreneurs supported' },
      { name: 'value', label: 'The number', kind: 'text',
        help: 'Leave empty until it has been checked. The website shows a short line instead of a number.' },
      { name: 'prefix', label: 'Symbol before it', kind: 'select', options: ['', '₦'] },
      { name: 'suffix', label: 'Text after it', kind: 'text', help: 'e.g. M for millions, or +' },
      { name: 'period', label: 'Period this covers', kind: 'text', required: true, placeholder: 'FY2025–26' },
      { name: 'status', label: 'Has this been checked?', kind: 'select', required: true,
        options: ['pending', 'verified'],
        help: 'The number only appears on the website once this is "verified".' },
      { name: 'source', label: 'Where it came from', kind: 'textarea',
        help: 'For your own records — never shown on the website.' },
      { name: 'placement', label: 'Where it appears', kind: 'select', options: ['headline', 'impact'],
        help: '"headline" shows on the homepage banner too.' },
      { name: 'order', label: 'Position', kind: 'number' },
    ],
  },

  /* ------------------------------------------------------------- stories */
  {
    key: 'stories',
    type: 'story',
    title: 'Stories & news',
    blurb: 'Field stories and updates. They stay hidden until you tick "show on website".',
    titleField: 'title',
    subtitleField: 'category',
    addLabel: 'Add a story',
    fields: [
      { name: 'title', label: 'Headline', kind: 'text', required: true },
      { name: 'category', label: 'Category', kind: 'select', required: true,
        options: ['Enterprise', 'Education', 'Agriculture', 'Wellbeing', 'Foundation'] },
      { name: 'date', label: 'Date', kind: 'date', required: true },
      { name: 'standfirst', label: 'Short introduction', kind: 'textarea', required: true,
        help: 'One or two sentences, shown under the headline and on the story card.' },
      { name: 'image', label: 'Main photograph', kind: 'image' },
      { name: 'body', label: 'The story', kind: 'richtext' },
      { name: 'consent', label: 'We have permission from the people in this story', kind: 'toggle',
        help: 'Required. Stories about beneficiaries publish only with their permission.' },
      { name: 'published', label: 'Show on the website', kind: 'toggle' },
    ],
  },

  /* ---------------------------------------------------------- programmes */
  {
    key: 'programmes',
    type: 'programme',
    title: 'Programmes',
    blurb: 'Enterprise, Education, Agriculture and Wellbeing — what each one is and how it works.',
    titleField: 'name',
    subtitleField: 'tag',
    addLabel: 'Add a programme',
    fields: [
      { name: 'name', label: 'Programme name', kind: 'text', required: true },
      { name: 'tag', label: 'Short descriptor', kind: 'text', required: true,
        placeholder: 'e.g. Business growth, grants & jobs' },
      { name: 'summary', label: 'Summary', kind: 'textarea', required: true,
        help: 'Two sentences, shown at the top of the programme page.' },
      { name: 'image', label: 'Main photograph', kind: 'image' },
      { name: 'modelTitle', label: 'How it works — heading', kind: 'text',
        help: 'Leave empty if this programme has no published model yet.' },
      { name: 'terms', label: 'Headline terms', kind: 'list',
        help: 'The one or two figures that define the offer.',
        subFields: [
          { name: 'value', label: 'Figure', kind: 'text' },
          { name: 'label', label: 'What it means', kind: 'textarea' },
        ] },
      { name: 'panels', label: 'Eligibility and criteria', kind: 'list',
        subFields: [
          { name: 'heading', label: 'Heading', kind: 'text' },
          { name: 'body', label: 'Detail', kind: 'textarea' },
        ] },
      { name: 'applicationOpen', label: 'Applications are open now', kind: 'toggle' },
      { name: 'applicationUrl', label: 'Application form link', kind: 'text', showWhen: 'applicationOpen',
        help: 'Leave empty and the website asks applicants to contact you instead.' },
      { name: 'applicationDeadline', label: 'Closing date', kind: 'date', showWhen: 'applicationOpen' },
      { name: 'order', label: 'Position', kind: 'number' },
    ],
  },

  /* ------------------------------------------------------------- gallery */
  {
    key: 'photos',
    type: 'galleryAlbum',
    title: 'Photo albums',
    blurb: 'Upload photographs of the foundation’s work, grouped into albums.',
    titleField: 'title',
    subtitleField: 'year',
    addLabel: 'Add an album',
    fields: [
      { name: 'title', label: 'Album title', kind: 'text', required: true },
      { name: 'year', label: 'Year', kind: 'text', required: true, placeholder: '2024' },
      { name: 'description', label: 'What this album shows', kind: 'textarea', required: true },
      { name: 'published', label: 'Show on the website', kind: 'toggle' },
    ],
  },

  /* -------------------------------------------------------------- people */
  {
    key: 'people',
    type: 'person',
    title: 'People',
    blurb: 'Founder, leadership team and trustees.',
    titleField: 'name',
    subtitleField: 'role',
    addLabel: 'Add a person',
    fields: [
      { name: 'name', label: 'Full name', kind: 'text', required: true },
      { name: 'role', label: 'Role', kind: 'text', required: true },
      { name: 'group', label: 'Shown under', kind: 'select', required: true,
        options: ['founder', 'leadership', 'board'] },
      { name: 'portrait', label: 'Photograph', kind: 'image' },
      { name: 'quote', label: 'Quotation', kind: 'textarea' },
      { name: 'expertise', label: 'Areas of expertise', kind: 'tags' },
      { name: 'bio', label: 'Biography', kind: 'richtext' },
      { name: 'order', label: 'Position', kind: 'number' },
    ],
  },

  /* ------------------------------------------------------------ partners */
  {
    key: 'partners',
    type: 'partner',
    title: 'Partners',
    blurb: 'Partner organisations. A logo appears only once you confirm written permission.',
    titleField: 'name',
    subtitleField: 'category',
    addLabel: 'Add a partner',
    fields: [
      { name: 'name', label: 'Organisation name', kind: 'text', required: true },
      { name: 'category', label: 'Type of partner', kind: 'select',
        options: ['Cooperative', 'Development organisation', 'Government',
                  'Educational institution', 'Technical partner', 'Funder'] },
      { name: 'url', label: 'Their website', kind: 'text' },
      { name: 'permission', label: 'We have written permission to show their logo', kind: 'toggle',
        help: 'Required. The website will not display the logo without this.' },
      { name: 'order', label: 'Position', kind: 'number' },
    ],
  },

  /* ---------------------------------------------------------------- FAQ */
  {
    key: 'questions',
    type: 'faq',
    title: 'Questions & answers',
    blurb: 'The list shown at the bottom of the Contact page.',
    titleField: 'question',
    addLabel: 'Add a question',
    fields: [
      { name: 'question', label: 'Question', kind: 'text', required: true },
      { name: 'answer', label: 'Answer', kind: 'textarea', required: true },
      { name: 'order', label: 'Position', kind: 'number' },
    ],
  },

  /* --------------------------------------------------------- milestones */
  {
    key: 'milestones',
    type: 'milestone',
    title: 'Milestones',
    blurb: 'The dated history shown on the Impact and Our Story pages.',
    titleField: 'year',
    subtitleField: 'body',
    addLabel: 'Add a milestone',
    fields: [
      { name: 'year', label: 'Year', kind: 'text', required: true, placeholder: '2025' },
      { name: 'body', label: 'What happened', kind: 'textarea', required: true },
    ],
  },
];

export const getSection = (key?: string) => sections.find((s) => s.key === key);
