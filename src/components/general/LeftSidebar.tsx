// components/Sidebar.tsx (or wherever you put it)
"use client";
// Note: we need client side features like collapsable menu, active link highlighting, etc.
import {
  FaHome,
  FaUser,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaSpinner,
  FaUserPlus,
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
import { FaRegStar } from "react-icons/fa6";

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
    name: "Messages",
  },
  {
    href: "/promotions",
    icon: <BiSolidPurchaseTag size={21} />,
    name: "Promotions",
  },
  {
    href: "/addfriends",
    icon: <FaUserPlus size={22} />,
    name: "Add Friends",
  },
  { href: "/profile", icon: <FaUser size={18} />, name: "Profile" },
];

export default function LeftSidebar() {
  const [isSigningOut, setIsSigningOut] = useState(false); // to generate spinner

  const handleSignout = async () => {
    setIsSigningOut(true); // to generate spinner
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
      className="hidden lg:flex fixed left-0 top-0 h-screen w-24 hover:w-64 bg-beige flex-col p-6 transition-all duration-150 group overflow-hidden border-r border-gray-300" /* whole bar items */
    >
      <div
        className="flex items-center gap-2 mb-9 whitespace-nowrap" /* logo */
      >
        <FaRegStar
          size={35}
          color="#4076dbea"
          className="[stroke:black] [stroke-width:10px] [paint-order:stroke_fill] drop-shadow-[0_0_2px_black] flex-shrink-0"
        />
        <span className="text-3xl font-semibold tracking-widest text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          Bite
        </span>
      </div>
      <ul
        className="text-gray-900 2xl:text-lg -ml-2 mt-3 flex flex-1 flex-col space-y-1 lg:space-y-1.5 2xl:space-y-4.5" /* icons and nav text */
      >
        {links.map((link) => {
          const isActive = pathname === link.href;

          /* icons */
          return (
            <li
              key={link.href}
              className={
                isActive ? "bg-gray-400/90 rounded-3xl text-white " : ""
              }
            >
              <Link
                href={link.href}
                className="flex items-center gap-4 px-4 py-3 hover:bg-dark-3 hover:text-white rounded-3xl transition-all duration-100"
              >
                <div
                  className="relative w-6 flex items-center justify-center flex-shrink-0" /* wrapping dot and icon in div; dot's absolute position will be RELATIVE to this div */
                >
                  {link.icon}
                  {isActive /* centers circle below icon; "absolute" removes it form normal document flow so doesnt take up space/make area bigger */ && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full">
                      {" "}
                    </span>
                  )}
                </div>
                {/* gonna wrap the link.name in span with opacity-0 so that it doesn't show up unless hovering*/}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {link.name}
                </span>
              </Link>
            </li>
          );
        })}

        {/* settings right above sign out */}
        <li className="mt-auto">
          <Link
            href="/settings"
            className="flex items-center 2xl:text-lg gap-4 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-white rounded-3xl transition-all duration-100"
          >
            <div className="relative w-6 flex items-center justify-center flex-shrink-0">
              <FaCog size={21} />
            </div>
            <span className="text-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Settings
            </span>
          </Link>
        </li>
      </ul>

      {/* sign out button; pushed to bottom; not using link because separate functionality and spacing */}
      <button
        onClick={handleSignout}
        disabled={isSigningOut}
        className="flex items-center 2xl:text-lg -ml-2 gap-4.5 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-red-500 rounded-3xl transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="w-6 flex items-center justify-center flex-shrink-0">
          <FaSignOutAlt size={22} />
        </div>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {isSigningOut ? (
            <FaSpinner size={22} className="animate-spin" />
          ) : (
            "Sign Out"
          )}
        </span>
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

// <Link
//   href="/promotions"
//   className="flex items-center gap-4 px-4 py-3 text-gray-900 hover:bg-dark-3 hover:text-white rounded-3xl transition-all"
// >
//   <BiSolidPurchaseTag size={22} />
//   <span className="text-md">Promotions</span>
// </Link>

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
