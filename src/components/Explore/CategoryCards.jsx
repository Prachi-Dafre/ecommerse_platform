import React from "react";
import { Plus ,  ArrowRight  } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CategoryCard = ({ cat }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // convert category name to URL slug
    const slug = cat.name.toLowerCase().replace(/\s+/g, "-");

    navigate(`/category/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group aspect-square w-full rounded-2xl overflow-hidden relative bg-gray-200 cursor-pointer"
    >
       {cat.image ? (
    <img
      src={cat.image}
      alt={cat.name}
       loading="lazy"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
      No Image
    </div>
  )}

    
       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition duration-500" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
       <h3 className="text-xl font-bold transform translate-y-3 group-hover:translate-y-0 transition duration-500">
          {cat.name}
        </h3>
      <div className="flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition transition-all duration-300">
          Explore
          <ArrowRight size={16} />
        </div>
    </div>
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