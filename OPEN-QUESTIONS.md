# Open questions & client confirmations needed

No business facts have been invented. Everywhere a confirmed fact is missing, the build uses
a **clearly-labelled placeholder**. This is the list to resolve before launch. Items marked
**⚠ conflict** are specification discrepancies preserved (not silently resolved) per brief.

## Specification conflicts (preserve both; client to confirm)

1. **⚠ Email required vs optional.** The functional requirements (BKG-10, booking lookup,
   notifications) require an email address; the additional client Q&A described email as
   *optional*. The frontend keeps this **configurable** via `EMAIL_REQUIRED` in
   `src/schemas/booking.ts` (currently `true`). Confirm the final rule.

2. **⚠ Payment methods.** The functional spec specifies **Stripe hosted fields**. The client
   Q&A also mentioned Visa, PayPal, Klarna, Apple Pay, Google Pay (Android Pay) and OneLink.
   These are shown as options labelled "subject to config" and are **not** claimed as
   available. Note: *Visa is a card network, not a separate gateway.* Confirm which methods
   the client's payment account actually supports.

## Pricing (needed to switch from illustrative to real)

3. **Vehicle hourly rates** — the per-vehicle fixed rates (formula input). Current values are
   illustrative placeholders in `src/data/fleet.ts`.
4. **Exact RM11 pricing base** — only the postcode `RM11` was supplied (preserved exactly).
   The full base address is **not** invented.
5. **Minimum hire periods** (per service), **surcharge amounts** (night, bank holiday, peak,
   congestion, airport/parking, extra stops, waiting), **free waiting-time allowances**.
6. **Overtime rounding rule** — 15-min grace + half-hour units implemented; confirm whether a
   started half-hour block always rounds up (currently `roundUp = true`, configurable).
7. **Deposit % / amount, pay-later eligibility, cancellation & refund terms.**

## Fleet

8. **Passenger & luggage capacities** for all 15 named vehicles (currently *indicative*,
   marked with `*`). **Features/specs** per vehicle. Confirm exact figures.
9. **Vehicle photography** — ✅ all 15 named vehicles now have official photos. (Section,
   service and airport photography also supplied and integrated.)

## Airports

10. **The five airports** are now shown as Heathrow, Gatwick, Stansted, Luton and London City, by developer
    decision. Confirm them. Only the Heathrow and London City photos show those airports; Gatwick and
    Stansted use generic images, and Luton's shows HK Express aircraft, so please supply better photos.

## Brand & business facts (placeholders until confirmed — WEB-12)

11. **Official logo** asset (ideally original vector) — see `ASSET-MAP.md`.
12. **Email address** is still a placeholder. **Phone (0203 745 5540), address (Mayfair Place,
    London W1J 8AJ)** and the items in 14–15 were taken from the client's live site
    (superluxe.uk); confirm they are current. Also confirm whether Mayfair or RM11 is the base.
13. **Licensing, insurance statements, chauffeur credentials, guarantees** — none published
    until verified (e.g. the "24/7 support" stat is marked as a placeholder).
14. **Company history / awards** — only "Established 2008" is published (from the live site).
15. **Social media accounts** — Instagram, TikTok and WhatsApp links come from the live site.
16. **FAQ policy answers** — no bracketed placeholders remain on the page, but specifics
    (cancellation and refund terms, deposit, payment methods, meet-and-greet inclusions, lead
    time, waiting allowances, flight tracking) are deferred to the quotation or booking
    terms. Replace with exact terms once confirmed. Child-seat availability is also unconfirmed.
    The live site also lists a Music Video service, personal drivers and female chauffeurs, now
    mentioned on About, FAQ and Contact. Confirm these, and whether Music Video needs its own page.
    The live site's fleet and hourly rates differ from `src/data/fleet.ts`; confirm which is right.
    Fleet detail pages make general quality statements (care standards, comfort, technology and
    safety). Confirm them, plus any onboard extras to add (e.g. Wi-Fi, bottled water). Reviews
    and testimonials are left out until real ones are supplied.
    Brand logos in `public/assets/logos/brands/` are from Simple Icons (CC0); they remain the
    manufacturers' trademarks, so confirm the client is happy to display them.
    On-page notices marked as demo, illustrative or placeholder were removed at the developer's request, so
    placeholder rates and capacities now appear as normal content. Replace them with real figures, and
    connect the booking, payment and enquiry services, before launch (see DEMO-VS-CONNECTED.md).
    Colour logos come from worldvectorlogo.com, whose licence terms are unclear; replace with official files.
17. **Privacy Policy & Terms & Conditions** — placeholder pages ready for client copy.

## Assets

18. **Hero cinematic video** — ✅ supplied and integrated. (Optional: a lighter mobile-cut
    encode and a WebP/AV1 version for performance; see `ASSET-MAP.md`.)

## Integrations (need keys/accounts — see DEMO-VS-CONNECTED.md)

19. Stripe account · Google Maps API key + proxy · transactional email sending domain ·
    CRM (custom build **or** third-party route per spec §23) · AI assistant + approved
    knowledge base · analytics property · Search Console / Bing verification.
