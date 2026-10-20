# Square One Jiu Jitsu — Website Build Plan

Marketing site for Square One Jiu Jitsu Academy, 2 SW 4th St, Lee's Summit, MO 64063.
Replaces the current Gymdesk-hosted site at https://squareonejj.com.

## 1. Goals

1. **Convert visitors into free-trial signups**, the main KPI. Phone calls and membership signups are secondary.
2. **Rank in local search** for "jiu jitsu / BJJ / kids jiu jitsu in Lee's Summit" and the east KC metro, then expand outward.
3. **Get cited by AI answer engines** (ChatGPT, Perplexity, Google AI Overviews, Claude) for "best BJJ gym in Lee's Summit / KC".
4. **Be fast.** Lighthouse 95+ on mobile, LCP under 2.0s, no JS shipped except the Gymdesk widgets and analytics.
5. **Need little upkeep.** Gymdesk is the source of truth for anything dynamic.

### 1.1 Confirmed facts

These are the canonical facts. Copy, JSON-LD and llms.txt are all generated from them.

- **Business:** Square One Jiu Jitsu Academy, LLC. Opened in 2023 in downtown Lee's Summit, MO.
- **Affiliation:** formal **Zenith BJJ** affiliate under **Robert Drysdale** (Zenith of Kansas City).
- **Josh Smith:** Owner / Head Coach, **black belt from Renato Tavares (2023)**, **joined Robert Drysdale / Zenith BJJ (2026)**. Confirmed by Josh, 2026-10-20. Photo with Drysdale: `gallery-24.jpeg`.
- **Heidi Smith:** Co-owner / Coach, **purple belt**.
- **Programs:** Adult Gi, Adult Nogi (13+); Youth Jiu Jitsu, Youth Nogi (5–12).
- **Phone:** (816) 287-0492. **Email:** contact@squareonejj.com.
- **Address:** **2 SW 4th St, Ste D**, Lee's Summit, MO 64063. This matches the Google Business Profile, which shows "2 SW 4th St Ste d" (read from the Maps embed on 2026-10-19).
- **Google rating:** **4.9★ from 79 reviews** (GBP, 2026-10-19). Used in `src/data/reviews.ts` and for AggregateRating.
- **Hours** (derived from the class schedule; no open mat):

| Day | Hours |
|---|---|
| Mon | 6:00–7:30 AM, 5:30–8:30 PM |
| Tue | 5:30–8:30 PM |
| Wed | 6:00–7:30 AM, 7:00–8:30 PM |
| Thu | 5:30–8:30 PM |
| Fri | 6:00–7:30 AM |
| Sat, Sun | Closed |

- **Weekly classes:**

| Day | Classes |
|---|---|
| Mon | Adult Gi 6:00–7:30 AM, Youth Jiu Jitsu 5:30–6:30 PM, Adult Nogi 7:00–8:30 PM |
| Tue | Youth Jiu Jitsu 5:30–6:30 PM, Adult Gi 7:00–8:30 PM |
| Wed | Adult Gi 6:00–7:30 AM, Adult Nogi 7:00–8:30 PM |
| Thu | Youth Nogi 5:30–6:30 PM, Adult Gi 7:00–8:30 PM |
| Fri | Adult Nogi 6:00–7:30 AM |

- **Social** (footer + JSON-LD `sameAs`):
  - YouTube: https://www.youtube.com/@squareonejj
  - Instagram: https://www.instagram.com/squareonejj/
  - Facebook: https://www.facebook.com/squareonejj/
- **Google Maps:** https://maps.app.goo.gl/zTGz4gndt5DXWKRH6
  - Geo: `38.9103924, -94.3773143` (used for JSON-LD `geo` and the map embed)
  - Place feature ID: `0x87c121bd9e29281b:0x6aa123fc753da6d1`
  - Knowledge Graph ID: `/g/11ks115zrm` (use the GBP / Maps URL in JSON-LD `sameAs` and `hasMap`)

**Prototype copy errors. Do not carry these over:**
- The home page calls Josh and Heidi "husband-and-wife black belts". Heidi is a **purple belt**.

## 2. Decisions

| Area | Decision | Notes |
|---|---|---|
| Framework | **Astro** (static output) | No client JS by default. Content lives in Markdown/MDX content collections. |
| Styling | **Tailwind CSS** | Uses the theme tokens from the prototype (§5). |
| Reference design | Lovable prototype at https://blueprint-bliss-91.lovable.app | Used for **reference only**: copy, structure, palette. No code is reused. |
| Content editing | Marketing copy lives in the repo and the developer edits it. **Gymdesk** owns schedule, pricing/memberships, events, signups and the shop. | Add a CMS later only if the owners ask for one. |
| Hosting | **Hostinger** (static files in `public_html`) | |
| Deploy | **GitHub Actions** builds the site and rsyncs `dist/` over SSH (FTP if the plan lacks SSH) on every push to `main` | Hostinger's Git deploy can't run a build step. |
| PR previews | Optional: Cloudflare Pages or Netlify free tier | Production stays on Hostinger. |
| DNS | Stays at **Namecheap**. The developer repoints the records at launch. | |
| Analytics | **GA4**, with conversion events | Cookie notice included (§8). |
| Redirects | `.htaccess` 301s from the old Gymdesk paths | Hostinger runs Apache/LiteSpeed. |
| Accessibility | WCAG 2.1 AA | The Gymdesk widgets are outside our control. |

## 3. Sitemap (v1)

| Route | Purpose | Gymdesk integration |
|---|---|---|
| `/` | Hero, programs overview, schedule preview, coaches, reviews, trial CTA | Trial form (inline or popup) |
| `/programs/adult-bjj` | Adult Gi + Nogi, ages 13+ | Link to schedule and trial |
| `/programs/kids-bjj` | Youth Jiu Jitsu + Youth Nogi, ages 5–12 | Link to schedule and trial |
| `/schedule` | Full weekly schedule with booking | **Schedule widget** (script + placeholder) |
| `/pricing` | Four tiers ($175 / $290 / $370 / $420 per month), what's included, terms | **Signup link** |
| `/free-trial` | Main conversion page | **Trial / lead capture form** |
| `/about` | "From square one" story, Josh & Heidi Smith, values, gallery | — |
| `/new-here` | What to expect, what to wear, etiquette, **FAQ** | — |
| `/contact` | Map, hours, phone, parking and entrance notes | **Contact form** |
| Header / footer | Member Login (Shop is not enabled, so it's left out of v1) | **External Gymdesk links** |
| `/404` | Branded not-found page with CTAs | — |

Program pages are organized by **audience** (adult / kids), not gi / nogi, because that's how people search.

**Phase 2 (after launch):** blog, location pages (Blue Springs, Raytown, Greenwood, Lake Lotawana), events, reviews page.
**Out of scope:** video library, community wall, AI chat, admin area.

## 4. Gymdesk integration map

| Need | Gymdesk feature | Where to find it in the Gymdesk admin | Embed type |
|---|---|---|---|
| Schedule + booking | Schedule embed | Website → Schedule → Embed Code | `<script>` + placeholder element |
| Standalone booking (optional) | Booking widget | Gym → Bookings → Settings | Script |
| Free trial / lead capture | Email capture form | Website → Forms → Embed | Script (inline or popup) |
| Contact form | Form | Website → Forms → Embed | Script |
| Membership signup | Standalone signup link | Website (requires the Gymdesk site to be **unpublished**) | Link |
| Member portal login | Standalone login link | Website (same requirement) | Link |
| Shop | Online shop link | Sales → Settings → Online Shop | Link |
| Review requests | Automated review requests (verify the feature exists) | TBD | Gymdesk automation |

### 4.1 Gymdesk widget facts (from the owner's embed code and a read of `widgets.js`, 2026-10-19)

**Gym ID:** `D2OOb`. **Loader:** `<script src="https://app.gymdesk.com/js/widgets.js"></script>`. One script powers all widgets. It is about 13 KB, loads its own scoped jQuery, and renders each widget as an iframe.

| Widget | Markup | Optional attributes |
|---|---|---|
| Schedule (+ booking) | `<div class="gymdesk-schedule" attr-gym="D2OOb"></div>` | `attr-theme` (template) |
| Booking | `<div class="gymdesk-booking" attr-gym="D2OOb"></div>` | `attr-theme`, `attr-ref` |
| Form (trial, contact) | `<div class="maonrails-form" attr-gym="D2OOb" attr-ref="FORM_REF"></div>` | `attr-theme`, a `popup` attribute for popup mode |

| Ref / URL | Value | Status |
|---|---|---|
| **Trial form ref** | `6kpYB` | Received |
| **Contact form ref** | `6ayyZ` | Received (custom embed-only form; the Gymdesk site's built-in contact form is untouched) |
| **Gymdesk subdomain** | `https://squareonejj.gymdesk.com`, which currently 301s to squareonejj.com | Verified |
| **Signup URL** | probably `https://squareonejj.gymdesk.com/signup` | **To verify** once the custom domain is detached or the site unpublished, or ask Gymdesk support |
| **Login URL** | probably `https://squareonejj.gymdesk.com/login` | **To verify** (same) |
| **Shop** | Not enabled. Don't put a Shop link in v1. | Decided |

Behavior that matters:
- **Local dev gotcha:** on `localhost`, `127.0.0.1` or `*.gymdesk.test`, the script points at `https://gymdesk.test/`, so **the widgets won't load in local dev**. Run `astro dev --host` and browse via the LAN IP, or map a hosts alias such as `squareone.local`. The staging host must also not be localhost.
- **UTM passthrough:** forms forward `utm_*` and `gclid` from the page URL into Gymdesk, so lead attribution works out of the box. Keep query strings intact on CTA links.
- **Iframe height:** the parent posts `setHeight` messages with the window height. Give containers a `min-height` (≥ 400px) to avoid layout shift.
- **Booking conversion hook:** after a booking, Gymdesk posts a `gymdesk-booking-conversion` message containing a **conversion snippet configured in Gymdesk**, and the loader runs it. Put `gtag('event','trial_booked')` there, so no custom listener is needed. Gymdesk can also send `gymdesk-booking-redirect` to send the top window to a thank-you page.
- Because it's jQuery + iframes, **load `widgets.js` only on pages with a widget**, deferred.

### 4.3 Gymdesk setup tasks (found while building M3)

- [ ] **Trial form `6kpYB` is long:** 9 fields, including date of birth and participants. **Decision (2026-10-19): keep it as is for now**, and review with Josh & Heidi later. Trimming it to name, email, phone, "Adults / Kids / Both" and an optional comment is the recommendation (§4.2).
- [ ] **Set the trial form's post-submit redirect** to `https://squareonejj.com/thank-you`. **Deferred to cutover:** that URL 404s until the new site is live, and the current Gymdesk site uses this same form. Added to the §10 runbook. Until then, GA4 can't count form leads via the thank-you page.
- [ ] **⚑ Potential improvement: self-serve trial booking.** The current booking flow asks for a payment card. Revisit later: confirm Gymdesk can let a new visitor book a free trial class with no card, then set `trialBookingEnabled: true` in `src/config/gymdesk.ts`. Off for launch.
- [x] **Contact form created:** ref `6ayyZ`, embed-only, titled "Send us a message". Fields: name, email, phone, preferred contact method, comment (name, email, phone and comment required). Live on `/contact`.
- [ ] **Booking conversion snippet:** in Gymdesk booking settings, add the GA4 event (M4).
- Note: `widgets.js` loads **jQuery 3.6 (unminified) from code.jquery.com** on widget pages, so the schedule, free-trial and contact pages will score lower on Lighthouse. That's accepted; widgets load only where needed.
- Theme: the schedule and booking widgets support `theme=dark`; forms only have a light template, so they sit on a white card.

### 4.2 Free-trial flow (decided: option c, both)

1. **Primary:** a short lead form (`maonrails-form`): name, email, phone, adult or kid. This is the fastest conversion, and Josh / Heidi follow up.
2. **Secondary**, under it: "Ready to pick a class? Book your free class now" opens the booking or schedule widget, so visitors who are ready can book themselves.
3. **Thank-you page** (`/free-trial/thanks`, noindex): fires the GA4 `generate_lead` conversion and explains what happens next. Set the Gymdesk form or booking redirect to point here, if supported.

Implementation notes:
- Wrap each embed in an Astro component (`<GymdeskSchedule />`, `<GymdeskForm id=… />`) so the scripts load only on pages that use them. Use `is:inline` scripts loaded with `defer`.
- Give every widget container a reserved `min-height` so it doesn't cause layout shift (CLS).
- Every widget gets a **static fallback**: the schedule page also renders a crawlable HTML version of the class times from a local data file, and forms show the phone and email. Google and LLM crawlers can't read JS-injected widgets.
- Keep all Gymdesk URLs in one `src/config/gymdesk.ts` file.
- Style widgets with Gymdesk's theme settings where possible. Don't fight their CSS.

## 5. Design system (from the prototype)

Dark theme, red accent, condensed athletic headings.

```css
--background:         oklch(14.5% 0 0);        /* near-black */
--surface / --card:   oklch(18.5% 0 0);
--secondary / --muted:oklch(24% 0 0);
--foreground:         oklch(98.5% 0 0);
--muted-foreground:   oklch(68% 0 0);
--primary / --accent: oklch(52.3% .209 26.5);  /* brand red */
--rating:             oklch(82% .16 85);       /* review stars, gold */
--border:             oklch(100% 0 0 / .12);
--radius:             .25rem;
```

- **Headings:** Barlow Condensed 600/700/800. **Body:** Archivo 400–700. Self-host both with `@fontsource` (no Google Fonts request).
- **Logo:** the only source is the PNG on Gymdesk. **Decision (2026-10-20):** on the dark site, show the original logo on a **white rounded tile** (`src/assets/brand/logo-tile.png`), so the black belt with its red bar stays black. An inverted all-white version made the belt read as a white belt, so it was removed. **Long-term:** get an official vector logo, ideally with a dark-background version, from the owners (owner question in the Team section).
- Check that the red on near-black meets 4.5:1 contrast for text, and adjust lightness if it doesn't.

### 5.1 Photos

**Current assets** (pulled from the prototype on 2026-10-19; confirmed real Square One photos):
- ~~`hero.png`~~ turned out to be **logo brush artwork**, not a photo. It's moved to `src/assets/brand/logo-brush-art.png`. The M1 home page uses `gallery-14.jpg` (team photo, 1616×1080) as the hero.
- **Many gallery photos are with other gyms and coaches** (seminars, tournaments, Renato Tavares, other academies): gallery-1, 3, 5–12, 19, 20, 22. They're good for the "lineage / about" story but not as "our gym" imagery. **Owners: tag which photos are at Square One.** The likely in-house ones are gallery-2, 4, 13–18 and 21.
- `src/assets/photos/gallery-1…22.jpg`: mostly 1080px. **Low-res:** gallery-9 (350px), gallery-11 (414px), gallery-12 (480px), gallery-16 (793px), gallery-5 and gallery-20 (720px). Use these only as small thumbnails or drop them.
- `src/assets/brand/gymdesk-logo.png`: 2048×2732 PNG, identical to the prototype's logo. This is the source for the SVG recreation. Also have `gymdesk-logo-medium.png` and `gymdesk-favicon.ico`.
- All images go through `astro:assets` (AVIF/WebP, responsive `srcset`, lazy-loaded below the fold).

**Photo shoot TODO.** Use a modern phone in good light, or a pro photographer. Shoot landscape **and** portrait, at least 2400px on the long edge.
- [ ] Josh and Heidi together (hero / about)
- [ ] Each coach alone (coach cards, `Person` schema, GBP)
- [ ] Kids drilling (kids program page)
- [ ] Adults rolling (adult program page, hero candidate)
- [ ] The mat space, empty (new-here, GBP)
- [ ] Building exterior with the signage (contact, GBP, "how to find us")

Get photo releases for any identifiable students. The Gymdesk waiver covers promotional use for members; confirm it covers minors too.

## 6. Project structure

```
src/
  components/       Header, Footer, CTA, ProgramCard, CoachCard, ReviewCard, FAQ, Gymdesk*/
  layouts/          BaseLayout.astro (SEO head, JSON-LD, GA4)
  pages/            routes from §3
  content/          coaches/, programs/, faqs/, reviews/ (content collections)
  data/             schedule.ts (static fallback), site.ts (NAP, hours, socials)
  config/gymdesk.ts
public/
  .htaccess  robots.txt  llms.txt  images/
.github/workflows/deploy.yml
```

There must be a **single source for NAP** (name, address, phone) in `src/data/site.ts`. Everything renders from it: footer, contact page, JSON-LD and llms.txt.

## 7. SEO and AI-search workstream

### On-site (part of the build)
- **JSON-LD:**
  - `SportsActivityLocation` / `LocalBusiness` with NAP, geo, hours, `sameAs` socials and `aggregateRating`, on every page
  - `Person` for Josh and Heidi
  - `Course` or `Service` for each program
  - `FAQPage` on `/new-here`
  - `Offer` for pricing
  - `BreadcrumbList`
- **Meta:** a unique title and description per page targeting "[program] in Lee's Summit, MO". OG and Twitter images.
- `@astrojs/sitemap` generates `sitemap.xml`.
- **robots.txt** explicitly allows `Googlebot`, `Bingbot`, `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot` and `Google-Extended`.
- **`/llms.txt`:** a plain-text summary of who, where, programs, schedule, pricing, coaches, trial offer and contact.
- **Content written to be quoted:** concrete facts (black belt lineage, year opened, class sizes, ages, prices) in plain sentences, plus FAQs phrased the way people ask.
- **Crawlable static HTML for the schedule and pricing**, not only in JS widgets.
- Semantic HTML, descriptive alt text, and real photos with geotag-free but descriptive filenames.

### Off-site (owner / marketing tasks; drives the AI rankings)
1. **Google Business Profile:** claim or verify it, set the correct categories (Martial arts school, Brazilian jiu-jitsu club), add photos, hours, products and posts. NAP must match the site exactly.
2. **Review engine:** a steady stream of Google reviews, ideally automated after a member's ~3rd class. This is the biggest lever.
3. **Bing Webmaster Tools** and **Google Search Console:** verify both, submit the sitemap. Bing feeds ChatGPT search.
4. **Bing Places** and Apple Business Connect listings.
5. **Directories and lists:** Let's Roll, BJJ Heroes, Yelp, Facebook, the Lee's Summit Chamber, and the Smash/Open Mat finders.
6. **Community mentions:** r/kansascity, r/bjj and r/LeesSummit threads, local news, and tournament results.
7. **Consistent NAP everywhere.**

Expectation: on-site work makes Square One *eligible* to be cited. Off-site reviews and mentions decide *whether* it gets picked. "Best in Lee's Summit / east metro" is a realistic first target; "best in KC" takes longer.

## 8. Analytics and tracking

**Setup still to do:**
1. Create the GA4 property in an owner-held account and set the GitHub variable `GA4_ID`. GA only loads when `SITE_ENV=production` and `GA4_ID` are both set.
2. In GA4 → Admin → Events, mark `generate_lead`, `click_phone` and `cta_free_trial` as **key events**.
3. In Gymdesk booking settings, set the conversion snippet to `gtag('event','book_class');` (runs after a booking; see §4.1).
4. `generate_lead` fires only once the trial form redirects to `/thank-you`, which is deferred to cutover (§4.3).

**Implemented:** `src/components/Analytics.astro` (Consent Mode v2, with ad storage always denied) and `ConsentNotice.astro` (OK / Decline, remembered in localStorage).

- GA4 via `gtag`, loaded with `defer`, plus Google Consent Mode v2 and a lightweight cookie notice.
- **Conversion events:**

| Event | Trigger |
|---|---|
| `trial_form_submit` | Gymdesk callback or thank-you redirect, if available; otherwise a click on submit |
| `click_phone` | Phone link clicked |
| `click_email` | Email link clicked |
| `click_signup` | Signup link clicked |
| `click_login` | Login link clicked |
| `click_directions` | Directions link clicked |
| `schedule_book_click` | Booking clicked (if detectable) |

- Link GA4 to Search Console.

## 9. Deploy pipeline

> Hostinger's hPanel "Deploy from GitHub" / Git integration is blocked for client-managed sites, and it couldn't run `astro build` anyway. The build runs entirely in GitHub Actions and pushes files over SSH, so Hostinger never connects to GitHub.

`.github/workflows/deploy.yml`:
1. Triggers on push to `main`, or manually.
2. Steps: `npm ci` → `astro check` → `astro build`.
3. Runs Lighthouse CI (budget: performance ≥ 95, accessibility ≥ 95, SEO = 100) as a non-blocking report at first.
4. Runs `rsync -avz --delete dist/` to Hostinger `public_html/` over SSH.
5. Secrets: `HOSTINGER_HOST`, `HOSTINGER_USER`, `HOSTINGER_SSH_KEY`, `HOSTINGER_PORT` (Hostinger SSH usually uses port 65002), `HOSTINGER_PATH`.

Before cutover, deploy to a Hostinger temporary domain or a `new.squareonejj.com` subdomain for review.

## 10. Launch / cutover runbook

**Before launch**
1. Content is final and signed off by the owners.
2. All Gymdesk embeds have been tested on staging: book a class, submit a trial form, submit a contact form.
3. Collect the standalone signup, login and shop URLs. Check whether Gymdesk shows them before the site is unpublished.
4. Lower the Namecheap DNS TTL to 300s at least 24h ahead.
5. Have `.htaccess` redirects ready:

| Old path | New path |
|---|---|
| `/book` | `/schedule` |
| `/signup` | Gymdesk signup URL |
| `/login` | Gymdesk login URL |
| `/shop` | `/` (the shop is not enabled) |
| `/gallery` | `/about#gallery` |
| `/schedule`, `/pricing`, `/contact` | Same path |

**Launch window** (pick a quiet time, not right before class)
1. Unpublish the Gymdesk website.
2. Repoint the Namecheap A / CNAME records to Hostinger.
3. In Gymdesk, set the trial form `6kpYB` post-submit redirect to `https://squareonejj.com/thank-you` (§4.3).
4. Issue SSL on Hostinger and force HTTPS. Pick one canonical host (`squareonejj.com`, apex) and redirect `www` to it.
5. Set the GitHub variable `SITE_ENV=production` and re-run the deploy (enables indexing and robots.txt).
6. Smoke-test every page, every widget and every redirect, on mobile.
7. Check that `https://squareonejj.com/robots.txt` is **ours** (it lists GPTBot, ClaudeBot etc. and a `Sitemap:` line). On the temporary `*.hostingersite.com` domain, Hostinger's CDN serves its own robots.txt instead (`Googlebot: Disallow`). Staging is still noindexed through our `<meta name="robots">`.

**After launch**
1. Submit the sitemap to Google Search Console and Bing Webmaster Tools, and request indexing.
2. Update the Google Business Profile website link if needed.
3. Watch Search Console coverage and GA4 conversions for 2 weeks.
4. Restore the normal DNS TTL.

## 11. Milestones

| # | Milestone | Output |
|---|---|---|
| M0 | Inputs collected | Answers to §12, Gymdesk embed codes, photos, access |
| M1 | Scaffold | Astro + Tailwind + tokens, layout, header/footer, CI deploy to staging. **Built 2026-10-19**; deploy is waiting on SSH secrets. |
| M2 | Core pages | Home, programs, about, new-here (with FAQ), pricing, contact. **Built 2026-10-19** with DRAFT FAQ answers (`src/data/faq.ts` mirrors `docs/faq-draft.md`). |
| M3 | Gymdesk | Schedule, trial form, contact form, signup/login/shop links, fallbacks. **Built 2026-10-19**: `/schedule` (live widget + static weekly grid), `/free-trial` (form `6kpYB`), `/thank-you` (noindex), contact form slot. Verified rendering in Chrome on 127.0.0.2. Blocked items are in §4.3. |
| M4 | SEO / AI | JSON-LD, sitemap, robots, llms.txt, meta/OG, GA4 + events. **Built 2026-10-19.** Lighthouse (mobile, production build): Performance 99–100, Accessibility 100, SEO 100 on all pages tested. Best Practices fails only on local-HTTP checks, plus Gymdesk's third-party cookies on `/schedule`. |
| M5 | QA | Lighthouse, a11y audit, cross-device testing, content proofread, owner review. **Staging live 2026-10-19:** https://grey-octopus-742932.hostingersite.com (all routes, redirects, HTTPS, caching, Brotli and widgets verified). |
| M6 | Launch | Cutover runbook (§10) |
| M7 | Phase 2 | Location pages, blog, events, reviews page |

## 12. Open inputs / questions

| # | Item | Owner | Status |
|---|---|---|---|
| 1 | Photos: the prototype's photos are real. Pulled into `src/assets/photos/` for v1. Photo shoot still needed (§5.1). | Owners | **Decided** (shoot open) |
| 2 | Coach bios: ranks and lineage confirmed (§1.1). Still useful: year Josh got his black belt, years training, competition record. | Owners | **Partly decided** |
| 2a | **TODO:** list of assistant coaches and youth coaches (name, rank, role, photo, short bio) | Owners | Open |
| 3 | FAQ answers: the developer drafts them in `docs/faq-draft.md`, then Josh & Heidi approve | Developer → Owners | In progress |
| 4 | Practical details: parking, entrance, staffed hours | Owners | Open |
| 5 | Gymdesk: schedule embed and trial form ref (`6kpYB`) **received**. Still to do: **create a custom Contact form** and get its ref; **verify the signup / login URLs** (see §4.1); booking widget settings. | Developer | Partly decided |
| 6 | Google Business Profile: **Josh / Heidi own it** and will add the developer as a **Manager** (business.google.com → Business Profile settings → People and access → Add). | Owners | **Decided** (access pending) |
| 7 | Search Console and Bing Webmaster Tools: verify `squareonejj.com` as a **domain property** with a DNS TXT record at Namecheap (this works before cutover); import into Bing from GSC. Create a **GA4 property** under an owner-held Google account and give the developer Editor access. | Developer | Open |
| 8 | Hostinger: **SSH is available**. Deploy is GitHub Actions → rsync over SSH (§9). Hostinger's built-in Git integration is **not available** for client-managed sites, and it isn't needed. TODO: generate a deploy key pair, add the public key in hPanel → Advanced → SSH Access, and store the host / port / user / path / private key as GitHub secrets. Use the Hostinger temporary domain for staging. | Developer | **Decided** (setup pending) |
| 9 | Social URLs: in §1.1 | Owners | **Decided** |
| 10 | Reviews: **hand-picked Google review quotes** (4–8) stored in `src/content/reviews/`, shown as **first name + last initial**, with stars, date, and a "Read all reviews on Google" link. No widget JS. Refresh quarterly. Seed: N. M., Lance T., Bradley B. (Sep 2026, from the prototype). Pick more from GBP. Note: Google ignores `AggregateRating` markup on a business's own site for star rich results, but keep it for LLM and entity context, using the real count and average from GBP. | Developer | **Decided** |
| 11 | Pricing: **publish** it. Month-to-month, **no enrollment fee**. Tiers are $175 / $290 / $370 / $420 (from the prototype; the live Gymdesk `/pricing` page renders no plans, so confirm against the Gymdesk Memberships admin). Annual discount, drop-ins, privates and other discounts go to the owners in `docs/pricing-draft.md`. | Developer → Owners | **Decided** (details pending) |
| 12 | Free-trial offer: **one free class**. Copy reads "Your first class is free", with no "free week" anywhere. Booking flow is form + booking (§4.2). JSON-LD `Offer`: price 0, name "Free trial class". Make sure the Gymdesk trial form `6kpYB` and booking settings match (one class). | Developer | **Decided** |
| 13 | Hours **follow the class schedule** (below). **No open mat.** Set the same hours on the GBP, in JSON-LD `openingHoursSpecification` and on `/contact`. Note on the site: "Open during scheduled classes. Call or message to visit at another time." If the schedule changes, update the GBP and `src/data/schedule.ts` together. | Developer | **Decided** |
| 14 | Ages: drafted as **youth 5–12, adult 13+, minimum 5**. Edge cases (under 5, 13–15 in adult classes, teen choice, early move-up, parents watching, minors' waiver) are in `docs/faq-draft.md` #2 for the owners. | Developer → Owners | Drafted |
| 15 | Canonical domain: **`https://squareonejj.com`** (apex), which matches current behavior. `www` and `http` get a 301 to the apex in `.htaccess`. Astro `site: 'https://squareonejj.com'`, a `<link rel="canonical">` on every page. URLs have **no trailing slash**, so the existing `/schedule`, `/pricing` and `/contact` keep their exact URLs. Set `trailingSlash: 'never'` and `build.format: 'file'` (emits `schedule.html`), plus an `.htaccess` rewrite that serves `/x` from `x.html` and 301s `/x.html` and `/x/` to `/x`. This avoids Apache's `DirectorySlash` redirect loop. | Developer | **Decided** |
| 16 | Launch: **as soon as everything's ready**, about 3–4 weeks. Blockers: owner approval of FAQ and pricing, a custom Gymdesk Contact form ref, GBP Manager access, signup/login URLs confirmed. The photo shoot does **not** block launch. | All | **Decided** |
