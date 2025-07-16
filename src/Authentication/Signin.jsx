import React from "react";
import { LogIn, Eye } from "lucide-react";
import logo from "../Images/Logo.png"; 
const Login = () => {
  return (
    <div className="login-container relative overflow-hidden min-h-screen flex items-center justify-center bg-violet-500">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="text-[8rem] font-bold text-gray-200 opacity-20 select-none">
          FSPro
        </span>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white  p-8 max-w-sm w-full shadow-lg rounded-md">
        {/* Header */}
        <div className="text-center mb-6">
          {/* Logo */}
          <div className="flex justify-center mb-4 px-5">
            <div className="w-full max-w-[280px]">
              <img
                src={logo}
                alt="FSPro - Employee Management System"
                className="w-full object-contain max-h-[90px] drop-shadow-md"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl text-blue-900 font-extrabold tracking-wide mb-2">Login</h1>
          <div className="w-[60px] h-[3px] mx-auto mb-3 rounded bg-gradient-to-r from-black via-indigo-900 to-blue-500" />

          {/* Subtitle */}
          <div className="uppercase font-bold text-sm tracking-wide text-white bg-gradient-to-r from-black via-indigo-900 to-blue-500 px-4 py-1 rounded shadow">
            Dev Communnication Platform
          </div>
        </div>

        {/* Form */}
        <form autoComplete="on">
          {/* Email */}
          <div className="relative mb-5">
            <input
              type="email"
              name="email"
              id="email"
              required
              className="form-input peer w-full px-3 pt-5 pb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder=" "
              autoComplete="email"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-3 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:top-3 peer-focus:text-sm peer-focus:text-gray-600"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <input
              type="password"
              name="password"
              id="password"
              required
              className="form-input peer w-full px-3 pt-5 pb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder=" "
              autoComplete="current-password"
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-3 text-gray-600 text-sm bg-white px-1 transition-all peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:top-3 peer-focus:text-sm peer-focus:text-gray-600"
            >
              Password
            </label>

            <button
              type="button"
              aria-label="Show password"
              tabIndex={-1}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <Eye size={20} />
            </button>
          </div>

          {/* Remember Me & Forgot */}
          <div className="flex items-center justify-between mb-5 text-sm">
            <label className="flex items-center text-indigo-900 font-semibold cursor-pointer">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-indigo-900">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-black via-indigo-900 to-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-800 transition"
          >
            <LogIn size={20} />
  
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
