import { create } from "zustand";
import { Menu } from "@/types/types";
import localMenuData from "@/data/data.json";

type MenuStore = {
  menu: Menu | null;
  isLoading: boolean;
  fetchMenu: () => Promise<void>;
};

export const useMenuDetailsStore = create<MenuStore>((set) => ({
  menu: null,
  isLoading: false,
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
