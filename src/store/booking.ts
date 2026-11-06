"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface BookingState {
  step: number;
  service: string; journeyType: string;
  pickup: string; pickupPc: string; dest: string; destPc: string; stops: string;
  date: string; time: string; slotState: string; duration: number; returnDate: string; returnTime: string;
  airport: string; terminal: string; flight: string;
  pax: number; lgBags: number; smBags: number; childSeats: number; special: string;
  vehicle: string; extras: string[];
  payMode: string; payMethod: string;
  name: string; email: string; phone: string; company: string; notes: string;
  onBehalf: boolean; consent: boolean; reference: string;
  set: (patch: Partial<BookingState>) => void;
  reset: () => void;
}

const initial = {
  step: 1, service: "", journeyType: "one-way",
  pickup: "", pickupPc: "", dest: "", destPc: "", stops: "",
  date: "", time: "", slotState: "", duration: 2, returnDate: "", returnTime: "",
  airport: "", terminal: "", flight: "",
  pax: 1, lgBags: 0, smBags: 0, childSeats: 0, special: "",
  vehicle: "", extras: [] as string[],
  payMode: "deposit", payMethod: "card",
  name: "", email: "", phone: "", company: "", notes: "",
  onBehalf: false, consent: false, reference: "",
};

export const useBooking = create<BookingState>()(
  persist(
    (set) => ({
      ...initial,
      set: (patch) => set(patch),
      reset: () => set(initial),
    }),
    { name: "slx_booking", storage: createJSONStorage(() => sessionStorage) }
  )
);
