// components/Sidebar.tsx (or wherever you put it)
"use client";

// Note: we need client side features like collapsable menu, active link highlighting, etc.

export default function RightSidebar() {
  return (
    // for right sidebar i'll use "nav" inside an "aside" since it'll have more that just navigation
    // <aside className="fixed right-0 top-0 h-screen w-64 lg:w-1/5 hidden lg:block bg-indigo-200 flex flex-col p-6">

    // </aside>

    // bg option: bg-teal-100/50
    <aside className="hidden lg:flex fixed right-0 top-0 h-screen lg:w-[360px] bg-beige flex-col p-6 gap-6 border-l border-gray-300">
      {/* map block white part*/}
      <div className="relative bg-gray-300/80 rounded-lg p-2.5 h-1/2">
        <h3 className="text-center text-gray-900 font-semibold mt-2">Saved Lists</h3>
        {/* map itself */}
        <div className="fixed-center bg-beige rounded-lg h-5/6 mt-4"> </div>
      </div>

      {/* messges display */}
      <div className="relative bg-gray-300/80 rounded-lg p-2.5 h-1/2">
        <h3 className="text-center text-gray-900 font-semibold  mt-2">Recent Messages</h3>
        {/* messages list */}
        <div className="fixed-center bg-beige rounded-lg h-5/6 mt-4"> </div>
      </div>
    </aside>
  );
}
