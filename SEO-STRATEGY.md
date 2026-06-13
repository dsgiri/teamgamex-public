# TeamGameX — SEO Strategy

This document details the search engine optimization (SEO) strategy for TeamGameX to establish authority, drive organic video impressions, and optimize for both traditional search engines and AI discovery systems.

---

## 🎯 1. Niche & Market Opportunity

The elder activity planning space is wide open. Key search phrases such as **"team games for seniors"** and **"group games assisted living"** are actively searched by activity directors, care coordinators, and senior facility planners. 

* **The Competitor Gap:** Major senior living directories (e.g., A Place for Mom, Caring.com) rank for high-level general terms, but only publish basic, static lists without direct video tutorials or supply recommendations.
* **The Solution:** TeamGameX captures this intent directly by delivering dedicated video-backed pages for specific senior-friendly team games. A collection of 20–30 highly optimized game pages will allow TeamGameX to capture primary rankings in this underserved vertical.

---

## 📹 2. Video Search & Structured Schema (The Secret Weapon)

Google has a dedicated **Video** tab and displays visual carousels directly inside general search results. We maximize this traffic channel by implementing `VideoObject` structured markup on every detail page.

* **Target Page:** `/play/[...slug]`
* **Schema Implementation:** Structured JSON-LD metadata containing the following fields:
  * `@context`: `"https://schema.org"`
  * `@type`: `"VideoObject"`
  * `name`: Game title
  * `description`: Benefit/Description of the activity
  * `thumbnailUrl`: High-resolution preview image path
  * `uploadDate`: Publication date
  * `embedUrl`: Embed URL pointing to the player (YouTube, TikTok, Facebook Reel)
* **Impact:** This allows Google to index our video players natively, generating visual search result snippets that drive higher Click-Through Rates (CTR) than plain text links.

---

## 🔬 3. The Clinical & Research Angle (E-E-A-T)

Activity directors and coordinators answer directly to clinical directors and facility operators. To drive B2B adoption in professional care settings, TeamGameX positions itself as an evidence-based resource rather than just a hobby website.

* **Evidence Integration:** Highlighting research findings that show team-based gameplay is significantly more effective than individual games for improving short-term memory, coordination, and attention span in senior cohorts.
* **Sources:** Citing publications such as *National Health Service Journals (NHSJS)* and expert practitioner insights from *Senior Living Smart*.
* **Implementation:** Referencing these peer-reviewed cognitive benefits directly in game cards, meta descriptions, and detail pages.

---

## 🤖 4. AI Engine & LLM Search Optimization

AI search assistants (ChatGPT, Google Gemini, Perplexity) have changed the organic search funnel. Because these engines summarize content and cite source directories, our strategy targets inclusion in the LLM citation pool.

* **Pillar Content:** Publishing a central, authoritative resource: *"Why Team Games Work — The Research"*.
* **Optimization for LLMs:** Stating clear facts, bulleted step-by-step game structures, and research conclusions to allow LLM crawlers to easily parse, extract, and cite TeamGameX when users prompt AI with queries like *"recommend cooperative memory games for a senior care home"*.
