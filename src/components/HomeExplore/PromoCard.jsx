import React from "react";

const PromoCard = ({ banner }) => {
  return (
    <div
      className={`h-full w-full rounded-[32px] ${banner.bg} p-6 flex flex-col justify-between`}
    >
      <div>
        <h2 className="text-2xl font-black mb-3">{banner.title}</h2>
        <button className="px-4 py-1.5 bg-white rounded-full text-xs font-bold shadow">
          {banner.sub}
        </button>
      </div>

      <div className="flex-1 mt-4 rounded-2xl bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">Image Here</span>
      </div>
    </div>
  );
};

export default PromoCard;