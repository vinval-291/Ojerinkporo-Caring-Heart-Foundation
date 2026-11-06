# OCHF website — `site/`

The rebuilt public website for Ojerinkporo Caring Hearts Foundation, in the "green
and welcoming" direction. It replaces `source/` and keeps everything that must not
change:

- the same Sanity CMS, queries and fallback content (`src/lib/sanity.ts`, `src/data/`)
- the `/admin` dashboard and its server (`src/admin/`, `api/`, `server/`), unchanged
- every address and redirect (`/faq` → `/contact#faq`, `/donate` → `/support`, …)
- the photographs in `public/images/`

What is new: every page is designed afresh, and every page is written as finished
HTML at build time with its own title, description and share image, so search engines
and WhatsApp / LinkedIn / X previews see the right page.

## Commands

```bash
npm ci               # install
npm run dev          # local development on http://localhost:3000 (dashboard works here)
npm run lint         # typecheck
npm run build        # browser bundle + renderer + one HTML file per page, into dist/
node scripts/serve-dist.mjs   # serve dist/ the way the server's .htaccess does, on :4173
npm run build:api    # rebuild the dashboard's Node app into ../preview-deploy/ochf-admin-api
```

`npm run build` needs `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` (in
`.env.local` locally, repository variables in GitHub). Without them the pages are
built from the fallback content in `src/data/`.

## How content stays live

Each page is built with the CMS content of that moment. When a visitor opens it, the
browser fetches the CMS again and listens for publishes, so an edit in the dashboard
still appears within seconds, without a rebuild. A rebuild only matters for what
search engines and link previews see, and for a **new story or new person**, whose
page file does not exist until the next build (the address still works before then;
it is rendered in the browser).

If the browser cannot reach the CMS, the page keeps the content it was built with.

## The one server change: `.htaccess`

Inner pages are written to `dist/_pages/` (`/about/story` → `_pages/about/story.html`),
so no file or folder collides with a real address. Add these lines to **both**
`.htaccess` files (live `public_html` and the preview folder), directly **above** the
existing "Serve real files and folders as they are" block:

```apache
# Serve the prebuilt HTML for each page: /about/story -> /_pages/about/story.html
RewriteCond %{REQUEST_URI} !^/(api|_pages|assets|images)(/|$)
RewriteCond %{DOCUMENT_ROOT}/_pages/$1.html -f
RewriteRule ^(.+?)/?$ /_pages/$1.html [L]
```

And, anywhere in the file, so unknown addresses get a proper 404 page:

```apache
ErrorDocument 404 /404.html
```

Without these lines nothing breaks: every address falls back to `index.html` and the
page is rendered in the browser, exactly as the current site works. With them, each
address is served its own finished HTML.

The `.htaccess` files live on the server, not in this repository, and the deploy
excludes them, so they must be edited in cPanel's File Manager.

## Switching the deploy from `source/` to `site/`

Done: both `deploy-preview.yml` and `deploy-live.yml` now build `site/`. The live site
changes only when `redesign` is merged into `main`. Before that merge, paste
`preview-deploy/live-htaccess.txt` into `public_html/.htaccess`.

## Institutional content (added after the content review)

New in the CMS, each editable in `/admin` and in Sanity Studio:

| Where in the dashboard | What it holds | Where it appears |
|---|---|---|
| Foundation details → Core values | Approved values, each with a sentence | About |
| Foundation details → Objectives | Approved objectives | About |
| Foundation details → Registration details | Legal form, body, number | About, Governance, Resources, footer |
| Programme records (new) | Each past intervention: where, when, who it reached, outcomes, photo, quotation | Impact, and the matching programme page |
| Publications (new) | Annual reports, programme reports, impact summaries, documents (PDF) | Resources (`/resources`), Governance |
| People → "Shown under: board" | Trustees | Leadership (Board of Trustees), Governance |

Every one of these stays off the website until it has content. A record's "who it
reached" shows only once "figures checked" is ticked, and a quotation only once
consent is ticked — the same honesty rules as the impact figures. The Resources link
appears in the menu and footer only once a publication is published.

Programmes are counted, not assumed: add a fourth programme in the dashboard and every
"Three pillars" heading reads "Four pillars", with no code change.

**To make the new types editable** (one-off):

1. Studio: `cd cms && npx sanity deploy` (publishes the new schemas to the hosted Studio).
2. Dashboard server: `cd site && npm run build:api`, then upload
   `preview-deploy/ochf-admin-api/app.js` to the Node app in cPanel and restart it.
   Until then the live dashboard will refuse the two new types.

## Grant application form

`src/components/GrantApplication.tsx` — a three-step dialog (about you, your business,
documents and declarations). It pops up a moment after a visitor arrives, at most once
every two weeks per browser, and opens from the Grants page's Apply button. It exists
only while the Enterprise programme's **"Applications are open now"** toggle is ticked in
the dashboard, until the closing date if one is set. Untick it and the form disappears
everywhere, and the server refuses any application still in flight.

Where applications go: the dashboard's server (`api/content.ts`, actions `apply-upload`
and `apply`) uploads each PDF and stores the application in Sanity under an
`applications.…` id. Sanity never serves such ids to the public, so applicants' details
are readable only in `/admin` → **Grant applications** (and in Studio). Each applicant
gets a reference number such as `OCHF-2026-3F9A1C`.

Protection: PDFs only (checked by content, 5 MB each), a hidden spam field, a minimum
fill time, and per-address limits (20 uploads and 5 applications an hour).

**To switch it on** (one-off):

1. `cd site && npm run build:api`, upload `preview-deploy/ochf-admin-api/app.js` to the
   Node app in cPanel and restart it. Until then the form shows "the application service
   is not available" when submitted.
2. `cd cms && npx sanity deploy` so Studio shows the new "Grant applications" list.
3. In `/admin` → Programmes → Enterprise, set a **closing date** (the master file asks for
   one, and it stops the form automatically when the round ends).
4. Submit one test application end to end, find it in the dashboard, then delete it.

Uploaded PDFs are Sanity file assets: private in practice (long unguessable addresses),
but not access-controlled. Do not ask applicants for documents more sensitive than these.

## Newsletter and privacy policy

- **Newsletter** — the sign-up band at the top of the footer. Addresses go to the dashboard's
  server (action `subscribe`), stored under a private `subscribers.` id, one record per address.
  Read them in `/admin` → **Newsletter subscribers**; set someone to *Unsubscribed* when they ask.
  The site does not send email: export the list into your mailing tool when you send a newsletter.
  Needs the current `app.js` on the server (`npm run build:api`, upload, stop/start).
- **Privacy policy** — `/privacy` (`src/pages/Privacy.tsx`), linked from the footer, the
  newsletter, the contact form and the grant application. It describes only what the site does.
  Have it reviewed against the Nigeria Data Protection Act 2023 before launch, and change
  `UPDATED` in that file whenever the text changes.

## Real 404s

`preview-deploy/preview-htaccess.txt` and `live-htaccess.txt` serve each prebuilt page, send
old addresses on with a 301, let the browser draw only the dashboard and newly published
stories, people and programmes, and answer everything else with `404.html` and a 404 status.
The deploy never uploads `.htaccess`, so paste the new block in cPanel's File Manager.

## The master file

The approved wording from *OCHF Website Master File* (2 November 2026) lives in
`src/content/copy.ts`, one export per section, with the master file's section number
beside each. Anything the master file still marks `[CONFIRM]` is not on the site; add it
to `copy.ts` (or the CMS) once OCHF confirms it.

Rules built into the code rather than left to editors:

- Only verified figures with a value are shown; an unverified figure is left out.
- A grant round reads as open only when "Applications are open now" is ticked **and** a
  closing date that has not passed is set. Otherwise: "Applications closed", no Apply button.
- "Infrastructure" always displays as "Community Infrastructure".
- A milestone containing "pending verification" is never shown.
- The homepage stories row needs two published stories; the Impact stories grid needs three.

**CMS content that conflicts with the master file** (edit in `/admin`; code cannot fix it):

- FAQ: replace the 12 entries with the master file's answers (4.10). The current
  "Where does the foundation work?" answer says "across Nigeria" and another states ₦1M–₦3M.
- Enterprise programme: the "terms" figure reads ₦1M–₦3M and the summary says "catalytic
  funding". The website now shows the master file's copy instead, but the CMS still holds them.
- Enterprise "Applications are open now" is ticked with no closing date. Untick it, or add
  the closing date and application link if a round really is open.
- Impact figures: rename "Jobs created" to "Jobs reported by supported businesses" (Part 7),
  and move students and communities off the homepage (placement) per 4.1.
- People: both biographies use "empowerment" (a stop word in Part 8). They are the people's
  own approved text, so they are unchanged; ask each person whether to revise.

## Still open for OCHF

- Approved wording for core values and objectives, the registration details, trustees'
  names and biographies, documented programme records, and the reports to publish.
- Whether Health & Wellbeing and Humanitarian & Social Welfare become programmes. The
  reviewer asked for them; OCHF's earlier instruction was three pillars only. The site
  supports either — it is a CMS decision, not a code change.
- Mission and vision: the site's wording differs from the launch brief's ("To expand
  access to the capital, education and community resources people need to build
  better futures" / "A Nigeria where opportunity is not limited by circumstance").
  The site's wording is unchanged until OCHF confirms which is approved.

- The 2026 grant range: the homepage flagship says ₦2M–₦3M; About, Apply, the
  Enterprise grant model and the FAQ say ₦1M–₦3M. Each is shown as stored.
- "catalytic funding" is still in the Enterprise summary in the CMS.
- No registration number has been supplied, so the footer prints none.
