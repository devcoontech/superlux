import { z } from "zod";

export const SERVICE_IDS = [
  "airport-transfers", "point-to-point", "hourly-hire",
  "corporate", "events", "weddings", "roadshows",
] as const;

// NOTE: the formal spec (BKG-10) requires email; the client Q&A described it as
// optional. Flagged for confirmation — toggle EMAIL_REQUIRED to switch.
export const EMAIL_REQUIRED = true;

export const bookingSchema = z.object({
  service: z.enum(SERVICE_IDS),
  journeyType: z.enum(["one-way", "return"]).default("one-way"),
  pickup: z.string().min(1), pickupPc: z.string().optional(),
  dest: z.string().optional(), destPc: z.string().optional(),
  stops: z.string().optional(),
  date: z.string().min(1), time: z.string().min(1),
  returnDate: z.string().optional(), returnTime: z.string().optional(),
  duration: z.number().min(1).optional(),
  airport: z.string().optional(), terminal: z.string().optional(), flight: z.string().optional(),
  pax: z.number().min(1), lgBags: z.number().min(0), smBags: z.number().min(0),
  childSeats: z.number().min(0), special: z.string().optional(),
  vehicle: z.string().min(1),
  extras: z.array(z.string()).default([]),
  name: z.string().min(1),
  email: EMAIL_REQUIRED ? z.string().email() : z.string().email().optional().or(z.literal("")),
  phone: z.string().min(1),
  company: z.string().optional(), notes: z.string().optional(),
  onBehalf: z.boolean().default(false),
  consent: z.literal(true),
});
export type BookingDraft = z.infer<typeof bookingSchema>;

export const enquirySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  service: z.string().optional(),
  pickup: z.string().optional(), dest: z.string().optional(),
  date: z.string().optional(), time: z.string().optional(),
  pax: z.number().optional(), luggage: z.number().optional(),
  notes: z.string().optional(),
  consent: z.literal(true),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;
