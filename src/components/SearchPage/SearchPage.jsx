import React, { useEffect, useState } from "react";
import FilterPill from "./FilterPill";
import TopProducts from "../Explore/TopProducts";
import { useParams } from "react-router-dom";
import ProductSkeleton from "../ProductSkeleton";
import { BASE_URL } from "../../config";

function SearchPage() {
  const { category: urlCategory } = useParams();

  const [category, setCategory] = useState(urlCategory || "all");
  const [sort, setSort] = useState("new");
  const [price, setPrice] = useState("all");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const filters = [
    { label: "Category", value: "All", width: "w-[160px]" },
    { label: "Colors", value: "All", width: "w-[140px]" },
    { label: "Features", value: "All", width: "w-[160px]" },
    { label: "Price", value: "All", width: "w-[160px]" },
    { label: "Sort", value: "New", width: "w-[140px]", right: true },
  ];

  const fetchSearchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/home.php?page=1&gender=all`
      );

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (data.success) {
        let result = data.response.data.top_products || [];

        // CATEGORY FILTER
        if (category === "t-shirts") {
          result = result.filter(
            (p) => p.slug?.includes("tee") || p.slug?.includes("shirt")
          );
        }

        if (category === "hoodies") {
          result = result.filter((p) =>
            p.slug?.includes("hoodie")
          );
        }

        if (category === "sneakers") {
          result = result.filter((p) =>
            p.slug?.includes("sneaker")
          );
        }

        if (category === "shoes") {
          result = result.filter((p) =>
            p.slug?.includes("shoe")
          );
        }

        if (category === "minimal-art") {
          result = result.filter((p) =>
            p.slug?.includes("minimal")
          );
        }

        if (category === "anime-posters") {
          result = result.filter((p) =>
            p.slug?.includes("poster")
          );
        }

        if (sort === "popular") {
          result = result.sort(
            (a, b) => (b.purchase_count || 0) - (a.purchase_count || 0)
          );
        }

        setProducts(result);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSearchProducts();
  }, [category, sort, price]);

  return (
    <div className="min-h-screen bg-[#eaf5ec] pt-28 px-4">

      {/* FLOATING FILTER BAR */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-40">
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg border border-white/40">

          {filters.map((f, i) => (
            <div key={i} className={f.right ? "ml-auto" : ""}>
              <FilterPill
                label={f.label}
                value={f.value}
                width={f.width}
                onChange={(val) => {
                  if (f.label === "Category") setCategory(val);
                  if (f.label === "Sort") setSort(val);
                  if (f.label === "Price") setPrice(val);
                }}
              />
            </div>
          ))}

        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto mt-6 bg-white rounded-[32px] shadow-xl p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Search Results</h1>
            <p className="text-sm text-gray-500">
              {products.length} products found
            </p>
          </div>

          <div className="text-xs text-gray-400">
            {category !== "all" && `Category: ${category}`}
          </div>
        </div>

        {/* RESULTS */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-lg font-semibold">No products found 😢</h2>
            <p className="text-sm text-gray-500 mt-2">
              Try changing filters or search something else
            </p>
          </div>
        ) : (
          <TopProducts products={products} />
        )}

      </div>
    </div>
  );
}

export default SearchPage;