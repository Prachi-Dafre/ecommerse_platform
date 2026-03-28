import { BASE_URL } from "../config";

// ADD TO CART 
export const addToCart = async (variantId, quantity) => {
  const token = localStorage.getItem("token");
if (!token) {
  alert("Please login first");
  return;
}
  const res = await fetch(`${BASE_URL}/api/v1/user/cart.php/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    body: JSON.stringify({
      variant_id: variantId, // ✅ correct
      quantity,
    }),
  });
console.log("ADD TOKEN:", token);
  const text = await res.text();
console.log("ADD TOKEN:", localStorage.getItem("token"));
  if (!res.ok) {
    throw new Error(text);
  }

  return text ? JSON.parse(text) : {};
};

// GET CART
export const getCart = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/v1/user/cart.php`, { // ✅ FIXED
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
  });

  const text = await res.text();
console.log("GET TOKEN:", localStorage.getItem("token"));
  const data = text ? JSON.parse(text) : {};
  return data;
};



// UPDATE CART
export const updateCart = async (variantId, quantity) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/v1/user/cart.php/items/${variantId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    body: JSON.stringify({ quantity }),
  });

  return await res.json();
};

// DELETE FROM CART
export const deleteFromCart = async (variantId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/v1/user/cart.php/items/${variantId}`, {
    method: "DELETE",
    headers: {
      "X-Auth-Token": token,
    },
  });

  return await res.json();
};