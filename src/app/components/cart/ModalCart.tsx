"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useVenueStore } from "@/store/useVenueStore";
import { formatCurrency } from "@/utils";
import { GeneralButton } from "@/app/components/ui/Buttons";
import { ModalProps } from "@/types";
import ReactModal from "react-modal";

/**
 * ModalCart Component
 *
 * Exibe o carrinho de compras em formato de *modal* full‑screen (mobile),
 * permitindo ao usuário revisar itens, alterar quantidades, remover produtos
 * ou limpar todo o carrinho. Também mostra subtotal, total e um botão de
 * checkout.
 *
 * ▸ **Responsabilidade**
 * - Renderizar lista de itens (`useCartStore`)
 * - Aplicar estilos dinâmicos do restaurante (`useVenueStore`)
 * - Bloquear/permitir rolagem do `body` enquanto o modal estiver aberto
 * - Persistir alterações de quantidade/remover/limpar itens
 *
 * @param props          - Parâmetros do ModalCart.
 * @param props.isOpen   - Controla a exibição do modal.
 * @param props.onClose  - Callback para fechar o modal.
 * @param props.children - Conteúdo extra opcional.
 *
 * @example
 * ```tsx
 * <ModalCart isOpen={open} onClose={() => setOpen(false)} />
 * ```
 */
export function ModalCart({ isOpen, onClose }: ModalProps) {
  const { venue, fetchVenue } = useVenueStore();
  const { items, total, removeItem, changeQuantity, clearCart } =
    useCartStore();

  useEffect(() => {
    ReactModal.setAppElement(document.body);
    fetchVenue();
  }, [fetchVenue]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        onClose();
      }}
      overlayClassName="fixed inset-0 bg-[#0f0f0f80] flex items-center justify-center z-80"
      className="bg-bg-secondary lg:rounded shadow-lg w-full h-full max-w-lg mx-auto text-sm overflow-hidden lg:hidden"
      contentLabel="Modal"
    >
      <div className="flex flex-col h-full">
        {/* Topo */}
        <div className="text-xl font-semibold p-4 flex items-center justify-between bg-bg-primary shadow-md">
          {items.length > 0 && (
            <button className="cursor-pointer" onClick={() => clearCart()}>
              <i className="bi bi-trash-fill"></i>
            </button>
          )}
          <h2>Basket</h2>
          <button className="cursor-pointer" onClick={() => onClose()}>
            <i className="bi bi-x-lg text-2xl"></i>
          </button>
        </div>

        {/* Conteúdo com rolagem */}
        {items.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto bg-bg-secondary pt-4 px-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="font-semibold flex justify-between mb-4"
                >
                  <span className="flex flex-col">
                    <p>{item.name}</p>
                    {item.modifiers && item.modifiers.length > 0 && (
                      <p className="text-sm font-normal">
                        With {item.modifiers[0].selectedOption.name}
                      </p>
                    )}
                    <div className="flex items-center justify-center gap-4 px-2 py-1">
                      <button
                        className="w-5 h-5 rounded-full flex items-center justify-center cursor-pointer text-bg-primary"
                        style={{
                          backgroundColor: venue?.webSettings.primaryColour,
                        }}
                        onClick={() => {
                          if (item.quantity !== 1) {
                            changeQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            );
                          } else {
                            removeItem(item.id);
                          }
                        }}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="w-5 h-5 rounded-full flex items-center justify-center cursor-pointer text-bg-primary"
                        style={{
                          backgroundColor: venue?.webSettings.primaryColour,
                        }}
                        onClick={() =>
                          changeQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <i className="bi bi-plus-lg"></i>
                      </button>
                    </div>
                  </span>
                  <span>{formatCurrency(item.basePrice)}</span>
                </div>
              ))}
            </div>

            {/* Rodapé fixo */}
            <div className="bg-bg-primary sticky bottom-0 w-full z-10">
              <div className="flex justify-between text-lg p-4 border-t border-gray-300">
                <span className="font-semibold">Sub total:</span>
                <span className="font-semibold">
                  {formatCurrency(
                    items.reduce(
                      (acc, item) => acc + item.basePrice * item.quantity,
                      0
                    )
                  )}
                </span>
              </div>
              <div className="flex justify-between text-2xl font-semibold p-4 border-t border-gray-300">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="p-4">
                {venue && (
                  <GeneralButton action={onClose} venue={venue}>
                    Checkout now
                  </GeneralButton>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="p-6 bg-bg-secondary">Seu carrinho está vazio</p>
        )}
      </div>
    </ReactModal>
  );
}
