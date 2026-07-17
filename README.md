# Laluna Tailor Coupon Landing Page

QR-code landing page for guests of Laluna Hoi An Riverside Hotel & Spa. Guests browse 4
partner tailor shops, view info, and request a 10%-off coupon that's emailed to them
(with the hotel CC'd). No database — coupon codes are generated on the fly and delivered
by email only.

## Stack

- **Next.js (App Router) + TypeScript + Tailwind** — single page app, deployed as a static
  frontend + serverless API route.
- **`/api/coupon`** — Next.js Route Handler (runs as a Vercel serverless function) that
  validates the form, generates a `LALUNA-XXXXXXXX` code, and sends the email.
- **[Resend](https://resend.com)** — transactional email delivery.
- **[Zalo Bot](https://bot.zapps.me)** — posts a coupon notification to a hotel staff Zalo
  chat (best-effort: if this fails, the guest's email still goes out).
- **Zod** — request validation.

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the env template and fill in real values:
   ```bash
   cp .env.example .env.local
   ```
   - `RESEND_API_KEY` — from https://resend.com/api-keys
   - `FROM_EMAIL` — an address on a domain verified in Resend (use `onboarding@resend.dev`
     to test before your domain is verified)
   - `HOTEL_EMAIL` — the hotel inbox that should be CC'd on every coupon email
   - `ZALO_BOT_TOKEN` — token for your Zalo bot
   - `ZALO_CHAT_ID` — the group/chat id the bot should post coupon notifications into
3. Run the dev server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000.

## Editing content

- **Hotel logo**: drop the file at `public/logo.png` (displayed in the page header via
  [components/HotelLogo.tsx](components/HotelLogo.tsx)). Until it's added, the header just
  shows the hotel name text — no broken image icon.
- **Shops** (name, address, logo, description/story): [lib/shops.ts](lib/shops.ts).
  Drop logo images into [public/shops/](public/shops/) matching the filenames referenced
  there. If a logo is missing, the card falls back to a circle with the shop's initials.
- **Coupon form fields**: [lib/formFields.ts](lib/formFields.ts). This one file drives both
  the rendered form and the server-side validation — add, remove, reorder, or change
  required/optional there and both sides stay in sync.
- **Email template / hotel branding**: [lib/email.ts](lib/email.ts).
- **Zalo staff notification text**: [lib/zalo.ts](lib/zalo.ts).
- **Coupon code format / discount %**: [lib/coupon.ts](lib/coupon.ts).

## Deploying to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In [Vercel](https://vercel.com/new), import the repo — it auto-detects Next.js, no
   config needed.
3. Add the environment variables from `.env.example` under **Project Settings →
   Environment Variables** (`RESEND_API_KEY`, `FROM_EMAIL`, `HOTEL_EMAIL`, `ZALO_BOT_TOKEN`,
   `ZALO_CHAT_ID`).
4. Deploy. Point your QR code at the resulting `*.vercel.app` URL (or a custom domain
   added in Vercel's Domains settings).

For real deliverability, verify your own sending domain in Resend (Resend dashboard →
Domains) and use an address on it for `FROM_EMAIL` — the shared `onboarding@resend.dev`
sender is rate-limited and meant for testing only.
