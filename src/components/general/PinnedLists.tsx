import React from "react";
import { FaThumbtack } from "react-icons/fa6";

export default function PinnedLists() {
  return (
    <div className="fixed-center bg-white rounded-2xl h-52 -mt-1 flex p-1 gap-1.5 items-center flex-col border border-gray-300/60 shadow-md hover:shadow-xl transition">
      <h3 className="text-center text-md font-semibold mt-1">Pinned Lists</h3>
      <button className="text-red-500/60 w-67 hover:text-red-500/85 flex items-center bg-gray-300/60 hover:bg-gray-300 transition px-2.25 py-2 gap-2 m-1 rounded-full cursor-pointer">
        <FaThumbtack size={22} />
        <span className="text-sm text-gray-800"> Downtown Dallas </span>
      </button>
      <button className="text-blue-primary/65 w-67 hover:text-blue-primary flex items-center bg-gray-300/60 hover:bg-gray-300 transition px-2.25 py-2 gap-2 m-1 rounded-full cursor-pointer">
        <FaThumbtack size={22} />
        <span className="text-sm text-gray-800"> Sushi </span>
      </button>
      <button className="text-green-600/50 w-67 hover:text-green-600/80 flex items-center bg-gray-300/60 hover:bg-gray-300 transition px-2.25 py-2 gap-2 m-1 rounded-full cursor-pointer">
        <FaThumbtack size={22} />
        <span className="text-sm text-gray-800"> Cafes Open Late </span>
      </button>
    </div>
  );
}
