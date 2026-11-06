/**
 * Admin API — the only path by which the dashboard writes to Sanity.
 *
 * SECURITY: the Sanity write token lives here, server-side, and never reaches the
 * browser. A token in client JavaScript can be read by anyone who opens devtools and
 * would let them rewrite the whole site, so the dashboard holds no credentials — it
 * calls these actions and this file does the writing.
 *
 * Runs as a Vercel serverless function in production and through a Vite dev middleware
 * locally (see vite.config.ts), so the same code serves both.
 */

import { createClient } from '@sanity/client';
import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'essbj1jr';
const DATASET = process.env.SANITY_STUDIO_DATASET || 'production';

/** Document types the dashboard is allowed to touch. Anything else is refused. */
const WRITABLE = new Set([
  'siteSettings', 'programme', 'impactMetric', 'milestone',
  'story', 'person', 'faq', 'galleryAlbum', 'partner',
  'programmeRecord', 'publication', 'grantApplication', 'newsletterSubscriber',
]);

/* ------------------------------------------------------------------ secrets */

function writeToken(): string {
  if (process.env.SANITY_WRITE_TOKEN) return process.env.SANITY_WRITE_TOKEN;
  // Local development: fall back to the token `sanity login` already stored.
  try {
    const cfg = JSON.parse(readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'));
    if (cfg.authToken) return cfg.authToken;
  } catch { /* fall through */ }
  throw new Error('No Sanity write token. Set SANITY_WRITE_TOKEN, or run `npx sanity login` locally.');
}

/** Secret used to sign session cookies. */
function sessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'ochf-dev-secret';
}

function adminPassword(): string | null {
  return process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === 'production' ? null : 'ochf-dev');
}

/* -------------------------------------------------------------- slugs */

/** Types whose website URL comes from a slug, and the field it derives from. */
const SLUG_SOURCE: Record<string, string> = {
  programme: 'name',
  story: 'title',
  galleryAlbum: 'title',
};

const slugify = (s: string) =>
  s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);

/**
 * Give a document a URL if it hasn't got one. Without this, anything created in the
 * dashboard is invisible on the website — the pages look items up by slug.
 * An existing slug is never overwritten, so published URLs stay stable.
 */
function ensureSlug(doc: Record<string, unknown>): Record<string, unknown> {
  const source = SLUG_SOURCE[String(doc._type)];
  if (!source) return doc;

  const existing = (doc.slug as { current?: string } | undefined)?.current;
  if (existing) return doc;

  const base = slugify(String(doc[source] ?? ''));
  if (!base) return doc;

  return { ...doc, slug: { _type: 'slug', current: base } };
}

/**
 * Fields the read queries compute for the dashboard's convenience, plus Sanity's own
 * system fields. None of them belong in a stored document.
 *
 * Without this, a read-then-save round trip writes `imageUrl` and friends back into the
 * document, and Sanity Studio then reports "Unknown fields found" because they are not
 * in the schema.
 */
const FILE_FIELDS = ['businessPlan', 'financials', 'cacCertificate', 'letter1', 'letter2', 'otherDocument'];
const DERIVED = new Set(['imageUrl', 'portraitUrl', 'logoUrl', 'fileUrl', ...FILE_FIELDS.map((f) => `${f}Url`), '_createdAt', '_updatedAt', '_rev']);
/** Download links for an application's documents, for the dashboard. */
const FILE_URLS = FILE_FIELDS.map((f) => `"${f}Url": ${f}.asset->url`).join(', ');

function stripDerived(doc: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(doc).filter(([k]) => !DERIVED.has(k)));
}

/** Transient network blips are common; one retry turns most of them into a success. */
async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    const transient = /fetch failed|ECONNRESET|ETIMEDOUT|ENOTFOUND|socket hang up|network/i.test(msg);
    if (!transient) throw err;
    await new Promise((r) => setTimeout(r, 900));
    return fn();
  }
}

const sanity = () => createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-10-01',
  token: writeToken(),
  useCdn: false,
});

/* ------------------------------------------------------------------ session */

const DAY = 86_400_000;

function sign(payload: string): string {
  return createHmac('sha256', sessionSecret()).update(payload).digest('hex');
}

function makeSession(): string {
  const payload = `${Date.now() + 7 * DAY}.${randomBytes(8).toString('hex')}`;
  return `${payload}.${sign(payload)}`;
}

function validSession(cookie?: string): boolean {
  const raw = cookie?.split(';').map((c) => c.trim()).find((c) => c.startsWith('ochf_admin='))?.slice(11);
  if (!raw) return false;
  const idx = raw.lastIndexOf('.');
  if (idx < 0) return false;
  const payload = raw.slice(0, idx);
  const mac = raw.slice(idx + 1);
  const expected = sign(payload);
  if (mac.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return false;
  return Number(payload.split('.')[0]) > Date.now();
}

/* ----------------------------------------------------------------- handlers */

export interface AdminRequest {
  action: string;
  payload?: Record<string, unknown>;
}

export interface AdminResult {
  status: number;
  body: unknown;
  setCookie?: string;
}

/* ------------------------------------------------- grant applications (public) */

/**
 * The public grant application form posts here without a session. It is the only
 * public write path, so it is narrow on purpose:
 *
 *  - It accepts submissions only while the Enterprise round is open, using the same rule
 *    as the website: "Applications are open now" ticked and no closing date passed.
 *  - Uploads are PDFs only (checked by their first bytes), 5 MB each.
 *  - Each address is rate-limited, and a hidden field and a minimum fill time catch bots.
 *  - Applications are stored under an `applications.` id. Sanity never serves documents
 *    whose id contains a dot to unauthenticated readers, so applicants' details stay
 *    private even though the website's dataset is public. Only the dashboard reads them.
 */

const MAX_PDF = 5 * 1024 * 1024;
const hits = new Map<string, number[]>();

/** True if this address has made more than `limit` calls of `kind` in the last hour. */
function limited(kind: string, ip: string, limit: number): boolean {
  const key = `${kind}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 3_600_000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > limit;
}

async function roundIsOpen(client: ReturnType<typeof sanity>): Promise<boolean> {
  const p = await client.fetch<{ applicationOpen?: boolean; applicationDeadline?: string } | null>(
    `*[_type == "programme" && slug.current == "enterprise"][0]{ applicationOpen, applicationDeadline }`,
  );
  if (!p?.applicationOpen) return false;
  if (!p.applicationDeadline) return true;
  return new Date(`${p.applicationDeadline}T23:59:59+01:00`).getTime() >= Date.now();
}

/** Document fields on the application, and which of them are required. */
const APPLICATION_TEXT: [string, number, boolean][] = [
  // [field, max length, required]
  ['fullName', 120, true], ['email', 160, true], ['phone', 40, true], ['gender', 40, false],
  ['state', 60, true], ['businessName', 160, true], ['cacNumber', 60, true], ['sector', 80, true],
  ['stage', 60, true], ['location', 120, true], ['useOfFunds', 3000, true], ['jobsPlan', 3000, true],
];
const APPLICATION_FILES: [string, boolean][] = [
  ['businessPlan', true], ['financials', true], ['cacCertificate', true],
  ['letter1', true], ['letter2', true], ['otherDocument', false],
];

async function handleApplication(action: string, payload: Record<string, unknown>, ip: string): Promise<AdminResult> {
  const client = sanity();
  const closed = { status: 403, body: { error: 'Applications for this round are closed.' } };

  if (action === 'apply-upload') {
    if (limited('upload', ip, 20)) return { status: 429, body: { error: 'Too many uploads. Please try again in an hour.' } };
    if (!(await roundIsOpen(client))) return closed;
    const b64 = String(payload.data ?? '').replace(/^data:[^;]+;base64,/, '');
    const filename = String(payload.filename ?? 'document.pdf').slice(0, 120);
    const buffer = Buffer.from(b64, 'base64');
    if (!buffer.length) return { status: 400, body: { error: 'No file was received.' } };
    if (buffer.length > MAX_PDF) return { status: 413, body: { error: `${filename} is larger than 5 MB.` } };
    if (!/\.pdf$/i.test(filename) || buffer.subarray(0, 5).toString('latin1') !== '%PDF-') {
      return { status: 400, body: { error: `${filename} is not a PDF. Please upload PDF documents only.` } };
    }
    const asset = await withRetry(() => client.assets.upload('file', buffer, { filename, contentType: 'application/pdf' }));
    return { status: 200, body: { assetId: asset._id } };
  }

  // action === 'apply'
  if (limited('apply', ip, 5)) return { status: 429, body: { error: 'Too many applications from this connection. Please try again later.' } };
  if (String(payload.website ?? '')) return { status: 200, body: { reference: 'OCHF-RECEIVED' } }; // bot: say nothing
  const started = Number(payload.startedAt ?? 0);
  if (!started || Date.now() - started < 20_000) {
    return { status: 400, body: { error: 'Please take a moment to complete the form before sending it.' } };
  }
  if (!(await roundIsOpen(client))) return closed;

  const doc: Record<string, unknown> = { _type: 'grantApplication' };
  for (const [field, max, required] of APPLICATION_TEXT) {
    const value = String(payload[field] ?? '').trim().slice(0, max);
    if (required && !value) return { status: 400, body: { error: 'Please complete every required field.' } };
    if (value) doc[field] = value;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(doc.email))) {
    return { status: 400, body: { error: 'Please give a valid email address.' } };
  }
  const employees = Number(payload.employees);
  if (Number.isFinite(employees) && employees >= 0) doc.employees = Math.round(employees);
  const amount = Number(payload.amountRequested);
  if (Number.isFinite(amount) && amount > 0) doc.amountRequested = Math.round(amount);

  for (const k of ['citizen', 'accurate', 'consent']) {
    if (payload[k] !== true) return { status: 400, body: { error: 'Please confirm each declaration.' } };
    doc[k] = true;
  }

  const files = (payload.files ?? {}) as Record<string, unknown>;
  for (const [field, required] of APPLICATION_FILES) {
    const id = String(files[field] ?? '');
    if (!id) {
      if (required) return { status: 400, body: { error: 'Please attach every required document.' } };
      continue;
    }
    if (!/^file-[a-f0-9]+-pdf$/.test(id)) return { status: 400, body: { error: 'A document could not be attached. Please upload it again.' } };
    doc[field] = { _type: 'file', asset: { _type: 'reference', _ref: id } };
  }

  const year = new Date().getFullYear();
  const reference = `OCHF-${year}-${randomBytes(3).toString('hex').toUpperCase()}`;
  await withRetry(() => client.create({
    ...doc,
    _id: `applications.${randomBytes(12).toString('hex')}`,
    reference,
    receivedAt: new Date().toISOString(),
    status: 'New',
  } as never));
  return { status: 201, body: { reference } };
}

/**
 * Newsletter sign-up from the footer. One record per address: the id is derived from the
 * address, so signing up twice changes nothing. Stored under `subscribers.`, which the
 * public dataset never serves, so the list is readable only in the dashboard.
 */
async function handleSubscribe(payload: Record<string, unknown>, ip: string): Promise<AdminResult> {
  if (limited('subscribe', ip, 10)) return { status: 429, body: { error: 'Too many sign-ups from this connection. Please try again later.' } };
  const ok = { status: 200, body: { ok: true } };
  if (String(payload.website ?? '')) return ok; // bot: say nothing
  const email = String(payload.email ?? '').trim().toLowerCase().slice(0, 160);
  if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(email)) return { status: 400, body: { error: 'Please enter a valid email address.' } };
  const page = String(payload.page ?? '').slice(0, 120);
  const id = `subscribers.${createHmac('sha256', 'ochf-newsletter').update(email).digest('hex').slice(0, 32)}`;
  const client = sanity();
  await withRetry(() => client.createIfNotExists({
    _id: id, _type: 'newsletterSubscriber', email, page, status: 'Subscribed', subscribedAt: new Date().toISOString(),
  } as never));
  // Someone who unsubscribed and signs up again is subscribed again.
  await withRetry(() => client.patch(id).set({ status: 'Subscribed' }).commit());
  return ok;
}

export async function handleAdmin(
  req: AdminRequest,
  cookieHeader: string | undefined,
  meta: { ip?: string } = {},
): Promise<AdminResult> {
  const { action, payload = {} } = req;

  /* ---- public: the grant application form ---- */

  if (action === 'apply' || action === 'apply-upload') {
    try {
      return await handleApplication(action, payload, meta.ip ?? 'unknown');
    } catch (err) {
      console.error('[apply]', action, err instanceof Error ? err.message : err);
      return { status: 502, body: { error: 'We could not receive that just now. Please try again in a few minutes.' } };
    }
  }

  if (action === 'subscribe') {
    try {
      return await handleSubscribe(payload, meta.ip ?? 'unknown');
    } catch (err) {
      console.error('[subscribe]', err instanceof Error ? err.message : err);
      return { status: 502, body: { error: 'We could not add you just now. Please try again in a few minutes.' } };
    }
  }

  /* ---- unauthenticated ---- */

  if (action === 'login') {
    const expected = adminPassword();
    if (!expected) {
      return { status: 500, body: { error: 'ADMIN_PASSWORD is not set on the server.' } };
    }
    const given = String(payload.password ?? '');
    const ok = given.length === expected.length &&
      timingSafeEqual(Buffer.from(given), Buffer.from(expected));
    if (!ok) return { status: 401, body: { error: 'That password is not right.' } };

    return {
      status: 200,
      body: { ok: true },
      setCookie: `ochf_admin=${makeSession()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 86400}${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
    };
  }

  if (action === 'me') {
    return { status: 200, body: { signedIn: validSession(cookieHeader) } };
  }

  if (action === 'logout') {
    return {
      status: 200,
      body: { ok: true },
      setCookie: 'ochf_admin=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
    };
  }

  /* ---- everything below requires a session ---- */

  if (!validSession(cookieHeader)) {
    return { status: 401, body: { error: 'Please sign in again.' } };
  }

  const client = sanity();

  try {
    switch (action) {
      /** Read documents of a type, drafts included, so the dashboard shows work in progress. */
      case 'list': {
        const type = String(payload.type ?? '');
        if (!WRITABLE.has(type)) return { status: 400, body: { error: `Unknown type: ${type}` } };
        const docs = await client.fetch(
          `*[_type == $type] | order(coalesce(order, 999) asc, _createdAt desc){
             ..., "imageUrl": image.asset->url, "portraitUrl": portrait.asset->url,
             "logoUrl": logo.asset->url, "fileUrl": file.asset->url, ${FILE_URLS}
           }`,
          { type },
        );
        return { status: 200, body: { docs } };
      }

      case 'get': {
        const id = String(payload.id ?? '');
        const doc = await client.fetch(
          `*[_id == $id][0]{ ..., "imageUrl": image.asset->url,
             "portraitUrl": portrait.asset->url, "logoUrl": logo.asset->url, "fileUrl": file.asset->url, ${FILE_URLS} }`,
          { id },
        );
        return { status: 200, body: { doc } };
      }

      /** Create or update. Publishes directly — the dashboard has its own draft flag. */
      case 'save': {
        const doc = payload.doc as Record<string, unknown>;
        const type = String(doc?._type ?? '');
        if (!WRITABLE.has(type)) return { status: 400, body: { error: `Cannot write type: ${type}` } };

        // The id comes from the dashboard so that retrying after a dropped connection
        // updates the same record instead of creating a second copy.
        const id = String(doc._id ?? `${type}-${Date.now().toString(36)}`);
        const withSlug = ensureSlug({ ...stripDerived(doc), _id: id, _type: type });
        const saved = await withRetry(() => client.createOrReplace(withSlug as never));
        return { status: 200, body: { doc: saved } };
      }

      case 'delete': {
        const id = String(payload.id ?? '');
        if (!id) return { status: 400, body: { error: 'No id given.' } };
        await client.delete(id);
        return { status: 200, body: { ok: true } };
      }

      /** Upload an image (or, with kind 'file', a PDF), returning an asset reference to attach. */
      case 'upload': {
        const b64 = String(payload.data ?? '').replace(/^data:[^;]+;base64,/, '');
        const filename = String(payload.filename ?? 'upload.jpg');
        if (!b64) return { status: 400, body: { error: 'No file data received.' } };

        const buffer = Buffer.from(b64, 'base64');
        if (buffer.length > 12 * 1024 * 1024) {
          return { status: 413, body: { error: 'That file is larger than 12MB.' } };
        }

        const kind = payload.kind === 'file' ? 'file' : 'image';
        // A PDF is checked by its signature bytes, not just its name.
        if (kind === 'file' && (!/\.pdf$/i.test(filename) || buffer.subarray(0, 5).toString('latin1') !== '%PDF-')) {
          return { status: 400, body: { error: 'Only PDF documents can be uploaded here.' } };
        }
        const asset = await withRetry(() => kind === 'file'
          ? client.assets.upload('file', buffer, { filename, contentType: 'application/pdf' })
          : client.assets.upload('image', buffer, { filename }));
        return { status: 200, body: { assetId: asset._id, url: asset.url } };
      }

      default:
        return { status: 400, body: { error: `Unknown action: ${action}` } };
    }
  } catch (err) {
    const raw = err instanceof Error ? err.message : 'Something went wrong.';
    console.error('[admin]', action, raw);

    // "fetch failed" is Node's wording for a dropped connection — meaningless to an
    // editor. Say what happened and what to do about it.
    const message = /fetch failed|ECONNRESET|ETIMEDOUT|ENOTFOUND|socket hang up|network/i.test(raw)
      ? 'Could not reach the content server — your internet connection may have dropped. ' +
        'Your changes are still on screen; press Save again.'
      : raw;

    return { status: 500, body: { error: message } };
  }
}

/* ----------------------------------------------------- Vercel entry point */

export default async function handler(req: never, res: never) {
  // Typed loosely so this file needs no @vercel/node dependency.
  const request = req as unknown as {
    method?: string; body?: unknown; headers: Record<string, string | undefined>;
  };
  const response = res as unknown as {
    status: (n: number) => { json: (b: unknown) => void };
    setHeader: (k: string, v: string) => void;
  };

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'POST only' });
  }

  const body = typeof request.body === 'string' ? JSON.parse(request.body) : (request.body ?? {});
  const result = await handleAdmin(body as AdminRequest, request.headers.cookie);

  if (result.setCookie) response.setHeader('Set-Cookie', result.setCookie);
  response.status(result.status).json(result.body);
}
