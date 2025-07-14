/**
 * Representa uma opção de modificação de um item do menu.
 * Exemplo: "Escolha o tamanho" com opções como "Pequeno", "Grande", etc.
 */
export type Modifier = {
  id: number;
  name: string;
  minChoices: number;
  maxChoices: number;
  items: {
    id: number;
    name: string;
    price: number;
    maxChoices: number;
    position: number;
    visible: number;
    availabilityType: string;
    available: boolean;
    qty?: number; // Quantidade selecionada (quando suportado)
  }[];
};

/**
 * Representa um item de cardápio, como um hambúrguer ou uma bebida.
 */
export type MenuItem = {
  id: number;
  name: string;
  description: string;
  alcoholic: number; // 0 = não alcoólico, 1 = alcoólico
  price: number;
  position: number;
  visible: number;
  availabilityType?: string;
  sku?: string;
  available?: boolean;
  images?: {
    id: number;
    image: string;
  }[];
  modifiers?: Modifier[];
};

/**
 * Representa uma imagem associada a um item de menu ou seção.
 */
export type MenuItemImage = {
  id: number;
  image: string;
};

/**
 * Seção de itens no cardápio, como "Burgers", "Drinks", "Desserts".
 */
export type MenuSection = {
  id: number;
  name: string;
  description: string | null;
  position: number;
  visible: number;
  images: MenuItemImage[];
  items: MenuItem[];
};

/**
 * Cardápio completo de um restaurante, composto por seções.
 */
export type Menu = {
  id: number;
  name: string;
  sections: MenuSection[];
};

/**
 * Store global com detalhes do menu do restaurante.
 */
export type MenuStore = {
  menu: Menu | null;
  isLoading: boolean;
  fetchMenu: () => Promise<void>;
};

/**
 * Props para o componente MenuCategories.
 */
export type MenuCategoriesProps = {
  searchTerm: string;
};
