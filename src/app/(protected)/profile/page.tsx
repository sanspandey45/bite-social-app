"use client"; // need state

import EditProfileModal from "@/components/modals/EditProfileModal";
import Image from "next/image";
import React, { useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { useGetUser } from "../../../../custom-hooks/useUser";
import moment from "moment";

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user, isLoading, isError, error } = useGetUser();

  if (isLoading) return <h1 className="text-gray-700"> Loading... </h1>;
  if (isError) return <h1 className="text-gray-700">{error.message}</h1>;

  return (
    <>
      <EditProfileModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        user={user} // passing user as a prop
      />
      <div className="bg-white p-5.5 rounded-3xl border border-gray-300">
        {/* Everything in top bar */}
        <div className="flex items-center justify-between gap-4">
          {/* Profile Picture */}
          <div className="relative w-28 h-28 shrink-0">
            <Image
              src={user?.image || "/images/profile.jpg"}
              alt="profile-pic"
              fill
              className="object-cover rounded-full border-5 border-gray-300 transition"
            />
          </div>

          {/* profile stats */}
          <div className="sm:w-[57%] w-[90%] flex justify-between mt-1 mr-12.5">
            <div className="text-center text-gray-800">
              <p className="font-semibold text-lg">{user?._count.posts}</p>
              <p className="font-normal text-gray-500 text-sm">Reviews</p>
            </div>
            <div className="text-center text-gray-800">
              <p className="font-semibold text-lg">{user?._count.followers}</p>
              <p className="font-normal text-gray-500 text-sm">Followers</p>
            </div>
            <div className="text-center text-gray-800">
              <p className="font-semibold text-lg">{user?._count.following}</p>
              <p className="font-normal text-gray-500 text-sm">Following</p>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-primary/50 hover:bg-blue-primary/70 transition w-28 text-sm mt-2 py-1 rounded-full cursor-pointer"
        >
          Edit Profile
        </button>

        <div className="mt-4.5 text-gray-800">
          <p className="text-2xl font-bold">{user?.name || ""}</p>
          <p className="text-md text-gray-500">{user?.username}</p>
          <p className="flex mt-3 gap-1 items-center">
            <BiCalendar size={16} className="text-blue-primary" />
            <span className="text-gray-600/90 text-xs">
              Joined {moment(user?.createdAt).fromNow()}
            </span>
          </p>
          <div>
            <label className="mt-7 block text-sm text-gray-500/80 font-semibold">
              Bio
            </label>
            <p className="mt-.5 text-sm text-gray-700">{user?.bio || ""}</p>
            <label className="mt-6 block text-sm text-gray-500/80 font-semibold">
              Favorite Cuisines
            </label>
            <p className="mt-.5 text-sm text-gray-700">{user?.favCuisines}</p>
            <label className="mt-6 block text-sm text-gray-500/80 font-semibold">
              Favorite Spots
            </label>
            {user?.favSpots
              ?.filter((spot) => spot !== "")
              .map((spot, index) => (
                <p key={index} className="mt-.5 text-sm text-gray-700">
                  {spot}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
