import React from "react";
import { X } from "lucide-react";
import { CategoryCard } from "./CategoryCards";

const CategoryModal = ({ categories, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-700/95 flex justify-center z-50 py-5 overflow-y-auto ">
      <div className="w-[50vw] h-[100vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden mt-20">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold">Categories</h2>
            <p className="text-sm text-gray-500">
              Choose a category to explore products
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="px-6 py-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-4 sm:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} cat={cat} />
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Need help choosing? Explore categories based on your style.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;