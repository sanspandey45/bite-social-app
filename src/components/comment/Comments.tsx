import Image from "next/image";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Comments() {
  return (
    <div className="bg-white p-4 rounded-3xl border border-gray-300 mt-2">
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
            className="object-cover rounded-full border-4 border-gray-300 shrink-0 hover:border-blue-primary/60 cursor-pointer"
          />
        </div>
        <div>
          <p className="-mt-1 -mb-1">John Stevens</p>
          <div>
            <span className="mr-2 text-sm font-normal text-gray-400">
              {" "}
              {/* username */} @johns
            </span>
            <span className="text-blue-primary text-sm font-semibold">
              1h ago
            </span>
          </div>
        </div>
      </div>
      <p className="py-4 text-gray-800 text-sm">
        {" "}
        {/* commment */} I love this spot! Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Totam commodi laudantium odit deleniti rerum doloremque error, aut
        atque incidunt eligendi quibusdam ipsam deserunt, ipsa vitae nobis, in
        corporis molestias nihil.
      </p>

      <div className="mx-1 flex gap-6.5 flex justify-end">
        {/* delete button */}
        <button className="text-gray-600/75 cursor-pointer flex item-center gap-1 hover:text-gray-700">
          <FaRegTrashAlt size={20} />
        </button>
      </div>
    </div>
  );
}
