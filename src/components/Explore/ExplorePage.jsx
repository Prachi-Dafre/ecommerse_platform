// UPDATED ExplorePage (Gen Z + Image-based cards + fixed layout + navigation hints)
import React, { useState, useEffect, useCallback } from "react";
import { LayoutGrid, UserRound } from "lucide-react";
import PromoCard from "./PromoCard";
import { CategoryCard, ShowMoreCard } from "./CategoryCards";
import TopProducts from "./TopProducts";
import CategoryModal from "./CategoryModal";
import { useLocation, useNavigate } from "react-router-dom";

const ExplorePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [showCategories, setShowCategories] = useState(false);

  const [page, setPage] = useState(1);
  const [topProducts, setTopProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState("all");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const style = params.get("style");

    let genderFilter = "all";
    if (style === "genz") genderFilter = "men";
    if (style === "vintage") genderFilter = "women";

    fetchHomeData(1, genderFilter);
  }, [location.search]);

  const fetchHomeData = async (pageNum, genderFilter) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://fannest1.co.in/driftgear/api/v1/home.php?page=${pageNum}&gender=${genderFilter}`
      );

      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        return;
      }

      if (data.success) {
        const fetchedProducts = data.response.data.top_products || [];
        const fetchedBanners = data.response.data.banners || [];
        const fetchedCategories = data.response.data.categories || [];

        if (pageNum === 1) {
          setTopProducts(fetchedProducts);
          setBanners(fetchedBanners);
          setCategories(fetchedCategories);
        } else {
          setTopProducts((prev) => [...prev, ...fetchedProducts]);
        }

        setHasMore(fetchedProducts.length > 0);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const handleGenderClick = (tab) => {
    const genderFilter = tab.toLowerCase();
    setActiveTab(tab);
    setGender(genderFilter);
    setPage(1);
    setHasMore(true);
    fetchHomeData(1, genderFilter);
  };

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

  useEffect(() => {
    if (page > 1) {
      fetchHomeData(page, gender);
    }
  }, [page]);

  useEffect(() => {
    fetchHomeData(1, "all");
  }, []);

  return (
    <div className="min-h-screen bg-[#eef3f0] p-6">

      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Explore</h1>

        <div className="flex gap-2">
          {["All", "Men", "Women"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleGenderClick(tab)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* PROMO GRID (UPDATED WITH IMAGES) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 auto-rows-[180px]">

        {/* SALE */}
        <div
          onClick={() => navigate("/sale")}
          className="col-span-2 rounded-3xl overflow-hidden relative cursor-pointer group"
        >
          <img
            src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6"
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="font-bold text-lg">Get up to 50% OFF</h2>
          </div>
        </div>

        {/* WINTER */}
        <div
          onClick={() => navigate("/winter")}
          className="col-span-2 rounded-3xl overflow-hidden relative cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1603252109303-2751441dd157"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-4 left-4 text-white">
            Winter’s Weekend
          </div>
        </div>

        {/* BOLD */}
        <div
          onClick={() => navigate("/bold-fashion")}
          className="col-span-2 rounded-3xl overflow-hidden relative cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1544441893-675973e31985"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-4 left-4 text-white">
            Bring Bold Fashion
          </div>
        </div>

        {/* CATEGORIES (clean) */}
        {categories.slice(0, 2).map((cat) => (
          <div key={cat.id} onClick={() => navigate(`/category/${cat.slug}`)}>
            <CategoryCard cat={cat} />
          </div>
        ))}

        <ShowMoreCard onClick={() => setShowCategories(true)} />
      </div>

      {/* PRODUCTS */}
      <TopProducts products={topProducts} />

      {loading && (
        <p className="text-center mt-6 text-gray-500">Loading...</p>
      )}

      {!hasMore && (
        <p className="text-center mt-6 text-gray-400">End reached</p>
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