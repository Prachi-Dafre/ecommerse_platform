import React from "react";

function FilterPill({ label, value, width = "w-[60px]" }) {
  return (
    <div
      className={`h-14 ${width} flex items-center border border-gray-300 rounded-full bg-white overflow-hidden pl-6 text-sm`}
    >
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-bold">{value}</p>
      </div>

      <div className="h-8 w-8 ml-4 rounded-full border border-gray-200 flex items-center justify-center">
        <select
          className="h-full w-full rounded-full appearance-none bg-transparent cursor-pointer"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='gray' stroke-width='1.5'%3E%3Cpath d='M5 7l5 6 5-6'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "14px",
          }}
        >
          <option></option>
        </select>
      </div>
    </div>
  );
}

export default FilterPill;