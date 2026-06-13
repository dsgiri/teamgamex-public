# TeamGameX — Project Brief

For: Antigravity Vibe Coding Agent
Version: 1.0 | Date: June 2026 | Domain: teamgamex.com

---

## 1. Objective

Build a curated video directory web app that surfaces real team games played in senior and assisted living communities. Users paste social media short video links (YouTube, TikTok, Instagram, LinkedIn, Facebook) — the platform plays them in a built-in player and pairs each with structured metadata (game name, category tags, player count, mobility level, duration) and an Amazon gear affiliate link.

**Mission:** Help activity directors, care staff, and families discover and run evidence-backed team games that improve memory, reduce loneliness, and boost engagement in senior/assisted living settings.

---

## 2. Operations

### How it works
1. Admin (or community) submits a social media short URL via the Submit form
2. Platform auto-detects the video source (YouTube / TikTok / Instagram / LinkedIn / Facebook)
3. Admin reviews, adds metadata tags, approves → video goes live in the directory
4. Visitor browses the directory, filters by category/mobility/platform, clicks a card
5. Video plays in an embedded player on the detail page
6. "Get the gear" CTA links to an Amazon affiliate product page

### Content sourcing model
* Admin-curated entries (founder-driven at launch)
* Community submissions (activity directors, care staff, family members)
* All submissions reviewed before publishing

### Stack assumptions (for Antigravity)
* **Frontend:** React (Next.js Pages Router)
* **Database:** Supabase (Postgres) or Firebase
* **Video embeds:** iframe embeds via YouTube, TikTok oEmbed, Instagram embed, LinkedIn
* **Affiliate:** Amazon Associates links (manual per listing)
* **Auth:** Simple admin login (no public user accounts at MVP)
* **Hosting:** Vercel or Netlify

---

## 3. Customer Demographics

### Primary: Activity directors & care staff
* Work in assisted living facilities, memory care units, nursing homes.
* Responsible for daily programming and resident engagement.
* **Need:** proven, easy-to-run games with minimal setup; gear they can buy fast.
* **Pain:** hard to find team (not solo) games suitable for mixed mobility groups.

### Secondary: Families of residents
* Visit on weekends, want to participate alongside residents.
* Look for ideas that work for grandparent-age mobility levels.
* Share videos on social media — potential organic growth engine.

### Tertiary: Senior living operators & administrators
* Want evidence that activity programming reduces isolation and supports wellness KPIs.
* Could become institutional buyers or partners if the platform scales.

### Demographic profile of end users (residents)
* **Age:** 70–95
* **Mobility:** mixed (ambulatory + wheelchair users)
* **Cognitive:** mild to moderate decline common
* **Key need:** seated-friendly, simple rules, team-based (not competitive/solo)

---

## 4. Monetisation Strategy

* **Phase 1 — MVP (affiliate):** Amazon Associates links on every "Get the gear" button. Estimated commission: 3–8% per sale. Low friction — no checkout, no accounts needed.
* **Phase 2 — Directory listings (B2B):** Paid featured placement for game/activity vendors. Senior activity supply companies pay to be recommended alongside videos.
* **Phase 3 — Facility subscriptions:** Monthly SaaS fee for care facilities to access a curated playlist tool. Features: saved playlists, print-ready instruction sheets, staff activity logs.
* **Phase 4 — Sponsored content:** Care brands, physiotherapy tool makers, cognitive game publishers sponsor categories. E.g. *"Memory games — sponsored by BrainHQ"*.

---

## 5. Key Features & Functionality

### 5.1 Homepage / Directory
* Hero section with tagline and CTA
* Filter bar: game category (Memory, Movement, Trivia, Music, Creative) + platform + mobility level + group size
* Video card grid: thumbnail, human-readable game title, category tags, player count, duration
* Responsive grid (auto-fill columns)

### 5.2 Video Player Page
* Embedded player (iframe) — supports YouTube Shorts, TikTok, Instagram Reels, LinkedIn, Facebook
* Auto-detects platform from URL, loads correct embed method
* Progress bar + play/pause/volume controls (where embeds allow)
* Game info panel: title, description, tags, player count, duration, mobility level, gear cost estimate
* "Get the gear" button → Amazon affiliate link (new tab)
* "Watch original" button → source platform link
* "Share" button → copy link / share sheet
* "Up next" sidebar with related game cards

### 5.3 Submit a Game (Public Form)
* URL input → auto-detect platform
* Fields: game name, category, mobility level, min/max players, duration, Amazon gear link (optional), short description
* Status: submitted → pending review → live
* Email confirmation to submitter (optional)

### 5.4 Admin Dashboard
* Stats: total videos, pending submissions, monthly plays, gear link clicks
* Video table: name, platform badge, category tag, status (live / draft / pending), edit action
* Approve / reject submissions
* Edit any listing (title, tags, gear link, description)
* Add video manually

### 5.5 Tags & Filters System
* **Categories:** Memory · Movement · Trivia · Music · Creative · Social
* **Mobility:** All levels · Seated/wheelchair ok · Standing required
* **Group size:** 2–5 · 6–15 · 16+ · Any
* **Platforms:** YouTube · TikTok · Instagram · LinkedIn · Facebook
* Tags are admin-managed (add/remove/rename from admin panel)

---

## 6. Data Model (simplified)

### `videos` Table

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` | Primary key |
| `title` | `text` | Human-readable game name |
| `description` | `text` | 1–3 sentences |
| `video_url` | `text` | Original social media URL |
| `platform` | `enum` | youtube / tiktok / instagram / linkedin / facebook |
| `embed_id` | `text` | Extracted video ID for iframe |
| `category` | `enum` | memory / movement / trivia / music / creative / social |
| `mobility` | `enum` | all / seated / standing |
| `players_min` | `int` | Min players |
| `players_max` | `int` | Max players |
| `duration_min` | `int` | Estimated minutes |
| `gear_url` | `text` | Amazon affiliate link |
| `gear_cost` | `text` | e.g. "~$18" |
| `status` | `enum` | draft / pending / live |
| `submitted_by` | `text` | Name or email (optional) |
| `created_at` | `timestamp` | Creation time |

---

## 7. MVP Screens (in order of build priority)

1. Homepage directory with filter bar and video card grid
2. Video player / detail page with embed + metadata + gear CTA
3. Submit a game form (public)
4. Admin dashboard — video list, approve/reject, add/edit

---

## 8. URL Structure

```
/                          → Homepage directory
/play/[slug]               → Video player + detail
/submit                    → Public submission form
/admin                     → Admin dashboard (auth gated)
/admin/videos              → Video management
/admin/submissions         → Review queue
/admin/tags                → Tag management
```

---

## 9. Design Principles

* Clean, minimal, high-contrast — accessible to activity directors (not just seniors)
* Large text on player page for easy reading in care settings
* Mobile-friendly — activity directors often browse on phones
* Fast load — video doesn't auto-play on homepage (thumbnail only)
* No user accounts required for browsing or submitting
* **Color:** blue (`#185FA5`) as primary, teal (`#1D9E75`) for health/memory category, amber for low-cost/easy tags

---

## 10. Immediate Next Steps for Antigravity

1. Scaffold Next.js project with Supabase
2. Create videos table in Supabase with the schema above
3. Build homepage directory with hardcoded seed data (5–10 entries)
4. Build `/play/[slug]` page with YouTube iframe embed
5. Add platform detection utility (parse URL → extract embed ID)
6. Add filter bar logic (client-side filter on homepage)
7. Build submit form → writes to Supabase with status = "pending"
8. Build basic admin page (list all videos, toggle status)
9. Add Amazon affiliate "Get the gear" CTA
10. Deploy to Netlify
