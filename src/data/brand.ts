// Central business settings. Phone, address, socials and founding year come from
// the client's live site (superluxe.uk). Anything still unverified stays a labelled
// placeholder and must NOT be published as real until confirmed (WEB-12).
export const BRAND = {
  name: "Superluxe Chauffeurs",
  domain: "https://www.superluxe.uk",
  currency: "GBP",
  symbol: "£",
  established: 2008,
  phone: "0203 745 5540",
  phoneHref: "tel:+442037455540",
  address: "Mayfair Place, London W1J 8AJ, UK",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=Mayfair+Place%2C+London+W1J+8AJ",
  whatsapp: "https://wa.me/message/Z4QBSDBUREEHC1",
  instagram: "https://www.instagram.com/superluxechauffeurs",
  tiktok: "https://www.tiktok.com/@superluxechauffeurs",
  // Placeholders — to confirm:
  pricingBasePostcode: "RM11", // supplied by client; full address TBC
  email: "[Email — to confirm]",
} as const;
