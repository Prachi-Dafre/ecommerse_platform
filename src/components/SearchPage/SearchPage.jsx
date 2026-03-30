import React, { useEffect, useState } from "react";
import FilterPill from "./FilterPill";
import TopProducts from "../Explore/TopProducts";
import { useParams } from "react-router-dom";
import ProductSkeleton from "../ProductSkeleton";
function SearchPage() {
  // ---------------- FILTER STATES ----------------
   const { category: urlCategory } = useParams();
  const [category, setCategory] = useState(urlCategory || "all");
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

/* CATEGORY FILTERING */
if (category === "t-shirts") {
  result = result.filter(
    (p) =>
      p.slug?.includes("tee") ||
      p.slug?.includes("shirt")
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
if (!Array.isArray(result)) return;
        // 🔹 FRONTEND FILTERING (temporary)
        
        
console.log("Products after filtering:", result);
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
    <div className="mt-10 w-full max-w-7xl mx-auto rounded-2xl bg-white p-6">
      {/* ================= FILTER BAR ================= */}
      <div className="fixed top-[60px] left-[260px] right-0 z-40 bg-gray-200 p-6 shadow">
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
        <div className="grid grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <ProductSkeleton key={i} />
    ))}
  </div>
      ) : (
        <TopProducts products={products} />
      )}
    </div>
  );
}

export default SearchPage;