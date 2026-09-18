/**
 * Where the dashboard talks to its server. Shared by the browser code and the Vite dev
 * middleware so the two can never drift apart.
 *
 * It must not contain the word "admin". Namecheap's LiteSpeed has a brute-force rule
 * that intercepts `POST /api/admin` and answers with an HTML "429 Too Many Requests"
 * page of its own — the request never reaches the app at all. The dashboard, seeing
 * HTML where data should be, reported its server as unavailable.
 *
 * On Vercel this must match the filename of the function (api/content.ts).
 */
export const ADMIN_ENDPOINT = '/api/content';
