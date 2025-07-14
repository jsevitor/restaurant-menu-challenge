"use client";

import { useState } from "react";
import { Cart } from "./components/cart/Cart";
import { MenuCategories } from "./components/menu/MenuCategories";
import { Searchbar } from "./components/menu/Searchbar";

/**
 * Home Component
 *
 * Exibe o layout principal da aplicação.
 *
 * ▸ **Responsabilidade**
 * - Renderizar o cabeçalho e o corpo da aplicação
 *
 * @example
 * ```tsx
 * <Home />
 * ```
 */
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Searchbar onSearch={(term) => setSearchTerm(term)} />
      <div className="flex gap-6 lg:p-8 bg-bg-secondary lg:bg-bg-primary rounded-lg">
        <MenuCategories searchTerm={searchTerm} />

        <Cart />
      </div>
    </>
  );
}
