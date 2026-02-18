import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegTrashAlt, FaRegComment, FaRegHeart } from "react-icons/fa";
import CommentInput from '@/components/comment/CommentInput'
import Comments from "@/components/comment/Comments";

export default function PostViewPage() {
  return (
    // will store the jsx of the post component
    <>
    <div className="bg-white p-6 rounded-3xl border border-gray-300">
      {" "}
      {/* uploaded post box */}
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
      <Link href="/post/......"> {/* will link to user's profile when clicking on their post */}
        <p className="py-4 text-gray-800 text-sm"> {/* caption */}
          {" "}
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
          commodi laudantium odit deleniti rerum doloremque error, aut atque
          incidunt eligendi quibusdam ipsam deserunt, ipsa vitae nobis, in
          corporis molestias nihil.
        </p>
        <div className="relative w-full h-80 sm:h-100 md:h-120">
            <Image src="/images/profile.jpg" alt="profile-pic" fill className="object-cover rounded-xl"/>
        </div>
      </Link>

      <div className="mt-4 mx-1 flex gap-6.5">
        {/* like button */}
        <button className="text-gray-600/80 cursor-pointer flex item-center gap-1.25 hover:text-gray-800">
            <FaRegHeart size={21}/>
            <span className="text-sm text-gray-800 mt-0.5">67</span>
        </button>
        {/* comment button */}
        <Link href="/post/......">
          <button className="text-gray-600/80 cursor-pointer flex item-center gap-1.25 hover:text-gray-800">
              <FaRegComment size={21}/>
              <span className="text-sm text-gray-800 mt-0.5">41</span>
          </button>
        </Link>
        {/* delete button */}
        <button className="text-gray-600/90 cursor-pointer flex item-center gap-1 hover:text-gray-800">
            <FaRegTrashAlt size={20}/>
        </button>
      </div>
    </div>

      {/* comment input */}
      <CommentInput/>

      {/* comments */}
      <Comments/>
      </>
  )
}
