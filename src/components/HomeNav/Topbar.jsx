import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Heart } from "lucide-react";
import Login from "../Login";
import Register from "../Register";
import { useEffect } from "react";
import { BASE_URL } from "../../config"; 

/* Dummy cart preview images */
const cartPreviewImages = [
  "/toy.png",
  "/toy1.png",
  "/toy2.png",
  "/toy3.png",
]


export default function Topbar() {
  const [open, setOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
const [count, setCount] = useState(0);
  const navigate = useNavigate()
  const location = useLocation()
  const isCartPage = location.pathname === "/cart"

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Handle login success
  const handleLoginSuccess = (token, userName, userEmail) => {
    // Store token and user info
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", userName);
    localStorage.setItem("userEmail", userEmail);

    console.log("✅ Token stored in parent:", localStorage.getItem("token"));

    // Update state
    setIsLoggedIn(true);

    // Close login modal
    setShowLogin(false);

    // Check if user was trying to access cart before login
    const pendingCartAccess = localStorage.getItem("pendingCartAccess");
    if (pendingCartAccess === "true") {
      localStorage.removeItem("pendingCartAccess");
      navigate("/cart");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setOpen(false);
  };
useEffect(() => {
  const updateCount = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/user/wishlist.php`, {
        headers: {
          "X-Auth-Token": localStorage.getItem("token"),
        },
      });

      const data = await res.json();

      if (data?.data) {
        setCount(data.data.length);
      }
    } catch (err) {
      console.error(err);
    }
  };

  window.addEventListener("wishlistUpdated", updateCount);

  return () => {
    window.removeEventListener("wishlistUpdated", updateCount);
  };
}, []);
  // Handle cart click - check login first
  const handleCartClick = () => {
    if (!isLoggedIn) {
      // Store that user wants to access cart
      localStorage.setItem("pendingCartAccess", "true");
      // Show login modal
      setShowLogin(true);
    } else {
      // Already logged in, go to cart
      navigate("/cart");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex items-center bg-white px-6 py-2 shadow-sm text-gray-800">
 {/* LEFT: LOGO */}
  <div
    className="flex items-center gap-2 cursor-pointer"
    onClick={() => navigate("/")}
  >
     <div className="mb-2 pb-3 border-b border-gray-200">
      <div className="mt-2">
        <span className="text-xl font-bold text-gray-800">
          Buy<span className="text-blue-500">More</span>
        </span>
        </div>
      </div>
  </div>
        {/* CENTER: SEARCH BAR */}
        <div className="flex-1 flex justify-center mx-6">
          <div className="relative w-full max-w-2xl">

            {/* Search Icon */}
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            {/* Input */}
            <input
              type="text"
              placeholder="Search Perfect Product for you"
              onFocus={() => navigate("/search")}
              onClick={() => navigate("/search")}
              className="
                w-full
                pl-12 pr-4 py-2.5
                border border-gray-300
                rounded-full
                text-sm
                focus:outline-none
                focus:border-black
                cursor-pointer
              "
            />

          </div>
        </div>

        {/* RIGHT: CART + PREVIEW + PROFILE/LOGIN */}
        <div className="flex items-center gap-4">

        <button
         onClick={() => navigate("/wishlist")}
         className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition
         ${location.pathname === "/wishlist"
         ? "bg-pink-500 text-white"
         : "bg-gray-100 hover:bg-pink-100 hover:text-pink-600"
         }`}
         >
          <Heart size={20} />
          <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-xs px-1.5 rounded-full">
         {count}
         </span>
         </button>

          {/* Cart + Preview */}
          <div className="flex items-center gap-3">

            {/* Cart Button - Now with login check */}
            <button
              onClick={handleCartClick}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition
              ${isCartPage
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              🛒 Cart
            </button>

            {/* Cart Preview Images */}
            <div className="flex items-center -space-x-2">
              {cartPreviewImages.slice(0, 3).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="cart item"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover bg-gray-100"
                />
              ))}

              {cartPreviewImages.length > 3 && (
                <div className="w-7 h-7 rounded-full bg-gray-200 text-xs flex items-center justify-center border-2 border-white font-semibold">
                  +{cartPreviewImages.length - 3}
                </div>
              )}
            </div>
          </div>

          {/* Profile or Login Button */}
{!isLoggedIn ? (
  <button
    onClick={() => setShowLogin(true)}
    className="px-6 py-2 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
  >
    Login
  </button>
) : (
  <div className="relative">
    <img
      src="https://i.pravatar.cc/40"
      alt="profile"
      className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200 hover:border-gray-400 transition-colors"
      onClick={() => setOpen(!open)}
    />

    {open && (
      <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
        <DropdownItem text="Notifications" />
        <DropdownItem text="My Profile" />
        <DropdownItem text="Settings" />
        <hr />
        <DropdownItem text="Logout" danger onClick={handleLogout} />
      </div>
    )}
  </div>
)}
            
        {/* Profile */}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">

              <DropdownItem
                text="Notifications"
                onClick={() => {
                  navigate("/notifications")
                  setOpen(false)
                }}
              />

              <DropdownItem
                text="My Profile"
                onClick={() => {
                  navigate("/profile")
                  setOpen(false)
                }}
              />

              <DropdownItem
                text="Settings"
                onClick={() => {
                  navigate("/settings")
                  setOpen(false)
                }}
              />

              <hr />

              <DropdownItem
                text="Logout"
                danger
                onClick={() => {
                  // Add your logout logic here
                  navigate("/login")
                  setOpen(false)
                }}
              />
            </div>
          )}
        </div>
        </div>
      </header>

      {/* Login Popup */}
      {showLogin && (
        <Login
          onClose={() => {
            setShowLogin(false);
            // Clear pending cart access if user closes login without logging in
            localStorage.removeItem("pendingCartAccess");
          }}
          onSwitch={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Register Popup */}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onSwitch={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

    </>
  )
}

function DropdownItem({ text, danger, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 text-sm cursor-pointer transition
        ${danger
          ? "text-red-500 hover:bg-red-50"
          : "hover:bg-gray-100"
        }`}
    >
      {text}
    </div>
  )
}