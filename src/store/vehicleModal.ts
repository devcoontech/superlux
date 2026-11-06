"use client";
import { create } from "zustand";
interface VehicleModalState { openId: string | null; open: (id: string) => void; close: () => void; }
export const useVehicleModal = create<VehicleModalState>((set) => ({
  openId: null,
  open: (id) => set({ openId: id }),
  close: () => set({ openId: null }),
}));
