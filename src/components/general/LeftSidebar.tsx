// components/Sidebar.tsx (or wherever you put it)
"use client";
// Note: we need client side features like collapsable menu, active link highlighting, etc.
import {
  FaStarHalfAlt,
  FaHome,
  FaUser,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaUserFriends,
  FaSpinner,
} from "react-icons/fa";
import Link from "next/link";
import {
  BiSolidBell,
  BiSolidMessageRounded,
  BiSolidPurchaseTag,
} from "react-icons/bi";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

// using links to make it more organized
const links = [
  { href: "/home", icon: <FaHome size={22} />, name: "Home" },
  {
    href: "/discoverspots",
    icon: <FaSearch size={19} />,
    name: "Discover Spots",
  },
  {
    href: "/notifications",
    icon: <BiSolidBell size={21} />,
    name: "Notifications",
  },
  {
    href: "/messages",
    icon: <BiSolidMessageRounded size={21} />,
    name: "Messagese",
  },
  {
    href: "/promotions",
    icon: <BiSolidPurchaseTag size={21} />,
    name: "Promotions",
  },
  {
    href: "/addfriends",
    icon: <FaUserFriends size={23} />,
    name: "Add Friends",
  },
  { href: "/profile", icon: <FaUser size={18} />, name: "Profile" },
  { href: "/settings", icon: <FaCog size={21} />, name: "Settings" },
];

export default function LeftSidebar() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignout = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
    /* async function because we want to await the sign out */
  };

  const pathname = usePathname(); // can tell us which page/path we are on, to make current button white

  return (
    <nav
      className="hidden lg:flex fixed left-0 top-0 h-screen w-64 lg:w-1/5 bg-indigo-200 flex-col p-6" /* whole bar items */
    >
      <div className="flex items-center gap-3 mb-10" /* logo */>
        <FaStarHalfAlt size={35} color="#4076dbea" />
        <span className="text-3xl font-semibold tracking-wide text-gray-900">
          Bite
        </span>
      </div>
      <ul
        className="text-gray-900 -ml-2 mt-3 flex flex-col space-y-1 lg:space-y-2.5 2xl:space-y-4.5" /* icons and nav text */
      >
        {links.map((link) => {
          const isActive = pathname === link.href;

          /* icons */
          return (
            <li
              key={link.href}
              className={isActive ? "bg-black/38 rounded-3xl text-white " : ""}
            >
              <Link
                href={link.href}
                className="flex items-center gap-4 px-4 py-3 hover:bg-dark-3 hover:text-white rounded-3xl transition-all duration-100"
              >
                <div
                  className="relative" /* wrapping dot and icon in div; dot's absolute position will be RELATIVE to this div */
                >
                  {link.icon}
                  {isActive /* centers circle below icon; "absolute" removes it form normal document flow so doesnt take up space/make area bigger */ && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full">
                      {" "}
                    </span>
                  )}
                </div>
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* sign out button; pushed to bottom; not using link because separate functionality and spacing */}
      <button
        onClick={handleSignout}
        disabled={isSigningOut}
        className="mt-auto flex items-center -ml-2 gap-4 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-red-800 rounded-3xl transition-all duration-85 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaSignOutAlt size={22} />
        {isSigningOut ? (
          <FaSpinner size={22} className="animate-spin" />
        ) : ""}
        {isSigningOut ? "" : "Sign Out"}
      </button>
    </nav>
  );
}

{
  /* <button
            disabled={isSubmitting}
            className="bg-blue-primary/90 w-full my-2 py-2.5 text-white rounded-3xl cursor-pointer flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin " size={18} />
              </>
            ) : (
              "Sign in"
            )}
          </button> */
}

//     <aside className="fixed left-0 top-0 h-screen w-64 lg:w-1/5 bg-indigo-200 flex flex-col p-6">
// <div className="flex items-center gap-3 mb-10">
//   <FaStarHalfAlt size={35} color="#4076dbea" />
//   <span className="text-3xl font-semibold tracking-wide text-gray-900">
//     Bite
//   </span>
// </div>

//       <nav className="flex flex-col gap-1">
//         <Link
//           href="/home"
//           className="flex items-center gap-4 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-white rounded-3xl transition-all"
//         >
//           <FaHome size={21} />
//           <span className="text-md">Home</span>
//         </Link>

//         <Link
//           href="/discoverspots"
//           className="flex items-center gap-4 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-white rounded-3xl transition-all"
//         >
//           <FaSearch size={20} />
//           <span className="text-md">Discover Spots</span>
//         </Link>

//         <Link
//           href="/notifications"
//           className="flex items-center gap-4 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-white rounded-3xl transition-all"
//         >
//           <BiSolidBell size={22} />
//           <span className="text-md">Notifications</span>
//         </Link>

//         <Link
//           href="/messages"
//           className="flex items-center gap-4 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-white rounded-3xl transition-all"
//         >
//           <BiSolidMessageRounded size={22} />
//           <span className="text-md">Messages</span>
//         </Link>

//         <Link
//           href="/promotions"
//           className="flex items-center gap-4 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-white rounded-3xl transition-all"
//         >
//           <BiSolidPurchaseTag size={22} />
//           <span className="text-md">Promotions</span>
//         </Link>

//         <Link
//           href="/addfriends"
//           className="flex items-center gap-4 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-white rounded-3xl transition-all"
//         >
//           <FaUserFriends size={23} />
//           <span className="text-md">Add Friends</span>
//         </Link>

//         <Link
//           href="/profile"
//           className="flex items-center gap-4 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-white rounded-3xl transition-all"
//         >
//           <FaUser size={20} />
//           <span className="text-md">Profile</span>
//         </Link>

//         <Link
//           href="/settings"
//           className="flex items-center gap-4 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-white rounded-3xl transition-all"
//         >
//           <FaCog size={20} />
//           <span className="text-md">Settings</span>
//         </Link>
//       </nav>

//       <div className="mt-auto">
//         <button className="flex items-center gap-4 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-red-700 rounded-3xl transition-all w-full">
//           <FaSignOutAlt size={18} />
//           <span className="text-md">Sign Out</span>
//         </button>
//       </div>
//     </aside>
//   );
// }
