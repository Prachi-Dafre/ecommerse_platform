export default function CartItem({
  image,
  title,
  price,
  originalPrice,
  isSelected,
  onSelect,
}) {
  return (
    <div className="flex gap-4 px-4 py-3 border-b border-gray-300 last:border-b-0 text-sm w-full">

      {/* Image + Checkbox */}
      <div className="w-20 h-20 min-w-[80px] border border-gray-300 rounded-md overflow-hidden bg-gray-100 relative">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="absolute top-2 left-2 w-4 h-4 cursor-pointer accent-black"
        />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-between">

        {/* Left */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-medium leading-tight">
              {title}
            </h3>

            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <span>1–2 yr</span>
              <span>•</span>
              <span>Unisex</span>
              <span>•</span>
              <span>Delivery in 3 days</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-2">
            <span className="font-semibold text-base">₹{price}</span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col justify-between items-end">
          <button className="text-xs text-gray-400 hover:text-red-500">
            ✕
          </button>

          <div className="flex items-center border border-gray-300 rounded overflow-hidden text-xs">
            <button className="px-2 py-1 hover:bg-gray-100">−</button>
            <span className="px-2.5 py-1 border-x border-gray-300">1</span>
            <button className="px-2 py-1 hover:bg-gray-100">+</button>
          </div>
        </div>

      </div>
    </div>
  )
}