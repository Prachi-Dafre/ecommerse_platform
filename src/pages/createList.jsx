import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const themes = [
  { id: "street", label: "Street", emoji: "🔥", color: "from-orange-400 to-pink-500" },
  { id: "luxury", label: "Luxury", emoji: "💎", color: "from-gray-800 to-black" },
  { id: "soft", label: "Soft", emoji: "🌸", color: "from-pink-300 to-purple-300" },
  { id: "dark", label: "Dark", emoji: "🖤", color: "from-gray-700 to-gray-900" },
  { id: "color", label: "Color Pop", emoji: "🌈", color: "from-indigo-400 via-purple-400 to-pink-400" },
];

export const CreateListPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [theme, setTheme] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

 const vibeOptions = [
  {
    name: "Streetwear",
    emoji: "🔥",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  },
  {
    name: "Date Night",
    emoji: "❤️",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  },
  {
    name: "Party",
    emoji: "🎉",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
  },
  {
    name: "Minimal",
    emoji: "🤍",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  },
  {
    name: "Sporty",
    emoji: "⚡",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
  },
  {
    name: "Luxury",
    emoji: "💎",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  },
  {
    name: "Soft Girl",
    emoji: "🌸",
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43",
  },
  {
    name: "Dark Mode",
    emoji: "🖤",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  },
];

  const addEmoji = (text) => {
    if (text.toLowerCase().includes("party")) return text + " 🎉";
    if (text.toLowerCase().includes("summer")) return text + " ☀️";
    if (text.toLowerCase().includes("street")) return text + " 🔥";
    return text;
  };

  const handleQuickSelect = (vibeName) => {
    const finalName = addEmoji(vibeName);
    setName(finalName);

    setTimeout(() => {
      navigate(`/list/${encodeURIComponent(finalName)}`);
    }, 400);
  };

  const handleCreate = () => {
    if (!name.trim()) {
      alert("Please enter list name 😅");
      return;
    }

    const finalName = addEmoji(name);

    navigate(`/list/${encodeURIComponent(finalName)}`);

    const payload = {
      name: finalName,
      theme,
      isPrivate,
      tags: tags.split(","),
      description,
    };

    console.log("CREATE LIST:", payload);
    alert("List created ✨");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#fce4ec] to-[#f3e5f5] flex items-center justify-center p-6">

      {/* MAIN CARD */}
      <div className="w-full max-w-xl bg-white/70 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white/40 p-8">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create List ✨
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Build your vibe collection
          </p>
        </div>

        {/* QUICK VIBES */}
<div className="grid grid-cols-2 gap-4 auto-rows-[140px]">

  {vibeOptions.map((vibe, index) => (
    <div
      key={vibe.name}
      onClick={() => handleQuickSelect(vibe.name)}
      className={`
        relative rounded-3xl overflow-hidden cursor-pointer group
        ${index === 0 ? "col-span-2 row-span-2" : ""}
      `}
    >
      {/* IMAGE */}
      <img
        src={vibe.image}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

      {/* TEXT */}
      <div className="absolute bottom-3 left-3 text-white">
        <p className="text-lg">{vibe.emoji}</p>
        <h3 className="text-sm font-semibold">
          {vibe.name}
        </h3>
      </div>

      {/* HOVER GLOW */}
      <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-white/60 rounded-3xl transition" />
    </div>
  ))}

</div>

{/* FOR YOU SECTION */}
<div className="mb-10">

  <p className="text-sm text-gray-500 mb-3">
    For You 🤖
  </p>

  <div className="flex gap-3 overflow-x-auto pb-2">

    {[
      "Late Night Drip 🌙",
      "Airport Fits ✈️",
      "College Core 🎒",
      "Weekend Chill 🛋️",
      "Sneaker Rotation 👟",
    ].map((item) => (
      <button
        key={item}
        onClick={() => handleQuickSelect(item)}
        className="whitespace-nowrap px-4 py-2 rounded-full bg-white shadow hover:shadow-md text-sm transition"
      >
        {item}
      </button>
    ))}

  </div>
</div>

        {/* NAME */}
        <div className="mb-5">
          <label className="text-sm text-gray-600 mb-2 block">
            List Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Streetwear drip 🔥"
            className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 shadow-sm"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-5">
          <label className="text-sm text-gray-600 mb-2 block">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Late night fits for winter..."
            className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 shadow-sm"
          />
        </div>

        {/* THEMES */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-3 block">
            Choose Vibe 🎨
          </label>

          <div className="flex gap-3 flex-wrap">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${theme === t.id
                    ? `text-white bg-gradient-to-r ${t.color} shadow-lg scale-105`
                    : "bg-white/60 backdrop-blur hover:bg-white"}
                `}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAGS */}
        <div className="mb-5">
          <label className="text-sm text-gray-600 mb-2 block">
            Tags
          </label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="#oversized, #party"
            className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 shadow-sm"
          />
        </div>

        {/* PRIVACY */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-600">
            Private List 🔒
          </span>

          <button
            onClick={() => setIsPrivate(!isPrivate)}
            className={`w-12 h-6 rounded-full transition ${
              isPrivate ? "bg-black" : "bg-gray-300"
            }`}
          >
            <div
              className={`h-6 w-6 bg-white rounded-full shadow transform transition ${
                isPrivate ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>

        {/* PREVIEW */}
        {name && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-400 to-pink-400 text-white shadow-lg">
            <p className="text-xs opacity-80">Preview</p>
            <h3 className="text-lg font-semibold">
              {addEmoji(name)}
            </h3>
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleCreate}
         className="w-full py-3 rounded-full bg-black text-white font-semibold text-sm hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl"
        >
          Create List →
        </button>

      </div>
    </div>
  );
};

export default CreateListPage;