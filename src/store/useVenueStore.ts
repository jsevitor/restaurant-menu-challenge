import { VenueStore } from "@/types";
import { create } from "zustand";

/**
 * Hook para fazer o fetch dos dados de customização da aplicação via API.
 */
export const useVenueStore = create<VenueStore>((set) => ({
  venue: null,
  isLoading: false,

  /**
   * Faz o fetch dos dados de customização do restaurante (venue) a partir de uma API.
   * Atualiza o estado global com os dados do venue ou registra um erro em caso de falha.
   */
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
