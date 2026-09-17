import { siteSettings, submission } from './settings';
import { programme } from './programme';
import { impactMetric, milestone } from './impact';
import { documentaryImage, story, person, faq } from './editorial';
import { galleryAlbum, partner } from './media';

export const schemaTypes = [
  // shared object types first
  documentaryImage,

  // documents
  siteSettings,
  programme,
  impactMetric,
  milestone,
  story,
  person,
  faq,
  galleryAlbum,
  partner,
  submission,
];
