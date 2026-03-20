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

  // ➕ Increase quantity
  const handleIncrease = async () => {
    const newQty = quantity + 1;
    setQuantity(newQty);

    try {
      setLoading(true);
      await updateCart(id, newQty);
      onRefreshCart(); // refresh cart from parent
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ➖ Decrease quantity
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

  // 🗑️ Delete item
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteFromCart(id);
      onRefreshCart(); // refresh UI
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 px-4 py-3 border-b border-gray-300 text-sm w-full">

      {/* Image + Checkbox */}
      <div className="w-20 h-20 min-w-[80px] border border-gray-300 rounded-md overflow-hidden bg-gray-100 relative">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="absolute top-2 left-2 w-4 h-4 cursor-pointer accent-black"
        />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-between">

        {/* Left */}
        <div>
          <h3 className="font-medium">{title}</h3>

          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <span>Delivery in 3 days</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-2">
            <span className="font-semibold text-base">₹{price}</span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col justify-between items-end">

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-xs text-gray-400 hover:text-red-500"
          >
            ✕
          </button>

          {/* Quantity */}
          <div className="flex items-center border border-gray-300 rounded text-xs">
            <button
              onClick={handleDecrease}
              disabled={loading}
              className="px-2 py-1 hover:bg-gray-100"
            >
              −
            </button>

            <span className="px-3 py-1 border-x border-gray-300">
              {quantity}
            </span>

            <button
              onClick={handleIncrease}
              disabled={loading}
              className="px-2 py-1 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}