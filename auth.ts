// central authenticaion configuration
// will define how users sign in, how sessions are stored (jwt vs database sessions),
// callbacks, what route/handlers get generated in their GET/POST auth endpoints
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // defining how users can log in
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "password", type: "password" }, // basically string, just affects how browser displays it/autofill behaviors
      },
      authorize: async (credentials) => {
        // type check and not empty validation
        if (
          !credentials.email ||
          !credentials.password ||
          typeof credentials.email != "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid Credentials");
        }

        // else find user with this email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase().trim(),
          },
        });

        if (!user) {
          throw new Error("Invalid Credentials");
        }

        // if we find this user, verify their password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid Credentials");
        }

        // since user email exists and password valid, return the user object
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          image: user.image || null,
          name: user.name || null,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt", // means it stores session info in signed token instead of database
  },

  // What to do after user has signed in:
  // We are setting the JWT token, saying the token id will be the user id
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.image = user.image;
        token.name = user.name;
      }
      return token;
    },

    // setting session user id to the token id, that we set to user id
    // this way when the user logs in we have access to their id to do different functions
    // this function is claled everytime setSession() or useSession() is used in the frontend
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.image = (token.image as string | null) ?? null;
        session.user.name = (token.name as string | null) ?? null;
      }
      return session;
    },
  },

  pages: {
    signIn: "/",
  },
});
