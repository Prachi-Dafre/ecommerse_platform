import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function ListPage() {
  const { name } = useParams()
  const navigate = useNavigate()

  const formattedName = name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

  const [items, setItems] = useState([
    {
      id: 1,
      title: "Canada Dark Wine",
      price: "150 Eur",
      size: "One size",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "Buckle Jeans Cognac",
      price: "1400 Eur",
      size: "One size",
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=400&q=80",
    },
  ])

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-6 tracking-wide">
          {formattedName}
        </h1>

        {items.map((item) => (
          <div key={item.id} className="border-t border-gray-300 py-5">

            <div className="flex justify-between items-start">

              {/* Left Section */}
              <div className="space-y-1.5">
                <h2 className="text-base font-semibold tracking-wide">
                  {item.title}
                </h2>

                <p className="text-base font-semibold text-gray-900">
                  {item.price}
                </p>

                <p className="text-sm text-gray-700">
                  Size {item.size}
                </p>

                <button className="mt-3 border border-black px-10 py-2 text-sm font-semibold tracking-wide hover:bg-black hover:text-white transition">
                  Add to bag
                </button>

                <div className="flex gap-5 text-sm text-gray-600 mt-2">
                  <button className="hover:underline">Edit</button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="hover:underline"
                  >
                    Remove item
                  </button>
                  <button className="hover:underline">
                    Add comment
                  </button>
                </div>
              </div>

              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-32 object-cover rounded"
              />
            </div>
          </div>
        ))}

        {/* Bottom Actions */}
        <div className="border-t border-gray-300 mt-6 pt-6 flex justify-between items-center">

          <div className="text-sm text-gray-700 space-y-1">
            <button className="block hover:underline">
              Update wishlist
            </button>
            <button className="block hover:underline">
              Share wishlist
            </button>
          </div>

          <button className="bg-black text-white px-12 py-3 text-sm font-semibold tracking-wide hover:opacity-90 transition">
            Add all to bag
          </button>
        </div>

        {/* Add More Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/search")}
            className="border-2 border-black px-8 py-3 text-sm font-semibold tracking-wide hover:bg-black hover:text-white transition"
          >
            + Add more items
          </button>
        </div>

      </div>
    </div>
  )
}
