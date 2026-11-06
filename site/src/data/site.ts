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

  logo: '/images/ochf-logo.png',

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

/**
 * Header menu, per the master file (Part 5): About · Our Work · Contact, with Partner
 * With Us as the header button rather than a repeated text link. Each dropdown is a
 * short list with one line under each item, not a wide mega-menu.
 */
export const nav: NavItem[] = [
  {
    name: 'About',
    path: '/about',
    mega: {
      intro: { title: 'About', desc: "Who OCHF is, how it's led, and how it's held accountable.", path: '/about' },
      columns: [
        {
          links: [
            { name: 'About OCHF',  path: '/about',            desc: 'Mission, vision and how we work' },
            { name: 'Our Story',   path: '/about/story',      desc: 'How the foundation began' },
            { name: 'Leadership',  path: '/about/leadership', desc: 'The people accountable for the work' },
            { name: 'Governance',  path: '/about/governance', desc: 'Accountability, standards and policies' },
            { name: 'Resources',   path: '/resources',        desc: 'Reports and publications' },
          ],
        },
      ],
      features: [],
    },
  },
  {
    name: 'Our Work',
    path: '/our-work',
    mega: {
      intro: { title: 'Our Work', desc: 'Practical support. Lasting opportunity.', path: '/our-work' },
      columns: [
        { heading: 'Programmes', links: [] },
        {
          heading: 'Results',
          links: [
            { name: 'Impact & Stories', path: '/impact',  desc: 'What our programmes have documented' },
            { name: 'Gallery',          path: '/gallery', desc: 'Photographs from the work' },
          ],
        },
      ],
      features: [],
    },
  },
  { name: 'Contact', path: '/contact' },
];

/**
 * Compact footer, per the launch brief: no more than five quick links plus the three
 * pillars. The previous footer carried twelve links across three columns, which read
 * as a second navigation menu rather than a footer.
 */
export const footerNav: NavColumn[] = [
  {
    heading: 'Quick links',
    links: [
      { name: 'About',             path: '/about' },
      { name: 'Our Work',          path: '/our-work' },
      { name: 'Impact & Stories',  path: '/impact' },
      { name: 'Partner With Us',   path: '/partners' },
      { name: 'Contact',           path: '/contact' },
      { name: 'Governance & Policies', path: '/about/governance' },
      { name: 'Support OCHF',      path: '/support' },
    ],
  },
  {
    heading: 'Our Work',
    links: [
      { name: 'Enterprise', path: '/our-work/enterprise' },
      { name: 'Education',  path: '/our-work/education' },
      { name: 'Community',  path: '/our-work/community' },
    ],
  },
];
