import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  // State for user profile fields
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    bio: "Fashion enthusiast | Minimalist",
  });

  // State for avatar preview (simulate a file upload)
  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    // In a real app you'd handle file upload and preview
    // Here we just pick a new random avatar from Unsplash
    const newAvatar =
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80";
    setAvatar(newAvatar);
  };

  const handleSave = () => {
    // Simulate saving – you could call an API here
    alert("Profile updated (demo)");
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-center mb-6 tracking-wide">
          Profile Settings
        </h1>

        {/* Profile Info Row (like item row in ListPage) */}
        <div className="border-t border-gray-300 py-5">
          <div className="flex justify-between items-start gap-6">
            {/* Left side: form fields */}
            <div className="flex-1 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="2"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            {/* Right side: avatar + change link (like the image in ListPage) */}
            <div className="flex flex-col items-center">
              <img
                src={avatar}
                alt="Avatar"
                className="w-28 h-32 object-cover rounded"
              />
              <button
                onClick={handleAvatarChange}
                className="mt-2 text-sm text-gray-600 hover:underline"
              >
                Change photo
              </button>
            </div>
          </div>
        </div>

        {/* Additional action (like "Change password") styled as action links */}
        <div className="border-t border-gray-300 py-4">
          <button className="text-sm text-gray-600 hover:underline">
            Change password
          </button>
        </div>

        {/* Bottom actions: Save / Cancel (similar to Add all to bag + links) */}
        <div className="border-t border-gray-300 mt-6 pt-6 flex justify-between items-center">
          <button
            onClick={handleCancel}
            className="border border-black px-8 py-2 text-sm font-semibold tracking-wide hover:bg-black hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-black text-white px-12 py-3 text-sm font-semibold tracking-wide hover:opacity-90 transition"
          >
            Save changes
          </button>
        </div>

 <div className="flex justify-center gap-6 mt-10 flex-wrap">
  <button
    onClick={() => navigate("/profile")}
    className="border-2 border-black px-8 py-3 text-sm font-semibold tracking-wide hover:bg-black hover:text-white transition"
  >
    ← Back to profile
  </button>

  <button
    onClick={() => navigate("/contact")}
    className="border-2 border-black px-8 py-3 text-sm font-semibold tracking-wide hover:bg-black hover:text-white transition"
  >
    Contact Us
  </button>

  <button
    onClick={() => navigate("/address")}
    className="border-2 border-black px-8 py-3 text-sm font-semibold tracking-wide hover:bg-black hover:text-white transition"
  >
    Manage addresses
  </button>
</div>

      </div>
    </div>
  );
}