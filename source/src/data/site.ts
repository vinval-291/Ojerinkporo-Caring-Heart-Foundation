/**
 * Single source of truth for organisation identity and navigation.
 *
 * Every name, address and phone number on the site reads from here, so the
 * three-way spelling inconsistency in the previous build cannot recur.
 *
 * CMS NOTE: this file maps 1:1 to a `siteSettings` singleton document.
 */

export interface Site {
  name: string;
  short: string;
  location: string;
  country: string;
  address: string;
  email: string;
  phones: string[];
  logo: string;
  social: { facebook: string; twitter: string; instagram: string; linkedin: string };
}

export const site: Site = {
  /** Canonical name. Confirmed from the client's visual guide (footer + hero eyebrow). */
  name: 'Ojerinkporo Caring Hearts Foundation',
  short: 'OCHF',
  location: 'Ebonyi State, Nigeria',
  country: 'Nigeria',

  /** From the Contact page of the previous build. The footer's "123 Caring Way,
   *  Lagos" was placeholder text and has been removed. */
  address: 'Amas Autonomous Community, Ebonyi State, Nigeria',
  email: 'info@ojerinkporofoundation.com',
  phones: ['+234 806 666 7882', '+234 706 072 6910'],

  logo: 'https://i.postimg.cc/FK8yvgj9/ochf-logo.png',

  /** TODO(client): supply real profile URLs. Links are hidden until these exist —
   *  the previous build shipped nine dead `href="#"` icons. */
  social: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  },
};

// ---------------------------------------------------------------------------
// Navigation — drives the desktop mega menus, the mobile accordion and the footer.
// ---------------------------------------------------------------------------

export interface NavLeaf {
  name: string;
  path: string;
  desc?: string;
}

export interface NavColumn {
  heading?: string;
  links: NavLeaf[];
}

export interface NavFeature {
  eyebrow: string;
  title: string;
  desc?: string;
  cta: string;
  path: string;
  image?: string;
}

export interface NavItem {
  name: string;
  path: string;
  /** Mega-menu panel. Absent for simple links (Partners, Contact). */
  mega?: {
    intro: { title: string; desc: string; path: string };
    columns: NavColumn[];
    features: NavFeature[];
  };
}

export const nav: NavItem[] = [
  {
    name: 'About',
    path: '/about',
    mega: {
      intro: {
        title: 'About',
        desc: "Who OCHF is, how it's led, and how it's held accountable.",
        path: '/about',
      },
      columns: [
        {
          links: [
            { name: 'About OCHF',  path: '/about',            desc: 'Who we are, mission, vision and model' },
            { name: 'Our Story',   path: '/about/story',      desc: 'How and why OCHF was founded' },
            { name: 'Leadership',  path: '/about/leadership', desc: 'Founder, leadership team and board' },
            { name: 'Governance',  path: '/about/governance', desc: 'Accountability, structure and policies' },
          ],
        },
      ],
      features: [
        {
          eyebrow: '',
          title: 'Meet the Leadership',
          desc: 'Concise, professional profiles',
          cta: 'View profiles',
          path: '/about/leadership',
          image: 'https://i.postimg.cc/fLkc10TL/davric-ceo2.jpg',
        },
        {
          eyebrow: '',
          title: "How We're Governed",
          desc: 'Board, policy and financial oversight',
          cta: 'Read more',
          path: '/about/governance',
          image: 'https://i.postimg.cc/nLWfFRC0/speaker-1.jpg',
        },
      ],
    },
  },
  {
    name: 'Our Work',
    path: '/our-work',
    mega: {
      intro: {
        title: 'Our Work',
        desc: 'Overview',
        path: '/our-work',
      },
      columns: [
        {
          heading: 'Programmes',
          links: [
            { name: 'Enterprise',  path: '/our-work/enterprise',  desc: 'Business growth, grants & jobs' },
            { name: 'Education',   path: '/our-work/education',   desc: 'Access, learning & opportunity' },
            { name: 'Agriculture', path: '/our-work/agriculture', desc: 'Food systems & livelihoods' },
            { name: 'Wellbeing',   path: '/our-work/wellbeing',   desc: 'Community health & resilience' },
          ],
        },
        {
          heading: 'Results & Stories',
          links: [
            { name: 'Impact',  path: '/impact',  desc: 'Numbers, outcomes & reports' },
            { name: 'Stories', path: '/stories', desc: 'Human stories and field updates' },
            { name: 'Gallery', path: '/gallery', desc: 'Curated visual documentation' },
          ],
        },
      ],
      features: [
        {
          eyebrow: 'Featured story',
          title: 'Where our entrepreneurs are now',
          cta: 'Read story',
          path: '/stories/where-our-entrepreneurs-are-now',
          image: 'https://i.postimg.cc/9X7wjsrL/equipment-1.jpg',
        },
      ],
    },
  },
  { name: 'Partners', path: '/partners' },
  { name: 'Contact',  path: '/contact' },
];

export const footerNav: NavColumn[] = [
  {
    heading: 'About',
    links: [
      { name: 'About OCHF', path: '/about' },
      { name: 'Our Story',  path: '/about/story' },
      { name: 'Leadership', path: '/about/leadership' },
      { name: 'Governance', path: '/about/governance' },
    ],
  },
  {
    heading: 'Our Work',
    links: [
      { name: 'Overview', path: '/our-work' },
      { name: 'Impact',   path: '/impact' },
      { name: 'Stories',  path: '/stories' },
      { name: 'Gallery',  path: '/gallery' },
    ],
  },
  {
    heading: 'More',
    links: [
      { name: 'Partners', path: '/partners' },
      { name: 'Contact',  path: '/contact' },
      { name: 'FAQ',      path: '/faq' },
      { name: 'Support',  path: '/support' },
    ],
  },
];
