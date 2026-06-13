# Coding Agent Guidelines — TeamGameX

Welcome, Agent! This document defines the development rules, style guides, workflow standards, and architecture layout you must strictly adhere to when building or modifying TeamGameX.

---

## 🎯 1. Mission & Goals
* **Objective:** Deliver a highly performant, accessible, and curated video directory app for senior/assisted living activity planning.
* **Target Audience:** Activity Directors & Care staff who require fast, reliable tools (often browsing on mobile devices).

---

## 🛠️ 2. Core Directory Layout

* **[`web-teamgamex/`](file:///C:/Users/z00545fp/Documents/teamgamex-public/web-teamgamex)**: Next.js Frontend.
  * Uses the **Pages Router** configuration (located under `pages/`).
  * Authentication handled via Clerk (`@clerk/nextjs`).
  * Database persistence via Supabase (`@supabase/supabase-js`).
  * Payments handled by Stripe (`stripe`).
* **[`teamgamex-studio/`](file:///C:/Users/z00545fp/Documents/teamgamex-public/teamgamex-studio)**: Sanity Studio (v5) for schema modeling.
* **`BACKLOG.md`**: Tracks product backlog and Sprint user stories.
* **`CHANGELOG.md`**: Logs all completed changes and bugfixes.

---

## 🎨 3. Design & Styling Rules
1. **Theme Aesthetics:** Clean, slate-dark/slate-950 UI with high contrast text. 
2. **Fonts:** Use Google Fonts Outfit for headings and standard sans-serif fallback interfaces.
3. **Accessibility:** Ensure buttons, inputs, and player statistics use large, readable font sizes and accessible spacing.
4. **Colors:**
   * **Primary:** Blue (`#185FA5`)
   * **Health/Memory Categories:** Teal (`#1D9E75`)
   * **Easy/Low-Cost Badges:** Amber/Yellow
5. **Performance:** Never auto-play videos on the homepage grid. Use static thumbnails/placeholders and load embed players lazily on detail pages.

---

## 🔒 4. Security & Environment Variables
* **Secrets:** Never write API keys or tokens directly in codebase files. Always utilize environment variables.
* **`.env.local` Protection:** Verify `.env.local` files inside folders are excluded from Git commits by checking the `.gitignore` setup.

---

## 🔄 5. Git & Agile Workflows
* **Updates:** Keep `CHANGELOG.md` up to date with major version releases and features.
* **Commits:** Write clear, concise commit logs containing action category prefixes, e.g.:
  * `Feat: add auto-detect social url mechanism`
  * `Fix: solve Clerk redirect loop on page loads`
  * `Docs: update AGENTS.md instruction files`
* **Lockfiles:** Do not run arbitrary updates. Lock dependency installations to exact versions specified in `package.json` to prevent peer dependency conflicts.
