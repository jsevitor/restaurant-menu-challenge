"use client";

import { useCartStore } from "@/store/useCartStore";
import { useVenueStore } from "@/store/useVenueStore";
import { MenuItem } from "@/types/types";
import { formatCurrency, getFinalPrice } from "@/utils/function";
import { mapMenuItemToCartItem } from "@/utils/mapping";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  item: MenuItem | null;
};

export default function Modal({ isOpen, onClose, item }: ModalProps) {
  const { venue, fetchVenue } = useVenueStore();
  const { addItem } = useCartStore();
  const [selectedModifier, setSelectedModifier] = useState<number | null>(null);
  const [selectedModifiers, setSelectedModifiers] = useState<
    Record<number, number>
  >({});

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    ReactModal.setAppElement(document.body);
    fetchVenue();
  }, []);

  if (!item) return null;

  const finalPrice = getFinalPrice(item, selectedModifiers, quantity);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        onClose();
        setQuantity(1);
        setSelectedModifier(null);
        setSelectedModifiers({});
      }}
      overlayClassName="fixed inset-0 bg-[#0f0f0f80] flex items-center justify-center"
      className="bg-bg-secondary rounded shadow-lg w-[480px] h-5/6 max-w-lg mx-4 text-sm xl:max-h-[720px] overflow-y-auto overflow-x-hidden"
      contentLabel="Modal"
    >
      <div className="flex flex-col relative h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="relative w-full h-[320px]">
            {item.images?.length > 0 && (
              <div className="w-[128px] h-[85px] rounded overflow-hidden">
                <Image
                  src={item.images[0].image}
                  alt={item.name}
                  fill
                  className="object-cover w-full h-full"
                />
                <button
                  className="absolute top-2 right-2 bg-bg-secondary w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    onClose();
                    setQuantity(1);
                    setSelectedModifier(null);
                  }}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 p-4">
            <h2 className="font-semibold text-2xl">{item.name}</h2>
            <p>{item.description}</p>
          </div>
          {item.modifiers && item.modifiers.length > 0 && (
            <div className="flex flex-col gap-4">
              {item.modifiers.map((modifier) => (
                <div key={modifier.id}>
                  <div className="p-4 bg-bg-primary">
                    <h3 className="font-semibold ">{modifier.name}</h3>
                    <p>Select 1 option</p>
                  </div>
                  <ul className="flex flex-col overflow-y-auto">
                    {modifier.items.map((item) => (
                      <li key={item.id} className="flex justify-between p-4">
                        <span>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p>{formatCurrency(item.price)}</p>
                        </span>
                        <input
                          type="radio"
                          name={`modifier-${modifier.id}`}
                          checked={selectedModifiers[modifier.id] === item.id}
                          onChange={() =>
                            setSelectedModifiers((prev) => ({
                              ...prev,
                              [modifier.id]: item.id,
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
        <div className=" sticky bottom-0 z-10 bg-bg-primary/40 p-4">
          <div className="flex items-center justify-center gap-4 text-xl pb-3">
            <button
              className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-bg-primary"
              style={{ backgroundColor: venue?.webSettings.primaryColour }}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <i className="bi bi-dash"></i>
            </button>
            <span>{quantity}</span>
            <button
              className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-bg-primary"
              style={{ backgroundColor: venue?.webSettings.primaryColour }}
              onClick={() => setQuantity((q) => q + 1)}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
          <button
            className="p-3 w-full rounded-full text-bg-primary cursor-pointer font-semibold"
            style={{ backgroundColor: venue?.webSettings.primaryColour }}
            onClick={() => {
              const cartItem = mapMenuItemToCartItem(
                item,
                quantity,
                selectedModifiers
              );
              addItem(cartItem);
              onClose();
              setQuantity(1);
              setSelectedModifier(null);
              setSelectedModifiers({});
            }}
          >
            Add to Order - {formatCurrency(finalPrice)}
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
