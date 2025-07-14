"use client";

import { useEffect, useState } from "react";
import { useMenuDetailsStore } from "@/store/useMenuDetailsStore";
import { useVenueStore } from "@/store/useVenueStore";
import { MenuCategoriesProps } from "@/types";
import { CategoryTabs } from "./CategoryTabs";
import { CategoryItems } from "./CategoryItems";

/**
 * MenuCategories Component
 *
 * Componente principal para renderizar as categorias do menu
 * e os respectivos produtos filtrados. Gerencia ordenação dinâmica,
 * seleção de item e abertura de modal.
 *
 * ▸ **Responsabilidade**
 * - Renderizar as categorias do menu (`useMenuDetailsStore`)
 * - Atualizar a ordem das categorias (`useMenuDetailsStore`)
 * - Atualizar a categoria selecionada (`useMenuDetailsStore`) *
 *
 * @param props            - Parâmetros do MenuCategories.
 * @param props.searchTerm - Termo de busca para filtrar os itens.
 *
 * @example
 * ```tsx
 * <MenuCategories />
 * ```
 */
export function MenuCategories({ searchTerm }: MenuCategoriesProps) {
  const { venue, fetchVenue } = useVenueStore();
  const { menu, fetchMenu } = useMenuDetailsStore();
  const [selectedCategory, setSelectedCategory] = useState("Burgers");
  const [orderedSections, setOrderedSections] = useState(menu?.sections || []);

  /**
   * Carrega os dados do menu e do estabelecimento ao montar o componente.
   */
  useEffect(() => {
    fetchVenue();
    fetchMenu();
  }, [fetchVenue, fetchMenu]);

  /**
   * Atualiza a ordem das categorias ao mudar o menu.
   */
  useEffect(() => {
    if (menu?.sections) {
      setOrderedSections(menu.sections);
    }
  }, [menu]);

  return (
    <div
      className="flex flex-col px-4 lg:w-2/3 shadow-md"
      style={{ backgroundColor: venue?.webSettings.backgroundColour }}
    >
      <CategoryTabs
        selectedCategory={selectedCategory}
        onCategoryChange={(name, order) => {
          setSelectedCategory(name);
          setOrderedSections(order);
        }}
      />

      <CategoryItems
        sections={orderedSections}
        searchTerm={searchTerm}
        venue={venue}
      />
    </div>
  );
}
