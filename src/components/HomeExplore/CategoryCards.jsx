import React from "react";
import { Plus } from "lucide-react";

export const CategoryCard = ({ cat }) => {
  return (
    <div className="aspect-square w-full rounded-2xl overflow-hidden relative bg-gray-200">
      <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
        Image Here
      </div>

      <div className="absolute inset-0 bg-black/40" />
      <span className="absolute bottom-4 left-4 text-white text-xl font-bold">
        {cat.name}
      </span>
    </div>
  );
};

export const ShowMoreCard = ({ onClick }) => {
  return (
    <div
      onClick={onClick ?? (() => {})}
      className="aspect-square rounded-2xl border-2 border-dashed
                 flex flex-col items-center justify-center
                 cursor-pointer hover:bg-gray-50 transition"
    >
      <Plus size={28} />
      <p className="font-bold mt-2">Show More</p>
    </div>
  );
};