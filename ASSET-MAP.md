# ASSET MAP — Superluxe Chauffeurs

This document tells you exactly what to supply and where it drops in, so **replacing
placeholders never requires redesigning the site**.

## Current status

| Asset | Status |
|---|---|
| Hero cinematic video + poster | ✅ **Integrated** (`HERO_Video.mp4`; poster auto-extracted) |
| All **15** named fleet vehicle photos | ✅ **Integrated** (official supplied photography) |
| Who We Are editorial photo | ✅ **Integrated** |
| Experience interior photo | ✅ **Integrated** |
| **7** service photos | ✅ **Integrated** |
| **5** airport photos | ✅ **Integrated** |
| Other Vehicle (POA) | ⬜ Crest placeholder by design (no photo) |
| Final CTA banner | ⬜ Styled dark banner (no dedicated image supplied) |
| Official logo | ⬜ Placeholder SVG wordmark (clean extraction not possible from the raster) |

In the self-contained **demo** (`superluxe-demo.html`) these real assets are embedded as
data URIs. In the **Next.js repo** they live under `public/assets/`:
`images/fleet/`, `images/services/`, `images/airports/`, `images/sections/`, `videos/`.
Section/service/airport image paths are mapped in `src/data/media.ts`; vehicle images in
`src/data/fleet.ts` (`VEH_IMAGE`).

Both deliverables share the same structure:

- **Demo site** (`superluxe-demo.html`) — single self-contained file; replace inline markers.
- **Next.js repo** (`/superluxe`) — put real files under `public/assets/…` and update the component noted.

---

## 1. Logo

**Status:** temporary SVG wordmark (white "Superluxe" + gold ".uk" + gold roofline swoosh),
built to match the reference image. A clean transparent extraction was **not** possible from
the supplied raster (the mark sits over a photographic background), so per your instruction a
labelled text-based wordmark is used.

| Where | Demo site | Repo |
|---|---|---|
| Source | `logoSVG()` function in the inline `<script>` | `src/components/Logo.tsx` |
| Used in | nav, mobile menu, footer | nav, mobile menu, footer |

**To replace with the official logo:**
1. Add the official asset: `public/assets/logos/superluxe-logo.svg` (preferred) or `…-logo.png` (transparent, ≥ 600 px wide @2x).
2. Repo: in `src/components/Logo.tsx`, replace the inline `<svg>` with `<img src="/assets/logos/superluxe-logo.svg" alt="Superluxe Chauffeurs" height={44} />` (or `next/image`).
3. Demo: swap the markup returned by `logoSVG()` for an `<img>` tag pointing at the file.
4. Keep original proportions, colours and typography. Do not recreate or approximate it.

> If you can provide the **original vector logo**, send it and it drops straight in.

---

## 2. Hero background video (cinematic)

**Status:** the hero ships with a **video-ready container** and an elegant animated
dark/gold fallback (glow, light streaks, car silhouette) rendered until a real source
is supplied. Muted autoplay, loop, `playsInline`, poster, mobile fallback and
`prefers-reduced-motion` support are all already wired.

| Where | Demo site | Repo |
|---|---|---|
| Markup | `<video id="heroVideo">` in `homePage()` + `.hero-fallback` | hero `<section>` in `src/app/page.tsx` |

**To add the real video:**
1. Supply: `public/assets/videos/hero.mp4` **and** `public/assets/videos/hero.webm` (modern, smaller).
2. Add a poster still: `public/assets/images/hero-poster.jpg`.
3. (Optional) a lighter mobile cut: `public/assets/videos/hero-mobile.mp4`.
4. Demo: uncomment the `<source>` lines inside `<video>`, set `poster="assets/images/hero-poster.jpg"`, and the script auto-hides the animated fallback once the video loads (and keeps the fallback if autoplay is blocked or reduced-motion is on).
5. Repo: replace the fallback `<div>` in `src/app/page.tsx` with a `<video autoPlay muted loop playsInline poster="/assets/images/hero-poster.jpg">` carrying the two `<source>` tags.

**Recommended encode:** 1920×1080 (or 2560×1440), H.264 MP4 + VP9/AV1 WebM, ~8–12 s seamless
loop, no audio, ≤ 6 MB target, 24–30 fps. Elegant, calm luxury footage (a black saloon
through a city at night, arrival at a hotel) — not racing/drifting. Licensed stock or
client-owned only.

---

## 3. Hero poster image

`public/assets/images/hero-poster.jpg` — 1920×1080, matches the first frame of the video.
Shown instantly while the video loads (and as the ultimate fallback).

---

## 4. Vehicle photography — 16 slots

**Status:** each vehicle has its **own** brand-styled silhouette placeholder (varied by body
type) and a dedicated image slot keyed by vehicle `id`. Placeholders are labelled
"IMAGE PLACEHOLDER" and a corner "Placeholder" chip.

- **Demo:** art comes from `vehSVG(type)`; to use photos, replace the `.v-media` / `.veh-thumb` contents with `<img>` keyed off the vehicle id.
- **Repo:** art comes from `src/components/VehicleArt.tsx`; the cleanest swap is to add an `image` field to each vehicle in `src/data/fleet.ts` and render `<Image>` in `src/components/VehicleCard.tsx` and `src/app/fleet/[id]/page.tsx`.

**Drop real photos at `public/assets/images/fleet/<id>.webp`** using these exact ids:

| # | Vehicle | File | Status |
|---|---|---|---|
| 1 | Mercedes E-Class | `fleet/mercedes-e-class.webp` | ✅ supplied |
| 2 | Mercedes S-Class | `fleet/mercedes-s-class.webp` | ✅ supplied |
| 3 | Mercedes S-Class Maybach | `fleet/mercedes-s-class-maybach.webp` | ✅ supplied |
| 4 | Mercedes GLS Maybach | `fleet/mercedes-gls-maybach.webp` | ✅ supplied |
| 5 | Range Rover | `fleet/range-rover.webp` | ✅ supplied |
| 6 | Rolls-Royce Cullinan | `fleet/rolls-royce-cullinan.webp` | ✅ supplied |
| 7 | Rolls-Royce Phantom | `fleet/rolls-royce-phantom.webp` | ✅ supplied |
| 8 | Rolls-Royce Ghost | `fleet/rolls-royce-ghost.webp` | ✅ supplied |
| 9 | Mercedes G63 | `fleet/mercedes-g63.webp` | ✅ supplied |
| 10 | Mercedes V-Class | `fleet/mercedes-v-class.webp` | ✅ supplied |
| 11 | Mercedes Sprinter (Jet Class) | `fleet/mercedes-sprinter-jet.webp` | ✅ supplied |
| 12 | Mercedes V-Class (Jet Class) | `fleet/mercedes-v-class-jet.webp` | ✅ supplied |
| 13 | Cadillac Escalade | `fleet/cadillac-escalade.webp` | ✅ supplied |
| 14 | BMW i7 | `fleet/bmw-i7.webp` | ✅ supplied |
| 15 | Bentley Bentayga | `fleet/bentley-bentayga.webp` | ✅ supplied |
| 16 | Other Vehicle (POA) | *crest placeholder by design* | — |

To add a missing one: drop `public/assets/images/fleet/<id>.webp` and add the id to
`VEH_IMAGE` in `src/data/fleet.ts` (demo: add it to the `vehicles` map injected into
`superluxe-demo.html`). The card switches from placeholder to photo automatically.

**Use the correct model for each card** (do not show an E-Class under an S-Class, etc.).
Licensed or client-owned images only; no watermarks.

**Recommended specs:** card thumb 16:10, detail hero 16:11, export **WebP/AVIF**,
~1600 px wide, consistent colour grade (dark, cinematic). Provide `@2x` where possible.
Set width/height to avoid layout shift (already handled by the aspect-ratio containers).

---

## 5. Editorial / section imagery

Placeholders used in: intro section, luxury-experience section, service cards (×8),
airport cards (×5), occasion cards, page-hero banners, final CTA banner.

| Suggested file | Use | Ratio |
|---|---|---|
| `images/editorial-lifestyle.webp` | "Who we are" intro | 4:3 |
| `images/interior.webp` | Luxury experience | 4:3 |
| `images/service-<serviceId>.webp` | Service cards & detail heroes | 4:3 / landscape |
| `images/airport-<id>.webp` | Airport cards & pages | 3:4 / landscape |
| `images/cta-night-drive.webp` | Final CTA banner | wide landscape |
| `images/about-brand.webp` | About page | 3:4 |

Swap the `Placeholder` component (repo) / `phImg()` output (demo) for `<Image>`/`<img>`.

---

## General image guidance

- Prefer **WebP or AVIF**; keep JPEG/PNG only as fallback.
- Lazy-load everything below the fold (Next `<Image>` does this automatically).
- Always set dimensions / aspect ratio (containers already enforce this).
- Write meaningful `alt` text (data-driven from the vehicle/service name).
- Prioritise the hero poster (above the fold).
