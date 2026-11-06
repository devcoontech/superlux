import type { Vehicle, VehicleBody } from "./fleet";

// Fleet detail copy, built from each vehicle's type and data. Only general qualities of
// these vehicle classes are stated: no model specs, onboard extras (Wi-Fi, refreshments)
// or review scores, until the client confirms them (OPEN-QUESTIONS.md).
type Tailored = { bestFor: string; about: string; interior: string; suited: string };

const BY_TYPE: Record<Exclude<VehicleBody, "poa">, Tailored> = {
  saloon: {
    bestFor: "business travel, airport transfers and discreet city journeys",
    about: "Understated from the outside and calm on the inside, it lets you arrive looking composed without drawing unwanted attention, which is why saloons of this class are a favourite for executive travel.",
    interior: "The rear cabin is designed as a quiet place to work or unwind, with supportive seating and generous legroom. It is an easy place to take a call, prepare for a meeting or simply switch off between appointments.",
    suited: "It suits solo executives and small parties especially well, including clients you want to make a strong first impression on.",
  },
  limo: {
    bestFor: "weddings, premieres, VIP arrivals and milestone occasions",
    about: "Few cars carry this much presence. Every arrival feels like an occasion, while the ride itself stays serene, making it a natural choice when the journey matters as much as the destination.",
    interior: "The rear of the cabin is where this car comes into its own, with hand-finished materials, sumptuous seating and exceptional quietness. The result feels closer to a private lounge than a conventional car.",
    suited: "It is ideal when you want to mark a special moment or look after a guest of honour.",
  },
  suv: {
    bestFor: "airport transfers, family travel, events and long-distance journeys",
    about: "A raised driving position and a commanding road presence give this SUV real confidence, while its spacious cabin keeps passengers relaxed on long journeys and short city hops alike.",
    interior: "Inside there is room to stretch out, with elevated seating, an airy feel and premium materials throughout. Generous luggage space means bags stay out of the way, even on the way to the airport.",
    suited: "It works especially well for small groups and for anyone travelling with more luggage than a saloon comfortably holds.",
  },
  van: {
    bestFor: "group travel, corporate teams, roadshows and airport runs with luggage",
    about: "It keeps your whole party together in one vehicle, so nobody is left in a second car and conversations can carry on between stops. Space and comfort come first, for passengers and luggage alike.",
    interior: "The cabin is arranged around people, with room to sit comfortably, talk and move between seats. It works just as well as a mobile meeting room as it does for families heading off on holiday.",
    suited: "It is a natural fit for teams on the move, wedding parties and groups with plenty of luggage.",
  },
};

export const STANDARDS = [
  { title: "Maintained to a High Standard", text: "Our fleet is kept in concours condition, so that the vehicle you book looks and performs as it should." },
  { title: "Checked Before Your Journey", text: "Your vehicle is checked ahead of your booking, so that it arrives ready for you with no detail overlooked." },
  { title: "Clean and Presentation Ready", text: "Inside and out, vehicles are cleaned and prepared ahead of your journey to a consistent standard." },
  { title: "Chauffeured with Care", text: "A smooth, safe drive is part of the service. Your chauffeur's focus is on your comfort and your schedule." },
];

export const BOOKING_STEPS = [
  { title: "Choose your vehicle", text: "Tell us who's travelling and pick the car that suits your party and luggage." },
  { title: "Plan your journey", text: "Add your pick-up and destination, then choose a time your car is available." },
  { title: "Add your details", text: "Add any extras, and share your contact details and instructions for your chauffeur." },
  { title: "Travel in comfort", text: "We confirm your booking and your chauffeur takes care of the rest." },
];

export function vehicleDetails(v: Vehicle) {
  const t = BY_TYPE[v.body as Exclude<VehicleBody, "poa">] ?? BY_TYPE.saloon;
  return {
    ...t,
    faqs: [
      { q: `Why choose the ${v.name} for chauffeur hire?`, a: `${v.desc} It is a particularly good choice for ${t.bestFor}.` },
      { q: `How many passengers can the ${v.name} accommodate?`, a: `The ${v.name} has room for up to ${v.pax} passengers, ${v.lgBags} large bags and ${v.smBags} small bags. Tell us about your party and luggage and we will confirm the right fit.` },
      { q: `Is the ${v.name} suitable for corporate travel?`, a: `Yes. We provide discreet, punctual executive travel, from single journeys to multi-day roadshows and long-term personal drivers. Tell us your schedule and we will plan around it.` },
      { q: `Can I hire the ${v.name} for airport transfers?`, a: `Yes. Choose airport transfer when you book and share your flight details, so that we can plan your pick-up around your arrival or departure.` },
      { q: `Do you offer bespoke services with the ${v.name}?`, a: `Yes. Tell us what you need in the special requests field, or contact our team. Options such as child seats, meet and greet and additional waiting time can be arranged for your booking.` },
    ],
  };
}
