import React from "react";
import { Heart, ShoppingBasket } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopProducts({ products }) {
  const navigate = useNavigate();
  const displayProducts = products || [];

  return (
    <section>
      <h2 className="text-xl font-bold mb-6">Top Products</h2>

      <div className="grid grid-cols-4 gap-6 min-w-[1200px]">
        {displayProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.slug}`, { 
              
            })}
            className="cursor-pointer"
          >
            {/* Image */}
            <div className="h-72 rounded-2xl bg-gray-200 flex items-center justify-center relative">
              Image here
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full">
                <Heart size={18} />
              </button>
            </div>

            {/* Info */}
            <div className="mt-3 bg-white rounded-2xl p-4 border">
              <h3 className="text-center font-bold text-sm mb-3">
                {p.name}
              </h3>

              <div className="flex justify-center">
                <button className="flex items-center gap-2 border-2 border-blue-800 px-6 py-2 rounded-full">
                  Purchased: {p.purchase_count}
                  <ShoppingBasket size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopProducts;