# Changelog — TeamGameX MVP

All notable changes to the TeamGameX project will be documented in this file. This project adheres to Semantic Versioning.

---

## [1.0.0-rc2] — 2026-06-13
### Added
* Created root [`BACKLOG.md`](file:///C:/Users/z00545fp/Documents/teamgamex-public/BACKLOG.md) detailing Agile user stories, acceptance criteria, and Sprint breakdowns.
* Created [`PROJECT-ABOUT.md`](file:///C:/Users/z00545fp/Documents/teamgamex-public/PROJECT-ABOUT.md) project brief.

### Fixed
* Fixed Netlify build failure due to missing `resend` dependency by adding it to `web-teamgamex/package.json` dependencies.
* Fixed peer dependency mismatch on Clerk authentication by upgrading `react` and `react-dom` to `19.2.7` in `web-teamgamex/package.json`.

---

## [1.0.0-rc1] — 2026-06-13
### Added
* Initialized root-level [`.gitignore`](file:///C:/Users/z00545fp/Documents/teamgamex-public/.gitignore) to protect environment variables (`.env.local`), next build outputs, and remove untracked node_modules.
* Created root [`README.md`](file:///C:/Users/z00545fp/Documents/teamgamex-public/README.md) file containing the directory structure, environment variables instructions, and startup flows.
* Configured local repository and pushed staged directories (`teamgamex-studio`, `web-teamgamex`) to GitHub.
* Setup Clerk authentication wrapper, Supabase backend helpers, and Stripe checkout skeleton endpoints.
