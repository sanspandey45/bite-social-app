// this User type is for my frontend/API response, but it needs to match my Prisma schema
export type User = {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    createdAt: string;
    bio: string | null;
    username: string;
    favCuisines: string | null;
    favSpots: string[] | null;
    _count:{
        posts: number;
        followers: number;
        following: number;
    };
}
