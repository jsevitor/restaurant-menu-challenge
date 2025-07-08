import { create } from "zustand";

type Venue = {
  id: number;
  name: string;
  webSettings: {
    bannerImage: string;
    backgroundColour: string;
    primaryColour: string;
    primaryColourHover: string;
    navBackgroundColour: string;
  };
  currency: string;
};

type VenueStore = {
  venue: Venue | null;
  isLoading: boolean;
  fetchVenue: () => Promise<void>;
};

export const useVenueStore = create<VenueStore>((set) => ({
  venue: null,
  isLoading: false,
  fetchVenue: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/venue");
      const data = await res.json();
      set({ venue: data });
    } catch (err) {
      console.error("Erro ao buscar venue", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
