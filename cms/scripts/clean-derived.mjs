/**
 * Removes fields that were written into documents by mistake.
 *
 * The admin API's read query computes `imageUrl`, `portraitUrl` and `logoUrl` from the
 * image assets. An early version of the save handler wrote those straight back, so some
 * documents now carry fields that are not in the schema — which is what Sanity Studio
 * reports as "Unknown fields found".
 *
 * The save handler no longer does this. This script cleans up what it already wrote.
 * Safe to re-run; it only unsets the listed fields and touches nothing else.
 *
 *   cd cms && node scripts/clean-derived.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const STRAY = ['imageUrl', 'portraitUrl', 'logoUrl'];

function token() {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN;
  const cfg = JSON.parse(readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'));
  if (!cfg.authToken) throw new Error('No token found. Run `npx sanity login` first.');
  return cfg.authToken;
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'essbj1jr',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2024-10-01',
  token: token(),
  useCdn: false,
});

// Drafts carry the same pollution, so match both.
const query = `*[${STRAY.map((f) => `defined(${f})`).join(' || ')}]{ _id, _type }`;

const affected = await client.fetch(query);

if (affected.length === 0) {
  console.log('\n  Nothing to clean — no documents carry those fields.\n');
  process.exit(0);
}

console.log(`\n  Cleaning ${affected.length} document(s):`);
for (const d of affected) console.log(`    ${d._type.padEnd(16)} ${d._id}`);

const tx = affected.reduce((t, d) => t.patch(d._id, (p) => p.unset(STRAY)), client.transaction());
await tx.commit();

console.log('\n  Done. Reload the Studio and the warning will be gone.\n');
