/**
 * Representa uma opção dentro de um modificador do carrinho (ex: "Double Meat").
 */
export type CartModifierOption = {
  id: number;
  name: string;
  price: number;
};

/**
 * Modificador aplicado a um item do carrinho (ex: "Choose a size").
 */
export type CartModifier = {
  id: number;
  name: string;
  selectedOption: CartModifierOption;
};

/**
 * Item presente no carrinho de compras.
 */
export type CartItem = {
  id: number;
  name: string;
  basePrice: number;
  quantity: number;
  image?: string;
  modifiers?: CartModifier[];
};

/**
 * Store global do carrinho de compras.
 */
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
