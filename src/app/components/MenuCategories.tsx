"use client";

import { useMenuDetailsStore } from "@/store/useMenuDetailsStore";
import { useVenueStore } from "@/store/useVenueStore";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MenuCategories() {
  const { venue, fetchVenue } = useVenueStore();
  const { menu, fetchMenu } = useMenuDetailsStore();
  const [selectedCategory, setSelectedCategory] = useState(
    menu?.sections[0].name
  );

  useEffect(() => {
    fetchVenue();
    fetchMenu();
  }, []);

  return (
    <div
      className="flex justify-center lg:justify-start lg:gap-4 lg:p-4"
      style={{ backgroundColor: venue?.webSettings.backgroundColour }}
    >
      {menu?.sections.map((section) => (
        <button
          key={section.id}
          className={`flex flex-col gap-8 cursor-pointer p-4 font-medium ${
            selectedCategory === section.name ? "border-b-3" : ""
          }`}
          style={{ borderColor: venue?.webSettings.primaryColour }}
          onClick={() => setSelectedCategory(section.name)}
        >
          <div
            className={`relative  w-[82px] h-[82px] rounded-full ${
              selectedCategory === section.name ? "border-2" : ""
            }`}
            style={{ borderColor: venue?.webSettings.primaryColour }}
          >
            <Image
              src={section.images[0].image}
              alt={section.name}
              fill
              className="rounded-full object-cover p-0.5"
            />
          </div>
          <h2
            className={`${
              selectedCategory === section.name ? "font-bold" : ""
            }`}
          >
            {section.name}
          </h2>
        </button>
      ))}
    </div>
  );
}
