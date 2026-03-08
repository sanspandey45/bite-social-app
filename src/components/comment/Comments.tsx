import Image from "next/image";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Comments() {
  return (
    <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xl mt-2">
      {" "}
      {/* profile pic, name, username, trashcan */}
      <div className="flex gap-2.5">
        {/* profile pic */}
        <div className="relative w-11 h-11 group">
          {" "}
          <Image
            src="/images/profile.jpg"
            fill
            alt="profile-pic"
            className="object-cover rounded-full shadow-lg shrink-0 hover:border-blue-primary/70 hover:border-2 transition cursor-pointer"
          />
        </div>
        {/* name, username, trashcan */}
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex items-center font-semibold text-sm">
              <p>John Stevens</p>
              <span className="ml-1 mr-2 text-xs font-normal text-gray-400">
                @johns
              </span>
              <span className="text-blue-primary/95 text-xs font-semibold">
                1h ago
              </span>
            </div>
            {/* delete button */}
            <button className="text-gray-600/75 cursor-pointer hover:text-gray-700">
              <FaRegTrashAlt size={18} />
            </button>
          </div>
        </div>
      </div>
      <p className="ml-13.5 -mt-5 text-gray-900 text-sm">
        {" "}
        {/* commment */} I love this spot!
      </p>
    </div>
  );
}
