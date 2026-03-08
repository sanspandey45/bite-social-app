import React from "react";
import { User } from "../../../types/user";

type CreatePostModalProps = {
  showPostModal: boolean;
  setShowPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | undefined; // can be undefined if user's details have not been fetched yet
};

export default function CreatePostModal({
  showPostModal,
  setShowPostModal,
  user,
}: CreatePostModalProps) {
  return (
    <>
      {showPostModal && (
        <h2 className="text-xl font-semibold mb-6 text-center mt-1.75">
          Edit Profile
        </h2>
      )}
    </>
  );
}
