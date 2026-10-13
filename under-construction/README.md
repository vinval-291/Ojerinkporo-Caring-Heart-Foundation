# Under-construction page — ojerinkporofoundation.com

Shows a holding page to every visitor while the new website is built. The current
WordPress site is **not deleted or changed** — it stays installed and you can still
sign in at `/wp-admin`.

Hosting: Namecheap shared hosting (cPanel, LiteSpeed).

## Files

| File | Goes to |
|---|---|
| `index.html` | `public_html/under-construction/index.html` |
| `ochf-logo.png` | `public_html/under-construction/ochf-logo.png` |
| `htaccess-snippet.txt` | pasted into `public_html/.htaccess` (see step 4) |

## Steps (about 10 minutes)

**1. Back up WordPress first.** Namecheap cPanel → **Backup** (or **Softaculous → WordPress → Backup**).
Nothing below deletes anything, but take the backup before editing `.htaccess`.

**2. Open File Manager.** cPanel → **File Manager** → `public_html`.
Turn on **Settings → Show Hidden Files** so `.htaccess` is visible.

**3. Upload the page.** In `public_html`, create a folder named `under-construction`.
Upload `under-construction.zip` into it and **Extract**, or upload `index.html` and
`ochf-logo.png` individually. Check it at:
`https://ojerinkporofoundation.com/under-construction/index.html`

**4. Switch it on.** Right-click `public_html/.htaccess` → **Edit**.
Paste the whole of `htaccess-snippet.txt` at the **very top of the file**, above
`# BEGIN LSCACHE` and `# BEGIN WordPress`. Save.

**5. Clear the cache.** WordPress admin → **LiteSpeed Cache → Toolbox → Purge All**
(or cPanel → **LiteSpeed Web Cache Manager → Flush All**). Then open the homepage in a
private window — you should see the holding page on every address.

## To switch it off (at launch)

Edit `public_html/.htaccess` and delete everything from `# BEGIN OCHF under-construction`
to `# END OCHF under-construction`. Save and purge the cache.

## If something looks wrong

Remove the snippet from `.htaccess` — the WordPress site comes straight back. The
`.htaccess` edit is the only change that affects visitors.
