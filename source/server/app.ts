/**
 * Standalone server for the admin API, for hosting that runs Node.js apps
 * (Namecheap cPanel "Setup Node.js App", which uses Phusion Passenger).
 *
 * It wraps the same handler Vercel and the Vite dev server use (api/admin.ts), so the
 * dashboard behaves identically everywhere. Built into a single file with no
 * dependencies to install: `npm run build:api`.
 *
 * Required environment variables (set in the cPanel app form, never in files):
 *   ADMIN_PASSWORD      password the foundation signs in with
 *   SANITY_WRITE_TOKEN  Sanity API token with the Editor role
 *   NODE_ENV=production (cPanel sets this when the app mode is "Production")
 */

import http from 'node:http';
import { handleAdmin, type AdminRequest } from '../api/admin';

/** Largest request accepted. Photos are sent base64-encoded, which adds about a third. */
const MAX_BODY = 20 * 1024 * 1024;

const server = http.createServer(async (req, res) => {
  const send = (status: number, body: unknown, cookie?: string) => {
    if (res.headersSent) return;
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    if (cookie) res.setHeader('Set-Cookie', cookie);
    res.end(JSON.stringify(body));
  };

  const path = (req.url ?? '/').split('?')[0];

  // Lets you check the app is running by opening /api/health in a browser.
  if (req.method === 'GET' && path.endsWith('/health')) {
    return send(200, { ok: true, service: 'ochf-admin-api' });
  }

  if (req.method !== 'POST') return send(405, { error: 'POST only' });

  const chunks: Buffer[] = [];
  let size = 0;
  try {
    for await (const chunk of req) {
      size += (chunk as Buffer).length;
      if (size > MAX_BODY) return send(413, { error: 'That upload is too large. Please use a smaller image.' });
      chunks.push(chunk as Buffer);
    }
  } catch {
    return send(400, { error: 'The request was interrupted. Please try again.' });
  }

  let body: AdminRequest;
  try {
    body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
  } catch {
    return send(400, { error: 'The request was not valid.' });
  }

  try {
    const result = await handleAdmin(body, req.headers.cookie);
    send(result.status, result.body, result.setCookie);
  } catch (err) {
    console.error('[ochf-admin-api]', err);
    send(500, { error: 'Something went wrong on the server.' });
  }
});

// Passenger supplies the port; the fallback is for running it locally.
server.listen(Number(process.env.PORT) || 3001, () => {
  console.log('[ochf-admin-api] running');
});
