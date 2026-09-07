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
  heroGrant: {
    src: 'https://i.postimg.cc/9X7wjsrL/equipment-1.jpg',
    credit: 'OCHF Photography — Entrepreneurship grant recipients, Ebonyi State',
    alt: 'Grant recipients receiving business equipment at an OCHF distribution',
  },
  workshopFloor: {
    src: 'https://i.postimg.cc/T1gKq5z2/equipment-2.jpg',
    credit: "OCHF Photography — Grant recipient's workshop floor",
    alt: 'Equipment provided to a funded business through the Entrepreneurship Grant Programme',
  },
  chequePresentation: {
    src: 'https://i.postimg.cc/Bbkj2cY1/presentation-1.jpg',
    credit: 'OCHF Photography — Grant award presentation',
    alt: 'An OCHF grant being formally presented to a recipient',
  },
  chequeDetail: {
    src: 'https://i.postimg.cc/bJYSPvSF/presentation-3.jpg',
    credit: 'OCHF Photography — Grant award presentation',
    alt: 'Grant recipients at an OCHF award ceremony',
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

/** Full inauguration archive, used by the Gallery page. */
export const galleryAlbums = [
  {
    id: 'inauguration',
    title: 'Inauguration of Ojerinkporo Caring Hearts Foundation',
    year: '2024',
    description:
      'Documentation from the formal inauguration of the foundation — the arrival of guests, ' +
      'the addresses given, and the first grant awards and equipment handovers to entrepreneurs.',
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
];

/** postimg paths above are stored short; expand them for use. */
export const img = (path: string) => `https://i.postimg.cc/${path}.jpg`;
