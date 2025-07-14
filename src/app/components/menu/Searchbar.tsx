"use client";

import { useState } from "react";

/**
 * Searchbar Component
 *
 * Exibe a barra de busca para navegar entre os itens do menu.
 *
 * ▸ **Responsabilidade**
 * - Renderizar a barra de busca (`useMenuDetailsStore`)
 * - Atualizar o termo de busca (`useMenuDetailsStore`)
 *
 * @param props          - Parâmetros do Searchbar.
 * @param props.onSearch - Função para atualizar o termo de busca.
 *
 * @example
 * ```tsx
 * <Searchbar onSearch={handleSearch} />
 * ```
 */
export function Searchbar({ onSearch }: { onSearch: (term: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Atualiza o termo de busca e chama a função de busca (`onSearch`).
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="py-2 px-4 flex gap-4 border border-gray-400 rounded-lg">
      <i className="bi bi-search text-gray-400"></i>
      <input
        type="text"
        placeholder="Search menu items"
        value={searchTerm}
        onChange={handleChange}
        className="w-full outline-0"
      />
    </div>
  );
}
