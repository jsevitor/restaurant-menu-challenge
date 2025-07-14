"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { MenuItem, MenuSection, Venue } from "@/types";
import { formatCurrency } from "@/utils";
import { ModalItem } from "./ModalItem";
import Image from "next/image";

/**
 * Props para o componente CategoryItems
 */
type Props = {
  sections: MenuSection[];
  searchTerm: string;
  venue: Venue | null;
};

/**
 * CategoryItems Component
 *
 * Exibe os itens de uma categoria do menu, permitindo ao usuário selecionar e adicionar ao carrinho.
 *
 * ▸ **Responsabilidade**
 * - Renderizar os itens da categoria (`useMenuDetailsStore`)
 * - Aplicar estilos dinâmicos do restaurante (`useVenueStore`)
 * - Exibir o modal de item (`ModalItem`), se a opção de adicionar ao carrinho for ativada
 *
 * @param props            - Parâmetros do CategoryItems.
 * @param props.sections   - Seções do menu.
 * @param props.searchTerm - Termo de busca para filtrar os itens.
 * @param props.venue      - Dados do restaurante.
 *
 * @example
 * ```tsx
 * <CategoryItems sections={sections} searchTerm={searchTerm} venue={venue} />
 * ```
 */
export function CategoryItems({ sections, searchTerm, venue }: Props) {
  const { items: cartItems } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <>
      <section className="mt-8">
        {sections.map((section) => {
          const filteredItems = section.items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={section.id}>
              <div className="flex justify-between py-4">
                <h2 className="text-xl font-semibold">{section.name}</h2>
                <i className="bi bi-chevron-down text-xl"></i>
              </div>
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  className="flex flex-col w-full text-left cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedItem(item);
                  }}
                >
                  <div className="py-4 flex justify-between gap-4">
                    <div className="overflow-ellipsis w-3/4">
                      <span className="flex gap-2">
                        {(() => {
                          const cartItem = cartItems.find(
                            (i) => i.id === item.id
                          );
                          return cartItem && cartItem.quantity > 0 ? (
                            <span
                              className="px-2 text-bg-primary text-xs rounded flex items-center justify-center font-semibold"
                              style={{
                                backgroundColor:
                                  venue?.webSettings.primaryColour,
                              }}
                            >
                              {cartItem.quantity}
                            </span>
                          ) : null;
                        })()}
                        <h3 className="font-semibold">{item.name}</h3>
                      </span>
                      <p className="line-clamp-1 text-sm text-gray-700">
                        {item.description}
                      </p>
                      <p className="font-semibold">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                    {item.images && item.images.length > 0 && (
                      <div className="w-[128px] h-[85px] rounded overflow-hidden">
                        <Image
                          src={item.images[0].image}
                          alt={item.name}
                          width={128}
                          height={85}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          );
        })}
      </section>

      <ModalItem
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />
    </>
  );
}
