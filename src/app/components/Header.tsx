"use client";

import { useVenueStore } from "@/store/useVenueStore";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const { venue, isLoading, fetchVenue } = useVenueStore();
  const [selectedTab, setSelectedTab] = useState("menu");

  const options = [
    { label: "MENU", href: "/", value: "menu" },
    { label: "ENTRAR", href: "", value: "login" },
    { label: "CONTATO", href: "", value: "contact" },
  ];

  useEffect(() => {
    fetchVenue();
  }, []);

  const navColor = useVenueStore(
    (s) => s.venue?.webSettings.navBackgroundColour
  );

  return (
    <header
      style={{ backgroundColor: navColor }}
      className=" text-white flex flex-col items-center"
    >
      <nav className="w-1/2">
        <ul className="flex justify-between">
          {options.map((option) => (
            <li
              key={option.label}
              onClick={() => setSelectedTab(option.value)}
              className={`p-4 w-1/2 text-center cursor-pointer text-lg ${
                selectedTab === option.value
                  ? "border-b-4 border-white"
                  : "border-b-0"
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full h-[150px] relative">
        <Image
          src={venue?.webSettings.bannerImage || "/header.png"}
          alt="banner"
          fill
        />
      </div>
    </header>
  );
}
