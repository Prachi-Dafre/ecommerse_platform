import React from "react"
import { useNavigate } from "react-router-dom"

export default function WishlistPage() {
  const navigate = useNavigate()

  const lists = [
    "Birthday Gifts",
    "Home Essentials",
    "Tech Gadgets",
    "Books to Read",
  ]

  return (
    <div className="bg-white min-h-screen px-8 py-10">

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-10 tracking-wide">
        Wishlist
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {/* Existing List Blocks */}
        {lists.map((list, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/list/${list.toLowerCase().replace(/\s+/g, "-")}`)
            }
            className="aspect-square border border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
          >
            <span className="text-xl font-semibold">+</span>
            <span className="mt-2 text-sm font-medium tracking-wide text-center px-4">
              {list}
            </span>
          </div>
        ))}

        {/* Create Your Own Block */}
        <div
          onClick={() => navigate("/search")}
          className="aspect-square border-2 border-black flex flex-col items-center justify-center cursor-pointer hover:bg-black hover:text-white transition"
        >
          <span className="text-xl font-semibold">+</span>
          <span className="mt-2 text-sm font-semibold tracking-wide text-center px-4">
            Create Your Own
          </span>
        </div>

      </div>
    </div>
  )
}
