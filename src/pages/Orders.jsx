import React from "react"
import { Search, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Orders() {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-normal">Your Orders</h1>

        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search all orders"
              className="w-96 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <button className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
            Search Orders
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 mb-6">
        <button className="pb-3 border-b-2 border-orange-600 font-medium">
          Orders
        </button>
        <button className="pb-3 text-blue-600 hover:text-orange-600">
          Buy Again
        </button>
        <button className="pb-3 text-blue-600 hover:text-orange-600">
          Not Yet Shipped
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-2">
        <span className="font-medium">24 orders</span>
        <span className="text-gray-600">placed in</span>
        <button className="px-3 py-1 border border-gray-300 rounded flex items-center gap-2 hover:bg-gray-50">
          past 3 months
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* ================= ORDER CARD 1 ================= */}
      <div
        onClick={() => navigate("/orders/406-9648495-0664337")}
        className="bg-white border border-gray-300 rounded-lg mb-6 overflow-hidden cursor-pointer"
      >
        {/* Order Header */}
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-start text-sm">
          <div className="flex gap-16">
            <div>
              <div className="text-gray-600 text-xs mb-1">ORDER PLACED</div>
              <div>8 January 2026</div>
            </div>
            <div>
              <div className="text-gray-600 text-xs mb-1">TOTAL</div>
              <div>₹199.00</div>
            </div>
            <div>
              <div className="text-gray-600 text-xs mb-1">SHIP TO</div>
              <div className="flex items-center gap-1 text-blue-600">
                Gajanan Ramrao Palepwad
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-gray-600 text-xs mb-1">
              ORDER # 406-9648495-0664337
            </div>
            <div className="flex gap-4 text-blue-600 text-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate("/orders/406-9648495-0664337")
                }}
                className="hover:text-orange-600 hover:underline"
              >
                View order details
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="hover:text-orange-600 hover:underline flex items-center gap-1"
              >
                Invoice
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Order Content */}
        <div className="p-6 flex gap-6">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">Delivered 11 January</h3>
            <p className="text-sm text-gray-600 mb-4">
              Package was handed to resident
            </p>

            <div className="flex gap-4">
              <img
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=150&h=150&fit=crop"
                alt="product"
                className="w-32 h-32 object-contain border border-gray-200 rounded"
              />

              <div className="flex-1">
                <h4 className="text-blue-600 hover:text-orange-600 hover:underline cursor-pointer mb-2">
                  PANCA 30-Piece Hypoallergenic Sleep Mouth Strips
                </h4>

                <p className="text-sm text-gray-600 mb-3">
                  Return eligible till 21 January 2026
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-medium text-sm"
                  >
                    Buy it again
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm"
                  >
                    View your item
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 min-w-[240px]">
            {[
              "Track package",
              "Return or replace items",
              "Share gift receipt",
              "Write a product review",
            ].map((text) => (
              <button
                key={text}
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= ORDER CARD 2 ================= */}
      <div
        onClick={() => navigate("/orders/406-3064002-0081168")}
        className="bg-white border border-gray-300 rounded-lg overflow-hidden cursor-pointer"
      >
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-start text-sm">
          <div className="flex gap-16">
            <div>
              <div className="text-gray-600 text-xs mb-1">ORDER PLACED</div>
              <div>8 January 2026</div>
            </div>
            <div>
              <div className="text-gray-600 text-xs mb-1">TOTAL</div>
              <div>₹360.00</div>
            </div>
            <div>
              <div className="text-gray-600 text-xs mb-1">SHIP TO</div>
              <div className="flex items-center gap-1 text-blue-600">
                Gajanan Ramrao Palepwad
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-gray-600 text-xs mb-1">
              ORDER # 406-3064002-0081168
            </div>
            <div className="flex gap-4 text-blue-600 text-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate("/orders/406-3064002-0081168")
                }}
                className="hover:text-orange-600 hover:underline"
              >
                View order details
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex gap-6">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">Delivered 12 January</h3>

            <div className="flex gap-4">
              <img
                src="https://images.unsplash.com/photo-1599785209796-786432b228bc?w=150&h=150&fit=crop"
                alt="product"
                className="w-32 h-32 object-contain border border-gray-200 rounded"
              />

              <div className="flex-1">
                <h4 className="text-blue-600 hover:text-orange-600 hover:underline cursor-pointer mb-3">
                  Gud Gum- Natural, Plastic Free Chewing Gum
                </h4>

                <div className="flex gap-3">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-medium text-sm"
                  >
                    Buy it again
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm"
                  >
                    View your item
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 min-w-[240px]">
            {[
              "Track package",
              "Return or replace items",
              "Write a product review",
            ].map((text) => (
              <button
                key={text}
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
