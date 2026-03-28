import { useState } from "react";
import { updateCart, deleteFromCart } from "../../services/cartService";

export default function CartItem({
  id,
  image,
  title,
  price,
  originalPrice,
  quantity: initialQty,
  isSelected,
  onSelect,
  onRefreshCart,
}) {
  const [quantity, setQuantity] = useState(initialQty || 1);
  const [loading, setLoading] = useState(false);

  const handleIncrease = async () => {
    const newQty = quantity + 1;
    setQuantity(newQty);

    try {
      setLoading(true);
      await updateCart(id, newQty);
      onRefreshCart();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = async () => {
    if (quantity <= 1) return;

    const newQty = quantity - 1;
    setQuantity(newQty);

    try {
      setLoading(true);
      await updateCart(id, newQty);
      onRefreshCart();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteFromCart(id);
      onRefreshCart();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm hover:shadow-lg transition group">

      {/* IMAGE */}
      <div className="relative">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="absolute top-2 left-2 z-10 w-4 h-4 accent-black cursor-pointer"
        />

        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex justify-between">

        {/* LEFT */}
        <div className="flex flex-col justify-between">

          <div>
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
              {title}
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              Delivery in 3 days 🚚
            </p>

            {/* PRICE */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-base font-bold text-gray-900">
                ₹{price}
              </span>

              {originalPrice && (
                <>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{originalPrice}
                  </span>
                  <span className="text-xs text-green-600 font-medium">
                    {Math.round(
                      ((originalPrice - price) / originalPrice) * 100
                    )}% off
                  </span>
                </>
              )}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-3 mt-3">

            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">

              <button
                onClick={handleDecrease}
                disabled={loading}
                className="px-2 text-sm hover:text-black"
              >
                −
              </button>

              <span className="px-2 text-sm font-medium">
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
                disabled={loading}
                className="px-2 text-sm hover:text-black"
              >
                +
              </button>
            </div>

            {loading && (
              <span className="text-xs text-gray-400">
                Updating...
              </span>
            )}
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex flex-col justify-between items-end">

          {/* DELETE */}
          <button
            onClick={handleDelete}
            disabled={loading}
            className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-500"
          >
            ✕
          </button>

          {/* MOVE */}
          <button className="text-xs text-gray-400 hover:text-pink-500 transition">
            Move 💖
          </button>
        </div>
      </div>
    </div>
  );
}