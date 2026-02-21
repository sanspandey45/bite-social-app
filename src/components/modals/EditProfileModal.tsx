// don't need to specify use client because the parent page's client context is inherited by this child page

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { BiErrorCircle } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { z } from "zod";
import { User } from "../../../types/user";
import axios from "axios";
import { toast } from "react-toastify";
import { useUpdateUser } from "../../../custom-hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";

// zod schema for edit profile form
const EditProfileSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .refine((val) => z.email().safeParse(val).success, {
      message: "Invalid email address",
    }),
  name: z.string().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
  bio: z.string().optional().or(z.literal("")),
  image: z //adding validation to the file format
    .any()
    .optional()
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
          files[0].type,
        ),
      "Only .jpg, .png, or .webp images are allowed",
    ),
  favCuisines: z.string().optional().or(z.literal("")),
  favSpots: z.array(z.string()).optional(),
});

type EditProfileForm = z.infer<typeof EditProfileSchema>; // creating type from zod schema so we can pass it to react hook form

// name: z.string().min(2, "* Name is required"),
// email: z.email("* Invalid email address"),
// username: z.string().min(3, "* Username must be at least 3 characters"),
// password: z.string().min(6, "* Password must be at least 6 characters"),

type EditProfileModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | undefined; // can be undefined if user's details have not been fetched yet
};

// Since we are passing these as properties from parent page (profile page.tsx) to this child component, we can use
// the properties inside this child component

// Goals for this file:
// form handling with react hook form and zod
// forms will be populated with current data
// user detailed will be updated with user input
export default function EditProfileModal({
  isModalOpen,
  setIsModalOpen,
  user,
}: EditProfileModalProps) {
  // const {data: user} = useGetUser(); ---> might change "user" above to this because better approach??
  // this will return use mutation so we have access to mutate
  const queryClient = useQueryClient();
  const { mutate: updateUserMutation, isPending } = useUpdateUser();
  // connecting zod schema to react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(EditProfileSchema),
    // to populate form with current profile stats
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || "",
      favCuisines: user?.favCuisines || "",
      favSpots: user?.favSpots || [],
    },
  });

  // ISSUE: Reopening edit profile was pulling old cached data. fixed with this useEffect below:
  // Resetting form when modal opens OR user data changes, since defaultValues only runs once when the component mounts
  React.useEffect(() => {
    if (isModalOpen && user) {
      reset({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        favCuisines: user.favCuisines || "",
        favSpots: user.favSpots || [],
      });
    }
  }, [isModalOpen, user, user?.favSpots, reset]);

  const onSubmit = async (data: EditProfileForm) => {
    const formData = new FormData();
    formData.append("name", data?.name || "");
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("bio", data?.bio || "");
    formData.append("favCuisines", data?.favCuisines || "");
    formData.append("favSpots", JSON.stringify(data.favSpots || []));
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    updateUserMutation(formData, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        // Adding this because new fav spots wasn't showing in the edit profile modal, only previously cached data
        const freshUser = queryClient.getQueryData<User>(["currentUser"]);
        reset({
          name: freshUser?.name || "",
          username: freshUser?.username || "",
          email: freshUser?.email || "",
          bio: freshUser?.bio || "",
          favCuisines: freshUser?.favCuisines || "",
          favSpots: freshUser?.favSpots || [],
        });

        handleClose();
        toast("Profile updated", {
          style: { background: "#91d0ee", color: "black" },
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.error;

          if (message === "Email already exists") {
            setError("email", { message: "Email already in use" });
          } else if (message === "username already exists") {
            setError("username", { message: "Username already taken" });
          } else {
            toast("Failed to update profile", {
              style: { background: "#606bab", color: "black" },
            });
          }
        }
      },
    });
  };

  // const imageFile = data.image?.[0]; // Extract file from FileList

  // console.log("All form data:", data);
  // console.log("Image file:", imageFile);

  // if (imageFile) {
  //   console.log("File details:", {
  //     name: imageFile.name,
  //     size: imageFile.size,
  //     type: imageFile.type,
  //   });
  // } else {
  //   console.log("No image selected");
  // }

  // reset(); // Reset form
  // handleClose();

  const handleClose = () => {
    reset(); // Reset form
    setIsModalOpen(false); // Then close
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-500/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-beige/23 w-[90%] max-w-md rounded-4xl p-4 h-180 relative shadow-xl">
            {/* close button */}
            <button
              onClick={handleClose}
              className="absolute top-5.75 left-3 text-gray-800 text-3xl hover:text-white transition cursor-pointer"
            >
              <MdClose />
            </button>

            {/* save button */}
            <button
              type="submit"
              form="edit-profile-form"
              className="absolute mt-0.25 right-3 bg-blue-primary/70 text-white hover:bg-blue-primary text-md px-4 py-2 rounded-full cursor-pointer transition"
            >
              {isPending ? "Saving..." : "Save"}
            </button>

            {/* header */}
            <h2 className="text-xl font-semibold mb-6 text-center mt-1.75">
              Edit Profile
            </h2>

            {/* FORM---------------------------------- */}
            <form
              id="edit-profile-form"
              className="my-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Profile Picture Selection */}
              <div>
                <label className="text-sm text-gray-600">
                  Profile Picture
                  {errors.image && (
                    <p className="absolute text-red-700 text-sm -mt-5.25 ml-24">
                      <BiErrorCircle
                        className="inline mr-1.25 mb-1"
                        size={17}
                      />
                      {errors.image.message as string}
                    </p>
                  )}
                </label>
                <input
                  {...register("image")} // connecting our form to react hook form
                  type="file"
                  className="text-sm w-full py-3 px-4 placeholder-gray-300 bg-white/40 rounded-full cursor-pointer mb-3 "
                />
              </div>
              {/* Name */}
              <div>
                <label className="text-gray-600 text-sm flex">
                  Name
                  {errors.name && (
                    <p className="absolute text-red-700 text-sm -mb-1 ml-12">
                      <BiErrorCircle
                        className="inline mr-1.25 mb-1"
                        size={17}
                      />
                      {errors.name.message as string}
                    </p>
                  )}
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="text-sm w-full py-2 px-4 placeholder-gray-400 bg-white/40 rounded-full mb-3.5 outline-none"
                />
              </div>
              {/* Email Address */}
              <div>
                <label className="text-gray-600 text-sm">
                  Email Address
                  {errors.email && (
                    <p className="absolute text-red-700 text-sm -mt-5.25 -mb-1 ml-24">
                      <BiErrorCircle
                        className="inline mr-1.25 mb-1"
                        size={17}
                      />
                      {errors.email.message as string}
                    </p>
                  )}
                </label>
                <input
                  {...register("email")}
                  type="text"
                  className="text-sm w-full py-2 px-4 placeholder-gray-400 bg-white/40 rounded-full mb-3.5 outline-none"
                />
              </div>
              {/* Username */}
              <div>
                <label className="text-gray-600 text-sm">
                  Username
                  {errors.username && (
                    <p className="absolute text-red-700 text-sm -mt-5.25 -mb-1 ml-18">
                      <BiErrorCircle
                        className="inline mr-1.25 mb-1"
                        size={17}
                      />
                      {errors.username.message as string}
                    </p>
                  )}
                </label>
                <div className="flex items-center w-full py-2 px-4 bg-white/40 rounded-full mb-3.5 outline-none">
                  <span className="text-gray-400 select-none">@</span>
                  <input
                    {...register("username")}
                    type="text"
                    className="text-sm flex-1 bg-transparent placeholder-gray-400 ml-0.5 outline-none"
                  />
                </div>
              </div>
              {/* Bio */}
              {/* <div>
                <label className="text-gray-800">Bio</label>
                <textarea className="w-full py-1 px-4 placeholder-gray-400 bg-white/40 rounded-full text-gray-100 resize-none mb-3 outline-gray-400"></textarea>
              </div> */}
              {/* Fav Cuisines */}
              <div>
                <label className="text-gray-600 text-sm">
                  Bio
                  {errors.bio && (
                    <p className="absolute text-red-700 text-sm -mt-5.25 -mb-1 ml-18">
                      <BiErrorCircle
                        className="inline mr-1.25 mb-1"
                        size={17}
                      />
                      {errors.bio.message as string}
                    </p>
                  )}
                </label>
                <input
                  {...register("bio")}
                  type="text"
                  className="w-full text-sm py-2 px-4 placeholder-gray-400 bg-white/40 rounded-full mb-3.5 outline-none"
                />
              </div>
              <div>
                <label className="text-gray-600 text-sm">
                  Favorite Cuisines
                  {errors.favCuisines && (
                    <p className="absolute text-red-700 text-sm -mt-5.25 -mb-1 ml-18">
                      <BiErrorCircle
                        className="inline mr-1.25 mb-1"
                        size={17}
                      />
                      {errors.favCuisines.message as string}
                    </p>
                  )}
                </label>
                <input
                  {...register("favCuisines")}
                  type="text"
                  placeholder="ex: Italian, Japanese"
                  className="text-sm w-full py-2 px-4 placeholder-gray-400 bg-white/40 rounded-full mb-3.5 outline-none"
                />
              </div>
              {/* Fav Spots */}
              <div>
                <label className="text-gray-600 text-sm">
                  Favorite Spots
                  {errors.favSpots && (
                    <p className="absolute text-red-700 text-sm -mt-5.25 -mb-1 ml-18">
                      <BiErrorCircle
                        className="inline mr-1.25 mb-1"
                        size={17}
                      />
                      {errors.favSpots.message as string}
                    </p>
                  )}
                </label>
                <div className="flex flex-col gap-2 mt-1">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className="flex items-center w-full py-2 px-4 bg-white/40 rounded-full outline-white"
                    >
                      <span className="text-gray-400 select-none mr-2">
                        {index + 1}.
                      </span>
                      <input
                        type="text"
                        {...register(`favSpots.${index}`)}
                        className="text-sm flex-1 bg-transparent outline-none placeholder-gray-400"
                        placeholder={`Restaurant ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
