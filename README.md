# squareonejj.com

Marketing site for Square One Jiu Jitsu Academy, Lee's Summit, MO. See [PLAN.md](PLAN.md).

**Stack:** Astro 7 (static) + Tailwind 4, deployed to Hostinger by GitHub Actions over SSH.

## Develop

```sh
npm install
npm run dev      # binds --host; open via your LAN IP or http://127.0.0.2:4321 — Gymdesk widgets don't load on localhost/127.0.0.1
npm run build    # astro check + build into dist/
npm run preview
```

## Where things live

| Path | What |
|---|---|
| `src/data/site.ts` | Business facts: NAP, hours, schedule, socials. **Must match the Google Business Profile.** |
| `src/config/gymdesk.ts` | Gymdesk gym ID, form refs, signup/login URLs |
| `src/styles/global.css` | Design tokens and shared utilities (`btn-primary`, `container-page`, `eyebrow`) |
| `src/layouts/BaseLayout.astro` | `<head>`: SEO, canonical, JSON-LD, fonts |
| `public/.htaccess` | Clean URLs, canonical host, legacy Gymdesk redirects, caching |

## Environments

`PUBLIC_SITE_ENV=production` turns on indexing (robots meta and robots.txt). Anything else builds a
`noindex` staging site. In CI it comes from the repository variable `SITE_ENV`; flip it to `production` at cutover.

## Deploy setup (one time)

1. Generate a key: `ssh-keygen -t ed25519 -f hostinger_deploy -N ""`.
2. Hostinger hPanel → Advanced → SSH Access: add `hostinger_deploy.pub`, then note the host, port and username.
3. GitHub → Settings → Secrets and variables → Actions:
   - **Secrets:** `HOSTINGER_HOST`, `HOSTINGER_PORT`, `HOSTINGER_USER`, `HOSTINGER_SSH_KEY` (the private key), `HOSTINGER_PATH` (e.g. `domains/<site>/public_html`)
   - **Variables:** `SITE_ENV=staging`, and `GA4_ID` once it exists
4. Create a GitHub environment named `hostinger`. Add required reviewers if you want manual approval before deploys.
