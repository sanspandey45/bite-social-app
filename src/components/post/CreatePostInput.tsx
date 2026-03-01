"use client"; // b/c I need state, form handling, and file uploads

import Image from "next/image";
import React from "react";
import { BsSendFill } from "react-icons/bs";
import { IoMdPhotos } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useState } from "react";
import { BiSolidBookmark } from "react-icons/bi";
import Link from "next/link";

export default function CreatePostInput() {
  const [isPosting, setIsPosting] = useState(false);

  return (
    <div className="bg-white p-3 rounded-2xl border border-gray-300 shadow-xl">
      <div className="flex gap-2">
        <div className="relative w-15 h-15 shrink-0 -mt-0.75 cursor-pointer">
          <Link href="/profile">
            <Image
              src="/images/profile.jpg"
              fill
              alt="profile-pic"
              className="object-cover rounded-full border-1 border-gray-400 hover:border-blue-primary/60 hover:border-3 transition"
            />
          </Link>
        </div>
        {/* every feature that post area has */}
        <div className="flex-1 group">
          {/* text bubble area where user's can write, initially only this is visible until user clicks */}
          <textarea
            placeholder="Post a new review..."
            onFocus={() => setIsPosting(true)}
            onBlur={() => setIsPosting(false)}
            className={`w-full pt-3.5 pl-5 text-sm pr-5 rounded-full outline-none resize-none ${
              isPosting ? "bg-gray-400/50 border border-blue-primary/36" : "bg-gray-300/60"
            }`}
          />
          {/* Any buttons in the post area */}
          <div className="mt-2 flex justify-between">
            {" "}
            {/* Photo button */}
            <div className="flex gap-1.5">
              <button className="text-green-600/50 hover:text-green-600 flex items-center bg-gray-300/60 hover:bg-gray-300 px-3 py-2 gap-1.25 rounded-3xl cursor-pointer">
                <IoMdPhotos size={23} />
                <span className="text-sm text-gray-800"> Photo </span>
              </button>
              {/* Emoji button */}
              <button className="text-yellow-600/50 hover:text-yellow-600 flex items-center bg-gray-300/60 hover:bg-gray-300 px-3 py-2 gap-1.25 rounded-3xl cursor-pointer">
                <MdOutlineEmojiEmotions size={23} />
                <span className="text-sm text-gray-800"> Emoji </span>
              </button>
              {/* Save to list button */}
              <button className="text-purple-400/50 hover:text-purple-400/85 flex items-center bg-gray-300/60 hover:bg-gray-300 px-3 py-2 gap-1.25 rounded-3xl cursor-pointer">
                <BiSolidBookmark size={23} />
                <span className="text-sm text-gray-800"> Save </span>
              </button>
            </div>
            {/* Post button */}
            <button className="text-gray-500/70 hover:text-blue-primary flex items-center bg-gray-300/60 hover:bg-gray-300 px-3 py-2 gap-1.25 rounded-3xl cursor-pointer">
              <BsSendFill size={20} />
              <span className="text-sm text-gray-800"> Post </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// button idea where words only pop up when hovering:

// {/* Photo button */}
// <button className="text-green-600/50 hover:text-green-600 flex items-center bg-gray-300/80 px-4 py-2 gap-2 rounded-3xl cursor-pointer">
//   <IoMdPhotos size={25}/>
//   <span className="absolute text-sm text-gray-800 opacity-0 group-hover:opacity-100 group-hover:relative"> Photo </span>
// </button>
// {/* Emoji button */}
// <button className="text-yellow-600/50 hover:text-yellow-600 flex items-center bg-gray-300/80 px-4 py-2 gap-2 rounded-3xl cursor-pointer">
//   <MdOutlineEmojiEmotions size={25}/>
//   <span className="absolute text-sm text-gray-800 opacity-0 group-hover:opacity-100 group-hover:relative"> Emoji </span>
// </button>
// {/* Post button */}
// <button className="text-gray-500/70 hover:text-blue-primary group-hover:ml-0.75 flex items-center bg-gray-300/80 px-4 py-2 gap-2 rounded-3xl cursor-pointer">
//   <BsSendFill size={22}/>
//   <span className="absolute text-sm text-gray-800 opacity-0 group-hover:opacity-100 group-hover:relative"> Post </span>
// </button>

// import React from "react";
// import { FaUser } from "react-icons/fa6";

// export default function CreatePostInput() {
//   return (
//     <div className="bg-white p-4 rounded-xl border border-gray-300">
//       <div className="flex gap-2">
//         <div className="relative w-12 h-12 shrink-0">
//           <FaUser
//             size={45}
//             className="object-cover rounded-full border-2 border-gray-300" /*Add user's profile pic here later*/
//           />
//         </div>
//         <div className="flex-1">
//             <textarea placeholder="Post a new review..." className="bg-gray-300/80 w-full p-2 rounded-2xl outline-none resize-none"/>
//         </div>
//       </div>
//     </div>
//   );
// }

{
  /* <Image
    src=""
    alt=""
    fill
    className="object-cover rounded-full border-4 border-gray-400"
/> */
}
