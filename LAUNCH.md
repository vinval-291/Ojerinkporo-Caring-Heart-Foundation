# Going live on ojerinkporofoundation.com

Takes about 90 minutes. Steps 1–3 are reversible; from step 4 the public sees the
new site.

**Do not start this in the hour before the SMEDAN email goes out.** Leave a day
between launching and sending, so there is time to find what only shows up live.

## Before you begin

| | |
|---|---|
| Main domain today | Holding page on every address. WordPress still installed, `/wp-admin` works |
| Preview today | New site, but two builds behind, and `/api` returns 404 |
| The build to publish | `preview-deploy/ochf-preview-site.zip` — 5.3 MB |

---

## 1. Back up everything (15 min, do not skip)

cPanel → **Backup Wizard** → **Back Up** → **Full Backup**. Wait for the email.

Then, separately, cPanel → **Backup** → download:

- the **home directory** archive
- the **WordPress database** (SQL)

Download both to your laptop. A backup that only exists on the same server is not
a backup.

Nothing below deletes the database, but take it anyway.

---

## 2. Move WordPress out of the web root (10 min)

The new site and WordPress cannot both own `public_html`. WordPress rewrites every
unknown address to `index.php`; the new site needs them to reach `index.html`.
Leaving both in place produces a site that works until it doesn't.

Move it rather than delete it:

1. cPanel → **File Manager** → your **home directory** (not `public_html`)
2. Create a folder: `old-wordpress-2026-10`
3. Open `public_html`, **Select All**, then **Move** everything into that folder

   Exceptions — leave these where they are if present:
   - `.well-known` (SSL validation)
   - `cgi-bin`
   - the `api` folder, if cPanel has already made one

4. `public_html` should now be effectively empty

The files are kept, out of the web root so nothing serves them. The database is
untouched. To undo everything up to this point, move the files back.

---

## 3. Upload the new site (10 min)

1. File Manager → `public_html`
2. Upload `ochf-preview-site.zip` → right-click → **Extract** → delete the zip
3. You should see `index.html`, `assets/`, `images/`

Then create `public_html/.htaccess` — **New File**, name it `.htaccess`, edit, and
paste:

```apache
# BEGIN OCHF site
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# Leave the dashboard's server alone; the Node.js app answers there.
RewriteRule ^api(/|$) - [L]

# Serve real files and folders as they are.
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Every other address loads the site.
RewriteRule ^ /index.html [L]
</IfModule>

<IfModule mod_headers.c>
<FilesMatch "index\.html$">
Header set Cache-Control "no-cache"
</FilesMatch>
<FilesMatch "\.(js|css|jpe?g|png|webp|svg)$">
Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
</IfModule>
# END OCHF site
```

**There is no `noindex` here, unlike the preview.** This site is meant to be found.

The old under-construction block is gone with the rest of the WordPress files. If
you kept the old `.htaccess`, delete everything between
`# BEGIN OCHF under-construction` and `# END OCHF under-construction`.

---

## 4. Tell Sanity about the new domain (5 min) — **easy to forget, breaks quietly**

**sanity.io/manage** → OCHF → **API** → **CORS origins** → **Add origin**, twice:

```
https://ojerinkporofoundation.com
https://www.ojerinkporofoundation.com
```

Leave "Allow credentials" off.

Without this the site still loads and looks right, but every figure, story and
programme silently comes from the copy baked into the code instead of the CMS.
Editing content would then change nothing, with no error shown. It is the single
most likely thing to go wrong on launch day.

---

## 5. Move the dashboard's server across (10 min)

cPanel → **Setup Node.js App** → edit the existing app:

| Field | Change to |
|---|---|
| Application URL | `ojerinkporofoundation.com` / `api` |

Leave the application root (`ochf-admin-api`), the startup file and both
environment variables as they are. **Save**, then **Restart**.

### If Restart fails with `FileNotFoundError: .../api/.htaccess`

This already happened once on the preview. cPanel keeps its Passenger directives
in an `api/.htaccess` inside the document root, and an upload deleted it.

1. File Manager → `public_html` → **Settings → Show Hidden Files**
2. Create a folder `api`, and inside it an empty file named `.htaccess`
3. Restart the app again

Then check **https://ojerinkporofoundation.com/api/health** — you want
`{"ok":true,"service":"ochf-admin-api"}`.

**From now on, never delete `public_html/api` when updating the site.** Only
`index.html`, `assets` and `images`.

---

## 6. HTTPS and www (10 min)

1. cPanel → **SSL/TLS Status** → tick the domain **and** `www` → **Run AutoSSL**
2. Wait for both to show a valid certificate

Then force one canonical address. The site's own `canonical` and `og:url` tags say
**non-www**, so redirect www to it. Add at the very top of `public_html/.htaccess`,
above `# BEGIN OCHF site`:

```apache
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

---

## 7. Check it (15 min)

Open a **private window** — your browser has the old site cached.

- [ ] `ojerinkporofoundation.com` shows the new homepage
- [ ] The impact figures read **₦250M+ · 100+ · 200+ · 36+ · 70+** and count up
- [ ] `/our-work/community` loads **when typed directly and refreshed** — proves the rewrite works
- [ ] `/gallery` → Inauguration and 2026 Outreach open
- [ ] `/stories` → the Quarterly Business Growth Grant story opens, no "Story not found"
- [ ] `/admin` signs in with the cPanel `ADMIN_PASSWORD`
- [ ] `www.` redirects to non-www, and `http://` to `https://`
- [ ] The whole site on a **real phone**, not a resized window

**The CMS check that matters:** change a figure in `/admin`, reload the homepage,
confirm it changed, change it back. If it does not change, step 4 was missed.

---

## 8. Tell Google (5 min)

- **search.google.com/search-console** → add the property → submit `https://ojerinkporofoundation.com/`
- The preview keeps its `noindex`, so the two will not compete

---

## Afterwards

**Keep the preview.** It is where changes get checked before they reach the public
site. Put its Directory Privacy password back on — it is currently open to anyone
with the link.

**Automate the deploys.** `preview-deploy/AUTO-DEPLOY.md` sets up GitHub Actions.
Copy the workflow to `deploy-live.yml`, point it at `main` and `public_html`, and
publishing becomes a push instead of a 5.3 MB upload through File Manager. Keep
`.htaccess` and `api/**` in the exclude list.

**Leave WordPress alone for a month.** If nothing has needed it by then, delete
`old-wordpress-2026-10` and the database — but only once you have checked your
downloaded backup actually opens.

---

## If it goes wrong

Nothing here is one-way.

| Problem | Fix |
|---|---|
| Site badly broken | Move the WordPress files back into `public_html`, delete the new `.htaccess`. Old site returns |
| Pages 404 on refresh | `.htaccess` missing or wrong — re-paste step 3 |
| Figures or stories look stale or empty | Sanity CORS — step 4 |
| `/admin` says its server is unavailable | `/api/health` is not returning JSON — step 5 |
| Old site still showing | LiteSpeed cache: cPanel → **LiteSpeed Web Cache Manager** → **Flush All**, then a private window |
