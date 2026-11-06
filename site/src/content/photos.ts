import { photo, type Photo } from '@/src/data/media';

/**
 * Outreach photographs served from /public/images/outreach, described from what each
 * one actually shows. Used for hero portraits and photo essays; every one is OCHF's own.
 */
export const outreach = {
  handover: {
    src: '/images/outreach/outreach-5023.jpg',
    alt: 'OCHF team handing over food, wheelchairs and household supplies during the 2026 outreach',
    credit: '2026 Outreach',
  },
  gathering: {
    src: '/images/outreach/outreach-5084.jpg',
    alt: 'Children seated under a tree at an OCHF outreach event',
    credit: '2026 Outreach',
  },
} satisfies Record<string, Photo>;

/** The four round portraits around the homepage hero. */
export const heroPortraits: Photo[] = [
  photo.grantRecipients,
  photo.educationStudents,
  outreach.handover,
  outreach.gathering,
];
