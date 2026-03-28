import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Heart,
  List,
  Package,
  HelpCircle,
  Star,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItem = (icon, label, path) => (
    <div
      onClick={() => navigate(path)}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all
        ${
          isActive(path)
            ? "bg-black text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  return (
    <div className="h-screen bg-[#eaf5ec] mt-18 p-4">
      {/* FLOATING SIDEBAR */}
      <aside className="w-72 h-full bg-white rounded-[28px] shadow-xl flex flex-col px-5 py-6">

        

        {/* NAV */}
        <div className="space-y-6">

          {/* MAIN */}
          <div>
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
              Explore
            </p>

            {navItem(<Home size={18} />, "Home", "/")}

            {/* ⭐ NEW TOP PRODUCTS */}
            {navItem(<Star size={18} />, "Top Products", "/top-products")}
          </div>

          {/* CART */}
          <div>
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
              Cart
            </p>

            {navItem(<ShoppingCart size={18} />, "My Cart", "/cart")}
          </div>

          {/* LISTS */}
          <div>
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">
              Lists
            </p>

            <div className="space-y-2">
              {navItem(<Heart size={18} />, "Wishlist", "/wishlist")}
              {navItem(<List size={18} />, "Create List", "/create-list")}
            </div>
          </div>

          {/* ORDERS */}
          <div>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">
              Orders
            </p>

            {navItem(<Package size={18} />, "My Orders", "/orders")}
          </div>

          {/* SUPPORT */}
          <div>
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">
              Support
            </p>

            {navItem(<HelpCircle size={18} />, "Help & Support", "/help-support")}
          </div>

        </div>
      </aside>
    </div>
  );
}