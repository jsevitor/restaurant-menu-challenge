"use client";

import { useMenuDetailsStore } from "@/store/useMenuDetailsStore";
import { useVenueStore } from "@/store/useVenueStore";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MenuCategories() {
  const { venue, fetchVenue } = useVenueStore();
  const { menu, fetchMenu } = useMenuDetailsStore();
  const [selectedCategory, setSelectedCategory] = useState("Burgers");

  useEffect(() => {
    fetchVenue();
    fetchMenu();
  }, []);

  console.log(menu?.sections[0].images[0].image);
  let image = menu?.sections[0].images[0].image;

  return (
    <div
      className="flex flex-col px-4 lg:w-2/3 shadow-md"
      style={{ backgroundColor: venue?.webSettings.backgroundColour }}
    >
      <section className="flex justify-center lg:justify-start lg:gap-4">
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
            <h3
              className={`${
                selectedCategory === section.name ? "font-bold" : ""
              }`}
            >
              {section.name}
            </h3>
          </button>
        ))}
      </section>
      <section className="mt-8">
        {menu?.sections.map((section) => (
          <div key={section.id}>
            <div className="flex justify-between py-4">
              <h2 className="text-xl font-semibold">{section.name}</h2>
              <i
                className={`bi text-xl ${
                  selectedCategory === section.name
                    ? "bi-chevron-up"
                    : "bi-chevron-down"
                }`}
              ></i>
            </div>
            {section.items.map((item) => (
              <div key={item.id} className="py-4 flex justify-between gap-4">
                <div className="overflow-ellipsis w-3/4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="line-clamp-1 text-sm text-gray-700">
                    {item.description}
                  </p>
                  <p className="font-semibold">
                    <span>{venue?.currency}</span>
                    <span>{item.price} </span>
                  </p>
                </div>
                {item.images?.length > 0 && (
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
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
