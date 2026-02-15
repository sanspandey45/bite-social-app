import React from "react";
import { FaStarHalfAlt } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav
      className="fixed top-0 w-full flex justify-center items-center h-17 px-2 
    sm:px-10 bg-dark-1 z-50"
    >
      <div className="flex items-center gap-2 justify-center mb-8">
        <FaStarHalfAlt size={35} color="#4076dbea" />
        <span className="text-3xl font-semibold tracking-wide text-white">
          Bite
        </span>
      </div>
    </nav>
  );
}
