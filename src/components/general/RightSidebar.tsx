"use client";
// note: we need client side features like collapsable menu, active link highlighting, onClick, etc

import RecentMessages from "./RecentMessages";
import PinnedLists from "./PinnedLists";
import SuggestedUsers from "./SuggestedUsers";

export default function RightSidebar() {
  return (
    // bg option: bg-teal-100/50
    <aside className="hidden lg:flex fixed lg:right-26 2xl:right-75 top-0 h-191.5 lg:w-[350px] flex-col p-7 items-justify-center">
      {/* pinned lists -----------------------------------------------------------------------------------------------------*/}
      <PinnedLists />

      {/* suggested users ---------------------------------------------------------------------------------------------*/}
      <SuggestedUsers />

      {/* messges display ------------------------------------------------------------------------------------------------*/}
      <RecentMessages />
    </aside>
  );
}

// alternate side bar design, a bit outdated
// export default function RightSidebar() {
//   return (
//     // for right sidebar i'll use "nav" inside an "aside" since it'll have more that just navigation
//     // <aside className="fixed right-0 top-0 h-screen w-64 lg:w-1/5 hidden lg:block bg-indigo-200 flex flex-col p-6">

//     // </aside>

//     // bg option: bg-teal-100/50
//     <aside className="hidden lg:flex fixed right-0 top-0 h-screen lg:w-[360px] 2xl:w-[400px] bg-beige flex-col p-6 gap-6 border-l border-gray-300">
//       {/* map block*/}
//       <div className="bg-gray-300/70 rounded-lg p-2.5 h-1/2">
//         <h3 className="text-center text-gray-900 text-lg font-semibold mt-2">
//           Pinned Lists
//         </h3>
//         {/* map itself */}
//         <div className="fixed-center bg-beige rounded-lg h-5/6 mt-4 flex p-5 items-center flex-col">
//           <div>
//             <button className="text-red-500/60 w-70 hover:text-red-500/85 flex items-center bg-gray-300/80 hover:bg-gray-300 px-2.25 py-2 gap-2 m-1 rounded-xl cursor-pointer">
//               <FaThumbtack size={25} />
//               <span className="text-sm text-gray-800"> Downtown Dallas </span>
//             </button>
//             <button className="text-blue-primary/70 w-70 hover:text-blue-primary flex items-center bg-gray-300/80 hover:bg-gray-300 px-2.25 py-2 gap-2 m-1 rounded-xl cursor-pointer">
//               <FaThumbtack size={25} />
//               <span className="text-sm text-gray-800"> Sushi </span>
//             </button>
//             <button className="text-green-600/50 w-70 hover:text-green-600/80 flex items-center bg-gray-300/80 hover:bg-gray-300 px-2.25  py-2 gap-2 m-1 rounded-xl cursor-pointer">
//               <FaThumbtack size={25} />
//               <span className="text-sm text-gray-800"> Italian </span>
//             </button>
//             <button className="text-purple-400/50 w-70 hover:text-purple-400/85 flex items-center bg-gray-300/80 hover:bg-gray-300 px-2.25  py-2 gap-2 m-1 rounded-xl cursor-pointer">
//               <FaThumbtack size={25} />
//               <span className="text-sm text-gray-800"> Cafes Open Late </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* messges display */}
//       <div className="bg-gray-300/70 rounded-lg p-2.5 h-1/2">
//         <h3 className="text-center text-gray-900 text-lg font-semibold mt-2">
//           Recent Messages
//         </h3>
//         {/* messages list */}
//         <div className="fixed-center bg-beige rounded-lg h-5/6 mt-4"> </div>
// //       </div>
// //     </aside>
// //   );
// // }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//         <Link href="/friendprofile">
//           {" "}
//           {/* link to chat page, change later */}
//           <button className="text-gray-500/60 w-65 hover:text-red-500/85 flex items-center bg-gray-300/60 hover:bg-gray-300 transition px-1 py-1 gap-2 m-1 rounded-full cursor-pointer border-gray-800">
//             <div className="relative w-9 h-9 shrink-0">
//               <Link href="/profile">
//                 <Image
//                   src="/images/profile.jpg"
//                   fill
//                   alt="profile-pic"
//                   className="object-cover rounded-full border-2 border-gray-300 hover:border-blue-primary/60 transition"
//                 />
//               </Link>
//             </div>
//             <div className="flex flex-col flex-1 text-left">
//               <span className="text-gray-900 text-sm"> Evan </span>
//               <span className="text-gray-600 text-xs -mt-0.5"> @evanp </span>
//             </div>
//             {/* Follow Suggested User Button */}
//             <button
//               //onClick={() => ....(true)}
//               className="text-gray-800 bg-blue-primary/50 hover:bg-blue-primary/70 transition w-20 text-sm py-1.5 rounded-full cursor-pointer shrink-0"
//             >
//               Follow +
//             </button>
//           </button>
//         </Link>

//         <Link href="/friendprofile">
//           {" "}
//           {/* link to chat page, change later */}
//           <button className="text-gray-500/60 w-65 hover:text-red-500/85 flex items-center bg-gray-300/60 hover:bg-gray-300 transition px-1 py-1 gap-2 m-1 rounded-full cursor-pointer border-gray-800">
//             <div className="relative w-9 h-9 shrink-0">
//               <Link href="/profile">
//                 <Image
//                   src="/images/profile.jpg"
//                   fill
//                   alt="profile-pic"
//                   className="object-cover rounded-full border-2 border-gray-300 hover:border-blue-primary/60 transition"
//                 />
//               </Link>
//             </div>
//             <div className="flex flex-col flex-1 text-left">
//               <span className="text-gray-900 text-sm"> Evan </span>
//               <span className="text-gray-600 text-xs -mt-0.5"> @evanp </span>
//             </div>
//             {/* Follow Suggested User Button */}
//             <button
//               //onClick={() => ....(true)}
//               className="text-gray-800 bg-blue-primary/50 hover:bg-blue-primary/70 transition w-20 text-sm py-1.5 rounded-full cursor-pointer shrink-0"
//             >
//               Follow +
//             </button>
//           </button>
//         </Link>

//         <Link href="/friendprofile">
//           {" "}
//           {/* link to chat page, change later */}
//           <button className="text-gray-500/60 w-65 hover:text-red-500/85 flex items-center bg-gray-300/60 hover:bg-gray-300 transition px-1 py-1 gap-2 m-1 rounded-full cursor-pointer border-gray-800">
//             <div className="relative w-9 h-9 shrink-0">
//               <Link href="/profile">
//                 <Image
//                   src="/images/profile.jpg"
//                   fill
//                   alt="profile-pic"
//                   className="object-cover rounded-full border-2 border-gray-300 hover:border-blue-primary/60 transition"
//                 />
//               </Link>
//             </div>
//             <div className="flex flex-col flex-1 text-left">
//               <span className="text-gray-900 text-sm"> Evan </span>
//               <span className="text-gray-600 text-xs -mt-0.5"> @evanp </span>
//             </div>
//             {/* Follow Suggested User Button */}
//             <button
//               //onClick={() => ....(true)}
//               className="text-gray-800 bg-blue-primary/50 hover:bg-blue-primary/70 transition w-20 text-sm py-1.5 rounded-full cursor-pointer shrink-0"
//             >
//               Follow +
//             </button>
//           </button>
//         </Link>

//                 <Link href="/friendprofile">
//           {" "}
//           {/* link to chat page, change later */}
//           <button className="text-gray-500/60 w-65 hover:text-red-500/85 flex items-center bg-gray-300/60 hover:bg-gray-300 transition px-1 py-1 gap-2 m-1 rounded-full cursor-pointer border-gray-800">
//             <div className="relative w-9 h-9 shrink-0">
//               <Link href="/profile">
//                 <Image
//                   src="/images/profile.jpg"
//                   fill
//                   alt="profile-pic"
//                   className="object-cover rounded-full border-2 border-gray-300 hover:border-blue-primary/60 transition"
//                 />
//               </Link>
//             </div>
//             <div className="flex flex-col flex-1 text-left">
//               <span className="text-gray-900 text-sm">
//                 {" "}
//                 Evan{" "}
//               </span>
//               <span className="text-gray-600 text-xs -mt-0.5">
//                 {" "}
//                 @evanp{" "}
//               </span>
//             </div>
//             {/* Follow Suggested User Button */}
//             <button
//               //onClick={() => ....(true)}
//               className="text-gray-800 bg-blue-primary/50 hover:bg-blue-primary/70 transition w-20 text-sm py-1.5 rounded-full cursor-pointer shrink-0"
//             >
//               Follow +
//             </button>
//           </button>
//         </Link>
