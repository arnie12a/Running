import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Running Dashboard</h1>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          to="/madison"
          className="px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Madison Marathon Stats
        </Link>

        <Link
          to="/ultra"
          className="px-6 py-4 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
        >
          Marys Peak 50K Stats
        </Link>
      </div>
    </div>
  );
}
