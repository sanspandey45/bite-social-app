import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
} from "../../../../services/cloudinary";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // using formData because user can post images
    const formData = await req.formData();

    const text = (formData.get("text") as string | null) ?? "";
    const textClean = text.trim();
    const imageFile = formData.get("image") as File | null;
    const ratingRaw = formData.get("rating"); // comes in as a string (0-10)
    const ratingFloat =
      typeof ratingRaw === "string" && ratingRaw.trim() !== ""
        ? Number(ratingRaw)
        : null;

    // visited date comes in "YYYY-MM-DD"
    const visitedAtRaw = formData.get("visitedAt");
    const visitedAt =
      typeof visitedAtRaw === "string" && visitedAtRaw.trim() !== ""
        ? new Date(visitedAtRaw)
        : null;

    /* 
    // now validate the required fields, but i might not need this since ui wont let user's post unless
    // they type/select a restaurant to review anyways
    if (!text?.trim() && !imageFile) {
      return NextResponse.json(
        { error: "Post must have content" },
        { status: 400 },
      );
    }
    */

    let imageData: CloudinaryUploadResult | null = null;

    if (imageFile) {
      try {
        imageData = await uploadToCloudinary(imageFile); //expects the file from request
      } catch (error) {
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 },
        );
      }
    }

    await prisma.post.create({
      data: {
        text: textClean,
        authorId: session?.user?.id,
        ...(imageData && {
          image: imageData.secure_url,
          imagePublicId: imageData.public_id,
        }),
      },
    });

    return NextResponse.json(
      { success: true, message: "Post created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
