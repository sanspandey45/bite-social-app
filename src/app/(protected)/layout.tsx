import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import NavBar from "@/components/general/NavBar";

// NOTE: this is better than client-side check because it could flash page first, which can be bypassed,
//       whereas server-side here blocks before rendering

// async function because we want to use our next auth session in here
export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  // adding the ? as an extra check for edge case where session obj is corrupted or empty with no user data (rare)
  if (!session?.user) { 
    redirect("/"); // redirecting to sign in page
  }

  // any page we create will be rendered in children, protected by the layout file
  // here i'll create things like left sidebar, right sidebar, and nav bar
  return <>
  <NavBar/>
  {children}</>;
}
