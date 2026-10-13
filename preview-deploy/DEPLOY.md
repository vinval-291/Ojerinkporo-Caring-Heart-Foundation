# Preview site — preview.ojerinkporofoundation.com

Private, password-protected copy of the new website for you and the client to review.
The main domain keeps showing the under-construction page.

## Files

| File | What it is |
|---|---|
| `ochf-preview-site.zip` | The built website: `index.html` and an `assets` folder |
| `preview-htaccess.txt` | Makes page links work and keeps Google out |

## First-time setup

**1. Password-protect the folder first.**
cPanel → **Directory Privacy** → open the `preview.ojerinkporofoundation.com` folder →
tick **Password protect this directory** → name it (e.g. "OCHF preview") → Save →
create a username and password.

This creates a `.htaccess` file in that folder containing the password lines.

**2. Upload the site.**
cPanel → **File Manager** → open the `preview.ojerinkporofoundation.com` folder.
Upload `ochf-preview-site.zip` → right-click → **Extract** → then delete the zip.
You should now see `index.html` and an `assets` folder next to `.htaccess`.

**3. Add the routing rules.**
Turn on **Settings → Show Hidden Files**. Right-click `.htaccess` → **Edit**.
Leave the existing password lines exactly as they are. Paste the whole of
`preview-htaccess.txt` **below** them. Save.

**4. Turn on HTTPS.**
cPanel → **SSL/TLS Status** → tick the preview subdomain → **Run AutoSSL**.
Until it finishes, use `http://preview.ojerinkporofoundation.com`.

**5. Test in a private window.**
Open the preview address → enter the username and password → the homepage appears.
Then open `/our-work/community` directly and refresh — it should load, not show a 404.

## Updating the preview later

1. In File Manager, delete `index.html`, the `assets` folder and the `images` folder.
   **Nothing else.** Leave `.htaccess` and the `api` folder exactly where they are.

   `api/` belongs to cPanel. "Setup Node.js App" keeps its Passenger directives in
   `api/.htaccess`, not in the root `.htaccess`. Deleting it unmounts the dashboard's
   server, and cPanel then cannot even Stop the app — Restart fails with
   `FileNotFoundError: .../api/.htaccess`. Recover by recreating the `api` folder with
   an empty `.htaccess` inside it, then Restart.
2. Upload the new `ochf-preview-site.zip` and extract it.
3. Reload the preview, with a hard refresh (Ctrl+Shift+R) the first time.

`images/` holds OCHF's own photographs and the logo. It is new as of October 2026;
earlier builds pulled those from postimg.cc, which lost files twice.

The zip never contains a `.htaccess`, so updating cannot remove the password protection.

## Sharing with the client

Send the address plus the username and password (not in the same message if you can
help it). They can sign in from any browser or phone.

## Known limitations on this hosting

- `/admin` works once the Node.js app is set up — see `NODE-SETUP.md`.
- The dashboard talks to `/api/content`, not `/api/admin`. LiteSpeed intercepts
  `POST /api/admin` with its own HTML 429 brute-force page before the app ever sees it.
- Content comes live from the CMS. `http://preview.ojerinkporofoundation.com` and
  `https://preview.ojerinkporofoundation.com` are both allowed in Sanity; once HTTPS works,
  the `http://` entry can be removed at sanity.io/manage → API → CORS origins.
