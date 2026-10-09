/**
 * Every image used on the site.
 *
 * Client directive: "All pictures should be of real work we have done (no foreign kids)."
 * Accordingly this file contains ONLY OCHF's own documentary photography. All Unsplash
 * stock and picsum.photos placeholders from the previous build have been removed.
 *
 * These still resolve from postimg.cc, which is a free host with no availability
 * guarantee. Run `bash export/download-media.sh` to archive them, then change
 * `BASE` to '/images' and drop the full URLs for filenames.
 *
 * CMS NOTE: replaced by asset references once a CMS is in place.
 */

export interface Photo {
  src: string;
  /** Documentary caption shown over the image, per the visual guide. */
  credit: string;
  alt: string;
}

export const photo = {
  /* Supplied by OCHF and served from /public/images, so these four do not depend on
     postimg.cc. Captions follow the launch brief: who, what, where, in a few words,
     with no "OCHF Photography —" prefix. */
  heroGrant: {
    src: '/images/hero-grant.jpeg',
    credit: 'Entrepreneurship grant recipients, Ebonyi State',
    alt: 'Grant recipients receiving business equipment at an OCHF distribution',
  },
  storyOne: {
    src: '/images/story-1.jpeg',
    credit: 'Business Growth Grant recipient',
    alt: 'An OCHF grant recipient at their business',
  },
  storyTwo: {
    src: '/images/story-2.jpeg',
    credit: 'Business Growth Grant recipient',
    alt: 'An OCHF grant recipient at their business',
  },
  storyThree: {
    src: '/images/story-3.jpeg',
    credit: 'Business Growth Grant recipient',
    alt: 'An OCHF grant recipient at their business',
  },
  angelaChukwu: {
    src: '/images/angela-chukwu.jpg',
    credit: '',
    alt: 'Portrait of Professor Angela Unna Chukwu, Director of Programmes',
  },
  /* Supplied as an 11.3 MB, 3600px PNG. Resized to 1600px and converted to JPEG —
     209 KB — because the largest it is ever drawn is a half-width card. */
  educationStudents: {
    src: '/images/education-students.jpg',
    credit: 'Students supported through OCHF scholarships',
    alt: 'Students supported through the OCHF education programme',
  },
  workshopFloor: {
    src: 'https://i.postimg.cc/T1gKq5z2/equipment-2.jpg',
    credit: "OCHF Photography — Grant recipient's workshop floor",
    alt: 'Equipment provided to a funded business through the Entrepreneurship Grant Programme',
  },
  // The two grant-presentation photos (presentation-1, presentation-3) no longer load
  // from postimg.cc and rendered as empty grey boxes. These keys now point at
  // photographs confirmed to load, with captions describing what is actually shown.
  // Restore the originals once they are re-uploaded to the CMS.
  chequePresentation: {
    src: 'https://i.postimg.cc/nLWfFRC0/speaker-1.jpg',
    credit: 'OCHF Photography — Programme address',
    alt: 'A speaker addressing attendees at an OCHF programme event',
  },
  chequeDetail: {
    src: 'https://i.postimg.cc/G2B8t5zy/equipment-3.jpg',
    credit: 'OCHF Photography — Equipment handover to funded businesses',
    alt: 'Business equipment handed over to entrepreneurs',
  },
  equipmentHandover: {
    src: 'https://i.postimg.cc/G2B8t5zy/equipment-3.jpg',
    credit: 'OCHF Photography — Equipment handover to funded businesses',
    alt: 'Business equipment handed over to entrepreneurs',
  },
  keynote: {
    src: 'https://i.postimg.cc/nLWfFRC0/speaker-1.jpg',
    credit: 'OCHF Photography — Programme address',
    alt: 'A speaker addressing attendees at an OCHF programme event',
  },
  keynoteAlt: {
    src: 'https://i.postimg.cc/X7KWfkzN/speaker-10.jpg',
    credit: 'OCHF Photography — Programme address',
    alt: 'Distinguished guest speaking at an OCHF event',
  },
  guests: {
    src: 'https://i.postimg.cc/gkLdxPvn/arrival-1.jpg',
    credit: 'OCHF Photography — Foundation inauguration',
    alt: 'Guests arriving at the OCHF inauguration ceremony',
  },
  founder: {
    src: 'https://i.postimg.cc/fLkc10TL/davric-ceo2.jpg',
    credit: '',
    alt: 'Portrait of the founder of Ojerinkporo Caring Hearts Foundation',
  },
} satisfies Record<string, Photo>;

/**
 * Gallery albums.
 *
 * The Gallery opens on album covers rather than one long list of photographs, so a
 * reader chooses what to look at instead of scrolling past everything.
 *
 * An album with no photographs is not rendered. The launch brief's rule is "hide it,
 * do not fake it" — an empty card advertising a gallery that does not exist costs
 * more credibility than a shorter page. Add images below and the album appears.
 */
export interface GalleryAlbum {
  id: string;
  title: string;
  year: string;
  description: string;
  /** postimg path used as the album's cover. Falls back to its first photograph. */
  cover?: string;
  sets: { name: string; images: string[] }[];
}

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: 'inauguration',
    title: 'Inauguration',
    year: '2024',
    description:
      'Documentation from the formal inauguration of the foundation — the arrival of guests, ' +
      'the addresses given, and the first grant awards and equipment handovers to entrepreneurs.',
    // Client's choice: the fourth photograph under Grant award presentations.
    cover: 'hvfJJ3rB/presentation-4',
    sets: [
      {
        name: 'Arrival of dignitaries and guests',
        images: [
          'gkLdxPvn/arrival-1', 'ZYM4Yqym/arrival-2', 'RhNm1k2M/arrival-3',
          'gjnpyCQB/arrival-4', '76PwhGVL/arrival-5', 'Vvdw9xpF/arrival-6',
          'CKgFy6nk/arrival-7', 'tgjX0mnX/arrival-8', 'jSNsFr5g/arrival-9',
          'bwbzBjJ4/arrival-10', 'X7tjLvVx/arrival-11', 'NfZsD0g4/arrival-12',
        ],
      },
      {
        name: 'Addresses by distinguished personnel',
        images: [
          'nLWfFRC0/speaker-1', 'Pq7nX3Pv/speaker-2', 'mrkGGf2k/speaker-3',
          'wBMdd8TT/speaker-4', 'hGvqqWPg/speaker-5', 'BvbGG9Q0/speaker-7',
          'W12vXqBn/speaker-8', '2SzD2Ls4/speaker-9', 'X7KWfkzN/speaker-10',
          'xTGQv34n/speaker-11',
        ],
      },
      {
        name: 'Grant award presentations',
        images: [
          'Bbkj2cY1/presentation-1', 'nrCssw1y/presentation-2', 'bJYSPvSF/presentation-3',
          'hvfJJ3rB/presentation-4', 'Y92L7SLS/presentation-5', 'xd2bs505/presentation-7',
          'zGWgS61F/presentation-8', 'CKgfv7Fr/presentation-9',
        ],
      },
      {
        name: 'Equipment distribution to entrepreneurs',
        images: ['9X7wjsrL/equipment-1', 'T1gKq5z2/equipment-2', 'G2B8t5zy/equipment-3'],
      },
    ],
  },

  /* Awaiting photographs from OCHF. Each stays hidden until its `images` array has
     entries — nothing empty reaches the page. Drop the files into
     source/public/images/ and list them as '/images/<name>.jpeg', or add postimg
     paths in the same short form as above. */
  {
    id: 'beneficiaries-2026',
    title: '2026 Beneficiaries',
    year: '2026',
    description:
      'The businesses funded under the 2026 Annual Grant, and what the awards were put towards.',
    sets: [{ name: 'Beneficiaries', images: [] }],
  },
  {
    id: 'outreach-2026',
    title: '2026 Outreach',
    year: '2026',
    description:
      'Community outreach carried out through the year, and the people and places it reached.',
    // Client's choice of cover.
    cover: '/images/outreach/outreach-5023.jpg',
    sets: [
      {
        name: 'Outreach',
        images: [
          '/images/outreach/outreach-4946.jpg', '/images/outreach/outreach-4951.jpg',
          '/images/outreach/outreach-4977.jpg', '/images/outreach/outreach-4989.jpg',
          '/images/outreach/outreach-5012.jpg', '/images/outreach/outreach-5016.jpg',
          '/images/outreach/outreach-5020.jpg', '/images/outreach/outreach-5023.jpg',
          '/images/outreach/outreach-5061.jpg', '/images/outreach/outreach-5069.jpg',
          '/images/outreach/outreach-5070.jpg', '/images/outreach/outreach-5083.jpg',
          '/images/outreach/outreach-5084.jpg', '/images/outreach/outreach-5089.jpg',
          '/images/outreach/outreach-5093.jpg', '/images/outreach/outreach-5159.jpg',
        ],
      },
    ],
  },
];

/** Albums with at least one photograph. Everything else stays off the page. */
export const populatedAlbums = () =>
  galleryAlbums.filter((a) => a.sets.some((s) => s.images.length > 0));

/** An album's cover: the chosen one, or its first photograph. */
export const albumCover = (a: GalleryAlbum) =>
  a.cover ?? a.sets.flatMap((s) => s.images)[0];

export const albumCount = (a: GalleryAlbum) =>
  a.sets.reduce((n, s) => n + s.images.length, 0);

/**
 * postimg paths above are stored short; expand them for use.
 *
 * Anything that is already a URL or a local path is returned untouched, so CMS
 * albums (full cdn.sanity.io URLs) and the code archive can be rendered by the
 * same component while the photographs are moved across.
 */
export const img = (path: string) =>
  /^(https?:)?\/\//.test(path) || path.startsWith('/')
    ? path
    : `https://i.postimg.cc/${path}.jpg`;
