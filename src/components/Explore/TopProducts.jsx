import React from "react";
import { Heart, ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopProducts({ products }) {
  const navigate = useNavigate();
  const displayProducts = products || [];

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Top Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map((p) => (
          <div
            key={p.id}
           onClick={() =>
           navigate(`/product/${p.slug}`, { state: { product: p } })
           }
            className="group cursor-pointer bg-white rounded-2xl p-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 "
          >
            {/* Image */}
            <div className="relative bg-gray-100 rounded-xl overflow-hidden h-56">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <button className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 shadow-sm">
                <Heart size={16} />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 leading-tight mb-2">
                {p.name}
              </h3>

              <div className="flex items-center justify-between mt-3">
      <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
        ${p.variants?.[0]?.price || "99"}
      </span>

      <div className="flex items-center gap-1 text-gray-400 text-xs">
        <ShoppingBasket size={14} />
        {p.purchase_count}
      </div>
    </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopProducts;