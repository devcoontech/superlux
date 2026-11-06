# Demo vs Connected — feature status

This is a **frontend** build. The table is the honest boundary between what works now and
what needs a backend/provider. Everything in the "Demo" column is **clearly labelled in the
UI** and never claims to be live.

| Capability | Status | Notes / how it's handled now |
|---|---|---|
| Public pages & navigation | ✅ Connected (real) | All routes render, server-rendered HTML. |
| Responsive / accessibility / SEO output | ✅ Connected (real) | Metadata, JSON-LD, sitemap, robots, H1s, focus, reduced-motion. |
| Hero video + poster | ✅ Real (client-supplied) | `HERO_Video.mp4`; muted/autoplay/loop/inline, poster, reduced-motion fallback. |
| Fleet data & presentation | ✅ Real data; 5 real photos, rest placeholder | 16 vehicles from `data/fleet.ts`; Bentayga, G63, Cullinan, V-Class (+Jet) are real photos; capacities **indicative**, rates **illustrative**. |
| Manufacturer brand scroller | ✅ Real (frontend) | Clickable marques filter the Fleet page. Text wordmarks (no official logo assets). |
| Booking flow (5 steps) | ⚙️ Demo | Real UI + validation + state; no backend booking is created. Confirmation is labelled "Demo". |
| Booking calendar & time slots | ⚙️ Demo availability | Interactive calendar (past dates disabled) + slot states (available / on-request / booked). **Availability is demonstration data, not live** — kept in a separate, configurable `slotService`. Unavailable slot → enquiry form, no payment. |
| Vehicle availability | ⚙️ Demo | States shown (confirmed / to-confirm / on-request / quote) from static flags. Needs availability API. |
| Pricing | ⚙️ Demo (illustrative) | Client formula implemented in `pricingService`; rates are placeholders. Needs pricing API. |
| Payments (Stripe) | ⚙️ Demo | Payment UI only; **no card data collected or stored**. Needs Stripe hosted fields + server. |
| Apple/Google Pay, PayPal, Klarna, OneLink | ⚙️ Demo, labelled "subject to config" | Shown as options; availability depends on the client's provider setup — **not** claimed as live. |
| Google Maps autocomplete & route distance/time | ⚙️ Demo | Manual entry; `mapsService` ready. Needs API key + server proxy (never expose secrets client-side). |
| Contact / quote submission | ⚙️ Demo | Validates + shows success; `enquiryService` ready. Needs CRM intake + emails. |
| Booking lookup | ⚙️ Demo | Found / not-found / invalid states via sample reference. Needs CRM read. |
| Automated emails / notifications | ❌ Not connected | `notificationService` stub. No emails are sent; UI never claims they were. |
| CRM, dispatch, drivers, reporting | ❌ Out of frontend scope | Backend/admin platform (spec §8–19). Data structures kept integration-ready. |
| AI chatbot | ⚙️ Demo | Rule-based replies, AI disclosure, never confirms bookings/prices. Needs real assistant + KB. |
| Flight tracking | ❌ Not built (optional add-on) | No fake live tracking. Placeholder copy only. |
| Analytics / conversion events | ⚙️ Demo, consent-gated | `analyticsService` layer; events fire only after consent; no real events sent. |
| Cookie consent | ✅ Real (frontend) | Accept / reject; analytics gated on consent. |
| Search Console / Bing verification | ❌ Not done | Requires account access; not claimed. |

**Legend:** ✅ real · ⚙️ demo (labelled in UI) · ❌ not connected / out of scope

### Integration checklist (when wiring the backend)
1. Implement the real bodies of the nine `src/services/*` modules (interfaces already match the UI).
2. Point `bookingService`/`enquiryService` at the documented intake interface (idempotent).
3. Add Stripe hosted fields + server PaymentIntents; wire webhooks for payment status.
4. Add a Google Maps server proxy + key; enable autocomplete and route calc in `mapsService`.
5. Replace `pricingService` placeholder rates with the real pricing API so booking, CRM
   quotes and the chatbot return identical prices.
6. Connect `notificationService` to the client's sending domain.
7. Connect `chatService` to the approved-knowledge-base assistant with staff handoff.
8. Initialise the real analytics provider inside `analyticsService.grantConsent()`.
