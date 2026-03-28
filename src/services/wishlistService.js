import { BASE_URL } from "../config";

const getToken = () => localStorage.getItem("token");

// ➕ Add to wishlist
export const addToWishlist = async (variantId) => {
  const res = await fetch(
    `${BASE_URL}/api/v1/user/wishlist.php/${variantId}`,
    {
      method: "POST",
      headers: {
        "X-Auth-Token": getToken(),
      },
    }
  );

  return res.json();
};

// Get Wishlist
export const getWishlist = async () => {
  const token = getToken();

  if (!token) {
    console.warn("No token found");
    return { success: false, items: [] };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/user/wishlist.php`, {
      method: "GET",
      headers: {
        "X-Auth-Token": getToken(),
      },
    });

    const text = await res.text();
    console.log("WISHLIST RAW:", text);

    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch (err) {
      console.error("❌ Wishlist not JSON (wrong URL or API)");
      return { success: false, items: [] };
    }

    return data;
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    return { success: false, items: [] };
  }
};

// ❌ Remove from wishlist
export const removeFromWishlist = async (variantId) => {
  const res = await fetch(`${BASE_URL}/api/v1/user/wishlist.php/${variantId}`, {
    method: "DELETE",
    headers: {
      "X-Auth-Token": getToken(),
    },
  });

  return res.json();
};