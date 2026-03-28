import { useState,useEffect } from "react"
import { addToWishlist } from "../services/wishlistService"; 
import CartItem from "../components/cart/CartItem"
import CouponBox from "../components/cart/CouponBox"
import Gifting from "../components/cart/Gifting"
import PriceDetails from "../components/cart/PriceDetails"
import { getCart, updateCart, deleteFromCart } from "../services/cartService";
import { BASE_URL } from "../config";
export default function Cart() {
 const [cartItems, setCartItems] = useState([]);
const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([])

  const fetchCart = async () => {
    try {
      const data = await getCart(); // ✅ use service

      console.log("FULL CART DATA:", data);

      if (data.success) {
      setCartItems(data.items || []);
      } else {
        console.error("Cart error:", data.message);
      }
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  };
useEffect(() => {
  fetchCart();
}, []);

const handleDelete = async (productId) => {
  try {
    await deleteFromCart(productId);

    // refresh cart
    setCartItems((prev) =>
      prev.filter((item) => item.product_id !== productId)
    );
  } catch (err) {
    console.error(err);
  }
};

const handleQuantityChange = async (productId, newQty) => {
  try {
    await updateCart(productId, newQty);

    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  } catch (err) {
    console.error(err);
  }
};


const handleWishlist = async (item) => {
  const variantId = item?.variant_id;

  if (!variantId) return;

  try {
    const res = await addToWishlist(variantId);

    if (res.success) {
      // remove from cart
      await deleteFromCart(item.product_id);

      setCartItems((prev) =>
        prev.filter((i) => i.variant_id !== item.variant_id)
      );

      window.dispatchEvent(new Event("wishlistUpdated"));

      console.log("Moved to wishlist 💖");
    }
  } catch (err) {
    console.error(err);
  }
};

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    )
  }

  return (
<div className="min-h-screen bg-gradient-to-br from-[#e6f4ea] via-[#f0f6ff] to-[#f3e8ff] pt-10 pb-16 px-4">
  <div className="max-w-7xl mx-auto">

    {/* HEADER */}
    <div className="mb-10 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Your Cart 🛒</h1>
        <p className="text-sm text-gray-500">
          {cartItems.length} items saved for later
        </p>
      </div>

      <button className="text-sm text-gray-500 hover:text-black transition">
        Continue Shopping →
      </button>
    </div>

    {/* MAIN GRID */}
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

      {/* LEFT - PINTEREST STYLE */}
      <div>

        {/* ACTION BAR */}
        <div className="flex items-center gap-4 mb-6 px-4 py-3 rounded-full bg-white/70 backdrop-blur-xl shadow border border-white/40">
          <input
            type="checkbox"
            className="w-4 h-4 accent-black cursor-pointer"
          />

          <span className="text-sm text-gray-600">
            {selectedItems.length} selected
          </span>

          <div className="ml-auto flex gap-4 text-sm">
            <button className="hover:text-blue-600 transition">
              Move to wishlist
            </button>
            <button className="hover:text-red-500 transition">
              Remove
            </button>
          </div>
        </div>

        {/* PINTEREST GRID */}
        <div className="grid sm:grid-cols-2 gap-5">

          {cartItems.map((item) => (
            <div
              key={item.variant_id}
              className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={item.image}
                  className="w-full h-[220px] object-cover group-hover:scale-105 transition"
                />

                {/* QUICK ACTIONS */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button className="bg-white p-2 rounded-full shadow">
                    ❤️
                  </button>
                  <button className="bg-white p-2 rounded-full shadow">
                    🗑️
                  </button>
                </div>
              </div>

              {/* INFO */}
              <div className="mt-3">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {item.name}
                </h3>

                <p className="text-lg font-bold mt-1">
                  ₹{item.price}
                </p>

                {/* QUANTITY */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product_id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product_id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                   onClick={() => handleWishlist(item)}
                    className="text-xs text-pink-500 hover:underline"
                  >
                    Move 💖
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* RIGHT - CLEAN NIKE STYLE */}
      <div className="sticky top-28 space-y-4">

        <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-lg">
          <CouponBox />
        </div>

        <div className="bg-white/70 backdrop-blur-xl p-5 rounded-3xl shadow-lg">
          <Gifting />
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl border">

          <PriceDetails />

          <button className="w-full mt-5 py-3 rounded-full bg-black text-white font-semibold hover:opacity-90 transition">
            Checkout →
          </button>
        </div>

      </div>
    </div>
  </div>
</div>
  )
}
