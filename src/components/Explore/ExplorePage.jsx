import React, { useState, useEffect, useCallback } from "react";
import { LayoutGrid, UserRound } from "lucide-react";
import PromoCard from "./PromoCard";
import { CategoryCard, ShowMoreCard } from "./CategoryCards";
import TopProducts from "./TopProducts";
import CategoryModal from "./CategoryModal";

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [showCategories, setShowCategories] = useState(false);

  // ---------------- STATE ----------------
  const [page, setPage] = useState(1);
  const [topProducts, setTopProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState("all");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // ---------------- FETCH HOME DATA ----------------
  const fetchHomeData = async (pageNum, genderFilter) => {
    if (loading) return;

    console.log(
      `API CALL → page=${pageNum}, gender=${genderFilter}`
    );

    setLoading(true);
    try {
      const res = await fetch(
        `https://fannest1.co.in/driftgear/api/v1/home.php?page=${pageNum}&gender=${genderFilter}`
      );
      const data = await res.json();

      if (data.success) {
        const fetchedProducts = data.response.data.top_products || [];
        const fetchedBanners = data.response.data.banners || [];
        const fetchedCategories = data.response.data.categories || [];

        if (pageNum === 1) {
          // RESET DATA
          setTopProducts(fetchedProducts);
          setBanners(fetchedBanners);
          setCategories(fetchedCategories);
        } else {
          // PAGINATION
          setTopProducts((prev) => [...prev, ...fetchedProducts]);
        }

        setHasMore(fetchedProducts.length > 0);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  // ---------------- GENDER CLICK ----------------
  const handleGenderClick = (tab) => {
    const genderFilter = tab.toLowerCase();

    setActiveTab(tab);
    setGender(genderFilter);
    setPage(1);
    setHasMore(true);

    // 🔥 IMPORTANT: call API directly
    fetchHomeData(1, genderFilter);
  };

  // ---------------- INFINITE SCROLL ----------------
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.scrollHeight &&
      !loading &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ---------------- PAGINATION FETCH ----------------
  useEffect(() => {
    if (page > 1) {
      fetchHomeData(page, gender);
    }
  }, [page]);

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    fetchHomeData(1, "all");
  }, []);

  return (
    <div className="bg-white p-6 max-w-[1600px] mx-auto">
      {/* ================= HEADER ================= */}
      <div className="mb-10">
       
          <div className="relative flex items-center justify-between">
            <h1 className="text-[28px] font-semibold text-gray-900">
              Explore
            </h1>

            <div className="absolute left-1/2 -translate-x-1/2 flex gap-2">
              {["All", "Men", "Women"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleGenderClick(tab)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    activeTab === tab
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tab === "All" ? (
                    <LayoutGrid size={16} />
                  ) : (
                    <UserRound size={16} />
                  )}
                  {tab}

                  {activeTab === tab && (
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 h-[4px] w-6 rounded-full bg-blue-500" />
                  )}
                </button>
              ))}
            </div>
          

          <button className="relative px-5 py-2 rounded-full bg-gray-100 text-sm font-medium">
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full" />
            Filters
          </button>
        </div>

        <div className="mt-6 h-px bg-gray-200 w-full" />
      </div>

      {/* ================= PROMO + CATEGORY GRID ================= */}
      <section className="mb-14 overflow-x-auto">
        <div className="grid grid-cols-12 gap-6 min-w-[1200px] items-stretch">
          {banners[0] && (
            <div className="col-span-6">
              <PromoCard banner={banners[0]} />
            </div>
          )}

          {categories.slice(0, 3).map((cat) => (
            <div key={cat.id} className="col-span-2">
              <CategoryCard cat={cat} />
            </div>
          ))}

          {banners[1] && (
            <div className="col-span-6">
              <PromoCard banner={banners[1]} />
            </div>
          )}

          {categories.slice(3, 5).map((cat) => (
            <div key={cat.id} className="col-span-2">
              <CategoryCard cat={cat} />
            </div>
          ))}

          <div className="col-span-2">
            <ShowMoreCard onClick={() => setShowCategories(true)} />
          </div>
        </div>
      </section>

      {/* ================= TOP PRODUCTS ================= */}
      <TopProducts products={topProducts} />

      {loading && (
        <p className="text-center mt-6">Loading...</p>
      )}

      {!hasMore && (
        <p className="text-center mt-6">
          No more products
        </p>
      )}

      {showCategories && (
        <CategoryModal
          categories={categories}
          onClose={() => setShowCategories(false)}
        />
      )}
    </div>
  );
};

export default ExplorePage;
