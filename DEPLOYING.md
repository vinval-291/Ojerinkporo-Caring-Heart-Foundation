# Deploying from GitHub

Replaces building a zip and uploading it through File Manager. About 30 minutes to
set up once; after that, publishing is a `git push`.

## What you are setting up

Two pipelines, already written as workflows in `.github/workflows/`:

| Branch | Publishes to | What it is |
|---|---|---|
| `redesign` | preview.ojerinkporofoundation.com | where the work happens |
| `main` | ojerinkporofoundation.com | what the public sees |

Day to day: work on `redesign`, check it on the preview, merge into `main` when
you are happy. **Merging is what publishes.**

Each run installs, typechecks, builds, regenerates the sitemap, and uploads over
FTPS. A build that does not compile never reaches the server.

---

## 1. Two FTP accounts (10 min)

Two separate accounts, each locked to one folder, so a leaked key cannot reach the
other site, `public_html`, or your home directory.

cPanel → **FTP Accounts** → **Add FTP Account**, twice:

| | Preview | Live |
|---|---|---|
| Log in | `deploy-preview` | `deploy-live` |
| Directory | `preview.ojerinkporofoundation.com` | `public_html` |
| Quota | Unlimited | Unlimited |

The **Directory** field is the security control — it is what confines the account.
Do not use your main cPanel login for either.

After saving, copy the full usernames cPanel shows. They are normally
`deploy-preview@ojerinkporofoundation.com`, not just `deploy-preview`.

**You will know it worked when** both accounts appear in the FTP Accounts list
with the right directory beside each.

---

## 2. Secrets and variables (10 min)

GitHub → your repo → **Settings** → **Secrets and variables** → **Actions**.

### Secrets tab → *New repository secret*, seven times

| Name | Value |
|---|---|
| `FTP_SERVER` | `ftp.ojerinkporofoundation.com` |
| `FTP_USERNAME` | the preview account's full username |
| `FTP_PASSWORD` | the preview account's password |
| `FTP_PREVIEW_DIR` | `/` |
| `FTP_LIVE_USERNAME` | the live account's full username |
| `FTP_LIVE_PASSWORD` | the live account's password |
| `FTP_LIVE_DIR` | `/` |

Both directories are `/` because step 1 locked each account to its own folder, so
each already starts where it should. They must end in a slash.

Type these straight into GitHub. Never put them in a file in the repository.

### Variables tab → *New repository variable*, twice

| Name | Value |
|---|---|
| `VITE_SANITY_PROJECT_ID` | `essbj1jr` |
| `VITE_SANITY_DATASET` | `production` |

These are **not** secrets — both ship inside the published JavaScript and anyone
can read them. But without them the build quietly ignores the CMS and publishes
the copy baked into the code instead.

**You will know it worked when** the Secrets tab lists seven and Variables lists
two.

---

## 3. First preview deploy (5 min)

Run it by hand the first time rather than by pushing, so you can watch.

GitHub → **Actions** → **Deploy preview** → **Run workflow** → pick `redesign` →
**Run workflow**.

Open the run and watch the steps. It takes two to three minutes.

**You will know it worked when** every step has a green tick, and
`https://preview.ojerinkporofoundation.com` loads with a hard refresh
(`Ctrl+Shift+R`).

Then check a deep address: open `/our-work/community` directly and refresh. If it
loads, `.htaccess` survived the sync, which is the thing most worth proving.

---

## 4. Move WordPress before going near the live site (15 min)

**Do this before step 5. It is not optional.**

The sync removes files on the server that are not in the build. The workflow
excludes the WordPress files by name so the first run cannot delete them — but
those exclusions are a seatbelt, not a seat. WordPress and the new site should not
be sharing `public_html` at all.

Follow **step 1 and step 2 of `LAUNCH.md`**: take a full backup, download it, then
move the WordPress files into a dated folder in your home directory.

**You will know it worked when** `https://ojerinkporofoundation.com/wp-login.php`
returns "Not Found" instead of a page.

---

## 5. Point `main` at the current site (2 min)

`main` still holds the April site, 35 commits behind. Catch it up:

```bash
git checkout main
git merge redesign          # fast-forward, no conflicts
git push origin main
git checkout redesign
```

That push triggers the live deploy on its own. If you would rather watch it run
by hand first, do the merge but hold the push, then use **Actions → Deploy live →
Run workflow**.

**You will know it worked when** `main` and `redesign` point at the same commit:

```bash
git log --oneline -1 main redesign
```

---

## 6. First live deploy (5 min)

**Actions** → **Deploy live** → **Run workflow** → `main`.

Then, in a **private window** so nothing is cached:

- [ ] `ojerinkporofoundation.com` shows the current homepage
- [ ] `/our-work/community` loads when typed directly and refreshed
- [ ] `/api/health` returns `{"ok":true,…}` — the dashboard's server is untouched
- [ ] `/admin` signs in
- [ ] `/home/` still redirects to `/` — the old-address rules survived
- [ ] `/sitemap.xml` returns XML

The third and fifth are the ones that prove the sync left the server's own files
alone.

---

## After that

Publishing a change becomes:

```bash
git add -A && git commit -m "..." && git push      # preview updates itself
```

and when it is ready for the public:

```bash
git checkout main && git merge redesign && git push origin main && git checkout redesign
```

The Actions tab keeps a log of every deploy and who triggered it.

---

## What the workflows will never touch

Excluded by name, because the server owns them:

| Path | Why |
|---|---|
| `.htaccess` | The redirects, the canonical rules, the SPA routing |
| `api/**` | cPanel's Passenger directives — deleting it unmounts `/admin` and stops cPanel being able to restart the app |
| `wp-admin`, `wp-includes`, `wp-content`, `wp-*.php`, `index.php` | WordPress, while it is still in `public_html` |
| `.well-known/**` | SSL certificate validation |

Once WordPress has been moved, its entries in `deploy-live.yml` are dead weight
and can be removed. Removing them *before* the move is the one mistake here that
cannot be undone.

---

## If something goes wrong

| What you see | What it means |
|---|---|
| `530 Login authentication failed` | Wrong username — use the full `user@domain` form |
| `ENOTFOUND` | `FTP_SERVER` is wrong; check the hostname in cPanel |
| `Error: Process completed with exit code 2` at Typecheck | A real TypeScript error. The deploy stopped on purpose — fix it and push again |
| Uploads succeed but the site is unchanged | The `*_DIR` secret points at the wrong folder |
| Pages 404 on refresh | `.htaccess` is gone — restore it from `preview-deploy/live-htaccess.txt` |
| `/admin` says its server is unavailable | The `api` folder was removed; recreate it per `LAUNCH.md` step 5 |
| Figures or stories look stale | The `VITE_` variables are missing, so the build ignored the CMS |

## Turning it off

Delete the workflow file, or **Actions** → the workflow → **Disable workflow**.
Nothing on the server changes, and uploading a zip by hand still works exactly as
it did.
