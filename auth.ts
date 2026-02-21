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
      }
      return token;
    },
    // setting session user id to the token id, that we set to user id
    // this way when the user logs in we have access to their id to do different functions
    // this function is claled everytime setSession() or useSession() is used in the frontend
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages:{
    signIn:"/"
  }
});
