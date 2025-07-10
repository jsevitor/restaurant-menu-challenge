"use client";

import { useCartStore } from "@/store/useCartStore";
import { useVenueStore } from "@/store/useVenueStore";
import { formatCurrency } from "@/utils/function";

export default function Cart() {
  const { items, total, changeQuantity, removeItem, clearCart } =
    useCartStore();
  const { venue } = useVenueStore();

  return (
    <section className="hidden lg:flex flex-col w-1/3 h-fit shadow-md">
      <div className="text-xl font-semibold p-4 flex items-center justify-between">
        <h2>Basket</h2>
        {items.length > 0 && (
          <button className="cursor-pointer" onClick={() => clearCart()}>
            <i className="bi bi-trash-fill"></i>
          </button>
        )}
      </div>
      {items.length > 0 ? (
        <div className="flex flex-col gap-4 bg-bg-secondary pt-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="font-semibold flex justify-between px-4"
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
                        changeQuantity(item.id, Math.max(1, item.quantity - 1));
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
                    onClick={() => changeQuantity(item.id, item.quantity + 1)}
                  >
                    <i className="bi bi-plus-lg"></i>
                  </button>
                </div>
              </span>
              <span>{formatCurrency(item.basePrice)}</span>
            </div>
          ))}
          <div>
            <div className="flex justify-between bg-bg-primary text-lg p-4 border-t border-gray-300">
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
            <div className="flex justify-between bg-bg-primary text-2xl font-semibold p-4 border-t border-gray-300">
              <span>Total:</span>
              <span className="font-semibold">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="p-6 bg-bg-secondary">Seu carrinho está vazio</p>
      )}
    </section>
  );
}
