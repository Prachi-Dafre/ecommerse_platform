import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

function TopProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await fetch(
          "https://fannest1.co.in/driftgear/api/v1/home.php?page=1&gender=all"
        );

        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (data.success) {
          setProducts(data.response.data.top_products || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf5ec] via-[#eef4ff] to-[#e0ecff] px-6 md:px-12 py-12">

      {/* HEADER */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
            Top Products
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Trending styles you’ll love
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {products.length} Items
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12">

        {products.map((p) => (
          <div
            key={p.id}
            onClick={() =>
              navigate(`/product/${p.slug}`, { state: { product: p } })
            }
            className="group cursor-pointer"
          >

            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-3xl bg-gray-100">

              <img
                src={
                  p.image?.startsWith("http")
                    ? p.image
                    : `https://fannest1.co.in/driftgear/${p.image}`
                }
                className="w-full h-[300px] object-cover transition duration-700 ease-out group-hover:scale-110"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* HEART */}
              <button
                onClick={(e) => e.stopPropagation()}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition"
              >
                <Heart size={14} />
              </button>

              {/* FLOATING BUTTON */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition duration-500">

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${p.slug}`, { state: { product: p } });
                  }}
                  className="w-full py-2.5 text-sm font-medium rounded-full bg-white text-gray-900 shadow-lg hover:shadow-xl transition"
                >
                  View Product
                </button>

              </div>
            </div>

            {/* DETAILS */}
            <div className="mt-4 space-y-1">

              <h3 className="text-sm font-medium text-gray-800 tracking-wide line-clamp-1">
                {p.name}
              </h3>

              <div className="flex items-center gap-2 text-sm">

                {/* SALE PRICE */}
                <span className="font-semibold text-gray-900">
                  ₹{p?.variants?.[0]?.sale_price || p?.variants?.[0]?.price}
                </span>

                {/* ORIGINAL PRICE */}
                {p?.variants?.[0]?.sale_price && (
                  <>
                    <span className="text-gray-400 line-through text-xs">
                      ₹{p?.variants?.[0]?.price}
                    </span>

                    <span className="text-green-600 text-xs font-medium">
                      {Math.round(
                        ((p.variants[0].price - p.variants[0].sale_price) /
                          p.variants[0].price) *
                          100
                      )}
                      % off
                    </span>
                  </>
                )}

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default TopProducts;