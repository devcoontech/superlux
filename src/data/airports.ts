export interface Airport {
  id: string; name: string; code: string; terminals: string; distance: string; location: string;
  blurb: string; about: string; tip: string;
}

// London's five main airports, pending client confirmation (OPEN-QUESTIONS.md).
// Distances are approximate and by road from central London.
export const AIRPORTS: Airport[] = [
  { id: "heathrow", name: "Heathrow", code: "LHR", terminals: "Terminals 2, 3, 4 and 5", distance: "About 15 miles", location: "West London",
    blurb: "Private transfers for the UK's busiest airport, planned around your terminal and flight.",
    about: "The UK's busiest airport handles long-haul and business travellers from around the world. With several terminals spread across a large site, a chauffeur who knows where to be makes a real difference after a long flight.",
    tip: "Tell us your terminal and flight number when you book, so that we can plan your pick-up for the right place and time." },
  { id: "gatwick", name: "Gatwick", code: "LGW", terminals: "North and South Terminals", distance: "About 30 miles", location: "West Sussex",
    blurb: "Comfortable journeys to and from Gatwick's North and South Terminals.",
    about: "London's second-busiest airport serves a wide mix of business and holiday destinations. It sits south of the capital, so a comfortable, private transfer lets you make the most of the journey into town.",
    tip: "Gatwick has two terminals linked by a shuttle, so please confirm whether you are using North or South." },
  { id: "stansted", name: "Stansted", code: "STN", terminals: "Single terminal", distance: "About 40 miles", location: "Essex",
    blurb: "Door-to-terminal transfers for Stansted, Essex and the East of England.",
    about: "Stansted serves many European routes from its location north-east of London. It is also well placed for journeys to Cambridge, Essex and the East of England.",
    tip: "It is one of the longer transfers into central London, so please share your plans early and allow plenty of time for departures." },
  { id: "luton", name: "Luton", code: "LTN", terminals: "Single terminal", distance: "About 35 miles", location: "Bedfordshire",
    blurb: "A convenient gateway to London and the Home Counties, with a chauffeur ready for you.",
    about: "Luton sits north-west of London and is a convenient gateway for travellers heading to the capital, Hertfordshire, Bedfordshire and beyond.",
    tip: "Let us know your flight details in advance, so that we can plan your pick-up around your arrival." },
  { id: "london-city", name: "London City", code: "LCY", terminals: "Single terminal", distance: "About 7 miles", location: "Royal Docks, East London",
    blurb: "Time-critical transfers for the City and Canary Wharf, close to the financial district.",
    about: "London City is the closest airport to the financial district and Canary Wharf, which makes it a favourite with business travellers on tight schedules.",
    tip: "City journeys are often time-critical. Share your meeting times as well as your flight, and we will plan your route around them." },
];
export const getAirport = (id: string) => AIRPORTS.find((a) => a.id === id);
