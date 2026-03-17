import React, { useEffect, useState } from "react";
import { Star, ThumbsUp } from "lucide-react";

const ProductReviews = ({ productId, isPurchased, isReviewed, onReviewsLoad  }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitLoading, setSubmitLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch Reviews
  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const fetchReviews = async () => {
    if (!productId) return;

    setReviewsLoading(true);
    try {
      const url = `https://fannest1.co.in/driftgear/api/v1/products.php/${productId}/reviews`;
      const res = await fetch(url);
      const data = await res.json();

      if (data && data.success && data.data) {
        setReviews(data.data);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  // Notify parent component about review count
  useEffect(() => {
    if (onReviewsLoad) {
      onReviewsLoad(reviews.length);
    }
  }, [reviews, onReviewsLoad]);

  // Submit Review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!newReview.comment.trim()) {
      alert("Please write a comment");
      return;
    }

    if (!productId) {
      alert("Product ID is missing");
      return;
    }

    setSubmitLoading(true);
    try {
      const requestBody = {
        rating: newReview.rating,
        comment: newReview.comment,
      };

      const res = await fetch(
        `https://fannest1.co.in/driftgear/api/v1/products.php/${productId}/reviews`,
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
      console.error("Error submitting review:", error);
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

  const averageRating = calculateAverageRating();
  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews.length;

  if (reviewsLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="ml-4">Loading reviews...</p>
      </div>
    );
  }

  return (
   <div className="py-4">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Reviews List */}
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
                          fill={star <= review.rating ? "#FFA500" : "none"}
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
          {token && isPurchased && !isReviewed && (
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
                        fill={star <= newReview.rating ? "#FFA500" : "none"}
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
          )}
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
                      star <= Math.round(averageRating) ? "#FFA500" : "none"
                    }
                    stroke={
                      star <= Math.round(averageRating) ? "#FFA500" : "#D1D5DB"
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
    </div>
  );
};

export default ProductReviews;