// will remain server component; server-rendered posts are better

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFire } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegComment, FaRegHeart } from "react-icons/fa6";

export default function Post() {
  return ( 
    <div className="bg-white p-5 rounded-3xl border border-gray-300 shadow-2xl"> {/* uploaded post box */}
      {" "}
      <div className="flex gap-2.5 items-center">
        <div className="relative w-11 h-11 group">
          {" "}
          {/* profile picture */}
          <Image
            src="/images/profile.jpg"
            fill
            alt="profile-pic"
            className="object-cover rounded-full border-4 border-gray-300 shrink-0 hover:border-blue-primary/60 transition cursor-pointer"
          />
        </div>
        <div>
          <p className="-mt-1 -mb-1">Jane Doe</p>
          <div>
            <span className="mr-2 text-sm font-normal text-gray-400">
              {" "}
              {/* username */} @janedoe
            </span>
            <span className="text-blue-primary text-sm font-semibold">
              2h ago
            </span>
          </div>
        </div>
      </div>
      <Link href="/post/......">
        {" "}
        {/* will link to user's profile when clicking on their post */}
        <p className="py-4 text-gray-900 text-sm">
          {" "}
          {/* caption */} Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Totam commodi laudantium odit deleniti rerum doloremque error,
          aut atque incidunt eligendi quibusdam ipsam deserunt, ipsa vitae
          nobis, in corporis molestias nihil.
        </p>
        <div className="relative w-80 h-80 sm:h-100 sm:w-100 md:h-110 md:w-full border border-gray-300">
          <Image
            src="/images/profile.jpg"
            alt="profile-pic"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </Link>
      <div className="mt-4 mx-1 flex justify-between">
        <div className="flex gap-6.5 ">
          {/* like button */}
          <button className="text-gray-600/75 cursor-pointer flex item-center gap-1.25 hover:text-gray-700">
            <FaRegHeart size={28} />
            <span className="text-md text-gray-900 mt-0.5">41</span>
          </button>
          {/* fire button */}
          <button className="text-gray-600/75 cursor-pointer flex item-center gap-1.25 hover:text-gray-700">
            <BsFire size={28} />
            <span className="text-md text-gray-900 mt-0.5">21</span>
          </button>
          {/* comment button */}
          <Link href="/post/......">
            <button className="text-gray-600/75 cursor-pointer flex item-center gap-1.25 hover:text-gray-700">
              <FaRegComment size={28} />
              <span className="text-md text-gray-900 mt-0.5">12</span>
            </button>
          </Link>
        </div>
        {/* delete button */}
        <button className="text-gray-600/75 cursor-pointer flex item-center hover:text-gray-700">
          <FaRegTrashAlt size={21} />
        </button>
      </div>
    </div>
  );
}
