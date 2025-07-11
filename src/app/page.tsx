"use client";

import { useState } from "react";
import Cart from "./components/Cart";
import MenuCategories from "./components/MenuCategories";
import Searchbar from "./components/Searchbar";

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
