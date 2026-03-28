import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, Search } from "lucide-react";
import Login from "../Login";
import Register from "../Register";
import { BASE_URL } from "../../config";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLoginSuccess = (token, name, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.clear();
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
        if (data?.data) setCount(data.data.length);
      } catch (err) {
        console.error(err);
      }
    };

    window.addEventListener("wishlistUpdated", updateCount);
    return () =>
      window.removeEventListener("wishlistUpdated", updateCount);
  }, []);

  const handleCartClick = () => {
    if (!isLoggedIn) {
      localStorage.setItem("pendingCartAccess", "true");
      setShowLogin(true);
    } else navigate("/cart");
  };

  return (
    <>
      {/* FLOATING TOPBAR */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-9xl z-50">
        <header className="flex items-center justify-between px-6 py-3 rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg border border-white/40">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-xl font-bold tracking-tight"
          >
            Buy<span className="text-blue-500">More</span>
          </div>

          {/* SEARCH */}
          <div className="flex-1 mx-6 max-w-xl">
            <div
              onClick={() => navigate("/search")}
              className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
            >
              <Search size={18} className="text-gray-500" />
              <span className="text-sm text-gray-500">
                Search anything you want...
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            {/* WISHLIST */}
            <button
              onClick={() => navigate("/wishlist")}
              className="relative p-2 rounded-full bg-pink-100 hover:bg-pink-200 transition"
            >
              <Heart size={18} className="text-pink-600" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] px-1.5 rounded-full">
                  {count}
                </span>
              )}
            </button>

            {/* CART */}
            <button
              onClick={handleCartClick}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition
              ${
                isCartPage
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              🛒 Cart
            </button>

            {/* LOGIN / PROFILE */}
            {!isLoggedIn ? (
              <button
                onClick={() => setShowLogin(true)}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold shadow-md hover:scale-105 transition"
              >
                Login
              </button>
            ) : (
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40"
                  className="w-9 h-9 rounded-full cursor-pointer border-2 border-white shadow"
                  onClick={() => setOpen(!open)}
                />

                {open && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border overflow-hidden">
                    <DropdownItem text="My Profile" onClick={() => navigate("/profile")} />
                    <DropdownItem text="Orders" onClick={() => navigate("/orders")} />
                    <DropdownItem text="Settings" onClick={() => navigate("/settings")} />
                    <hr />
                    <DropdownItem text="Logout" danger onClick={handleLogout} />
                  </div>
                )}
              </div>
            )}
          </div>
        </header>
      </div>

      {/* LOGIN */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSwitch={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* REGISTER */}
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
  );
}

function DropdownItem({ text, danger, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-2 text-sm cursor-pointer transition
        ${danger ? "text-red-500 hover:bg-red-50" : "hover:bg-gray-100"}`}
    >
      {text}
    </div>
  );
}