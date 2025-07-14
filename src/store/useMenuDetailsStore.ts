import { create } from "zustand";
import { Menu, MenuStore } from "@/types";
import localMenuData from "@/data/data.json";

/**
 * Hook para fazer o fetch dos dados do menu do restaurante.
 */
export const useMenuDetailsStore = create<MenuStore>((set) => ({
  menu: null,
  isLoading: false,

  /**
   * Faz o fetch do menu do restaurante.
   * O menu do restaurante virá de uma API, por hora os dados do menu serão carregados de um arquivo local.
   * Atualiza o estado global com os dados do menu ou registra um erro em caso de falha.
   */
  fetchMenu: async () => {
    set({ isLoading: true });
    try {
      set({ menu: localMenuData as unknown as Menu });
    } catch (err) {
      console.error("Erro ao carregar o menu local:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
