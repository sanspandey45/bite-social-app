import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import prisma from "@/lib/prisma";

// route to fetch the details for the profile we want to view
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  try {
    const session = await auth();
    const { username } = await params; // has to match dynamic route name

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        name: true,
        image: true,
        createdAt: true,
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // here, we need to know if logged in user is following the user profile they are viewing
    // (to show following button)
    let isFollowing = false;
    if (session?.user?.id) {
      const follow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            // checking for this id pair to determine following relationship
            followerId: session.user.id,
            followingId: user.id,
          },
        },
      });

      isFollowing = !!follow; //if we find a pair, converting it to true boolean here
    }

    // attaching the new isFollowing variable to user

    return NextResponse.json({
      ...user,
      isFollowing,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 500 },
    );
  }
}
