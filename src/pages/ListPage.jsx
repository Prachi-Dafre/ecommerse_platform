import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Trash2, Share2 } from "lucide-react";

export default function ListPage() {
  const { name } = useParams();
  const navigate = useNavigate();

  const formattedName = decodeURIComponent(name);

  const [items, setItems] = useState([
    {
      id: 1,
      title: "Canada Dark Wine",
      price: "€150",
      size: "One size",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    },
    {
      id: 2,
      title: "Buckle Jeans Cognac",
      price: "€1400",
      size: "One size",
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e",
    },
  ]);

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbff] via-[#f6f9ff] to-[#fdf2f8] p-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {formattedName}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Your curated vibe ✨
            </p>
          </div>

          <button className="p-2 rounded-full bg-white/70 backdrop-blur shadow hover:scale-105 transition">
            <Share2 size={18} />
          </button>
        </div>

        {/* ITEMS */}
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow hover:shadow-xl transition"
            >
              {/* LEFT */}
              <div className="flex gap-5 items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-28 object-cover rounded-xl"
                />

                <div>
                  <h2 className="font-semibold text-gray-900">
                    {item.title}
                  </h2>

                  <p className="text-indigo-600 font-bold mt-1">
                    {item.price}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Size: {item.size}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-4 mt-3 text-sm">
                    <button className="px-4 py-1 rounded-full bg-black text-white hover:opacity-90">
                      Add to Bag
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT ICON */}
              <button className="p-2 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 transition">
                <Heart size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            No items yet 🥲
          </div>
        )}

        {/* FOOTER ACTIONS */}
        <div className="mt-12 flex justify-between items-center">
          <button
            onClick={() => navigate("/search")}
            className="border border-black px-6 py-2 rounded-full text-sm hover:bg-black hover:text-white transition"
          >
            + Add more items
          </button>

          <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:opacity-90">
            Add all to bag
          </button>
        </div>

      </div>
    </div>
  );
}