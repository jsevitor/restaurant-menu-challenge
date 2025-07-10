import { create } from "zustand";
import localMenuData from "@/data/data.json";

type MenuItemImage = {
  id: number;
  image: string;
};

type ModifierItem = {
  id: number;
  name: string;
  price: number;
  available: boolean;
};

type MenuItem = {
  id: number;
  name: string;
  description?: string;
  alcoholic: number;
  price: number;
  position: number;
  visible: number;
  images: MenuItemImage[];
  available: boolean;
  modifiers?: {
    id: number;
    name: string;
    minChoices: number;
    maxChoices: number;
    items: ModifierItem[];
  }[];
};

type MenuSection = {
  id: number;
  name: string;
  images: MenuItemImage[];
  items: MenuItem[];
  position: number;
  visible: number;
};

type Menu = {
  id: number;
  name: string;
  sections: MenuSection[];
};

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
      // Aqui você usa o JSON local diretamente
      set({ menu: localMenuData });
    } catch (err) {
      console.error("Erro ao carregar o menu local:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
