import { createContext, useContext, useEffect } from 'react';

/**
 * Per-page title, description and share image.
 *
 * Each page calls `usePageMeta` once. At build time the values are collected during
 * the render and written into that page's HTML head, so search engines and link
 * previews (WhatsApp, LinkedIn, X) see the right title and picture. In the browser the
 * same call keeps the tab title and tags current as the visitor moves between pages.
 */

export const SITE_URL = 'https://ojerinkporofoundation.com';
export const SITE_NAME = 'Ojerinkporo Caring Hearts Foundation';
const DEFAULT_TITLE = `${SITE_NAME} | Enterprise, Education & Community`;
const DEFAULT_DESCRIPTION =
  'OCHF supports enterprise, education and communities in Nigeria through targeted programmes and partnerships.';
const DEFAULT_IMAGE = '/images/hero-grant.jpeg';

export interface PageMeta {
  title: string;
  description: string;
  image: string;
  path: string;
  noindex?: boolean;
}

/** Filled during a build-time render; absent in the browser. */
export const MetaCollector = createContext<{ path: string; meta?: PageMeta } | null>(null);

export function resolve(title?: string, description?: string, image?: string, path = '/'): PageMeta {
  return {
    // A title already containing "|" is a full title from the master file (Part 5) and is
    // used as written; anything else gets the foundation's name appended.
    title: title ? (title.includes('|') ? title : `${title} · ${SITE_NAME}`) : DEFAULT_TITLE,
    description: description?.trim() || DEFAULT_DESCRIPTION,
    image: image ? (/^https?:/.test(image) ? image : SITE_URL + image) : SITE_URL + DEFAULT_IMAGE,
    path,
  };
}

export function usePageMeta(title?: string, description?: string, image?: string, opts: { noindex?: boolean } = {}) {
  const collector = useContext(MetaCollector);
  const path = typeof window === 'undefined' ? '' : window.location.pathname;

  if (collector) {
    collector.meta = { ...resolve(title, description, image, collector.path), noindex: opts.noindex };
  }

  useEffect(() => {
    const m = resolve(title, description, image, window.location.pathname);
    document.title = m.title;
    const set = (selector: string, attr: string, value: string) => {
      document.head.querySelector(selector)?.setAttribute(attr, value);
    };
    set('meta[name="description"]', 'content', m.description);
    set('meta[property="og:title"]', 'content', m.title);
    set('meta[property="og:description"]', 'content', m.description);
    set('meta[property="og:url"]', 'content', SITE_URL + m.path);
    set('meta[property="og:image"]', 'content', m.image);
    set('meta[name="twitter:title"]', 'content', m.title);
    set('meta[name="twitter:description"]', 'content', m.description);
    set('meta[name="twitter:image"]', 'content', m.image);
    set('link[rel="canonical"]', 'href', SITE_URL + (m.path === '/' ? '/' : m.path.replace(/\/$/, '')));
  }, [title, description, image, path]);
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The head tags for one page, as written into its HTML at build time. */
export function headTags(m: PageMeta): string {
  const url = SITE_URL + (m.path === '/' ? '/' : m.path);
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    m.noindex ? '<meta name="robots" content="noindex" />' : '',
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(m.image)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(m.image)}" />`,
  ].filter(Boolean).join('\n    ');
}
