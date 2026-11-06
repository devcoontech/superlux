// Service page copy. States only what the site and client's live site already offer:
// no guarantees, allowances or credentials until confirmed (OPEN-QUESTIONS.md).
export interface ServiceDetail {
  intro: string; approach: string; idealFor: string[];
  highlights: [string, string][]; vehicles: string[]; faqs: { q: string; a: string }[];
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "airport-transfers": {
    intro: "Start or end your trip without the queues, the crowded trains or the wait for a taxi. Your chauffeur plans around your flight and takes you directly to your door.",
    approach: "We handle arrivals and departures at London's airports, including private jet arrivals and VIP terminal transitions, with vehicles positioned as close to the aircraft as the airport permits.",
    idealFor: ["Business and long-haul travellers", "Family holidays with luggage", "Private jet arrivals", "Visiting clients and VIP guests"],
    highlights: [["Flight-Aware Planning", "Share your flight details and we plan your pick-up around your arrival."], ["Meet and Greet", "Add a meet-and-greet service, so that your chauffeur is ready for you."], ["Room for Luggage", "Choose a vehicle with the right space for your party and your bags."], ["Door to Terminal", "A direct, private journey between your door and the airport."]],
    vehicles: ["mercedes-s-class", "mercedes-v-class", "range-rover", "bmw-i7", "mercedes-gls-maybach", "rolls-royce-cullinan"],
    faqs: [
      { q: "Which airports do you cover?", a: "We provide transfers to and from Heathrow, Gatwick, Stansted, Luton and London City, and can quote for other airports on request." },
      { q: "What if my flight is delayed?", a: "Share your flight number when you book, so that we can plan your pick-up around your arrival. Your quotation sets out the waiting allowance for your journey." },
      { q: "Can you handle private jet arrivals?", a: "Yes. We specialise in private jet arrivals, with vehicles positioned as close to the aircraft as the airport permits." },
    ],
  },
  "point-to-point": {
    intro: "When you simply need to be somewhere, in comfort and on time. Tell us where you are starting and where you are going, and your chauffeur takes care of the rest.",
    approach: "Every point-to-point journey is direct and private, with a professional chauffeur and a vehicle chosen to suit you. There are no shared rides and no unnecessary stops.",
    idealFor: ["Meetings across town", "Hotel and station transfers", "Evenings out", "Long-distance journeys"],
    highlights: [["Direct Journeys", "One private journey between your two locations."], ["Add Your Stops", "Need to call somewhere on the way? Add stops to your journey when you book."], ["One-Way or Return", "Book a single journey or arrange your return at the same time."], ["Right Car for the Trip", "Choose from executive saloons, luxury SUVs and people carriers."]],
    vehicles: ["mercedes-e-class", "mercedes-s-class", "bmw-i7", "range-rover", "mercedes-v-class", "mercedes-s-class-maybach"],
    faqs: [
      { q: "Can I add stops on the way?", a: "Yes. Add stops when you enter your journey details, or tell us your itinerary and we will plan the route around it." },
      { q: "Can I book a return at the same time?", a: "Yes. Choose a return journey when you book and share your timings." },
      { q: "How far will you travel?", a: "We travel across London and the wider UK. For longer journeys, send us your plans and we will prepare a tailored quotation." },
    ],
  },
  "hourly-hire": {
    intro: "Keep your chauffeur and vehicle with you for as long as you need them. It is the easiest way to get through a day with several stops, and your plans can change as the day goes on.",
    approach: "Your chauffeur waits nearby while you are busy and is ready when you are. There is no parking to find and no new car to book between appointments.",
    idealFor: ["Back-to-back meetings", "Personal shopping and dining", "City exploring", "Days with changing plans"],
    highlights: [["At Your Disposal", "Your chauffeur and vehicle stay with you throughout your booking."], ["Flexible Plans", "Change your route and stops as your day develops."], ["No Parking Worries", "Step out at the door, and leave the parking to your chauffeur."], ["Simple to Estimate", "Online estimates start from the vehicle's rate and the hours you need."]],
    vehicles: ["mercedes-s-class", "mercedes-e-class", "range-rover", "rolls-royce-ghost", "mercedes-g63", "bentley-bentayga"],
    faqs: [
      { q: "How is hourly hire priced?", a: "Online estimates are based on the vehicle's rate and the hours you need. Your final price is confirmed in your quotation." },
      { q: "Can my plans change during the booking?", a: "Yes. That is the benefit of hourly hire: your chauffeur can adapt to your day as your plans develop." },
      { q: "Is there a minimum booking?", a: "Requirements can vary by vehicle and date. Tell us your plans and your quotation will confirm the details." },
    ],
  },
  corporate: {
    intro: "Precisely timed executive travel for your leaders, clients and guests. We look after the logistics, so that your people can focus on the day ahead.",
    approach: "From a single airport run to long-term personal driver contracts, we work with an emphasis on efficiency and complete discretion, and we shape the service around how your business travels.",
    idealFor: ["Senior executives", "Visiting clients", "Conferences and board meetings", "Long-term personal drivers"],
    highlights: [["Total Discretion", "Your conversations and your schedule stay private."], ["Precise Timing", "Journeys planned carefully around your meetings."], ["Long-Term Drivers", "Dedicated personal drivers for long-term assignments."], ["Team Travel", "People carriers and multiple vehicles for groups."]],
    vehicles: ["mercedes-s-class", "mercedes-e-class", "bmw-i7", "mercedes-s-class-maybach", "mercedes-v-class-jet", "mercedes-sprinter-jet"],
    faqs: [
      { q: "Do you offer long-term arrangements?", a: "Yes. We offer long-term personal driver contracts as well as one-off journeys and short-term roadshows." },
      { q: "Can you move a whole team?", a: "Yes. We can provide people carriers or several vehicles. Tell us your numbers and your schedule." },
      { q: "Can someone else book for our executives?", a: "Yes. You can book on behalf of another passenger and add their details and instructions for the chauffeur." },
    ],
  },
  events: {
    intro: "Arrive the way the occasion deserves. From premieres and galas to sporting fixtures and private parties, your chauffeur handles the arrival and the journey home.",
    approach: "We plan around your event's timings and venue, so that you can enjoy the evening without thinking about the journey. Our fleet includes high-impact vehicles for moments when presence matters.",
    idealFor: ["Premieres and galas", "Sporting fixtures", "Private parties", "Music videos and productions"],
    highlights: [["Statement Arrivals", "Choose a vehicle with presence, from Rolls-Royce to the G63."], ["Timed to the Event", "Journeys planned around your venue and your schedule."], ["There for the Journey Home", "Arrange your return, so that the evening ends as well as it began."], ["Production Ready", "High-impact vehicles for music videos and shoots."]],
    vehicles: ["rolls-royce-phantom", "rolls-royce-cullinan", "mercedes-g63", "rolls-royce-ghost", "bentley-bentayga", "cadillac-escalade"],
    faqs: [
      { q: "Can you supply vehicles for music videos or shoots?", a: "Yes. We work with production crews and artists. Tell us your shoot dates, location and brief." },
      { q: "Can you wait during the event?", a: "Yes. Hourly hire keeps your chauffeur with you, or we can arrange a separate journey home." },
      { q: "How early should we book?", a: "As early as possible, especially for major events when our most popular vehicles are in demand." },
    ],
  },
  weddings: {
    intro: "A wedding car is part of the memory of the day. We bring an immaculately presented vehicle and a calm, attentive chauffeur, so that your arrival feels as special as the moment itself.",
    approach: "Share your venues and timings, and we will plan each journey with care. Our fleet is presented to a high standard, so that your day is marked by elegance and timeless class.",
    idealFor: ["Bride and groom", "Bridal parties", "Parents and family", "Guest transport"],
    highlights: [["Immaculate Presentation", "Vehicles prepared with care, ready for your photographs."], ["Attentive Chauffeurs", "Calm, considerate service on a busy day."], ["Planned to Your Day", "Journeys arranged around your venues and timings."], ["Guests Included", "People carriers and additional cars for your party."]],
    vehicles: ["rolls-royce-phantom", "rolls-royce-ghost", "rolls-royce-cullinan", "mercedes-s-class-maybach", "bentley-bentayga", "mercedes-v-class-jet"],
    faqs: [
      { q: "How early should we book our wedding car?", a: "As early as you can. Share your date and venues, so that we can reserve your chosen vehicle." },
      { q: "Can we book more than one car?", a: "Yes. Tell us who is travelling and we will suggest the right combination of vehicles." },
      { q: "Can we see the vehicle options first?", a: "Yes. Browse our fleet online, or contact our team to talk through which vehicle would suit your day." },
    ],
  },
  roadshows: {
    intro: "Several cities, a tight schedule and no room for mistakes. We manage multi-stop, multi-day itineraries from end to end, so that your team can concentrate on the meetings.",
    approach: "Send us your schedule and we will build the journey plan around it. Your chauffeur handles the route and the timing, while you prepare for what comes next.",
    idealFor: ["Investor and financial roadshows", "Sales and client visits", "Multi-city itineraries", "Visiting delegations"],
    highlights: [["End-to-End Planning", "Your whole itinerary managed as one journey."], ["Multi-Stop, Multi-Day", "Built for packed schedules across several locations."], ["Work on the Move", "A quiet cabin to prepare between meetings."], ["Discreet Service", "Your plans and your conversations remain private."]],
    vehicles: ["mercedes-s-class", "mercedes-v-class-jet", "mercedes-sprinter-jet", "bmw-i7", "mercedes-e-class", "mercedes-v-class"],
    faqs: [
      { q: "What do you need from us to plan a roadshow?", a: "Your schedule, stops, number of travellers and any timing constraints. We will build a plan around them." },
      { q: "Can you cover several days?", a: "Yes. We manage multi-stop, multi-day itineraries from end to end." },
      { q: "Which vehicle suits a roadshow?", a: "Saloons suit one or two travellers, while the V-Class and Sprinter Jet Class keep larger teams together." },
    ],
  },
  "chauffeur-service-london": {
    intro: "London rewards local knowledge. Whether you are crossing the city for a meeting, heading out for dinner or arriving for the first time, your chauffeur takes the stress out of getting around.",
    approach: "From our Mayfair address, we serve the capital and the surrounding counties with a choice of executive, luxury and ultra-luxury vehicles, for a single journey or a whole day.",
    idealFor: ["Business in the City and Canary Wharf", "Shopping and dining in the West End", "Hotel and airport transfers", "Visitors exploring London"],
    highlights: [["City Knowledge", "A chauffeur who handles London's traffic, so you don't have to."], ["Across the Capital", "Journeys throughout London and the surrounding counties."], ["By Journey or by Hour", "Book one trip, or keep your chauffeur for the day."], ["Full Choice of Fleet", "From executive saloons to Rolls-Royce."]],
    vehicles: ["mercedes-s-class", "rolls-royce-ghost", "range-rover", "bmw-i7", "bentley-bentayga", "mercedes-v-class"],
    faqs: [
      { q: "Which areas of London do you cover?", a: "We cover London and the surrounding counties, and can travel further across the UK on request." },
      { q: "Can I keep the chauffeur for the day?", a: "Yes. Hourly hire keeps your chauffeur and vehicle at your disposal throughout your booking." },
      { q: "Can you collect me from my hotel?", a: "Yes. Enter your hotel as your pick-up location, or share any instructions for your chauffeur." },
    ],
  },
};
