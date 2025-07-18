"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useVenueStore } from "@/store/useVenueStore";
import { ModalCart } from "@/app/components/cart/ModalCart";
import Image from "next/image";
import Link from "next/link";

/**
 * Header Component
 *
 * Exibe o cabeçalho da aplicação, inclui navegação por abas (MENU, LOGIN,
 * CONTACT), banner customizável, menu mobile com botão hamburguer e controle
 * do carrinho de compras.
 *
 * ▸ **Responsabilidade**
 * - Renderizar navegação, banner e botão de carrinho
 * - Aplicar estilos dinâmicos do restaurante (`useVenueStore`)
 * - Exibe o total de itens no ícone de carrinho
 * - Modal do carrinho e menu lateral ativados por estado
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 */
export function Header() {
  const { venue, fetchVenue } = useVenueStore();
  const { items } = useCartStore();
  const [selectedTab, setSelectedTab] = useState("menu");
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const options = [
    { label: "MENU", href: "/", value: "menu" },
    { label: "LOGIN", href: "", value: "login" },
    { label: "CONTACT", href: "", value: "contact" },
  ];

  /**
   * Carrega os dados do estabelecimento ao montar o componente.
   */
  useEffect(() => {
    fetchVenue();
  }, [fetchVenue]);

  /**
   * Aplica a cor de fundo vinda da API ao HEADER
   */
  const navColor = useVenueStore(
    (s) => s.venue?.webSettings.navBackgroundColour
  );

  /**
   * Seleciona a aba ativa e o label correspondente
   */
  const selectedTabLabel = options.find(
    (option) => option.value === selectedTab
  )?.label;

  /**
   * Calcula o total de itens no carrinho
   */
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      style={{ backgroundColor: navColor }}
      className=" text-white flex flex-col items-center"
    >
      {/* Menu Desktop */}
      <nav className="hidden lg:flex w-1/2">
        <ul className="flex justify-between w-full">
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

      {/* Menu Mobile */}
      <div className="md:hidden flex items-center justify-between w-full px-4 py-2">
        <span
          className="relative lg:hidden"
          aria-label="Abrir carrinho"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <i className="bi bi-cart-fill text-xl"></i>
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalQuantity}
            </span>
          )}
        </span>

        <span className="text-lg font-semibold">{selectedTabLabel}</span>
        <button className="text-3xl z-[60]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <i className="bi bi-x-lg text-foreground" />
          ) : (
            <i className="bi bi-list" />
          )}
        </button>
        <nav
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-background transition-transform duration-300 z-40 flex flex-col items-center justify-center gap-8 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col items-center gap-8 text-foreground text-2xl font-semibold">
            {options.map((item, idx) => (
              <li key={idx}>
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Banner */}
      <div className="w-full h-[150px] relative">
        <Image
          src={venue?.webSettings.bannerImage || "/header.png"}
          alt="banner"
          fill
          className="object-cover"
        />
      </div>
      <ModalCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
