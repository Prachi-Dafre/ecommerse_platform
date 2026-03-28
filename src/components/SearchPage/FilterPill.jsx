import React from "react";

function FilterPill({
  label,
  value,
  options = [],
  onChange,
  width = "w-[130px]",
}) {
  return (
    <div
      className={`
        ${width}
        flex items-center justify-between
        px-4 py-2.5
        rounded-full
        bg-white/80 backdrop-blur-md
        border border-white/40
        shadow-sm
        hover:shadow-md
        transition-all duration-200
        group
      `}
    >
      {/* TEXT */}
      <div className="flex flex-col leading-tight">
        <span className="text-[8px] text-gray-400 uppercase tracking-wide">
          {label}
        </span>
        <span className="text-sm font-semibold text-gray-800 truncate">
          {value}
        </span>
      </div>

      {/* SELECT */}
      <div className="relative">
        <select
          onChange={(e) => onChange && onChange(e.target.value)}
          className="
            absolute inset-0 opacity-0 cursor-pointer
          "
        >
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* ICON BUTTON */}
        <div
          className="
            w-8 h-4
            flex items-center justify-center
            rounded-full
            bg-gray-100 group-hover:bg-gray-200
            transition
          "
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default FilterPill;