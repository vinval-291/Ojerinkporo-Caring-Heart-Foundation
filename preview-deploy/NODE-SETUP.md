# Dashboard server — Namecheap "Setup Node.js App"

Makes `/admin` on the preview site sign in, load and save content.

The package is one bundled file (`app.js`) with nothing to install. It was tested in
production mode before packaging: health check, password rejection and acceptance,
secure session cookie, and a signed-in read of the live CMS content.

## 1. Create the Sanity write key (2 minutes)

1. Go to **sanity.io/manage** → the **OCHF** project → **API** → **Tokens** → **Add API token**.
2. Name: `OCHF dashboard`. Permissions: **Editor**. Save.
3. **Copy the token now.** Sanity shows it only once. Keep it somewhere safe until step 3,
   and don't send it by email or chat.

## 2. Upload the server (3 minutes)

1. cPanel → **File Manager** → your **home directory**. This is the top level, *not*
   `public_html` and *not* the preview folder.
2. Create a folder named `ochf-admin-api`.
3. Upload `ochf-admin-api.zip` into it → right-click → **Extract** → delete the zip.
   You should see `app.js` and `package.json`.

## 3. Create the app (5 minutes)

cPanel → **Setup Node.js App** → **Create Application**, then fill in:

| Field | Value |
|---|---|
| Node.js version | The highest offered (20 or newer is best; 18 is the minimum) |
| Application mode | **Production** |
| Application root | `ochf-admin-api` |
| Application URL | `preview.ojerinkporofoundation.com` / `api` |
| Application startup file | `app.js` |

Under **Environment variables**, click **Add Variable** twice:

| Name | Value |
|---|---|
| `ADMIN_PASSWORD` | The password you and the client will use to sign in. Make it long. |
| `SANITY_WRITE_TOKEN` | The token from step 1 |

Click **Create**. You do **not** need "Run NPM Install" because there are no dependencies.

## 4. Update the preview's .htaccess (1 minute)

File Manager → `preview.ojerinkporofoundation.com` folder → **Show Hidden Files** →
edit `.htaccess`. Inside the OCHF block, directly under `RewriteBase /`, add:

```apache
# Leave the dashboard's server alone; the Node.js app answers there.
RewriteRule ^api(/|$) - [L]
```

Without it, the website's routing sends `/api` requests to the homepage instead of the
server. `preview-htaccess.txt` already includes this line.

Leave any lines cPanel added for the Node.js app, and the password lines, as they are.

## 5. Test it

1. Open **https://preview.ojerinkporofoundation.com/api/health**. Sign in to the preview
   first if asked. You should see `{"ok":true,"service":"ochf-admin-api"}`.
2. Open **https://preview.ojerinkporofoundation.com/admin** and sign in with `ADMIN_PASSWORD`.
3. Open **Programmes**. You should see Enterprise, Education and Community.

Also upload the latest `ochf-preview-site.zip` if you haven't yet. It contains the
dashboard fix that reports errors instead of showing empty sections.

## If something goes wrong

| What you see | What to do |
|---|---|
| `/api/health` shows the website or a 404 | The `.htaccess` line from step 4 is missing, or the Application URL isn't `api` |
| Dashboard says "isn't available" although `/api/health` works | The browser is calling a path the host blocks. LiteSpeed answers `POST /api/admin` with its own HTML "429 Too Many Requests" brute-force page, which never reaches the app. The dashboard now uses `/api/content` instead — upload the latest `ochf-preview-site.zip` |
| "Incomplete response" or 503 | Open `ochf-admin-api/stderr.log` in File Manager for the error, then **Restart** the app |
| `/api/health` returns 404 after an upload | The `api` folder inside the preview folder was deleted. cPanel keeps its Passenger directives in `api/.htaccess` there. Recreate the `api` folder with an empty `.htaccess` inside it, then **Restart** |
| Restart fails: `FileNotFoundError: .../api/.htaccess` | Same cause. cPanel cannot stop the app because it reads that file first. Recreate it as above, then Restart |
| Dashboard says "isn't available at this address" | The server isn't answering — check `/api/health` first |
| "That password is not right" | It must match `ADMIN_PASSWORD` exactly. After changing a variable, click **Restart** |
| Sign-in works but saving fails | The token is missing or doesn't have the **Editor** role |
| A large photo won't upload | Resize it (under about 5 MB works best on shared hosting) |

## Updating the server later

When the dashboard's server code changes, upload the new `app.js` into
`ochf-admin-api`, replacing the old one, then click **Restart** on the app in
**Setup Node.js App**. Your settings are kept.
