/**
 * Sanity client and queries.
 *
 * The site works with or without the CMS connected. Until VITE_SANITY_PROJECT_ID is
 * set, `cmsEnabled` is false and every page falls back to the local data in src/data/.
 * That means connecting the CMS is a configuration change, not a redeploy of logic —
 * and the site is never broken by a CMS outage.
 */

import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? '';
const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'production';

export const cmsEnabled = Boolean(projectId);

export const client: SanityClient | null = cmsEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-10-01',
      // CDN in production for speed; direct reads in development so an edit in the
      // studio shows up on the next fetch instead of waiting on a cached response.
      useCdn: !import.meta.env.DEV,
      // Published content only — drafts stay invisible to the public site.
      perspective: 'published',
    })
  : null;

/**
 * Subscribe to content changes. Sanity pushes an event whenever a document is
 * published, so the site can refresh itself without anyone reloading the page.
 * Returns an unsubscribe function.
 */
export function onContentChange(cb: () => void): () => void {
  if (!client) return () => {};
  const sub = client
    .listen('*[!(_id in path("drafts.**"))]', {}, { visibility: 'query', events: ['mutation'] })
    .subscribe({
      next: cb,
      error: (err) => console.error('[cms] live updates stopped', err),
    });
  return () => sub.unsubscribe();
}

const builder = client ? imageUrlBuilder(client) : null;

/**
 * Build a resized image URL. Sanity generates these on demand, so a 4MB camera
 * original uploaded by the client is served at the size the page actually needs.
 */
export function imageUrl(source: unknown, width = 1200, height?: number) {
  if (!builder || !source) return '';
  let url = builder.image(source as never).width(width).auto('format').fit('max');
  if (height) url = url.height(height).fit('crop');
  return url.url();
}

/* ------------------------------------------------------------------ queries */

/** Common image projection — resolves the asset plus our alt/credit fields. */
const IMAGE = `{ ..., "url": asset->url, alt, credit }`;

export const queries = {
  settings: `*[_type == "siteSettings"][0]{
    name, short, tagline, intro, address, location, email, phones, social,
    seoDescription, "logoUrl": logo.asset->url, "shareImageUrl": shareImage.asset->url
  }`,

  programmes: `*[_type == "programme"] | order(order asc){
    name, "slug": slug.current, tag, summary, order,
    modelTitle, terms, panels, applicationUrl, applicationOpen, applicationDeadline,
    image ${IMAGE}
  }`,

  programme: `*[_type == "programme" && slug.current == $slug][0]{
    name, "slug": slug.current, tag, summary, seoDescription,
    modelTitle, terms, panels, applicationUrl, applicationOpen, applicationDeadline,
    image ${IMAGE}
  }`,

  /**
   * Only verified figures carry their value. Unverified ones return value as null so
   * the component renders the placeholder rule — the honesty rule enforced in the query
   * itself, not left to the template.
   */
  impactMetrics: `*[_type == "impactMetric"] | order(order asc){
    label, period, status, prefix, suffix, placement, order,
    "value": select(status == "verified" => value, null),
    "pillar": pillar->name
  }`,

  milestones: `*[_type == "milestone"] | order(year asc){ year, body }`,

  /** Published, and only where consent has been recorded. */
  stories: `*[_type == "story" && published == true && consent == true] | order(date desc){
    title, "slug": slug.current, category, date, standfirst, image ${IMAGE}
  }`,

  story: `*[_type == "story" && slug.current == $slug && published == true && consent == true][0]{
    title, "slug": slug.current, category, date, standfirst, body, image ${IMAGE}
  }`,

  people: `*[_type == "person"] | order(order asc){
    name, role, group, quote, expertise, bio, portrait ${IMAGE}
  }`,

  /** Permissioned logos only. */
  partners: `*[_type == "partner" && permission == true] | order(order asc){
    name, url, category, "logoUrl": logo.asset->url, "alt": logo.alt
  }`,

  faqs: `*[_type == "faq"] | order(order asc){ question, answer }`,

  albums: `*[_type == "galleryAlbum" && published == true]{
    title, "slug": slug.current, year, description,
    sets[]{ name, images[] ${IMAGE} }
  }`,
};

/**
 * Fetch helper that never throws into the UI. If the CMS is unreachable or not yet
 * configured, it returns the fallback so the page still renders.
 */
export async function fetchCms<T>(query: string, fallback: T, params: Record<string, unknown> = {}): Promise<T> {
  if (!client) return fallback;
  try {
    const result = await client.fetch<T>(query, params);
    return result ?? fallback;
  } catch (err) {
    console.error('[cms] fetch failed, using local content', err);
    return fallback;
  }
}
