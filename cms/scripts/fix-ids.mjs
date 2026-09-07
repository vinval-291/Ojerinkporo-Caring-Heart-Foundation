/**
 * One-off migration: replace dots in document IDs with hyphens.
 *
 * WHY: Sanity treats a "." in a document ID as a path separator — the same mechanism
 * that makes "drafts.foo" private. Public read access is denied to any document under
 * a path, so IDs like "faq.1" and "programme.enterprise" were invisible to the website
 * even though the dataset is public. Only "siteSettings" (no dot) was readable.
 *
 * This copies each affected document to a hyphenated ID, preserving all content and
 * any edits made in the dashboard, then removes the original.
 *
 * Run:  cd cms && node scripts/fix-ids.mjs
 * Safe to re-run — documents already hyphenated are skipped.
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const token = process.env.SANITY_AUTH_TOKEN ||
  JSON.parse(readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8')).authToken;

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'essbj1jr',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
});

const TYPES = [
  'programme', 'impactMetric', 'milestone', 'story',
  'person', 'faq', 'galleryAlbum', 'partner',
];

const docs = await client.fetch(
  `*[_type in $types && !(_id in path("drafts.**"))]`,
  { types: TYPES },
);

const needsFix = docs.filter((d) => d._id.includes('.'));

if (needsFix.length === 0) {
  console.log('\n  Nothing to migrate — all document IDs are already public-readable.\n');
  process.exit(0);
}

console.log(`\n  Migrating ${needsFix.length} of ${docs.length} documents…\n`);

let tx = client.transaction();
const removing = [];

for (const doc of needsFix) {
  const newId = doc._id.replace(/\./g, '-');
  // Strip server-managed fields; the rest of the document carries over untouched.
  const { _id, _rev, _createdAt, _updatedAt, _system, ...content } = doc;
  void _id; void _rev; void _createdAt; void _updatedAt; void _system;

  tx = tx.createOrReplace({ ...content, _id: newId });
  removing.push(doc._id);
  console.log(`   ${doc._id}  ->  ${newId}`);
}

await tx.commit();

// Delete the originals only once the copies are committed.
let del = client.transaction();
for (const id of removing) del = del.delete(id);
await del.commit();

// Confirm the website can now see them without a token.
const anon = createClient({
  projectId: client.config().projectId,
  dataset: client.config().dataset,
  apiVersion: '2024-10-01',
  useCdn: false,
});
const visible = await anon.fetch(`count(*[_type in $types])`, { types: TYPES });

console.log(`\n  Done. ${visible} documents are now readable by the website.\n`);
