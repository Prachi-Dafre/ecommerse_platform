import { useState,useEffect } from "react"
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

const handleMoveToWishlist = async (item) => {
  try {
    // 1️⃣ Add to wishlist
    const res = await fetch(`${BASE_URL}/api/v1/user/wishlist.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        variant_id: item.variant_id,
      }),
    });

    const data = await res.json();

    if (data.success) {
      // 2️⃣ Remove from cart
      await fetch(`${BASE_URL}/api/v1/cart.php`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          variant_id: item.variant_id,
        }),
      });

      // 3️⃣ Update UI
      setCartItems((prev) =>
        prev.filter((i) => i.variant_id !== item.variant_id)
      );

      // 🔥 Toast
      toast.success("Moved to wishlist 💖", {
        icon: "✨",
      });

      // 🔥 Update Topbar count
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to move item 😢");
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
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-6">

        {/* STEPPER */}
        <div className="mb-10 flex justify-center">
          <div className="flex items-center text-xs max-w-md w-full justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-semibold">
                1
              </div>
              <span className="font-semibold text-black">Cart</span>
            </div>

            <div className="flex-1 h-px bg-gray-300 mx-2"></div>

            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[10px] font-semibold">
                2
              </div>
              <span className="text-gray-500">Address</span>
            </div>

            <div className="flex-1 h-px bg-gray-300 mx-2"></div>

            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[10px] font-semibold">
                3
              </div>
              <span className="text-gray-500">Payment</span>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">

          {/* LEFT */}
          <div className="flex flex-col items-center">

            {/* HEADER */}
            <div className="w-full max-w-3xl mb-3 flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-black"
              />

              <span className="text-xs text-gray-500 font-normal">
                {selectedItems.length}/{cartItems.length} items selected
              </span>

              <div className="ml-auto flex items-center gap-6 text-xs text-gray-500">
                <button className="hover:text-black">Move to wishlist</button>
                <button className="hover:text-black">Remove</button>
              </div>
            </div>

            {/* CART ITEMS */}
            <div className="w-full max-w-3xl bg-white rounded-lg border border-gray-200 shadow-sm">
              {cartItems.map((item) => (
  <CartItem
    key={item.variant_id}
    id={item.variant_id} // ✅ ADD THIS (IMPORTANT)
    image={item.image}
    title={item.name}
    price={item.price}
    quantity={item.quantity}
    onRefreshCart={fetchCart}
    isSelected={selectedItems.includes(item.variant_id)}
    onSelect={() => toggleSelect(item.variant_id)}

  
  />
))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <CouponBox />
            <Gifting />
            <PriceDetails />
          </div>

        </div>
      </div>
    </div>
  )
}
