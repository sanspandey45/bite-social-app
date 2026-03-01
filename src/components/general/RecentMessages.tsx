"use client"

import Image from "next/image";
import Link from "next/link";
import { BsEye } from "react-icons/bs";

export default function RecentMessages() {
    return(
              <div className="fixed-center bg-white rounded-2xl h-56 mt-4 flex p-1 gap-1.5 items-center flex-col border border-gray-300/60 shadow-md hover:shadow-xl transition">
        <div className="relative flex items-center justify-center mt-1 text-gray-800 text-md font-semibold">
          Recent Messages
        </div>
        {/* Option to hide messages in home page */}
        <div className="absolute right-12 mt-1.75 hover:text-blue-primary cursor-pointer">
          <BsEye size={21} />
        </div>

        <Link href="/friendprofile">
          {" "}
          {/* link to chat page, change later */}
          <button className="text-red-500/60 w-67 hover:text-red-500/85 flex items-center bg-gray-300/60 hover:bg-gray-300 transition px-1 py-1 gap-2 m-1 rounded-full cursor-pointer border-gray-800">
            <div className="relative w-9 h-9 shrink-0 cursor-pointer">
              <Link href="/profile">
                <Image
                  src="/images/profile.jpg"
                  fill
                  alt="profile-pic"
                  className="object-cover rounded-full border-2 border-gray-300 hover:border-blue-primary/60 transition"
                />
              </Link>
            </div>
            <span className="text-gray-800 absolute left-21.5 mb-3.75 text-xs font-semibold">
              {" "}
              @janedoe{" "}
            </span>
            <span className="text-gray-800 absolute font-semibold right-13 mb-3.75 text-xs">
              {" "}
              2h ago
            </span>
            <span className="text-gray-800 font-semibold absolute left-21.25 mt-5 text-xs">
              {" "}
              Look at this cool cafe!
            </span>
          </button>
        </Link>

        <Link href="/friendprofile">
          {" "}
          {/* link to chat page, change later */}
          <button className="text-red-500/60 w-67 hover:text-red-500/85 flex items-center bg-gray-300/60 hover:bg-gray-300 transition px-1 py-1 gap-2 m-1 rounded-full cursor-pointer border-gray-800">
            <div className="relative w-9 h-9 shrink-0 cursor-pointer">
              <Link href="/profile">
                <Image
                  src="/images/profile.jpg"
                  fill
                  alt="profile-pic"
                  className="object-cover rounded-full border-2 border-gray-300 hover:border-blue-primary/60 transition"
                />
              </Link>
            </div>
            <span className="text-gray-600 absolute left-21.5 mb-3.75 text-xs">
              {" "}
              @jamesb{" "}
            </span>
            <span className="text-gray-600 absolute right-13 mb-3.75 text-xs">
              {" "}
              12h ago
            </span>
            <span className="text-gray-600 absolute left-21.25 mt-5 text-xs">
              {" "}
              Liked a message{" "}
            </span>
          </button>
        </Link>

        <Link href="/friendprofile">
          {" "}
          {/* link to chat page, change later */}
          <button className="text-red-500/60 w-67 hover:text-red-500/85 flex items-center bg-gray-300/60 hover:bg-gray-300 transition px-1 py-1 gap-2 m-1 rounded-full cursor-pointer border-gray-800">
            <div className="relative w-9 h-9 shrink-0 cursor-pointer">
              <Link href="/profile">
                <Image
                  src="/images/profile.jpg"
                  fill
                  alt="profile-pic"
                  className="object-cover rounded-full border-2 border-gray-300 hover:border-blue-primary/60 transition"
                />
              </Link>
            </div>
            <span className="text-gray-600 absolute left-21.5 mb-3.75 text-xs">
              {" "}
              @avareviews{" "}
            </span>
            <span className="text-gray-600 absolute right-13 mb-3.75 text-xs">
              {" "}
              2d ago
            </span>
            <span className="text-gray-600 absolute left-21.25 mt-5 text-xs">
              {" "}
              Sent a spot{" "}
            </span>
          </button>
        </Link>
      </div>
    );
}