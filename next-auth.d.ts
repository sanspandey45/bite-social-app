// basically telling TS about my custom fields (like username, image, name)
// user logs in -> authorize function runs -> returns user data 
//  -> goes to JWT token in jwt callback -> token data goes into the session in session callback
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
  }
}

// extending our JWT with id/username/image/name, matchig our jwt() callback
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;    // optional is safer b/c token may exist before login
    username?: string;
    image?: string | null;
    name?: string | null;
  }
}