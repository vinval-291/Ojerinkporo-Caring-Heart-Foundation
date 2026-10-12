/**
 * Writes public/sitemap.xml.
 *
 * The fixed pages are listed here; programme and story addresses come from the CMS,
 * because those are the ones that change. If the CMS cannot be reached the fixed
 * pages are still written — a sitemap missing a story is far better than no sitemap,
 * and the build must not fail because Sanity had a bad minute.
 *
 *   node scripts/sitemap.mjs
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://ojerinkporofoundation.com';
const PROJECT = 'essbj1jr';
const DATASET = 'production';
const here = dirname(fileURLToPath(import.meta.url));

/** [path, priority, changefreq] */
const fixed = [
  ['/',                   '1.0', 'weekly'],
  ['/about',              '0.9', 'monthly'],
  ['/about/story',        '0.6', 'yearly'],
  ['/about/leadership',   '0.8', 'monthly'],
  ['/about/governance',   '0.6', 'yearly'],
  ['/our-work',           '0.9', 'monthly'],
  ['/impact',             '0.9', 'weekly'],
  ['/stories',            '0.8', 'weekly'],
  ['/gallery',            '0.6', 'monthly'],
  ['/partners',           '0.8', 'monthly'],
  ['/support',            '0.7', 'monthly'],
  ['/support/apply',      '0.6', 'monthly'],
  ['/contact',            '0.7', 'yearly'],
];

async function cms(query) {
  const url = `https://${PROJECT}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()).result ?? [];
}

const urls = [...fixed];

try {
  const programmes = await cms('*[_type=="programme"]{"slug":slug.current}');
  for (const p of programmes) if (p.slug) urls.push([`/our-work/${p.slug}`, '0.8', 'monthly']);

  const stories = await cms('*[_type=="story" && published==true && consent==true]{"slug":slug.current}');
  for (const s of stories) if (s.slug) urls.push([`/stories/${s.slug}`, '0.7', 'monthly']);

  console.log(`  ${programmes.length} programmes, ${stories.length} stories from the CMS`);
} catch (err) {
  console.log(`  CMS unreachable (${err.message}) — writing the fixed pages only`);
}

const today = new Date().toISOString().slice(0, 10);
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(([path, priority, freq]) =>
    `  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${today}</lastmod>\n` +
    `    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`),
  '</urlset>',
  '',
].join('\n');

const out = resolve(here, '../public/sitemap.xml');
writeFileSync(out, xml);
console.log(`  wrote ${urls.length} addresses to public/sitemap.xml`);
