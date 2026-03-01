import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // first i will get the Ids of people that the logged-in user follows
    const following = await prisma.follow.findMany({
      where: { followerId: session.user.id }, // follower is user A
      select: { followingId: true }, // following is who A follows (B, C, D...)
    });

    // then i turn it into a simple array of IDs: [B.id, C.id, D.id...]
    const followingIds = following.map((f) => f.followingId);

    // users that user A does NOT already follow (E, F, G...)
    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: session.user.id } }, // this way we exclude user A
          {
            NOT: {
              // excluding anyone A follows (B, C, D...)
              followers: {
                some: { followerId: session.user.id },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        // for each of those users we pulled, we can count how many of A's followings also follow the suggested
        _count: {
          select: {
            followers: {
              where: {
                followerId: { in: followingIds }, // where the new user's followerId is in this user's followingId (meaning someone the user follows already follows this new user)
              },
            },
          },
        },
      },
      take: 20, // need to overfetch because Prisma cant sort by _count of a filtered relation
    });

    // then, we SORT the suggested users by who has the MOST mutual connection with User A
    // also adding a random tie breaker so that users with no mutual connections don't see the samae people
    const sorted = users.sort((a,b) => {
        if (b._count.followers !== a._count.followers) {
            return b._count.followers - a._count.followers;
        }
        return Math.random() - 0.5;
    });

    // pick 12 of them:
    const suggestions = sorted.slice(0, 20); // now with this route, we need a service function to make a request to this route

    return NextResponse.json({ users: suggestions });
  } catch (error) {
    console.error("Error fetching user suggestions:", error);
    return NextResponse.json(
      { error: "Failed to fetch user suggestions" },
      { status: 500 },
    );
  }
}
