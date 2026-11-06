/**
 * Writes every public page as finished HTML.
 *
 * Runs after `vite build` (the browser bundle) and `vite build --ssr` (the renderer).
 * Content is fetched from the CMS once, each address is rendered with it, and the
 * result is written with that page's own title, description and share image, plus
 * the content itself so the browser can pick up where the HTML left off.
 *
 * Where the files go:
 *   /            → dist/index.html
 *   /about/story → dist/_pages/about/story.html
 *
 * Inner pages live under _pages/ so no file or folder collides with a real address.
 * The server's .htaccess serves /about/story from _pages/about/story.html (see
 * HTACCESS.md). Without that rule every address still works exactly as before: the
 * server falls back to index.html and the app renders the page in the browser.
 *
 *   node scripts/prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dist = resolve(here, '../dist');
const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

const { render, loadContent, personSlug } = await import(
  pathToFileURL(resolve(here, '../dist-ssr/entry-server.js')).href
);

const content = await loadContent();
console.log(`  content: ${content.fromCms ? 'from the CMS' : 'WARNING: CMS incomplete or unreachable, some pages use the local fallback'}`);

const fixed = [
  '/', '/about', '/about/story', '/about/leadership', '/about/governance',
  '/our-work', '/impact', '/stories', '/gallery',
  '/partners', '/support', '/contact', '/resources', '/our-work/enterprise/grants', '/privacy',
];

/* Leadership falls back to the two profiles held in code when the CMS has none. */
const people = content.people.length
  ? content.people.map((p) => personSlug(p.name))
  : ['ikechukwu-agwu', 'angela-unna-chukwu'];

const routes = [
  ...fixed,
  ...content.programmes.map((p) => `/our-work/${p.slug}`),
  ...content.stories.filter((s) => !s.draft).map((s) => `/stories/${s.slug}`),
  ...people.map((slug) => `/about/leadership/${slug}`),
];

/** JSON inside a <script> must not be able to close the tag. */
const safeJson = (v) => JSON.stringify(v).replace(/</g, '\\u003c').replace(/[\u2028\u2029]/g, '');

rmSync(resolve(dist, '_pages'), { recursive: true, force: true });

let written = 0;
for (const path of [...new Set(routes)]) {
  const { html, head } = render(path, content);
  const page = template
    .replace(/<!--head-->[\s\S]*?<!--\/head-->/, head)
    .replace('<!--app-->', html)
    .replace('<!--state-->', `<script>window.__OCHF__=${safeJson({ path, content })}</script>`);

  const file = path === '/' ? resolve(dist, 'index.html') : resolve(dist, '_pages', `${path.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page);
  written++;
}

// A 404 page for the server to use as its error document.
const { html: nf, head: nfHead } = render('/__not-found__', content);
writeFileSync(resolve(dist, '404.html'), template
  .replace(/<!--head-->[\s\S]*?<!--\/head-->/, nfHead)
  .replace('<!--app-->', nf)
  .replace('<!--state-->', ''));

console.log(`  prerendered ${written} pages`);
