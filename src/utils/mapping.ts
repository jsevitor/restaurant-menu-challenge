import { CartItem, CartModifier } from "@/store/useCartStore";
import { MenuItem } from "@/types/types";

export function mapMenuItemToCartItem(
  item: MenuItem,
  quantity: number,
  selectedModifiers: Record<number, number>
): CartItem {
  const modifiers: CartModifier[] = [];

  let basePrice = item.price;

  item.modifiers?.forEach((group) => {
    const selectedOptionId = selectedModifiers[group.id];
    const selectedOption = group.items.find(
      (opt) => opt.id === selectedOptionId
    );

    if (selectedOption) {
      modifiers.push({
        id: group.id,
        name: group.name,
        selectedOption: {
          id: selectedOption.id,
          name: selectedOption.name,
          price: selectedOption.price,
        },
      });

      basePrice += selectedOption.price;
    }
  });

  return {
    id: item.id,
    name: item.name,
    basePrice,
    quantity,
    image: item.images?.[0]?.image,
    modifiers: modifiers.length > 0 ? modifiers : undefined,
  };
}
