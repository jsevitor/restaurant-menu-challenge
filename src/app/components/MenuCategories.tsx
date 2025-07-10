"use client";

import { useMenuDetailsStore } from "@/store/useMenuDetailsStore";
import { useVenueStore } from "@/store/useVenueStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { MenuItem } from "@/types/types";
import { useCartStore } from "@/store/useCartStore";
import { formatCurrency } from "@/utils/function";

type Props = {
  searchTerm: string;
};

export default function MenuCategories({ searchTerm }: Props) {
  const { venue, fetchVenue } = useVenueStore();
  const { menu, fetchMenu } = useMenuDetailsStore();
  const { items } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState("Burgers");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [orderedSections, setOrderedSections] = useState(menu?.sections || []);

  useEffect(() => {
    fetchVenue();
    fetchMenu();
  }, [fetchVenue, fetchMenu]);

  useEffect(() => {
    if (menu?.sections) {
      setOrderedSections(menu.sections);
    }
  }, [menu]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (!menu?.sections) return;

    const newOrder = [...menu.sections];
    const clickedSectionIndex = newOrder.findIndex(
      (s) => s.name === categoryName
    );
    if (clickedSectionIndex > -1) {
      const [clickedSection] = newOrder.splice(clickedSectionIndex, 1);
      newOrder.unshift(clickedSection);
      setOrderedSections(newOrder);
    }
  };

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
            onClick={() => {
              setSelectedCategory(section.name);
              handleCategoryClick(section.name);
            }}
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

      {/* Itens das categorias */}
      <section className="mt-8">
        {orderedSections.map((section) => {
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
                          const cartItem = items.find((i) => i.id === item.id);
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
                        <span>{formatCurrency(item.price)} </span>
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />
    </div>
  );
}
