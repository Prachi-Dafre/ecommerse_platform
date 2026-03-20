import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import toast from "react-hot-toast";
export default function WishlistPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

const handleRemove = async (variantId) => {
  try {
    await fetch(`${BASE_URL}/api/v1/user/wishlist.php`, {
      method: "POST", // ✅ FIXED
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        action: "remove", // ✅ VERY IMPORTANT
        variant_id: variantId,
      }),
    });

    setItems((prev) =>
      prev.filter((i) => i.variant_id !== variantId)
    );

    toast("Removed from wishlist 💔");

    window.dispatchEvent(new Event("wishlistUpdated"));
  } catch (err) {
    console.error(err);
  }
};

    const handleMoveToCart = async (item) => {
  try {
    // 1️⃣ Add to cart
    await fetch(`${BASE_URL}/api/v1/user/cart.php/${item.variant_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        variant_id: item.variant_id, // 🔥 IMPORTANT
        quantity: 1,
      }),
    });

    // 2️⃣ Remove from wishlist
  await fetch(`${BASE_URL}/api/v1/user/wishlist.php`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "X-Auth-Token": localStorage.getItem("token"),
  },
  body: JSON.stringify({
    variant_id: item.variant_id,
  }),
});

    // 3️⃣ Update UI instantly
    setItems((prev) =>
      prev.filter((i) => i.variant_id !== item.variant_id)
    );

    // 4️⃣ Toast
    toast.success("Moved to cart 🛒✨");

    // 5️⃣ Update topbar
    window.dispatchEvent(new Event("wishlistUpdated"));

  } catch (err) {
    console.error(err);
    toast.error("Failed to move item 😢");
  }
};

  useEffect(() => {
   const fetchWishlist = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/user/wishlist.php`, {
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
      },
    });

    const data = await res.json();

    if (data?.data) {
      setItems(data.data);
    }
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    toast.error("Server not reachable 🚫");
  }
};
    fetchWishlist();
  }, []);

  return (
    <div className="bg-white min-h-screen px-8 py-10">
      <h1 className="text-2xl font-semibold mb-10">My Wishlist 💖</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty 😢</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/product/${item.slug}`)}
            >
              <img
                src={item.image || "/placeholder.png"}
                className="h-40 w-full object-cover rounded-lg mb-3"
              />

              <h3 className="font-semibold">{item.name}</h3>

              <p className="text-blue-600 font-bold">
                ₹{item.price}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item.variant_id);
                }}
                className="text-red-500 text-sm mt-2"
              >
                Remove ❌
              </button>
              <button
  onClick={(e) => {
    e.stopPropagation();
    handleMoveToCart(item);
  }}
  className="mt-2 text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"
>
  Move to Cart 🛒
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}