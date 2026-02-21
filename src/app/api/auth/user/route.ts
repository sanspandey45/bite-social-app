import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "../../../../lib/prisma";
import {
  CloudinaryUploadResult,
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../../../../services/cloudinary";

// to fetch the logged in user's details
// will use to display on profile and populate edit profile form
export async function GET() {
  try {
    const session = await auth(); // getting this from auth.ts file in root folder

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        username: true,
        createdAt: true,
        bio: true,
        favCuisines: true,
        favSpots: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// making patch request when user edits their profile:
export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // need form data because we could possibly have file in request
    const formData = await req.formData();

    // getting the fields
    const name = formData.get("name") as string | null;
    const username = formData.get("username") as string; // | null;
    const email = formData.get("email") as string; // | null;
    const bio = formData.get("bio") as string | null;
    const favCuisines = formData.get("favCuisines") as string | null;
    const favSpotsRaw = formData.get("favSpots") as string | null;
    const image = formData.get("image") as File | null;

    // parsing favSpots from JSON string to array
    let favSpots: string[] | null = null;
    if (favSpotsRaw) {
      try {
        favSpots = JSON.parse(favSpotsRaw);
      } catch {
        favSpots = null;
      }
    }

    if (!username || !email) {
      return NextResponse.json(
        { error: "Username and email are required" },
        { status: 400 },
      );
    }

    // checking if email already exists:
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      // if the email they entered exists AND it is not their current
      // need this for when the user might not want to change email but
      // their current email will be submitted because of pre-populated form
      if (existingUser && existingUser.id !== session.user.id) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 },
        );
      }
    }

    // checking if username already exists:
    if (username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      // checking that that existing
      if (existingUser && existingUser.id !== session.user.id) {
        return NextResponse.json(
          { error: "username already exists" },
          { status: 409 },
        );
      }
    }

    // uploading user'shouldComponentUpdate(nextProps, nextState) { first } profile picture, need 2 service functions
    // will use Cloudinary
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true, imagePublicId: true },
    });

    let imageData: CloudinaryUploadResult | null = null;
    if (image && image.size > 0) {
      // actual image uploading, first validating image
      if (image.size > 5 * 1024 * 1024) {
        //converting to bytes
        return NextResponse.json(
          { error: "Image must be less than 5MB" },
          { status: 400 },
        );
      }

      const allowedTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (!allowedTypes.includes(image.type)) {
        return NextResponse.json(
          { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
          { status: 400 },
        );
      }

      try {
        imageData = await uploadToCloudinary(image);

        // then delete old image
        if (currentUser?.imagePublicId) {
          try {
            // passing current user's image id (which is stored) so we can delete it from cloudinary dashboard
            await deleteFromCloudinary(currentUser.imagePublicId);
          } catch (deleteError) {
            console.error("Failed to delete old image", deleteError);
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 },
        );
      }
    }
    // if we get here, then user did not select new image in modal, so imageData will be null

    // Helper function to clean up array for favorite spots
    const cleanArray = (arr: string[] | null) => {
      if (!arr || arr.length === 0) return [];
      const cleaned = arr.filter((item) => item.trim() !== "");
      return cleaned.length > 0 ? cleaned : [];
    };

    //-------------------------------------------------------------------------------------------------------
    // update the user in the database:
    console.log("About to update with data:", {
      name: name || null,
      email,
      username,
      bio: bio || null,
      favCuisines: favCuisines || null,
      favSpots: cleanArray(favSpots),
    });
    //-------------------------------------------------------------------------------------------------------
    // update the user in the database:
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || null,
        email,
        username,
        bio: bio || null,
        ...(imageData && {
          image: imageData.secure_url,
          imagePublicId: imageData.public_id,
        }),
        favCuisines: favCuisines || null,
        favSpots: cleanArray(favSpots),
      },
    });
    //-------------------------------------------------------------------------------------------------------
    console.log("Updated user:", updatedUser);
    //-------------------------------------------------------------------------------------------------------
    return NextResponse.json(
      { success: true, message: "Profile updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
