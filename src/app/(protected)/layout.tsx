import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import LeftSidebar from "@/components/general/LeftSidebar";
import RightSidebar from "@/components/general/RightSidebar";

// NOTE: auth session checking is better handled in server than client-side check because it could flash page first,
//       which can be bypassed, whereas server-side here blocks before rendering

// async function because we want to use our next auth session in here
export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  // adding the ? as an extra check for edge case where session obj is corrupted or empty with no user data (rare)
  if (!session?.user) {
    redirect("/"); // redirecting to sign in page
  }

  // every page we create will be rendered in children, protected by the layout file
  // here i'll create things like left sidebar, right sidebar, and nav bar
  return (
    <>
      <LeftSidebar />
      <div className = "min-h-screen mx-5 lg:ml-99 lg:mr-119 2xl:ml-140 2xl:mr-165 text-gray-900 mt-6"> {/* will contain global styles applied to all the protected pages*/}
        {children}
      </div>
      <RightSidebar />
    </>
  );
}
