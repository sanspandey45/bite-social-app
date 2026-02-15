// components/Sidebar.tsx (or wherever you put it)
"use client"; 
// Note: we need client side features like collapsable menu, active link highlighting, etc.

export default function RightSidebar() {
  return (
    // for right sidebar i'll use "nav" inside an "aside" since it'll have more that just navigation
    <aside className="fixed right-0 top-0 h-screen w-64 lg:w-1/5 bg-indigo-200 flex flex-col p-6">

    </aside>
  );
}
