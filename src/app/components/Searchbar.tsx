"use client";

import { useState } from "react";

export default function Searchbar({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");

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
