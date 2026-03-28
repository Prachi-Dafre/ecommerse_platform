import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://fannest1.co.in/driftgear/api/v1/home.php?page=1&gender=all"
        );
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};
        if (data.success) setProducts(data.response.data.top_products || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#eaf5ec] flex items-center justify-center p-6">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-7xl bg-white rounded-[32px] shadow-xl p-6 grid grid-cols-12 gap-6">

        {/* MAIN CONTENT ONLY (sidebar removed as requested) */}
        <div className="col-span-12">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Explore</h1>
              <p className="text-sm text-gray-500">Discover trends</p>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-100 rounded-full">All</button>
              <button className="px-4 py-2 bg-gray-100 rounded-full">Men</button>
              <button className="px-4 py-2 bg-gray-100 rounded-full">Women</button>
            </div>
          </div>

          {/* TOP GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 auto-rows-[180px]">

            {/* SALE WITH IMAGE */}
            <div className="col-span-2 rounded-3xl overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6"
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="font-bold text-lg">GET UP TO 50% OFF</h2>
                <button className="mt-2 bg-white text-black px-4 py-1 rounded-full text-sm">Shop Now</button>
              </div>
            </div>

            {/* CLEAN PRODUCT CARDS (FIXED IMAGE FIT) */}
            {products.slice(0, 2).map((p) => (
  <div
    key={p.id}
    onClick={() =>
      navigate(`/product/${p.slug}`, { state: { product: p } })
    }
    className="group cursor-pointer"
  >

    {/* CARD */}
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-1 shadow-md hover:shadow-2xl transition duration-500">

      {/* IMAGE */}
     <div className="relative overflow-hidden rounded-2xl h-[130px] bg-gray-100">

  <img
    src={p.image?.startsWith("http")
      ? p.image
      : `https://fannest1.co.in/driftgear/${p.image}`}
    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
  />

        {/* HEART */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur shadow opacity-0 group-hover:opacity-100 transition"
        >
          <Heart size={14} />
        </button>
      </div>

      {/* INFO */}
      <div className="mt-3 px-1">

        <p className="text-xs font-semibold text-gray-900 line-clamp-1">
          {p.name}
        </p>

        {/* PRICE */}
        <div className="flex items-center gap-2 mt-1">

          <span className="text-sm font-bold text-gray-900">
            ₹{p?.variants?.[0]?.sale_price || p?.variants?.[0]?.price}
          </span>

          {p?.variants?.[0]?.sale_price && (
            <>
              <span className="text-xs text-gray-400 line-through">
                ₹{p?.variants?.[0]?.price}
              </span>

              <span className="text-[10px] text-green-600 font-semibold">
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
  </div>
))}

            {/* WINTER WITH IMAGE */}
            <div className="col-span-2 rounded-3xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1603252109303-2751441dd157"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="font-bold text-lg">Winter’s Weekend</h2>
                <p className="text-sm">Keep it casual</p>
              </div>
            </div>

            {/* BOLD FASHION WITH IMAGE */}
            <div className="col-span-2 rounded-3xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="font-bold text-lg">Bring Bold Fashion</h2>
                <p className="text-sm">Layers on Layers</p>
              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
  <div
    key={p.id}
    onClick={() =>
      navigate(`/product/${p.slug}`, { state: { product: p } })
    }
    className="group cursor-pointer"
  >

    {/* IMAGE CARD */}
    <div className="relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-xl shadow-md hover:shadow-2xl transition duration-500">

      <img
        src={p.image?.startsWith("http")
          ? p.image
          : `https://fannest1.co.in/driftgear/${p.image}`}
        className="w-full h-[300px] object-cover transition duration-700 group-hover:scale-110"
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* HEART BUTTON */}
      <button
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow hover:bg-red-50 transition"
      >
        <Heart size={14} />
      </button>

      {/* FLOATING CTA */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition duration-500">

        <button
           onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${p.slug}`, { state: { product: p } });
                  }}
          className="w-full py-2 text-sm font-semibold rounded-full 
          bg-gradient-to-r from-black to-gray-800 text-white 
          shadow-lg hover:scale-105 transition"
        >
          View Product 
        </button>

      </div>
    </div>

    {/* DETAILS */}
    <div className="mt-3 px-1">

      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
        {p.name}
      </h4>

     <div className="flex items-center gap-2 mt-1">

  {/* SALE PRICE */}
  <span className="text-gray-900 font-bold text-sm">
    ₹{p?.variants?.[0]?.sale_price || p?.variants?.[0]?.price}
  </span>

  {/* ORIGINAL PRICE */}
  {p?.variants?.[0]?.sale_price && (
    <>
      <span className="text-gray-400 line-through text-xs">
        ₹{p?.variants?.[0]?.price}
      </span>

      {/* DISCOUNT % */}
      <span className="text-green-600 text-xs font-semibold">
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
      </div>
    </div>
  );
}