"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFollowSuggestions } from "../../../custom-hooks/useUsers";

export default function SuggestedUsers() {

  const { data, error, isError, isLoading } = useFollowSuggestions();

  if (isLoading) return <p className="text-gray-600"> Loading...</p>;
  if (isError) return <p className="text-gray-600">{error.message}</p>;

  const users = data?.users ?? [];
  
{/* This needs to be scrollable*/}
  return (
    
    <div className="fixed-center bg-white rounded-2xl h-62.5 mt-4 flex p-1 gap-1.5 items-center flex-col overflow-y-auto border border-gray-100 shadow-md hover:shadow-xl transition">
      <h3 className="text-center text-gray-800 text-md font-semibold mt-1 mb-1">
        Suggested Users
      </h3>
      {users.map((user) => {
        return (
          <div
            key={user.id}
            className="flex items-center w-63 bg-gray-300/60 hover:bg-gray-300 transition px-1 py-1 gap-2 m-1 rounded-full"
          >
            <Link
              href={`/users/${user.username}`}
              className="flex flex-row items-center gap-2 flex-1 min-w-0"
            >
              {" "}
              {/* link to chat page, change later */}
              <div className="relative w-9 h-9">
                <Image
                  src={user.image || "/images/profile.jpg"}
                  fill
                  alt="profile-pic"
                  className="object-cover rounded-full border-2 border-gray-300 hover:border-blue-primary/60 transition"
                />
              </div>
              <div className="flex flex-col flex-1 text-left">
                <span className="text-gray-900 text-sm"> {user.name} </span>
                <span className="text-gray-600 text-xs -mt-0.5">
                  {" "}
                  @{user.username}{" "}
                </span>
              </div>
            </Link>
            {/* Follow Suggested User Button */}
            <button
              //onClick={() => ....(true)}
              className="flex flex-col text-gray-800 bg-blue-primary/50 hover:bg-blue-primary/70 transition w-20 text-sm py-1.5 rounded-full cursor-pointer shrink-0"
            >
              Follow +
            </button>
          </div>
        );
      })}
    </div>
  );
}
