# OCHF content dashboard

A private dashboard where the foundation adds and edits events, programmes, stories,
photographs, impact figures and contact details. The website reads from it.

Built on [Sanity](https://www.sanity.io) — hosted, so there is no server to maintain and
no database to back up.

---

## Setting it up (once, about 20 minutes)

**1. Create the project**

```bash
cd cms
npm install
npx sanity login          # sign in with Google or GitHub
npx sanity init --create-project "OCHF" --dataset production
```

That prints a **project ID**. Copy it.

**2. Point the studio and the website at it**

In `cms/sanity.config.ts`, replace `REPLACE_WITH_PROJECT_ID` with the project ID.

In `source/`, copy `.env.example` to `.env.local` and fill it in:

```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

**3. Load the current website content**

```bash
cd cms
npm run seed
```

This writes the foundation details, four programmes, six impact figures, three
milestones, the founder profile, thirteen questions and three story drafts into the CMS.
Safe to re-run — it updates rather than duplicates.

**4. Open the dashboard**

```bash
npm run dev          # http://localhost:3333
```

**5. Put it online**

```bash
npm run deploy       # gives you ochf.sanity.studio
```

Then invite the client at [sanity.io/manage](https://www.sanity.io/manage) → Members.
Give her the **Editor** role — she can change content but not project settings.

---

## What she sees

The sidebar is organised the way the foundation thinks about the website, not the way the
database is structured:

| Section | What it holds |
|---|---|
| **Programmes** | Enterprise, Education, Agriculture, Wellbeing — summary, grant model, eligibility, application link |
| **Stories & updates** | Field stories and news, with a publish toggle |
| **Photo albums** | Uploaded photographs grouped into sections |
| **Impact figures** | Split into *Awaiting verification* and *Published* |
| **Milestones** | The dated history shown on Impact and Our Story |
| **People** | Founder, leadership team, trustees |
| **Partners** | Partner organisations and logos |
| **Questions & answers** | The FAQ list |
| **Enquiries** | Messages from the website's contact form |
| **Foundation details** | Name, address, phone, email, social links |

Drag-and-drop image upload, draft/publish, and full version history — any edit can be
rolled back.

---

## Three rules built into the schema

These enforce the site's editorial standards at the source, so they cannot be
accidentally bypassed by whoever is editing.

**1. Unverified numbers never publish.**
Every impact figure has a verification status. The website's query only returns the
value when status is `verified` — otherwise the page shows the label and reporting
period with "pending verification". The old site animated *10,000+ lives impacted* with
nothing behind it; this makes that impossible.

**2. Stories need consent.**
A story publishes only when both *Published* and *Do we have permission* are ticked. The
old site paired named beneficiary testimonials with random stock faces.

**3. Partner logos need written permission.**
A partner appears only when the permission box is ticked, per the visual guide's rule of
real, permissioned logos only.

Alt text on photographs is also required, which is how the accessibility gaps in the old
build are prevented from returning.

---

## How the website uses it

`source/src/content/ContentProvider.tsx` fetches everything once on load and supplies it
to the pages. If the CMS is unconfigured, unreachable, or slow, pages fall back to the
local content in `source/src/data/` — **the website cannot be broken by a CMS problem.**

That also means you can develop and deploy the site before the CMS exists. Connecting it
is a configuration change, not a code change.

---

## Photographs — do this early

The old site hot-linked 62 images from `postimg.cc`, a free host. Two have already
disappeared, and the gallery page fails wholesale when it requests 33 at once because the
host throttles. **None of the foundation's photography exists anywhere else.**

```bash
bash export/download-media.sh    # from the project root
```

That archives what still resolves into `public/images/`. Upload those into **Photo
albums** in the studio. Sanity then serves them from its own CDN, resized on demand — a
4MB camera original uploaded by the client is delivered at the size the page needs.

---

## Cost

The free tier covers a site this size comfortably — several editors, ample asset storage
and bandwidth. Check current limits at [sanity.io/pricing](https://www.sanity.io/pricing)
before committing.

---

## Still to wire

- **Contact form → Enquiries.** The `submission` schema exists and the Enquiries inbox is
  in the sidebar, but the form currently opens the user's mail client. Connecting it needs
  a small serverless function with a write token (a browser must never hold one).
- **Search visibility.** The site is client-rendered, so search engines and link previews
  still see an empty page. Moving to Next.js or adding prerendering fixes both, and the
  CMS layer is written to survive that move unchanged.
