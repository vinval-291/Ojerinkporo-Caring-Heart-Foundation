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

## The live site

`deploy-live.yml` publishes to ojerinkporofoundation.com when you push to `main`.

How the two fit together:

| Branch | Deploys to | What it is |
|---|---|---|
| `redesign` | preview.ojerinkporofoundation.com | where the work happens |
| `main` | ojerinkporofoundation.com | what the public sees |

So the routine becomes: work on `redesign`, check it on the preview, then merge
into `main` when you are happy. Merging is what publishes.

### Setup

**1. A second FTP account, scoped to `public_html`.**

cPanel → FTP Accounts → Add. Log in `deploy-live`, Directory `public_html`.
Use a different account from the preview one, so neither can reach the other.

**2. Three more secrets** (Settings → Secrets and variables → Actions):

| Name | Value |
|---|---|
| `FTP_LIVE_USERNAME` | the full username, usually `deploy-live@ojerinkporofoundation.com` |
| `FTP_LIVE_PASSWORD` | that account's password |
| `FTP_LIVE_DIR` | `/` — the account already starts in `public_html` |

`FTP_SERVER` and the two `VITE_` variables are shared with the preview workflow.

**3. Move WordPress out of `public_html` first.** See step 2 of `LAUNCH.md`.

### What it will not touch

The sync removes files on the server that are not in the build, so everything the
server owns is excluded by name in the workflow:

- `.htaccess` — the redirects, the canonical rules, the routing
- `api/**` — cPanel's Passenger directives for the dashboard
- `wp-admin`, `wp-includes`, `wp-content`, `wp-*.php`, `index.php` — WordPress,
  while it is still in `public_html`

Those WordPress exclusions exist because the installation has not been moved yet.
Once it has, they are dead weight and can come out — but leaving them costs
nothing, and removing them before the move would be the one mistake that deletes
the old site irrecoverably.

### First run

Use **Actions → Deploy live → Run workflow** rather than a push, and watch the
log. Then open the site in a private window and check a deep address such as
`/our-work/community` still loads on refresh — that proves `.htaccess` survived.

## If a deploy fails

| What the log says | What it means |
|---|---|
| `530 Login authentication failed` | Wrong username — use the full `user@domain` form |
| `ENOTFOUND` | `FTP_SERVER` is wrong; try the server's hostname from cPanel |
| Files upload but the site is unchanged | `FTP_PREVIEW_DIR` points at the wrong folder |
| `Error: Process completed with exit code 2` at Typecheck | A real TypeScript error — fix it, the deploy was stopped on purpose |
| Pages 404 after a deploy | `.htaccess` is missing; restore it from `preview-htaccess.txt` |
