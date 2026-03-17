import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import ProductReviews from "./ProductReviews";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(2);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("reviews");
  const [totalReviews, setTotalReviews] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch Product Details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://fannest1.co.in/driftgear/api/v1/products.php/${slug}`
        );
        const data = await res.json();

        if (data && data.success && data.data) {
          setProduct(data.data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleBuyNow = () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    navigate("/address", {
      state: {
        product: {
          id: product.id,
          title: product.name,
          price: price,
          quantity: quantity,
        },
      },
    });
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.name,
        price: price,
        image: productImages[selectedImage],
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Item added to cart!");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
          <p className="mt-2 text-gray-600">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const price =
    product.variants?.[0]?.sale_price || product.variants?.[0]?.price || "0";

  const productImages = [
    "https://via.placeholder.com/400/00CED1/ffffff?text=Front+View",
    "https://via.placeholder.com/400/20B2AA/ffffff?text=Side+View",
    "https://via.placeholder.com/400/48D1CC/ffffff?text=Back+View",
    "https://via.placeholder.com/400/40E0D0/ffffff?text=Detail+View",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Product Details</h1>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-sm p-8 mb-8">
          {/* Left: Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-22 h-22 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === index
                    ? "border-blue-500 shadow-md"
                    : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex-1 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <img
                src={productImages[selectedImage]}
                alt="Product"
                className="w-full h-auto object-contain max-h-[500px]"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="text-sm text-gray-500 mb-2">
              {product.brand_name || "Jack& Jones"}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {product.name}
            </h2>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              {product.description ||
                "The Languages differ in their grammar, their and their the common. Everyone a new common language."}
            </p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-semibold text-gray-900">
                Price : ${price}
              </span>
              <span className="text-orange-500 text-sm font-semibold bg-orange-50 px-2 py-1 rounded">
                - 20% off
              </span>
            </div>

            <div className="flex gap-10">
              <div className="mb-6 flex">
                <label className="text-sm font-semibold text-gray-700 mb-2 block flex-shrink-0 mt-1 mr-4">
                  Select size :
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                >
                  <option value="">Choose you size</option>
                  <option value="S">Small (S)</option>
                  <option value="M">Medium (M)</option>
                  <option value="L">Large (L)</option>
                  <option value="XL">Extra Large (XL)</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              <div className="mb-6 flex items-center gap-6">
                <label className="text-sm font-semibold text-gray-700">
                  Quantity :
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-700 mb-3 block">
                Colors :
              </label>
              <div className="flex gap-3">
                {[
                  { color: "#9B88ED", name: "Purple" },
                  { color: "#E89BED", name: "Pink" },
                  { color: "#FF6B6B", name: "Red" },
                  { color: "#FF8C42", name: "Orange" },
                ].map((item) => (
                  <div
                    key={item.color}
                    className="w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-md"
                    style={{ backgroundColor: item.color }}
                    title={item.name}
                  ></div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg border-2 border-gray-300 transition-colors"
              >
                Add to basket
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-3 font-semibold transition-colors relative ${activeTab === "description"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
                }`}
            >
              Description
              {activeTab === "description" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 font-semibold transition-colors relative ${activeTab === "reviews"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
                }`}
            >
              Reviews ({totalReviews})
              {activeTab === "reviews" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          </div>

          {activeTab === "description" && (
            <div className="py-4">
              <p className="text-gray-700 leading-relaxed">
                {product.description ||
                  "The Languages differ in their grammar, their and their the common. Everyone a new common language."}
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <ProductReviews
              productId={product?.id}
              isPurchased={product?.is_purchase}
              isReviewed={product?.is_reviewed}
              onReviewsLoad={setTotalReviews}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;