import React, { useEffect, useState } from "react";
import FilterPill from "./FilterPill";
import TopProducts from "../HomeExplore/TopProducts";

function SearchPage() {
  // ---------------- FILTER STATES ----------------
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("new");
  const [price, setPrice] = useState("all");

  // ---------------- DATA STATES ----------------
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- FILTER UI CONFIG ----------------
   const filters = [
    { label: "Category", value: "All Categories", width: "w-[190px]" },
    { label: "Colors", value: "All Colors", width: "w-[160px]" },
    { label: "Features", value: "All Features", width: "w-[180px]" },
    { label: "Price", value: "From $0-$1000", width: "w-[210px]" },
    { label: "Sort", value: "New In", width: "w-[150px]", right: true },
  ];

  // ---------------- FETCH SEARCH DATA ----------------
  const fetchSearchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://fannest1.co.in/driftgear/api/v1/home.php?page=1&gender=all`
      );
      const data = await res.json();

      if (data.success) {
        let result = data.response.data.top_products || [];

        // 🔹 FRONTEND FILTERING (temporary)
        if (category !== "all") {
          result = result.filter(
            (p) => p.category?.toLowerCase() === category.toLowerCase()
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

  // ---------------- FETCH ON FILTER CHANGE ----------------
  useEffect(() => {
    fetchSearchProducts();
  }, [category, sort, price]);

  return (
    <div className="ml-9 mt-10 min-w-[1200px] rounded-2xl bg-white p-6 mx-auto">
      {/* ================= FILTER BAR ================= */}
      <div className="bg-gray-200 p-6 rounded-xl mb-8">
        <div className="flex gap-6 flex-wrap">
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

      {/* ================= RESULTS ================= */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <TopProducts products={products} />
      )}
    </div>
  );
}

export default SearchPage;
