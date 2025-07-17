// components/HeroSection.jsx
import React from "react";

export default function HeroSection() {
  return (
    <section className="w-full py-16 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-indigo-700 leading-tight">
          Welcome to <span className="text-black">Pawlogy</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Discover, share, and create amazing stories that matter.
        </p>
      </div>
    </section>
  );
}
