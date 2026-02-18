"use client";

import Image from "next/image";
import { useState } from "react";
import React from "react"
import { BsSendFill } from "react-icons/bs";
import { IoMdPhotos } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";

export default function CommentInput() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white p-4 rounded-3xl border border-gray-300 mt-2">
      <div className="flex gap-2">
        <div className="relative w-12 h-12 shrink-0">
          <Image
            src="/images/profile.jpg"
            fill
            alt="profile-pic"
            className="object-cover rounded-full border-4 border-gray-300 hover:border-blue-primary/60 cursor-pointer"
          />
        </div>

        {/* every feature that post area has */}
        <div className="flex-1 group">
          {/* text bubble area where user's can write, initially only this is visible until user clicks */}
          <input
            type="text"
            placeholder="Leave a comment..."
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            className={`flex w-full p-3 pl-5 pr-5 rounded-3xl outline-none transition-colors ${
              isExpanded ? 'bg-gray-400/50' : 'bg-gray-300/80'
            }`}
          />

          {/* Any buttons in the post area */}
          {isExpanded && (
          <div className="mt-2 flex gap-3">
            {" "}
            {/* Emoji button */}
            <button className="text-yellow-600/50 hover:text-yellow-600 flex items-center bg-gray-300/80 hover:bg-gray-300 px-4 py-2 gap-2 rounded-3xl cursor-pointer">
              <MdOutlineEmojiEmotions size={25} />
              <span className="text-sm text-gray-800"> Emoji </span>
            </button>
            {/* Post button */}
            <button className="text-gray-500/70 hover:text-blue-primary flex items-center bg-gray-300/80 hover:bg-gray-300 px-4 py-2 gap-2 rounded-3xl cursor-pointer">
              <BsSendFill size={22} />
              <span className="text-sm text-gray-800"> Comment </span>
            </button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
