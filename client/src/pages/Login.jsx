import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import AuthStore from "../stores/authStore.js";

export default function Login() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = AuthStore();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
    console.log("Login submitted:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div
        className={`w-full max-w-sm transition-all duration-500 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Log in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-800 active:scale-[0.98]"
            >
              Log in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-gray-900 hover:underline underline-offset-2 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
