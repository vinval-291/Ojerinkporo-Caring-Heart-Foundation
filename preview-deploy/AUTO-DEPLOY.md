# Automatic deploys from GitHub

Replaces the zip-and-upload routine. Push to `redesign` and the preview site
updates itself in about two minutes.

The workflow is `.github/workflows/deploy-preview.yml`. It installs, typechecks,
builds and uploads `source/dist` over FTPS. A typecheck failure stops the deploy,
so a broken build never reaches the server.

## One-time setup (about 10 minutes)

### 1. Make an FTP account that can only see the preview folder

cPanel → **FTP Accounts** → **Add FTP Account**.

| Field | Value |
|---|---|
| Log in | `deploy` |
| Directory | `preview.ojerinkporofoundation.com` |
| Quota | Unlimited |

Setting **Directory** matters. It locks this account to the preview folder, so a
leaked key cannot reach `public_html`, the WordPress install or the Node app.
Do not use your main cPanel login here.

Copy the full username cPanel shows after saving — it is usually
`deploy@ojerinkporofoundation.com`, not just `deploy`.

### 2. Put the credentials into GitHub

GitHub → the repo → **Settings** → **Secrets and variables** → **Actions**.

Under **Secrets**, **New repository secret**, four times:

| Name | Value |
|---|---|
| `FTP_SERVER` | `ftp.ojerinkporofoundation.com` |
| `FTP_USERNAME` | the full username from step 1 |
| `FTP_PASSWORD` | that account's password |
| `FTP_PREVIEW_DIR` | `/` — see the note below |

`FTP_PREVIEW_DIR` is where the files land, **relative to wherever the FTP account
starts**. Because step 1 locked the account to the preview folder, that is `/`.
If you used an account that starts at the home directory instead, it is
`/preview.ojerinkporofoundation.com/`. It must end in a slash.

Then switch to the **Variables** tab and add two (these are not secrets — both
values ship inside the published JavaScript and anyone can read them):

| Name | Value |
|---|---|
| `VITE_SANITY_PROJECT_ID` | `essbj1jr` |
| `VITE_SANITY_DATASET` | `production` |

Without these the site still builds, but it ignores the CMS and publishes the
figures baked into the code.

### 3. Try it

GitHub → **Actions** → **Deploy preview** → **Run workflow**. Watch it run, then
reload the preview with Ctrl+Shift+R.

## After that

```bash
git push origin redesign
```

That is the whole deploy. The Actions tab shows each run and its log.

## What it will not touch

`.htaccess` is excluded from the sync. It holds the routing rules, the noindex
header and the password protection, and losing it has broken the preview twice.
The workflow cannot delete or overwrite it — change that file by hand in cPanel.

The Node app in your home directory is outside the FTP account's reach entirely,
so `/admin` and `/api` are unaffected by any deploy.

## Going live later

Copy the workflow to `deploy-live.yml` and change three things: the branch to
`main`, the name, and add an `FTP_LIVE_DIR` secret pointing at `public_html`.
Then merging to `main` publishes the real site, and `redesign` stays the preview.

Do that only once the under-construction block is removed from
`public_html/.htaccess` and WordPress is backed up.

## If a deploy fails

| What the log says | What it means |
|---|---|
| `530 Login authentication failed` | Wrong username — use the full `user@domain` form |
| `ENOTFOUND` | `FTP_SERVER` is wrong; try the server's hostname from cPanel |
| Files upload but the site is unchanged | `FTP_PREVIEW_DIR` points at the wrong folder |
| `Error: Process completed with exit code 2` at Typecheck | A real TypeScript error — fix it, the deploy was stopped on purpose |
| Pages 404 after a deploy | `.htaccess` is missing; restore it from `preview-htaccess.txt` |
