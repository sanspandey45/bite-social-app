// will remain server component; server-rendered posts are better

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFire } from "react-icons/bs";
import { FaRegTrashAlt, FaStar } from "react-icons/fa";
import {
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa6";


export default function Post() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-300 shadow-xl mb-5">
      {" "}
      {/* uploaded post box */}{" "}
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
        <div>
          <p className="-mt-1 -mb-1">Jane Doe</p>
          <div>
            <span className="mr-2 text-sm font-normal text-gray-400">
              {" "}
              {/* username */} @janedoe
            </span>
            <span className="text-blue-primary/95 text-xs font-semibold">
              2h ago
            </span>
          </div>
        </div>
      </div>
      <Link href="/post/......">
        {" "}
        {/* will link to user's profile when clicking on their post */}
        <p className="mt-2 text-gray-900 text-sm font-semibold">
          {" "}
          {/* spot */} Akaya Sushi, Plano, TX
        </p>
        <p className="flex mb-3.5 text-xs">
          {/* rating */}
          <FaStar size={22} className={"mr-1 text-blue-primary"} />
          <FaStar size={22} className={"mr-1 text-blue-primary"} />
          <FaStar size={22} className={"mr-1 text-blue-primary"} />
          <FaStar size={22} className={"mr-1 text-blue-primary"} />
          <FaStar size={22} className={"mr-1 text-blue-primary"} />
        </p>
        <p className="text-gray-500 text-xs mb-1">
          {" "}
          {/* visited spot */} Visited 4 days ago
        </p>
        <p className="mt-1.25 mb-2 text-gray-800 text-xs">
          {" "}
          {/* caption */} Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Totam commodi laudantium odit deleniti rerum doloremque error,
          aut atque incidunt eligendi quibusdam ipsam deserunt, ipsa vitae
          nobis, in corporis molestias nihil.
        </p>
        <div className="flex gap-3 overflow-x-auto">
          <div className="relative w-45 h-45 flex-shrink-0">
            <Image
              src="/images/sushi.jpg"
              alt="profile-pic"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="relative w-45 h-45 flex-shrink-0">
            <Image
              src="/images/sushi.jpg"
              alt="profile-pic"
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="relative w-45 h-45 flex-shrink-0">
            <Image
              src="/images/sushi.jpg"
              alt="profile-pic"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </Link>
      <div className="mt-3.5 mx-0 flex justify-between">
        <div className="flex gap-4">
          {/* like button */}
          <button className="text-red-800/30 cursor-pointer flex item-center gap-1 hover:text-red-700/90 transition">
            <FaRegHeart size={26} />
            <span className="text-sm text-gray-900 mt-0.75">41</span>
          </button>
          {/* fire button */}
          <button className="text-yellow-700/30 cursor-pointer flex item-center gap-1 hover:text-yellow-600/80 transition">
            <BsFire size={26} />
            <span className="text-sm text-gray-900 mt-0.75">21</span>
          </button>
          {/* comment button */}
          <Link href="/post/......">
            <button className="text-blue-800/30 cursor-pointer flex item-center gap-1 hover:text-blue-500/85 transition">
              <FaRegComment size={26} />
              <span className="text-sm text-gray-900 mt-0.75">12</span>
            </button>
          </Link>
        </div>
        {/* delete button */}
        <button className="text-gray-600/75 cursor-pointer flex item-center hover:text-gray-700 mt-1">
          <FaRegTrashAlt size={18} />
        </button>
      </div>
    </div>
  );
}
