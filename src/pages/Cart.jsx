import { useState } from "react"
import CartItem from "../components/cart/CartItem"
import CouponBox from "../components/cart/CouponBox"
import Gifting from "../components/cart/Gifting"
import PriceDetails from "../components/cart/PriceDetails"

export default function Cart() {
  const cartItems = [
    { id: 1, image: "/toy.png", title: "Cute worm baby toys", price: 45.20 },
    { id: 2, image: "/toy1.png", title: "Cute crab baby toys", price: 45.20 },
    { id: 3, image: "/toy2.png", title: "Plush toys for babies", price: 45.20 },
    { id: 4, image: "/toy3.png", title: "Cute snail baby toys", price: 16.20 },
  ]

  const [selectedItems, setSelectedItems] = useState([])

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-6">

        {/* STEPPER */}
        <div className="mb-10 flex justify-center">
          <div className="flex items-center text-xs max-w-md w-full justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-semibold">
                1
              </div>
              <span className="font-semibold text-black">Cart</span>
            </div>

            <div className="flex-1 h-px bg-gray-300 mx-2"></div>

            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[10px] font-semibold">
                2
              </div>
              <span className="text-gray-500">Address</span>
            </div>

            <div className="flex-1 h-px bg-gray-300 mx-2"></div>

            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[10px] font-semibold">
                3
              </div>
              <span className="text-gray-500">Payment</span>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">

          {/* LEFT */}
          <div className="flex flex-col items-center">

            {/* HEADER */}
            <div className="w-full max-w-3xl mb-3 flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-black"
              />

              <span className="text-xs text-gray-500 font-normal">
                {selectedItems.length}/{cartItems.length} items selected
              </span>

              <div className="ml-auto flex items-center gap-6 text-xs text-gray-500">
                <button className="hover:text-black">Move to wishlist</button>
                <button className="hover:text-black">Remove</button>
              </div>
            </div>

            {/* CART ITEMS */}
            <div className="w-full max-w-3xl bg-white rounded-lg border border-gray-200 shadow-sm">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  isSelected={selectedItems.includes(item.id)}
                  onSelect={() => toggleSelect(item.id)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <CouponBox />
            <Gifting />
            <PriceDetails />
          </div>

        </div>
      </div>
    </div>
  )
}
