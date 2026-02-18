// components/Sidebar.tsx (or wherever you put it)
"use client";

import { FaThumbtack } from "react-icons/fa6";

// Note: we need client side features like collapsable menu, active link highlighting, etc.

export default function RightSidebar() {
  return (
    // for right sidebar i'll use "nav" inside an "aside" since it'll have more that just navigation
    // <aside className="fixed right-0 top-0 h-screen w-64 lg:w-1/5 hidden lg:block bg-indigo-200 flex flex-col p-6">

    // </aside>

    // bg option: bg-teal-100/50
    <aside className="hidden lg:flex fixed right-0 top-0 h-screen lg:w-[360px] 2xl:w-[400px] bg-beige flex-col p-6 gap-6 border-l border-gray-300">
      {/* map block*/}
      <div className="bg-gray-300/70 rounded-lg p-2.5 h-1/2">
        <h3 className="text-center text-gray-900 text-lg font-semibold mt-2">
          Pinned Lists
        </h3>
        {/* map itself */}
        <div className="fixed-center bg-beige rounded-lg h-5/6 mt-4 flex p-5 items-center flex-col">
          <div>
            <button className="text-red-500/60 w-70 hover:text-red-500/85 flex items-center bg-gray-300/80 hover:bg-gray-300 px-2.25 py-2 gap-2 m-1 rounded-xl cursor-pointer">
              <FaThumbtack size={25} />
              <span className="text-sm text-gray-800"> Downtown Dallas </span>
            </button>
            <button className="text-blue-primary/70 w-70 hover:text-blue-primary flex items-center bg-gray-300/80 hover:bg-gray-300 px-2.25 py-2 gap-2 m-1 rounded-xl cursor-pointer">
              <FaThumbtack size={25} />
              <span className="text-sm text-gray-800"> Sushi </span>
            </button>
            <button className="text-green-600/50 w-70 hover:text-green-600/80 flex items-center bg-gray-300/80 hover:bg-gray-300 px-2.25  py-2 gap-2 m-1 rounded-xl cursor-pointer">
              <FaThumbtack size={25} />
              <span className="text-sm text-gray-800"> Italian </span>
            </button>
            <button className="text-purple-400/50 w-70 hover:text-purple-400/85 flex items-center bg-gray-300/80 hover:bg-gray-300 px-2.25  py-2 gap-2 m-1 rounded-xl cursor-pointer">
              <FaThumbtack size={25} />
              <span className="text-sm text-gray-800"> Cafes Open Late </span>
            </button>
          </div>
        </div>
      </div>

      {/* messges display */}
      <div className="bg-gray-300/70 rounded-lg p-2.5 h-1/2">
        <h3 className="text-center text-gray-900 text-lg font-semibold mt-2">
          Recent Messages
        </h3>
        {/* messages list */}
        <div className="fixed-center bg-beige rounded-lg h-5/6 mt-4"> </div>
      </div>
    </aside>
  );
}
