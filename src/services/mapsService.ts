/**
 * Maps abstraction (BKG-04). Address autocomplete + route distance/time require
 * the Google Maps API and a server proxy. Never expose secret keys client-side.
 * Falls back to manual entry and a clearly-labelled unavailable state.
 */
export const mapsService = {
  isConfigured(): boolean {
    return false; // set true once a key + backend proxy exist
  },
  async autocomplete(_q: string): Promise<string[]> {
    return []; // demo: manual entry only
  },
  async route(_from: string, _to: string, _stops: string[] = []): Promise<{ miles: number; minutes: number } | null> {
    return null; // demo: no live route calculation
  },
};
