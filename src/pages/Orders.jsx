import React from "react"
import { Search, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Orders() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f4f8fb] px-6 py-10">
  <div className="max-w-7xl mx-auto">
      {/* Header */}
 <div className="flex justify-between items-center mb-10">
  <div>
    <h1 className="text-3xl font-semibold text-gray-900">
      Your Orders
    </h1>
    <p className="text-sm text-gray-400 mt-1">
      Track, return or buy again
    </p>
  </div>

  <div className="relative">
    <input
      type="text"
      placeholder="Search orders..."
      className="w-80 pl-10 pr-4 py-2.5 rounded-full bg-white shadow-sm border border-gray-200 focus:outline-none"
    />
    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
  </div>
</div>

      {/* Tabs */}
     <div className="flex gap-6 mb-8 text-sm">
  <button className="px-4 py-2 rounded-full bg-black text-white">
    Orders
  </button>
  <button className="px-4 py-2 rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-100">
    Buy Again
  </button>
  <button className="px-4 py-2 rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-100">
    Not Shipped
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
        className="group bg-white/70 backdrop-blur-xl 
rounded-3xl p-6 mb-6 shadow-sm hover:shadow-xl 
transition-all duration-500 cursor-pointer border border-white/40"
      >
        {/* Order Header */}
        <div className="flex justify-between items-start mb-5 text-sm">
  <div className="flex gap-10 text-gray-600">
    <div>
      <p className="text-xs text-gray-400">Placed</p>
      <p className="font-medium text-gray-800">8 Jan 2026</p>
    </div>

    <div>
      <p className="text-xs text-gray-400">Total</p>
      <p className="font-medium text-gray-800">₹199</p>
    </div>
  </div>

  <div className="text-right">
    <p className="text-xs text-gray-400">Order ID</p>
    <p className="text-sm font-medium text-gray-700">
      #406-9648495
    </p>
  </div>
</div>

        {/* Order Content */}
        <div className="flex gap-5">
  <img
    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528"
    className="w-28 h-28 object-cover rounded-2xl"
  />

  <div className="flex-1">
    <h3 className="font-semibold text-gray-900">
      PANCA Sleep Mouth Strips
    </h3>

    <p className="text-sm text-gray-400 mt-1">
      Delivered 11 Jan • Return till 21 Jan
    </p>

    <div className="flex gap-3 mt-4" >
      <button className="px-4 py-2 rounded-full bg-black text-white text-sm hover:opacity-90">
        Buy Again
      </button>

      <button
  onClick={(e) => {
    e.stopPropagation();
    navigate("/orders/406-9648495-0664337");
  }}
  className="text-sm text-blue-600 hover:underline"
>
  View Order →
</button>
    </div>
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
        <div className="flex gap-5">
  <img
    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528"
    className="w-28 h-28 object-cover rounded-2xl"
  />

  <div className="flex-1">
    <h3 className="font-semibold text-gray-900">
      PANCA Sleep Mouth Strips
    </h3>

    <p className="text-sm text-gray-400 mt-1">
      Delivered 11 Jan • Return till 21 Jan
    </p>

    <div className="flex gap-3 mt-4">
      <button className="px-4 py-2 rounded-full bg-black text-white text-sm hover:opacity-90">
        Buy Again
      </button>

      <button className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100">
        View Item
      </button>
    </div>
  </div>
</div>
      </div>
    </div>
  </div>
  )
}
