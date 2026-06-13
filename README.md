# TeamGameX

Welcome to the **TeamGameX** repository! This monorepo contains the Next.js web application frontend and the Sanity Studio content management system that powers the [teamgamex.com](https://teamgamex.com) platform.

* **GitHub Repository:** [dsgiri/teamgamex-public](https://github.com/dsgiri/teamgamex-public)
* **Production Domain:** [teamgamex.com](https://teamgamex.com)

---

## 🏆 Latest Functionality Wins (Feature Highlights)

We have successfully synchronized and added the following enterprise-grade capabilities:

### 🔐 Clerk Authentication & Dark Theme
* Integrates `@clerk/nextjs` for seamless user registration, logins, and profile management.
* Configured with a modern dark theme (`@clerk/themes`) styled with the sleek **Outfit** typography.

### 💳 Stripe Subscription Billing
* Fully integrated checkout flows supporting multiple tiers: **Starter**, **Pro**, and **Elite**.
* Built-in Stripe Webhook handlers (`/api/webhooks/stripe`) utilizing `svix` and `micro` to verify signatures and update user subscriptions.

### 🗄️ Supabase Data Persistence
* Connected Supabase Client (`/lib/supabase.ts` & `/lib/supabaseAdmin.ts`) to manage persistent user data, session lookups, and subscriber statuses.

### 🎥 Multi-Source Video Player
* Upgraded `components/VideoPlayer.tsx` to dynamically detect YouTube links, extract video IDs, and load embeds.
* Added a native HTML5 video fallback with full controls for direct video sources (e.g. `.mp4`, `.webm` streaming).

### 🔍 Discovery & Vibe Navigation
* Implemented a search bar and category filters matching vibes like *🧠 Cognitive Stimulation*, *🎨 Get Crafty*, *🪑 Seated Fun*, and *🏃 Physical Activity*.

### 📊 B2B & MDS Compliance Logging
* Added capabilities for automatic **MDS Section F log generation** to assist senior care facilities with documentation.

---

## 📁 Repository Structure

* **[`web-teamgamex/`](file:///C:/Users/z00545fp/Documents/teamgamex-public/web-teamgamex)**: Next.js web application (blog, member portal, payments, APIs).
* **[`teamgamex-studio/`](file:///C:/Users/z00545fp/Documents/teamgamex-public/teamgamex-studio)**: Sanity Studio (v5) schema definitions and CMS editor panel.
* **`migrate-fields.js`**: Database script for bulk migrating `videoPost` attributes (e.g., matching older fields like `userBenefit` to `playerBenefit`).
* **`TerminalWin.txt`**: Fast terminal execution guide for webhooks and servers.

---

## 🚀 Getting Started

### 1. Environment Configuration

Create a `.env.local` file inside the `web-teamgamex/` folder matching this schema:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="vmnp0kg7"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_WRITE_TOKEN="your-write-token"

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://...supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Stripe Plan Prices
NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID="prod_..."
NEXT_PUBLIC_STRIPE_ELITE_PRICE_ID="prod_..."
```

### 2. Startup Workflows

#### Run Next.js Frontend
```bash
cd web-teamgamex
npm install
npm run dev
```
Accessible at [http://localhost:3000](http://localhost:3000).

#### Tunnel Stripe Webhooks
To handle Stripe events locally:
```bash
# 1. Start tunnel
npx ngrok http 3000

# 2. Forward Stripe webhooks
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

#### Run CMS Studio
```bash
cd teamgamex-studio
npm install
npm run dev
```

---

## 🔄 Content Migrations

To migrate old field schemas inside Sanity:
```bash
node migrate-fields.js
```
