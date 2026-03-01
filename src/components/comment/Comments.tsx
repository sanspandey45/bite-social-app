import Image from "next/image";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Comments() {
  return (
    <div className="bg-white p-3 rounded-2xl border border-gray-300 mt-2">
      {" "}
      {/* uploaded comment box */}
      <div className="flex gap-2.5 items-center">
        <div className="relative w-11 h-11 group">
          {" "}
          {/* profile picture */}
          <Image
            src="/images/profile.jpg"
            fill
            alt="profile-pic"
            className="object-cover rounded-full border-1 border-gray-400 shrink-0 hover:border-blue-primary/70 hover:border-2 transition cursor-pointer"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between -mb-1.25">
            <p>John Stevens</p>
            {/* delete button */}
            <button className="text-gray-600/75 cursor-pointer hover:text-gray-700">
              <FaRegTrashAlt size={18} />
            </button>
          </div>
          <div>
              <span className="-ml-0.25 mr-2 text-sm font-normal text-gray-400">
                @johns
              </span>
              <span className="text-blue-primary/95 text-xs font-semibold">
                1h ago
              </span>
            </div>
          </div>
        </div>
      <p className="py-2 text-gray-900 text-sm -mb-1">
        {" "}
        {/* commment */} I love this spot! Need to try
      </p>
    </div>
  );
}
