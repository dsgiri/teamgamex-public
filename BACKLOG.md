# Product Backlog — TeamGameX MVP

This backlog follows the Agile Software Project Management methodology. It contains prioritized User Stories, Epics, Sprints, and Acceptance Criteria required for the launch of the TeamGameX 4-screen MVP.

---

## 🏃 Sprint Planning

### Sprint 1: Core Foundation & Data Setup (Active)
* **Goal:** Set up mock database schemas, platform detection parser, and standard routing paths.
* **Stories:**
  * [TG-101] Create Video Database Schema & Mock Data
  * [TG-102] Set up Routing/URL Structure

### Sprint 2: Directory & Video Player Experience
* **Goal:** Deliver high-fidelity Homepage Directory and Video Detail Player view.
* **Stories:**
  * [TG-201] Build Screen 1: Homepage Directory (slate-dark themed grid & filters)
  * [TG-202] Build Screen 2: Video Player & Detail page (embed player + stats grid + Amazon gear CTA)
  * [TG-203] Build Platform Detection Utility

### Sprint 3: Crowdsourced Intake & Management
* **Goal:** Enable community submissions and admin dashboard workflows.
* **Stories:**
  * [TG-301] Build Screen 3: Submit a Game public form
  * [TG-302] Build Screen 4: Admin Dashboard (Metrics cards & submission review table)

---

## 📋 Epic 1: Directory UI & Browsing
### [TG-201] Homepage Directory (Screen 1)
* **Description:** As an activity director, I want to browse a visually appealing, categorized grid of senior-friendly team games so that I can quickly select one for our daily programming.
* **Tasks:**
  * Implement tag header and sub-tagline matching Screen 1.
  * Build category filter buttons (Memory, Movement, Trivia, Music, Low mobility, Groups 5+).
  * Build platform filter buttons (All, YouTube, TikTok, Instagram, LinkedIn).
  * Build grid card component showing title, duration, player count, category badges, and platform icon.
* **Acceptance Criteria:**
  * Displays default list of 15 game listings.
  * Selecting category/platform filters automatically updates card grid in real-time.
  * Layout is responsive on desktop, tablet, and mobile browsers.

### [TG-202] Video Player & Detail View (Screen 2)
* **Description:** As a user, I want to view a game's full short-video gameplay, see game statistics, and get gear suggestions so I can easily run the activity.
* **Tasks:**
  * Mount responsive video iframe container on `/play/[slug]`.
  * Display metadata panel (Players, Duration, Mobility levels, Gear cost).
  * Display description block and tags.
  * Integrate "Get the gear" button pointing to Amazon affiliate links.
  * Build "Up Next" sidebar showing other related games.
* **Acceptance Criteria:**
  * Video embed loads properly based on detected platform.
  * Clicking "Get the gear" redirects to Amazon in a new tab.
  * "Up Next" links route to corresponding slug detail pages.

---

## 📋 Epic 2: Intake & Curation
### [TG-301] Crowdsourced Submission Form (Screen 3)
* **Description:** As a community visitor, I want to submit team building videos I find online so they can be reviewed and added to the directory.
* **Tasks:**
  * Build form at `/submit` with Video URL, Name, Category, Mobility, Players (min/max), Duration, Amazon Link, and Description inputs.
  * Implement auto-detect hooks that read the URL and identify the host platform (YouTube, TikTok, etc.).
  * Handle mock submit logic by saving submission state.
* **Acceptance Criteria:**
  * Form prevents submission if required fields are missing.
  * Auto-detect shows detected platform badge dynamically based on URL input.

### [TG-302] Admin Dashboard & Submissions Queue (Screen 4)
* **Description:** As an administrator, I want to review submitted games, view key application metrics, and approve/reject entries.
* **Tasks:**
  * Build admin dashboard layout at `/admin`.
  * Display metric boxes (Total videos, Pending reviews, Monthly plays, Gear clicks).
  * Display interactive table showing recent submissions with platform badges, categories, and review statuses.
  * Implement Approve and Reject button actions to move items into "Live" or "Rejected" states.
* **Acceptance Criteria:**
  * Metrics show correct counts from the database state.
  * Approving an item updates its status to Live and populates it in the main Directory grid.
