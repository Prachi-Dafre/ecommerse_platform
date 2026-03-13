import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ThumbsUp } from "lucide-react";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("reviews");
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(2);
  const [selectedImage, setSelectedImage] = useState(0);

  // API 1: Fetch Product Details
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
        console.error("❌ STEP 1 ERROR - Fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // API 2: Fetch Reviews - Use product.id instead of slug
  useEffect(() => {
    
    if (activeTab === "reviews" && product && product.id) {
      
      fetchReviews();
    } else {
      console.log("⚠️ STEP 2: Waiting for product data...");
    }
  }, [activeTab, product]);

  const fetchReviews = async () => {
    if (!product || !product.id) {
      return;
    }

    setReviewsLoading(true);
    try {
      // ✅ USE PRODUCT ID, NOT SLUG
      const url = `https://fannest1.co.in/driftgear/api/v1/products.php/${product.id}/reviews`;
      
      const res = await fetch(url);  
      
      const data = await res.json();

      if (data && data.success && data.data) {
        setReviews(data.data);  
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("❌ STEP 3 ERROR - Fetching reviews:", error);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  // API 3: Submit Review (POST) - Use product.id
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!newReview.comment.trim()) {
      alert("Please write a comment");
      return;
    }

    if (!product || !product.id) {
      alert("Product ID is missing");
      return;
    }

    setSubmitLoading(true);
    try {
      const requestBody = {
        rating: newReview.rating,
        comment: newReview.comment,
      }

      // ✅ USE PRODUCT ID, NOT SLUG
      const res = await fetch(
        `https://fannest1.co.in/driftgear/api/v1/products.php/${product.id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await res.json();

      if (data && data.success) {
        alert("✅ Review submitted successfully!");
        setNewReview({ rating: 5, comment: "" });
        fetchReviews();
      } else {
        alert("❌ Failed to submit review");
      }
    } catch (error) {
      console.error("❌ STEP 4 ERROR - Submitting review:", error);
      alert("❌ Error submitting review");
    } finally {
      setSubmitLoading(false);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      if (distribution[review.rating] !== undefined) {
        distribution[review.rating]++;
      }
    });
    return distribution;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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

  const averageRating = calculateAverageRating();
  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews.length;

  // ✅ FIXED: Proper image URLs
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
                  className={`w-22 h-22 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage === index
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
              <div className="ml-auto flex items-center gap-1">
                <span className="text-lg font-semibold">
                  {averageRating || "4.8"}
                </span>
                <Star size={18} fill="#FFA500" stroke="#FFA500" />
              </div>
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
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Buy Now
              </button>
              <button className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg border-2 border-gray-300 transition-colors">
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
              className={`px-6 py-3 font-semibold transition-colors relative ${
                activeTab === "description"
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
              className={`px-6 py-3 font-semibold transition-colors relative ${
                activeTab === "reviews"
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
            <div className="py-4">
              {reviewsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="ml-4">Loading reviews...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    {reviews.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">
                          No reviews yet. Be the first to review this product!
                        </p>
                      </div>
                    ) : (
                      reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-200 pb-6 last:border-0"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                              {review.user_name.charAt(0).toUpperCase()}
                            </div>

                            <div className="flex-1">
                              <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={16}
                                    fill={
                                      star <= review.rating ? "#FFA500" : "none"
                                    }
                                    stroke={
                                      star <= review.rating ? "#FFA500" : "#D1D5DB"
                                    }
                                  />
                                ))}
                              </div>

                              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                {review.comment}
                              </p>

                              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                                <ThumbsUp size={14} />
                                Thank (234)
                              </button>
                            </div>
                          </div>

                          <div className="mt-2 ml-[72px]">
                            <div className="font-semibold text-gray-900 text-sm">
                              {review.user_name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(review.created_at)}
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    {/* Add Review Form */}
                    <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Write a Review
                      </h3>
                      <form onSubmit={handleSubmitReview}>
                        <div className="mb-4">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Rating:
                          </label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={28}
                                onClick={() =>
                                  setNewReview({ ...newReview, rating: star })
                                }
                                fill={
                                  star <= newReview.rating ? "#FFA500" : "none"
                                }
                                stroke={
                                  star <= newReview.rating ? "#FFA500" : "#D1D5DB"
                                }
                                className="cursor-pointer hover:scale-110 transition-transform"
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Comment:
                          </label>
                          <textarea
                            value={newReview.comment}
                            onChange={(e) =>
                              setNewReview({
                                ...newReview,
                                comment: e.target.value,
                              })
                            }
                            placeholder="Share your experience..."
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submitLoading}
                          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                            submitLoading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {submitLoading ? "Submitting..." : "Submit Review"}
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Right: Average Rating */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                        Average rating
                      </h3>

                      <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-gray-900 mb-2">
                          {averageRating}/5
                        </div>
                        <div className="flex justify-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={20}
                              fill={
                                star <= Math.round(averageRating)
                                  ? "#FFA500"
                                  : "none"
                              }
                              stroke={
                                star <= Math.round(averageRating)
                                  ? "#FFA500"
                                  : "#D1D5DB"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = ratingDistribution[star] || 0;
                          const percentage =
                            totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                          return (
                            <div key={star} className="flex items-center gap-3">
                              <span className="text-xs text-gray-600 w-12">
                                {star} star
                              </span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 transition-all"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600 w-10 text-right">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;