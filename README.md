# Superluxe Chauffeurs — Website Frontend

A premium, production-oriented **frontend** for Superluxe Chauffeurs (UK luxury chauffeur
service). Black-and-gold cinematic design, full 16-vehicle fleet, a five-step booking
engine, and integration-ready service abstractions.

> **Latest update:** real hero video, real vehicle photos (5 of 16), reference-inspired hero,
> clickable manufacturer brand scroller, and an interactive booking calendar with time slots
> and an unavailable-slot enquiry flow. Full details in **`CHANGELOG.md`**.

This package contains **two deliverables**:

| # | Deliverable | What it is | Where |
|---|---|---|---|
| 1 | **Demo site** | One self-contained `superluxe-demo.html` — no build step, opens in any browser, ideal for the client design review. The fully-interactive reference. | ./superluxe-demo.html` |
| 2 | **Next.js repo** | This folder — App Router + TypeScript + Tailwind, server-rendered for SEO, mirroring the demo with a clean, maintainable architecture. | `./` |

> **Scope:** frontend only. Booking creation, availability, pricing, payments, maps,
> email, CRM, chatbot and analytics are **mock/demo** behind service abstractions and are
> clearly labelled in the UI. See `DEMO-VS-CONNECTED.md`. Nothing fabricates business facts
> — see `OPEN-QUESTIONS.md` for the list of client confirmations needed.

---

## Run the Next.js project

Requirements: Node 18.17+ (or 20+), npm.

```bash
cd superluxe
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build    # builds all 44 static/SSG routes
npm run start
npm run typecheck
```

> **Fonts:** the project loads Playfair Display + Inter via a stylesheet `<link>` in
> `src/app/layout.tsx` so it builds offline. To self-host with zero layout shift, switch to
> `next/font/google` (a commented note in `layout.tsx` explains the one-line change).

---

## Architecture

```
src/
  app/                      # App Router pages (server-rendered)
    page.tsx                # Home (cinematic hero, fleet, services, airports, FAQ, CTA)
    fleet/ , fleet/[id]/    # Fleet grid + 16 vehicle detail pages
    services/ , [id]/       # Services index + 7 services + Chauffeur Service London
    airports/[id]/          # 5 airport templates (names TBC)
    book/                   # 5-step booking engine
    contact/ lookup/        # Quote form + booking lookup (demo states)
    about/ faq/ privacy/ terms/ not-found.tsx
    sitemap.ts robots.ts icon.svg
  components/               # Nav, Footer, Hero bits, VehicleCard, BookingWizard, Chat, Cookie…
  data/                     # SINGLE SOURCE OF TRUTH: fleet, services, airports, faqs,
                            #   navigation, pricing, brand settings
  services/                # Integration-ready abstractions (mock impls, see below)
  schemas/                 # Zod booking + enquiry schemas
  store/                   # Zustand booking store (session-persisted)
  lib/                     # formatting helpers
public/assets/             # images / videos / logos  (see ASSET-MAP.md)
```

### Service abstractions (`src/services/`)

Each is a typed module with a **mock implementation** and `TODO`s marking the real
integration point. Swap the body, keep the interface — the UI already consumes them.

`pricingService` · `availabilityService` · `bookingService` · `paymentService` ·
`mapsService` · `enquiryService` · `notificationService` · `chatService` · `analyticsService`

### Pricing

Implements the client formula in `pricingService.estimate()`:

```
Final = (OperationalHours × VehicleHourlyRate) + max(0, Miles − 100) × £2
```

First 100 miles included; £2/mile beyond. Overtime helper: 15-min grace, then charged per
half-hour unit. **Hourly rates in `data/fleet.ts` are illustrative placeholders** and every
auto-price is labelled "illustrative" until the real pricing API is connected.

---

## What's implemented

- ✅ All required public pages (Home, Chauffeur Service London, 5 airports, Corporate,
  Events, Weddings, Hourly Hire, Roadshows, Fleet, vehicle details, About, FAQ,
  Contact/Quote, Booking, Booking Lookup, Privacy, Terms, custom 404).
- ✅ Cinematic hero with **video-ready** container + animated fallback, poster, reduced-motion.
- ✅ All **16** fleet options (15 named + Other Vehicle POA) from central data.
- ✅ **Five-step** booking engine: progress, per-step validation, persistent state,
  sticky summary, availability states (confirmed / to-confirm / on-request / quote),
  POA → quote mode, illustrative price breakdown, demo payment + demo confirmation.
- ✅ Contact/quote form, booking lookup (found / not-found / invalid demo states).
- ✅ Chatbot demo widget (AI disclosure, never confirms bookings/prices), cookie consent,
  consent-gated analytics layer.
- ✅ SEO: per-page metadata, one H1, JSON-LD LocalBusiness, `sitemap.xml`, `robots.txt`,
  **server-rendered content readable without JS**, custom 404.
- ✅ Responsive desktop → small mobile; keyboard-accessible, visible focus, labelled fields,
  `prefers-reduced-motion`.

See `DEMO-VS-CONNECTED.md` for the demo-vs-live boundary and `OPEN-QUESTIONS.md` for the
client decisions required.

---

## Build output

`npm run build` produces 44 routes (home, 16 fleet, 5 airports, 8 services + London,
book/contact/lookup/about/faq/privacy/terms/404, sitemap, robots) — all prerendered as
static HTML (SSG), so key business content is in the server HTML for crawlers and AI search.
