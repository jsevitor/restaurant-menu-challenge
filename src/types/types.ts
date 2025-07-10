type Modifier = {
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
    qty?: number;
  }[];
};

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  alcoholic: number;
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

type MenuItemImage = {
  id: number;
  image: string;
};

export type MenuSection = {
  id: number;
  name: string;
  description: string | null;
  position: number;
  visible: number;
  images: MenuItemImage[];
  items: MenuItem[];
};

export type Menu = {
  id: number;
  name: string;
  sections: MenuSection[];
};
