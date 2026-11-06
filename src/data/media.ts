// Supplied section/service/airport photography (ASSET-MAP.md).
export const SERVICE_IMAGE: Record<string, string> = {
  "airport-transfers": "/assets/images/services/airport-transfers.webp",
  "point-to-point": "/assets/images/services/point-to-point.webp",
  "hourly-hire": "/assets/images/services/hourly-hire.webp",
  "corporate": "/assets/images/services/corporate.webp",
  "events": "/assets/images/services/events.webp",
  "weddings": "/assets/images/services/weddings.webp",
  "roadshows": "/assets/images/services/roadshows.webp",
};
export const AIRPORT_IMAGE: Record<string, string> = {
  "heathrow": "/assets/images/airports/airport-1.webp",
  "gatwick": "/assets/images/airports/airport-2.webp",
  "stansted": "/assets/images/airports/airport-4.webp",
  "luton": "/assets/images/airports/airport-3.webp",
  "london-city": "/assets/images/airports/airport-5.webp",
};
export const SECTION_IMAGE: Record<string, string> = {
  about: "/assets/images/sections/about.webp",
  experience: "/assets/images/sections/experience.webp",
};
export const serviceImage = (id: string) => SERVICE_IMAGE[id] || null;
export const airportImage = (id: string) => AIRPORT_IMAGE[id] || null;
export const sectionImage = (k: string) => SECTION_IMAGE[k] || null;
