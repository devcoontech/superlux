// Answers draw on the booking flow and the client's live site (superluxe.uk).
// Policy specifics that are still unconfirmed (lead times, allowances, deposit and
// cancellation terms — see OPEN-QUESTIONS.md) are deferred to the quotation rather
// than stated, so no policy is invented (WEB-05).
export const FAQS: Record<string, { q: string; a: string }[]> = {
  Bookings: [
    { q: "How do I book a chauffeur with Superluxe?", a: "Book online through our step-by-step booking flow, request a quotation through the contact form, or call us on 0203 745 5540. Choose your service, enter your journey details, select a vehicle and confirm." },
    { q: "How far in advance should I book?", a: "We recommend booking as early as possible to secure your preferred vehicle, especially for weddings, events and busy travel periods. For short-notice journeys, call us and we will tell you what is available." },
    { q: "Can I book on behalf of someone else?", a: "Yes. During checkout you can indicate you are booking for another passenger and provide their details along with any instructions for the chauffeur." },
    { q: "What details do you need from me?", a: "Your name, email and phone number, the pick-up and drop-off locations, the date and time, and the vehicle you would like. For hourly hire, tell us how many hours you need. Flight details and any special requests help us plan the journey." },
    { q: "Can I add stops to my journey?", a: "Yes. Add stops when you enter your journey details, or tell us your itinerary in the additional information field and we will plan the route around it." },
    { q: "Where do you operate?", a: "We provide chauffeur-driven travel across London and the wider UK. For journeys further afield or multi-day itineraries, send us your plans and we will prepare a tailored quotation." },
  ],
  Vehicles: [
    { q: "Which vehicles are available?", a: "Our fleet spans executive saloons, luxury SUVs, ultra-luxury marques and first-class people carriers. See the Fleet page for each vehicle's details and photography." },
    { q: "Can I select a specific vehicle?", a: "Yes. Choose your vehicle when you book. Where live availability is not yet confirmed, our team will verify it and come back to you before any payment is taken." },
    { q: "What if the vehicle I want isn't listed?", a: "Select \"Other Vehicle — Price on Application\" and request a quote. Our team will look to source a suitable vehicle." },
    { q: "How many passengers and bags can each vehicle take?", a: "Capacity varies by vehicle and is shown on each fleet listing. If your party or luggage is on the larger side, tell us when you enquire and we will recommend the right vehicle or arrange more than one." },
    { q: "Can you provide child seats or other special equipment?", a: "Tell us what you need in the special requests field when you book or enquire, and our team will confirm what can be arranged for your journey." },
  ],
  "Airport transfers": [
    { q: "Which airports do you cover?", a: "We provide transfers to and from Heathrow, Gatwick, Stansted, Luton and London City. For any other airport, ask us and we can quote on request." },
    { q: "Do you handle private jet arrivals?", a: "Yes. We specialise in private jet arrivals and VIP terminal transitions, with vehicles positioned as close to the aircraft as the airport permits." },
    { q: "Do you monitor flights?", a: "Share your flight number when you book, so that we can plan your pick-up around your arrival time. Flight details can be added in the additional information field." },
    { q: "Is meet-and-greet available?", a: "Meet-and-greet and additional waiting time can be configured per booking. Let us know your preference and your quotation will confirm what is included." },
    { q: "How is waiting time handled?", a: "Waiting-time allowances and any charges beyond them are set per service type. Your quotation will set out the allowance that applies to your journey." },
  ],
  "Chauffeurs & private hire": [
    { q: "Who will be driving me?", a: "A professional Superluxe chauffeur, trained to anticipate your needs before they arise. Discretion, punctuality and presentation are expected on every journey." },
    { q: "Can I request a female chauffeur?", a: "Yes. We can cater to specific requests for female chauffeurs only. Mention this when you book or enquire so that we can arrange it." },
    { q: "Do you offer long-term personal drivers?", a: "Yes. We offer dedicated personal drivers for long-term assignments, as well as long-term contracts for corporate clients. Contact us to discuss your requirements." },
    { q: "Can I hire a chauffeur by the hour?", a: "Yes. With hourly hire, your chauffeur and vehicle stay at your disposal for meetings, shopping, dining or city travel. Tell us how many hours you need and we will estimate from the vehicle's hourly rate." },
  ],
  "Corporate & events": [
    { q: "Do you work with businesses?", a: "Yes. We provide precisely timed executive travel for corporate clients, from single journeys to short-term roadshows and long-term personal driver contracts." },
    { q: "Can you manage a multi-day roadshow?", a: "Yes. We manage multi-stop, multi-day itineraries from end to end. Send your schedule and we will build a plan around it." },
    { q: "Do you provide wedding cars?", a: "Yes. We offer bespoke chauffeur services for weddings and high-end events, with the fleet presented immaculately for your day. Share your date and venues early so that we can reserve your chosen vehicle." },
    { q: "Can you supply vehicles for music videos and film shoots?", a: "Yes. We work with production crews and artists, and models such as our G63 Magno and Huracán are popular for their screen presence. Tell us your shoot dates, location and brief." },
  ],
  Payments: [
    { q: "How do I pay?", a: "Payments are processed securely through Stripe's hosted fields, and card details are never stored on our system. Deposit, full payment or pay-later options apply where available." },
    { q: "Which payment methods are accepted?", a: "Card payment is supported through Stripe. The options available for your booking are shown at checkout, or you can ask our team when you request a quotation." },
    { q: "How is my price worked out?", a: "Online estimates are based on the vehicle's rate and the hours required. Your final price is confirmed in your quotation and may reflect your route, timing, extra stops, waiting time, and airport or congestion charges." },
    { q: "Will I receive a receipt?", a: "Yes. A payment receipt is emailed automatically after each successful payment." },
  ],
  "Changes & cancellations": [
    { q: "Can I change my booking?", a: "Yes. Use the Manage Booking page with your reference and email to submit a change request, which our team will review. For urgent changes, please call us on 0203 745 5540." },
    { q: "What is your cancellation policy?", a: "Cancellation terms are shown during booking and apply to your reservation. If your plans change, contact us as soon as possible so that we can help." },
    { q: "How do I request a refund?", a: "Refunds are handled by our team in line with the terms of your booking, and are reflected in your booking's payment status. Contact us with your booking reference to start a request." },
  ],
};

export const faqSlug = (category: string) => category.toLowerCase().replace(/[^a-z]+/g, "-");
