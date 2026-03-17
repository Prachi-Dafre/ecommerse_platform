import React, { useState } from "react";
import { Eye, X } from "lucide-react";

function Register({ onClose, onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://fannest1.co.in/driftgear/api/v1/auth/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );

      const data = await res.json();

      if (data.status) {
        alert("Registration successful! Please login.");
        onSwitch(); // Automatically switch to login page
      } else {
        alert(data.message || "Already registered");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
     <div className="fixed inset-0 bg-gray-700/95 flex justify-center z-50 py-3 overflow-y-auto">
      <div className="flex max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative">

        {/* Close button - top right corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>

        {/* Left Side - Form */}
        <div className="w-1/2 p-10 flex flex-col bg-pink-50 justify-center rounded-l-3xl">
          <h1 className="text-3xl font-semibold text-center mb-2">
            Create your account
          </h1>

          <button type="button" className="w-full h-12 border border-gray-300 rounded-2xl text-gray-800 text-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-100 mt-9 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-6 h-6">
              <path fill="#EA4335" d="M488 261.8c0-17.7-1.5-34.8-4.3-51.4H249v97.3h135.5c-5.9 31.8-23.3 58.9-49.7 77.2v64.1h80.2c46.9-43.2 73.9-107 73.9-186.2z" />
              <path fill="#34A853" d="M249 508c67.2 0 123.6-22.3 164.8-60.3l-80.2-64.1c-22.2 15-50.7 23.7-84.6 23.7-64.9 0-119.9-43.7-139.7-102.1H28.1v64.5C69 454.8 153 508 249 508z" />
              <path fill="#4A90E2" d="M109.3 308.3c-5.2-15.2-8.2-31.3-8.2-48s3-32.8 8.2-48V147.8H28.1C10.5 182.1 0 222.3 0 264s10.5 81.9 28.1 116.2l81.2-71.9z" />
              <path fill="#FBBC05" d="M249 100.5c35.9 0 68.1 12.3 93.6 36.6l70.2-70.2C372.2 31 314.8 0 249 0 153 0 69 53.2 28.1 147.8l81.2 71.9c19.8-58.4 74.8-102.1 139.7-102.1z" />
            </svg>
            Sign up with Google
          </button>

          <div className="flex my-5 items-center gap-3">
            <div className="border-b border-gray-300 w-1/2"></div>
            <p className="text-gray-500">or</p>
            <div className="border-b border-gray-300 w-1/2"></div>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleRegister}>
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full h-12 border border-gray-300 px-4 rounded-2xl text-lg focus:outline-none focus:border-black font-medium hover:bg-gray-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="eva.holland@example.com"
                className="w-full h-12 border border-gray-300 px-4 rounded-2xl text-lg focus:outline-none focus:border-black font-medium hover:bg-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-12 border border-gray-300 px-4 pr-10 rounded-2xl text-lg focus:outline-none focus:border-black font-medium hover:bg-gray-100"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-700"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border border-gray-400 cursor-pointer"
                required
              />
              I agree to the Terms & Conditions
            </div>

            {/* Sign up */}
            <button
              type="submit"
              className="w-full h-12 bg-black text-white text-lg font-medium rounded-2xl hover:bg-gray-800 transition-colors"
            >
              Sign up
            </button>

            <p className="text-center text-gray-500 mt-4 text-lg">
              Already have an account?
              <span
                className="font-bold text-black cursor-pointer ml-1 hover:underline"
                onClick={onSwitch}
              >
                Login
              </span>
            </p>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 relative bg-gray-200 border-gray-700 rounded-r-3xl"></div>
      </div>
    </div>
  );
}

export default Register;