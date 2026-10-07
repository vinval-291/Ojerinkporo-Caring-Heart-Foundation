/**
 * Moves the content that still lives in code into Sanity, so the foundation can edit
 * it without a developer.
 *
 * What it does:
 *   1. Uploads the gallery photographs (currently on postimg.cc) and the local
 *      portraits into Sanity's asset store.
 *   2. Creates the gallery albums from those uploads.
 *   3. Fills in the two `person` records, which exist but hold no biography,
 *      portrait or group — which is why the Leadership page has been ignoring them.
 *
 * It is safe to run more than once. Documents are addressed by fixed ids and
 * patched, and an image already uploaded is matched by its filename rather than
 * uploaded again.
 *
 * Usage:
 *   1. sanity.io/manage -> OCHF -> API -> Tokens -> Add API token, Editor role
 *   2. Put it in cms/.env.local as SANITY_WRITE_TOKEN=... (that file is gitignored)
 *   3. node scripts/populate.mjs            # dry run, changes nothing
 *      node scripts/populate.mjs --write    # actually writes
 */

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '../..');
const WRITE = process.argv.includes('--write');

/* ----------------------------------------------------------------- config */

function readToken() {
  const envFile = resolve(here, '../.env.local');
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN;
  if (!existsSync(envFile)) return null;
  const line = readFileSync(envFile, 'utf8')
    .split(/\r?\n/)
    .find((l) => l.trim().startsWith('SANITY_WRITE_TOKEN='));
  return line ? line.split('=').slice(1).join('=').trim().replace(/^["']|["']$/g, '') : null;
}

const token = readToken();
if (!token) {
  console.error(
    'No SANITY_WRITE_TOKEN found.\n\n' +
    '  1. sanity.io/manage -> OCHF -> API -> Tokens -> Add API token (Editor)\n' +
    '  2. Add this line to cms/.env.local:\n\n' +
    '       SANITY_WRITE_TOKEN=your-token-here\n\n' +
    '  The file is gitignored, so the token stays on this machine.',
  );
  process.exit(1);
}

const client = createClient({
  projectId: 'essbj1jr',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token,
  useCdn: false,
});

/* ------------------------------------------------------------------ content */

const POSTIMG = (p) => `https://i.postimg.cc/${p}.jpg`;

const albums = [
  {
    _id: 'album-inauguration',
    title: 'Inauguration',
    slug: 'inauguration',
    year: '2024',
    description:
      'Documentation from the formal inauguration of the foundation — the arrival of guests, ' +
      'the addresses given, and the first grant awards and equipment handovers to entrepreneurs.',
    sets: [
      { name: 'Arrival of dignitaries and guests', images: [
        'gkLdxPvn/arrival-1', 'ZYM4Yqym/arrival-2', 'RhNm1k2M/arrival-3', 'gjnpyCQB/arrival-4',
        '76PwhGVL/arrival-5', 'Vvdw9xpF/arrival-6', 'CKgFy6nk/arrival-7', 'tgjX0mnX/arrival-8',
        'jSNsFr5g/arrival-9', 'bwbzBjJ4/arrival-10', 'X7tjLvVx/arrival-11', 'NfZsD0g4/arrival-12',
      ] },
      { name: 'Addresses by distinguished personnel', images: [
        'nLWfFRC0/speaker-1', 'Pq7nX3Pv/speaker-2', 'mrkGGf2k/speaker-3', 'wBMdd8TT/speaker-4',
        'hGvqqWPg/speaker-5', 'BvbGG9Q0/speaker-7', 'W12vXqBn/speaker-8', '2SzD2Ls4/speaker-9',
        'X7KWfkzN/speaker-10', 'xTGQv34n/speaker-11',
      ] },
      { name: 'Grant award presentations', images: [
        'Bbkj2cY1/presentation-1', 'nrCssw1y/presentation-2', 'bJYSPvSF/presentation-3',
        'hvfJJ3rB/presentation-4', 'Y92L7SLS/presentation-5', 'xd2bs505/presentation-7',
        'zGWgS61F/presentation-8', 'CKgfv7Fr/presentation-9',
      ] },
      { name: 'Equipment distribution to entrepreneurs', images: [
        '9X7wjsrL/equipment-1', 'T1gKq5z2/equipment-2', 'G2B8t5zy/equipment-3',
      ] },
    ],
  },
];

const people = [
  {
    match: 'Ikechukwu',
    name: 'Mr. Ikechukwu Agwu',
    role: 'Founder',
    group: 'founder',
    order: 1,
    portrait: null, // no local file; upload in Studio
    bio: [
      'Mr. Ikechukwu Agwu is the founder of Ojerinkporo Caring Hearts Foundation. He holds a ' +
      'degree in Pure and Applied Mathematics from the University of Ibadan, and has completed ' +
      'leadership and management programmes at Harvard University and other institutions ' +
      'internationally.',
      'He is Chief Executive of DAVRIC International Limited, which he built from a one-man ' +
      'startup in 2008 into an organisation of over 100 professionals.',
      'That operating experience shapes how OCHF is run. The foundation applies the same ' +
      'discipline it would apply to a business: fund what can grow, pair capital with support, ' +
      'and measure what actually happened.',
    ],
  },
  {
    match: 'Angela',
    name: 'Prof. Angela Unna Chukwu',
    role: 'Director of Programmes',
    group: 'leadership',
    order: 2,
    portrait: 'source/public/images/angela-chukwu.jpg',
    bio: [
      'Professor Angela Unna Chukwu is a Professor of Statistics at the University of Ibadan, ' +
      'Nigeria, specialising in biostatistics, mathematical statistics and demography. Her work ' +
      'applies statistical methods to public health, clinical research and the life sciences. ' +
      'She holds a B.Sc. in Mathematics from the University of Calabar and M.Sc. and Ph.D. ' +
      'degrees in Statistics from the University of Ibadan, and is a Fellow of the Royal ' +
      'Statistical Society.',
      'Through her work with the University of Ibadan Research Foundation and the ARISE Network, ' +
      'she has contributed to international research partnerships, public health initiatives and ' +
      'research capacity development across Africa. An educator and mentor, Professor Chukwu ' +
      'combines research with teaching and postgraduate supervision, supporting emerging scholars ' +
      'and advancing the use of statistics to address health and development challenges.',
    ],
  },
];

/* ------------------------------------------------------------------ helpers */

const blocks = (paragraphs) =>
  paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `p${i}`,
    style: 'normal',
    children: [{ _type: 'span', _key: `s${i}`, text }],
  }));

/** Assets already in the project, by original filename, so reruns do not duplicate. */
let existingAssets = new Map();
async function loadExistingAssets() {
  const rows = await client.fetch('*[_type=="sanity.imageAsset"]{_id, originalFilename}');
  existingAssets = new Map(rows.filter((r) => r.originalFilename).map((r) => [r.originalFilename, r._id]));
  console.log(`  ${existingAssets.size} image assets already in the project`);
}

async function uploadFromUrl(url, filename) {
  if (existingAssets.has(filename)) return existingAssets.get(filename);
  if (!WRITE) return `(would upload ${filename})`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload('image', buf, { filename });
  existingAssets.set(filename, asset._id);
  return asset._id;
}

async function uploadFromFile(relPath) {
  const full = resolve(repo, relPath);
  const filename = basename(full);
  if (existingAssets.has(filename)) return existingAssets.get(filename);
  if (!existsSync(full)) throw new Error(`missing file ${relPath}`);
  if (!WRITE) return `(would upload ${filename})`;
  const asset = await client.assets.upload('image', readFileSync(full), { filename });
  existingAssets.set(filename, asset._id);
  return asset._id;
}

const imageField = (assetId, alt) => ({
  _type: 'documentaryImage',
  _key: Math.random().toString(36).slice(2, 10),
  asset: { _type: 'reference', _ref: assetId },
  alt,
  credit: '',
});

/* --------------------------------------------------------------------- run */

async function main() {
  console.log(WRITE ? 'WRITING to Sanity\n' : 'DRY RUN — nothing will be written. Pass --write to apply.\n');
  await loadExistingAssets();

  console.log('\nPeople');
  const existingPeople = await client.fetch('*[_type=="person"]{_id, name}');
  for (const p of people) {
    const doc = existingPeople.find((d) => (d.name ?? '').includes(p.match));
    if (!doc) { console.log(`  ! no person record matching "${p.match}" — create it in Studio first`); continue; }
    const patch = { name: p.name, role: p.role, group: p.group, order: p.order, bio: blocks(p.bio) };
    if (p.portrait) {
      const assetId = await uploadFromFile(p.portrait);
      if (WRITE) patch.portrait = imageField(assetId, `Portrait of ${p.name}`);
      console.log(`  portrait: ${assetId}`);
    }
    if (WRITE) await client.patch(doc._id).set(patch).commit();
    console.log(`  ${WRITE ? 'patched' : 'would patch'} ${doc._id} -> ${p.name} (${p.group}, ${p.bio.length} paragraphs)`);
  }

  console.log('\nGallery albums');
  for (const a of albums) {
    const sets = [];
    let n = 0, failed = 0;
    for (const set of a.sets) {
      const images = [];
      for (const short of set.images) {
        const filename = `${basename(short)}.jpg`;
        try {
          const assetId = await uploadFromUrl(POSTIMG(short), filename);
          if (WRITE) images.push(imageField(assetId, `${set.name} — OCHF documentation`));
          n++;
        } catch (err) {
          failed++;
          console.log(`    ! ${filename}: ${err.message}`);
        }
      }
      sets.push({ _type: 'photoSet', _key: set.name.slice(0, 12).replace(/\W/g, ''), name: set.name, images });
    }
    if (WRITE) {
      await client.createOrReplace({
        _id: a._id, _type: 'galleryAlbum', title: a.title,
        slug: { _type: 'slug', current: a.slug }, year: a.year,
        description: a.description, sets, published: true,
      });
    }
    console.log(`  ${WRITE ? 'wrote' : 'would write'} ${a.title}: ${n} photographs${failed ? `, ${failed} failed` : ''}`);
  }

  console.log(WRITE
    ? '\nDone. Check Studio, then reload the site.'
    : '\nDry run complete. Rerun with --write to apply.');
}

main().catch((err) => { console.error('\nFailed:', err.message); process.exit(1); });
