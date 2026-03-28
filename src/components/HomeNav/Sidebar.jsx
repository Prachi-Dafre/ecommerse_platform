// Sidebar.jsx
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Sidebar() {
  const [showAllLists, setShowAllLists] = useState(false)
  const navigate = useNavigate()

  const additionalLists = [
    "Birthday Gifts",
    "Home Essentials",
    "Tech Gadgets",
    "Books to Read",
  ]

  return (
    <aside className="bg-white shadow-md w-64 p-6 flex flex-col h-screen border-r border-gray-200">

      {/* Logo */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <span className="text-xl font-bold text-gray-800">
          Buy<span className="text-blue-500">More</span>
        </span>
      </div>

      {/* Home Section */}
      <div className="flex flex-col gap-2 pb-6 border-b border-gray-200">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-blue-500 transition duration-200 ml-2"
        >
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          <span className="font-medium">Home</span>
        </div>
      </div>

      {/* Cart Section */}
      <div className="flex flex-col gap-2 mt-5 pb-6 border-b border-gray-200">
        <span className="text-gray-400 text-sm tracking-wide">Cart</span>

        <div className="flex flex-col gap-3 ml-2 mt-2">
          <div className="flex items-center gap-2 cursor-pointer group">
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt="product"
              className="w-10 h-10 rounded-md object-cover"
            />
            <span className="text-gray-700 text-sm font-medium group-hover:text-blue-500">
              Cart Sample 1
            </span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer group">
            <img
              src="https://i.pravatar.cc/40?img=2"
              alt="product"
              className="w-10 h-10 rounded-md object-cover"
            />
            <span className="text-gray-700 text-sm font-medium group-hover:text-blue-500">
              Cart Sample 2
            </span>
          </div>
        </div>

        <span className="mt-4 text-gray-400 text-xs cursor-pointer hover:text-blue-500">
          See All
        </span>
      </div>

      {/* List Section */}
      <div className="flex flex-col gap-2 mt-5 pb-6 border-b border-gray-200">
        <span className="text-gray-400 text-sm tracking-wide">List</span>

        <div className="flex flex-col gap-2 ml-2 mt-2">

          {/* Wishlist */}
          <div
            onClick={() => navigate("/wishlist")}
            className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-blue-500"
          >
            <span className="text-lg">+</span>
            <span>Wishlist</span>
          </div>

          {/* Create Your Own */}
          <div
            onClick={() => navigate("/create-list")}
            className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-blue-500"
          >
            <span className="text-lg">+</span>
            <span>Create Your Own</span>
          </div>

          {/* Additional Lists */}
          {showAllLists &&
            additionalLists.map((list, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(`/list/${list.toLowerCase().replace(/\s+/g, "-")}`)
                }
                className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-blue-500"
              >
                <span className="text-lg">+</span>
                <span>{list}</span>
              </div>
            ))}
        </div>

        <span
          className="mt-4 text-gray-400 text-xs cursor-pointer hover:text-blue-500"
          onClick={() => setShowAllLists(!showAllLists)}
        >
          {showAllLists ? "See Less" : "See All"}
        </span>
      </div>

      {/* Last Order Section */}
      <div className="flex flex-col gap-2 mt-5 pb-6 border-b border-gray-200">
        <span className="text-gray-400 text-xs">
          Last orders: <span className="font-bold text-gray-800">37</span>
        </span>

        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt="product"
              className="w-10 h-10 rounded-md object-cover"
            />
            <div className="flex flex-col flex-1">
              <span className="text-gray-800 text-sm font-medium">
                DMC Nike...
              </span>
              <span className="text-gray-400 text-xs cursor-pointer hover:text-blue-500">
                view order
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40?img=2"
              alt="product"
              className="w-10 h-10 rounded-md object-cover"
            />
            <div className="flex flex-col flex-1">
              <span className="text-gray-800 text-sm font-medium">
                Outerwear...
              </span>
              <span className="text-gray-400 text-xs cursor-pointer hover:text-blue-500">
                view order
              </span>
            </div>
          </div>
        </div>

        <span
          onClick={() => navigate("/orders")}
          className="mt-4 text-gray-400 text-xs cursor-pointer hover:text-blue-500 select-none"
        >
          See all
        </span>
      </div>

      {/* Help & Support */}
      <div className="flex flex-col gap-1 mt-2 pb-2 border-b border-gray-200">
        <div
          onClick={() => navigate("/help-support")}
          className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-blue-500 transition duration-200"
        >
          <span className="text-lg">❓</span>
          <span>Help & Support</span>
        </div>
      </div>

      <div className="flex-1"></div>

      {/* Logout */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2 text-red-500 cursor-pointer hover:text-red-600">
          <span className="font-medium">Logout</span>
        </div>
      </div>

    </aside>
  )
}