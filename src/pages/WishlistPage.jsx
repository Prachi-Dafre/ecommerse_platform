import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import toast from "react-hot-toast";
import { addToCart } from "../services/cartService";
export default function WishlistPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
const [selectedSize, setSelectedSize] = useState("M");

const handleRemove = async (wishlistId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/user/wishlist.php/${wishlistId}`,
      {
        method: "DELETE",
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
        },
      }
    );

    const data = await res.json();

    if (!data.success) {
      toast.error("Failed to remove ❌");
      return;
    }

    setItems((prev) => prev.filter((i) => i.id !== wishlistId));

    toast("Removed from wishlist 💔");

  } catch (err) {
    console.error(err);
  }
};

const handleMoveToCart = async (item) => {
  try {
    console.log("ITEM:", item);

    // 1️⃣ Get variant from product API using slug
    const productRes = await fetch(
      `${BASE_URL}/api/v1/products.php/${item.slug}`
    );

    const productData = await productRes.json();

    const variantId = productData?.data?.variants?.[0]?.id;

    console.log("VARIANT ID:", variantId);

    if (!variantId) {
      toast.error("Variant not found ❌");
      return;
    }

    // 2️⃣ Add to cart
    const cartRes = await addToCart(variantId, 1);

    console.log("CART RESPONSE:", cartRes);

    if (!cartRes?.success) {
      toast.error(cartRes?.message || "Cart failed ❌");
      return;
    }

    // 3️⃣ Remove from wishlist (USE wishlist ID ✅)
    await fetch(`${BASE_URL}/api/v1/user/wishlist.php/${item.id}`, {
      method: "DELETE",
      headers: {
        "X-Auth-Token": localStorage.getItem("token"),
      },
    });

    // 4️⃣ Update UI
    setItems((prev) => prev.filter((i) => i.id !== item.id));

    toast.success("Moved to cart 🛒✨");

    window.dispatchEvent(new Event("wishlistUpdated"));

  } catch (err) {
    console.error(err);
    toast.error("Something went wrong 😢");
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
  <div className="min-h-screen bg-gradient-to-br from-[#eaf5ec] via-[#fdfbff] to-[#fdf2f8] px-6 md:px-12 py-12">

    {/* HEADER */}
    <div className="flex items-end justify-between mb-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Wishlist 💖
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Your saved aesthetic fits
        </p>
      </div>

      <span className="text-sm text-gray-600 bg-white/60 backdrop-blur px-4 py-1 rounded-full shadow-sm">
        {items.length} Items
      </span>
    </div>

    {items.length === 0 ? (
      <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
        <p className="text-lg">Nothing saved yet</p>
        <p className="text-sm text-gray-400 mt-1">
          Start adding styles you love
        </p>
      </div>
    ) : (

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">

        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.slug}`)}
            className="group cursor-pointer"
          >

            {/* IMAGE CARD */}
            <div className="relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl shadow-md hover:shadow-2xl transition duration-500">

              <img
                src={item.image || "/placeholder.png"}
                className="w-full h-[300px] object-cover transition duration-700 group-hover:scale-110"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* REMOVE BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item.id);
                }}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow hover:bg-red-50 transition"
              >
                ❤️
              </button>

              {/* FLOATING CTA */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition duration-500">

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveToCart(item);
                  }}
                  className="w-full py-2.5 text-sm font-semibold rounded-full 
                  bg-gradient-to-r from-black to-gray-800 text-white 
                  shadow-lg hover:scale-105 transition"
                >
                  Move to Bag 🛒
                </button>

              </div>
            </div>

            {/* DETAILS */}
            <div className="mt-4 space-y-1 px-1">

              <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                {item.name}
              </h3>

              <div className="flex items-center gap-2 text-sm">

                <span className="font-bold text-gray-900">
                  ₹{item.price}
                </span>

                <span className="text-gray-400 line-through text-xs">
                  ₹{Math.round(item.price * 1.4)}
                </span>

                <span className="text-green-600 text-xs font-semibold">
                  28% off
                </span>

              </div>

            </div>
          </div>
        ))}

      </div>
    )}
  </div>
);
}