"use client";

import Image from "next/image";
import { useVenueStore } from "@/store/useVenueStore";
import { useMenuDetailsStore } from "@/store/useMenuDetailsStore";
import { MenuSection } from "@/types";

/**
 * Props para o componente CategoryTabs
 */
type Props = {
  selectedCategory: string;
  onCategoryChange: (categoryName: string, newOrder: MenuSection[]) => void;
};

/**
 * CategoryTabs Component
 *
 * Exibe as categorias do menu e permite ao usuário navegar entre elas.
 *
 * ▸ **Responsabilidade**
 * - Renderizar as categorias do menu (`useMenuDetailsStore`)
 * - Atualizar a ordem das categorias (`useMenuDetailsStore`)
 * - Atualizar a categoria selecionada (`useMenuDetailsStore`)
 * - Aplicar estilos dinâmicos do restaurante (`useVenueStore`)
 *
 * @param props                  - Parâmetros do CategoryTabs.
 * @param props.selectedCategory - Categoria selecionada atualmente.
 * @param props.onCategoryChange - Função para atualizar a ordem das categorias.
 *
 * @example
 * ```tsx
 * <CategoryTabs />
 * ```
 */
export function CategoryTabs({ selectedCategory, onCategoryChange }: Props) {
  const { venue } = useVenueStore();
  const { menu } = useMenuDetailsStore();

  /**
   * Manipula o clique na categoria e atualiza a ordem das categorias.
   */
  const handleCategoryClick = (categoryName: string) => {
    if (!menu?.sections) return;

    const newOrder = [...menu.sections];
    const clickedIndex = newOrder.findIndex((s) => s.name === categoryName);
    if (clickedIndex !== -1) {
      const [clickedSection] = newOrder.splice(clickedIndex, 1);
      newOrder.unshift(clickedSection);
      onCategoryChange(categoryName, newOrder);
    }
  };

  return (
    <section className="flex justify-center lg:justify-start lg:gap-4">
      {menu?.sections.map((section) => (
        <button
          key={section.id}
          className={`flex flex-col gap-8 cursor-pointer p-4 font-medium ${
            selectedCategory === section.name ? "border-b-3" : ""
          }`}
          style={{ borderColor: venue?.webSettings.primaryColour }}
          onClick={() => handleCategoryClick(section.name)}
        >
          <div
            className={`relative w-[82px] h-[82px] rounded-full ${
              selectedCategory === section.name ? "border-2" : ""
            }`}
            style={{ borderColor: venue?.webSettings.primaryColour }}
          >
            <Image
              src={section.images[0]?.image}
              alt={section.name}
              fill
              className="rounded-full object-cover p-0.5"
            />
          </div>
          <h3 className={selectedCategory === section.name ? "font-bold" : ""}>
            {section.name}
          </h3>
        </button>
      ))}
    </section>
  );
}
