export interface ServiceItem { id: string; name: string; tagline: string; icon: string; blurb: string; }

export const SERVICES: ServiceItem[] = [
  { id: "airport-transfers", name: "Airport Transfers", tagline: "Airport Chauffeur Service in London", icon: "Plane", blurb: "Punctual, flight-monitored transfers to and from all major UK airports with meet-and-greet." },
  { id: "point-to-point", name: "Point-to-Point", tagline: "Direct Chauffeur Journeys Across the UK", icon: "Route", blurb: "Direct, fixed journeys between any two locations with a dedicated professional chauffeur." },
  { id: "hourly-hire", name: "Hourly Chauffeur Hire", tagline: "Chauffeur by the Hour in London", icon: "Clock", blurb: "Your chauffeur and vehicle at your disposal by the hour for meetings, shopping or city travel." },
  { id: "corporate", name: "Corporate Chauffeur", tagline: "Executive Chauffeur Service for Business", icon: "Briefcase", blurb: "Discreet, reliable executive travel and account services for businesses and VIP clients." },
  { id: "events", name: "Events", tagline: "Event Chauffeur Hire in London", icon: "Champagne", blurb: "Seamless arrivals for premieres, galas, sporting fixtures and private occasions." },
  { id: "weddings", name: "Weddings", tagline: "Wedding Chauffeur Car Hire", icon: "Gem", blurb: "Immaculate wedding cars and attentive service for the most important day." },
  { id: "roadshows", name: "Roadshows", tagline: "Roadshow Chauffeur Service in London", icon: "Presentation", blurb: "Multi-stop, multi-day itineraries managed end-to-end for teams on the move." },
];

// Additional required page that shares the service template.
export const EXTRA_SERVICE_PAGES: Record<string, ServiceItem> = {
  "chauffeur-service-london": { id: "chauffeur-service-london", name: "Chauffeur Service London", tagline: "Luxury Chauffeur Hire Across London", icon: "MapPin", blurb: "Premium chauffeur-driven travel across London and the surrounding counties, around the clock." },
};

export const getService = (id: string) =>
  SERVICES.find((s) => s.id === id) || EXTRA_SERVICE_PAGES[id];
