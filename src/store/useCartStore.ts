import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartModifierOption = {
  id: number;
  name: string;
  price: number;
};

export type CartModifier = {
  id: number;
  name: string;
  selectedOption: CartModifierOption;
};

export type CartItem = {
  id: number;
  name: string;
  basePrice: number;
  quantity: number;
  image?: string;
  modifiers?: CartModifier[];
};

export type CartStore = {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  changeQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => void;
};

function calculateTotalFromItems(items: CartItem[]) {
  return items.reduce((acc, item) => {
    return acc + item.basePrice * item.quantity;
  }, 0);
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      isLoading: false,

      addItem: (newItem) => {
        const existingIndex = get().items.findIndex(
          (item) =>
            item.id === newItem.id &&
            JSON.stringify(item.modifiers) === JSON.stringify(newItem.modifiers)
        );

        let updatedItems;

        if (existingIndex !== -1) {
          updatedItems = [...get().items];
          updatedItems[existingIndex].quantity += newItem.quantity;
        } else {
          updatedItems = [...get().items, newItem];
        }

        set({
          items: updatedItems,
          total: calculateTotalFromItems(updatedItems),
        });
      },

      removeItem: (itemId) => {
        const updatedItems = get()
          .items.map((item) => {
            if (item.id === itemId) {
              if (item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
              }
              return null;
            }
            return item;
          })
          .filter((item): item is CartItem => item !== null);

        set({
          items: updatedItems,
          total: calculateTotalFromItems(updatedItems),
        });
      },

      changeQuantity: (itemId, quantity) => {
        const updatedItems = get().items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );

        set({
          items: updatedItems,
          total: calculateTotalFromItems(updatedItems),
        });
      },

      clearCart: () => set({ items: [], total: 0 }),

      calculateTotal: () =>
        set((state) => ({
          total: calculateTotalFromItems(state.items),
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);
