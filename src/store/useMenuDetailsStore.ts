import { create } from "zustand";

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
      const res = await fetch("api/menu");
      const data = await res.json();
      set({ menu: data });
    } catch (err) {
      console.error("Erro ao buscar menu: ", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
