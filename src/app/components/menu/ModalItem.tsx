"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useVenueStore } from "@/store/useVenueStore";
import { ModalProps } from "@/types";
import { formatCurrency, getFinalPrice, mapMenuItemToCartItem } from "@/utils";
import { GeneralButton } from "../ui/Buttons";
import Image from "next/image";
import ReactModal from "react-modal";

/**
 * ModalItem Component
 *
 * Exibe um item do menu em formato de *modal* full-screen (mobile),
 * permitindo ao usuário revisar o item, alterar quantidades e adicionar
 * ao carrinho.
 *
 * ▸ **Responsabilidade**
 * - Renderizar informações do item (`useMenuDetailsStore`)
 * - Aplicar estilos dinâmicos do restaurante (`useVenueStore`)
 * - Bloquear/permitir rolagem do `body` enquanto o modal estiver aberto
 * - Persistir alterações de quantidade/remover/limpar itens
 *
 * @param props         - Parâmetros do ModalItem.
 * @param props.isOpen  - Controla a exibição do modal.
 * @param props.onClose - Callback para fechar o modal.
 * @param props.item    - Item do menu selecionado.
 *
 * @example
 * ```tsx
 * <ModalItem isOpen={isOpen} onClose={onClose} item={item} />
 * ```
 */
export function ModalItem({ isOpen, onClose, item }: ModalProps) {
  const { venue, fetchVenue } = useVenueStore();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<
    Record<number, number>
  >({});

  /**
   * Define o elemento principal da aplicação para acessibilidade do modal e
   * carrega os dados do menu e do estabelecimento ao montar o componente.
   */
  useEffect(() => {
    ReactModal.setAppElement(document.body);
    fetchVenue();
  }, [fetchVenue]);

  /**
   * Bloqueia a rolagem do `body` enquanto o modal estiver aberto.
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /**
   * Limpa os estados do modal.
   */
  const resetState = () => {
    setQuantity(1);
    setSelectedModifiers({});
  };

  if (!item) return null;

  const finalPrice = getFinalPrice(item, selectedModifiers, quantity);

  /**
   * Adiciona o item ao carrinho e fecha o modal.
   */
  const handleAddToCart = () => {
    const cartItem = mapMenuItemToCartItem(item, quantity, selectedModifiers);
    addItem(cartItem);
    onClose();
    resetState();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        onClose();
        resetState();
      }}
      overlayClassName="fixed inset-0 bg-[#0f0f0f80] flex items-center justify-center z-80"
      className="bg-bg-secondary lg:rounded shadow-lg w-full h-full max-w-lg mx-auto text-sm xl:max-h-[720px] overflow-hidden lg:w-[480px] lg:h-5/6 flex flex-col"
      contentLabel="Modal"
    >
      {/* Imagem - Topo */}
      <div className="relative w-full h-[280px] flex-shrink-0">
        {item.images && item.images.length > 0 && (
          <>
            <Image
              src={item.images[0].image}
              alt={item.name}
              fill
              className="object-cover w-full h-full"
            />
            <button
              className="absolute top-4 right-4 bg-bg-secondary w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90"
              onClick={() => {
                onClose();
                setQuantity(1);
              }}
            >
              <i className="bi bi-x-lg text-lg"></i>
            </button>
          </>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 p-4">
          <h2 className="font-semibold text-2xl">{item.name}</h2>
          <p>{item.description}</p>
        </div>

        {item.modifiers && item.modifiers.length > 0 && (
          <div className="flex flex-col gap-4">
            {item.modifiers.map((modifier) => (
              <div key={modifier.id}>
                <div className="p-4 bg-bg-primary">
                  <h3 className="font-semibold">{modifier.name}</h3>
                  <p>Select 1 option</p>
                </div>
                <ul className="flex flex-col">
                  {modifier.items.map((modItem) => (
                    <li key={modItem.id} className="flex justify-between p-4">
                      <span>
                        <h4 className="font-semibold">{modItem.name}</h4>
                        <p>{formatCurrency(modItem.price)}</p>
                      </span>
                      <input
                        type="radio"
                        name={`modifier-${modifier.id}`}
                        checked={selectedModifiers[modifier.id] === modItem.id}
                        onChange={() =>
                          setSelectedModifiers((prev) => ({
                            ...prev,
                            [modifier.id]: modItem.id,
                          }))
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botão - Rodapé */}
      <div className="sticky bottom-0 z-10 bg-bg-primary/40 p-4">
        <div className="flex items-center justify-center gap-4 text-xl pb-3">
          <button
            className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-bg-primary hover:opacity-90 disabled:opacity-50"
            disabled={quantity === 1}
            style={{ backgroundColor: venue?.webSettings.primaryColour }}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <i className="bi bi-dash"></i>
          </button>
          <span>{quantity}</span>
          <button
            className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-bg-primary hover:opacity-90"
            style={{ backgroundColor: venue?.webSettings.primaryColour }}
            onClick={() => setQuantity((q) => q + 1)}
          >
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
        {venue && (
          <GeneralButton action={() => handleAddToCart()} venue={venue}>
            Add to Order - {formatCurrency(finalPrice)}
          </GeneralButton>
        )}
      </div>
    </ReactModal>
  );
}
