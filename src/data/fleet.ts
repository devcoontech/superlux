export type AvailabilityState = "confirmed" | "unconfirmed" | "followup" | "quote";
export type VehicleBody = "saloon" | "limo" | "suv" | "van" | "poa";

export interface Vehicle {
  id: string;
  name: string;
  cat: string;
  body: VehicleBody;
  /** INDICATIVE capacity — pending client confirmation. null = not applicable. */
  pax: number | null;
  lgBags: number | null;
  smBags: number | null;
  /** ILLUSTRATIVE hourly rate (GBP). null for POA. Real rates from pricing engine. */
  rate: number | null;
  avail: AvailabilityState;
  poa?: boolean;
  desc: string;
}

// All 16 fleet options (15 named + Other Vehicle POA).
export const FLEET: Vehicle[] = [
  { id: "mercedes-e-class", name: "Mercedes E-Class", cat: "Executive Saloon", body: "saloon", pax: 3, lgBags: 2, smBags: 2, rate: 50, avail: "confirmed", desc: "The quintessential executive saloon — refined, discreet and impeccably comfortable for business travel." },
  { id: "mercedes-s-class", name: "Mercedes S-Class", cat: "Luxury Saloon", body: "saloon", pax: 3, lgBags: 2, smBags: 2, rate: 70, avail: "confirmed", desc: "The benchmark in luxury saloons, with a serene cabin and effortless presence for first-class journeys." },
  { id: "mercedes-s-class-maybach", name: "Mercedes S-Class Maybach", cat: "Ultra-Luxury Saloon", body: "limo", pax: 3, lgBags: 2, smBags: 2, rate: 110, avail: "confirmed", desc: "Hand-finished rear comfort, extended legroom and whisper-quiet refinement for the most discerning guest." },
  { id: "mercedes-gls-maybach", name: "Mercedes GLS Maybach", cat: "Luxury SUV", body: "suv", pax: 4, lgBags: 3, smBags: 3, rate: 120, avail: "confirmed", desc: "A commanding luxury SUV pairing first-class rear seating with generous space and presence." },
  { id: "range-rover", name: "Range Rover", cat: "Luxury SUV", body: "suv", pax: 4, lgBags: 3, smBags: 3, rate: 95, avail: "confirmed", desc: "Iconic British luxury with assured capability and a beautifully appointed, elevated cabin." },
  { id: "rolls-royce-cullinan", name: "Rolls-Royce Cullinan", cat: "Ultra-Luxury SUV", body: "suv", pax: 4, lgBags: 3, smBags: 2, rate: 160, avail: "unconfirmed", desc: "The pinnacle of luxury SUVs — a magic-carpet ride wrapped in uncompromising craftsmanship." },
  { id: "rolls-royce-phantom", name: "Rolls-Royce Phantom", cat: "Flagship Saloon", body: "limo", pax: 3, lgBags: 2, smBags: 2, rate: 200, avail: "confirmed", desc: "The definitive statement of arrival. Unrivalled presence and serenity for the grandest of occasions." },
  { id: "rolls-royce-ghost", name: "Rolls-Royce Ghost", cat: "Luxury Saloon", body: "limo", pax: 3, lgBags: 2, smBags: 2, rate: 150, avail: "confirmed", desc: "Understated Rolls-Royce luxury — minimalist, powerful and sublimely comfortable." },
  { id: "mercedes-g63", name: "Mercedes G63", cat: "Performance Luxury SUV", body: "suv", pax: 4, lgBags: 3, smBags: 2, rate: 110, avail: "unconfirmed", desc: "Bold, iconic and luxurious — a distinctive arrival with a premium hand-crafted interior." },
  { id: "mercedes-v-class", name: "Mercedes V-Class", cat: "Luxury MPV", body: "van", pax: 7, lgBags: 7, smBags: 7, rate: 75, avail: "confirmed", desc: "Spacious luxury people-carrier, ideal for groups, families and corporate travel with ample luggage." },
  { id: "mercedes-sprinter-jet", name: "Mercedes Sprinter (Jet Class)", cat: "First-Class Minibus", body: "van", pax: 14, lgBags: 14, smBags: 10, rate: 95, avail: "followup", desc: "Business-jet-inspired interior for larger groups travelling together in exceptional comfort." },
  { id: "mercedes-v-class-jet", name: "Mercedes V-Class (Jet Class)", cat: "First-Class MPV", body: "van", pax: 6, lgBags: 6, smBags: 6, rate: 110, avail: "confirmed", desc: "Reconfigured jet-class cabin with lounge seating and premium finishes for VIP group travel." },
  { id: "cadillac-escalade", name: "Cadillac Escalade", cat: "Luxury SUV", body: "suv", pax: 6, lgBags: 4, smBags: 4, rate: 120, avail: "confirmed", desc: "American luxury on a grand scale — commanding road presence and a lavish, spacious interior." },
  { id: "bmw-i7", name: "BMW i7", cat: "Electric Luxury Saloon", body: "saloon", pax: 3, lgBags: 2, smBags: 2, rate: 95, avail: "confirmed", desc: "All-electric flagship luxury. Silent, sustainable and sumptuously appointed for the modern traveller." },
  { id: "bentley-bentayga", name: "Bentley Bentayga", cat: "Luxury SUV", body: "suv", pax: 4, lgBags: 3, smBags: 3, rate: 140, avail: "confirmed", desc: "Handcrafted British luxury SUV blending exquisite detailing with effortless, refined performance." },
  { id: "other-vehicle", name: "Other Vehicle", cat: "Price on Application", body: "poa", pax: null, lgBags: null, smBags: null, rate: null, avail: "quote", poa: true, desc: "Looking for something specific or a vehicle not listed? Tell us your requirements and our team will prepare a tailored quotation." },
];

export const getVehicle = (id: string) => FLEET.find((v) => v.id === id);

/* Manufacturer per vehicle (for the brand scroller + fleet filtering) */
export const VEH_BRAND: Record<string, string> = {
  "mercedes-e-class": "Mercedes-Benz", "mercedes-s-class": "Mercedes-Benz", "mercedes-s-class-maybach": "Mercedes-Benz",
  "mercedes-gls-maybach": "Mercedes-Benz", "mercedes-g63": "Mercedes-Benz", "mercedes-v-class": "Mercedes-Benz",
  "mercedes-sprinter-jet": "Mercedes-Benz", "mercedes-v-class-jet": "Mercedes-Benz",
  "range-rover": "Land Rover", "rolls-royce-cullinan": "Rolls-Royce", "rolls-royce-phantom": "Rolls-Royce",
  "rolls-royce-ghost": "Rolls-Royce", "cadillac-escalade": "Cadillac", "bmw-i7": "BMW", "bentley-bentayga": "Bentley",
};
export const brandOf = (id: string) => VEH_BRAND[id] || null;
export const brandSlug = (b: string) => b.toLowerCase().replace(/[^a-z0-9]+/g, "-");
export const MANUFACTURERS = ([["Mercedes-Benz", "mercedes", 68], ["Rolls-Royce", "rollsroyce", 76], ["Bentley", "bentley", 48], ["BMW", "bmw", 68], ["Land Rover", "landrover", 104], ["Cadillac", "cadillac", 104]] as const).map(([name, file, logoHeight]) => ({
  name, slug: brandSlug(name), logo: `/assets/logos/brands/${file}.svg`, logoHeight, count: FLEET.filter((v) => brandOf(v.id) === name).length,
}));

/* Vehicle types used by the home search and the fleet filter. */
export const VEHICLE_TYPES: { id: VehicleBody; name: string; tagline: string; image: string }[] = [
  { id: "saloon", name: "Executive Saloons", tagline: "Refined & discreet", image: "/assets/images/fleet/mercedes-s-class.webp" },
  { id: "limo", name: "Ultra-Luxury", tagline: "The grandest arrivals", image: "/assets/images/fleet/rolls-royce-phantom.webp" },
  { id: "suv", name: "Luxury SUVs", tagline: "Space & presence", image: "/assets/images/fleet/range-rover.webp" },
  { id: "van", name: "People Carriers", tagline: "Group travel", image: "/assets/images/fleet/mercedes-v-class.webp" },
];
export const vehiclesOfType = (type: VehicleBody) => FLEET.filter((v) => v.body === type);

/* Real supplied photography (ASSET-MAP.md). Only genuine matches; others keep placeholders. */
export const VEH_IMAGE: Record<string, string> = {
  "mercedes-e-class": "/assets/images/fleet/mercedes-e-class.webp",
  "mercedes-s-class": "/assets/images/fleet/mercedes-s-class.webp",
  "mercedes-s-class-maybach": "/assets/images/fleet/mercedes-s-class-maybach.webp",
  "mercedes-gls-maybach": "/assets/images/fleet/mercedes-gls-maybach.webp",
  "range-rover": "/assets/images/fleet/range-rover.webp",
  "rolls-royce-cullinan": "/assets/images/fleet/rolls-royce-cullinan.webp",
  "rolls-royce-phantom": "/assets/images/fleet/rolls-royce-phantom.webp",
  "rolls-royce-ghost": "/assets/images/fleet/rolls-royce-ghost.webp",
  "mercedes-g63": "/assets/images/fleet/mercedes-g63.webp",
  "mercedes-v-class": "/assets/images/fleet/mercedes-v-class.webp",
  "mercedes-sprinter-jet": "/assets/images/fleet/mercedes-sprinter-jet.webp",
  "mercedes-v-class-jet": "/assets/images/fleet/mercedes-v-class-jet.webp",
  "cadillac-escalade": "/assets/images/fleet/cadillac-escalade.webp",
  "bmw-i7": "/assets/images/fleet/bmw-i7.webp",
  "bentley-bentayga": "/assets/images/fleet/bentley-bentayga.webp",
};
export const vehImage = (id: string) => VEH_IMAGE[id] || null;
