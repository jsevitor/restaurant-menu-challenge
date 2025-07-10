import { MenuItem } from "@/types/types";

export const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export function getFinalPrice(
  item: MenuItem,
  selectedModifiers: Record<number, number>,
  quantity: number
) {
  const modifiersTotal =
    item.modifiers?.reduce((acc, modifier) => {
      const selectedOptionId = selectedModifiers[modifier.id];
      const selectedOption = modifier.items.find(
        (item) => item.id === selectedOptionId
      );
      return acc + (selectedOption?.price || 0);
    }, 0) || 0;

  return (item.price + modifiersTotal) * quantity;
}
