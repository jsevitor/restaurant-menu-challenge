import { CartItem, CartStore } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Calcula o total baseado nos itens do carrinho.
 *
 * @param {CartItem[]} items - Itens do carrinho.
 * @returns {*} - Total baseado nos itens do carrinho.
 */
function calculateTotalFromItems(items: CartItem[]) {
  return items.reduce((acc, item) => {
    return acc + item.basePrice * item.quantity;
  }, 0);
}

/**
 * Hook para manipular o carrinho de compras.
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      isLoading: false,

      /**
       * Adiciona um novo item ao carrinho. Se já existir um item com os mesmos modificadores, soma a quantidade.
       */
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

      /**
       * Remove um item do carrinho.
       */
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

      /**
       * Altera a quantidade de um item do carrinho.
       */
      changeQuantity: (itemId, quantity) => {
        const updatedItems = get().items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );

        set({
          items: updatedItems,
          total: calculateTotalFromItems(updatedItems),
        });
      },

      /**
       * Limpa o carrinho de compras.
       */
      clearCart: () => set({ items: [], total: 0 }),

      /**
       * Calcula o total baseado nos itens do carrinho.
       */
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
