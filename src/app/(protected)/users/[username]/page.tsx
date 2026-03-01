import UserProfile from "@/components/users/UserProfile";
import React from "react";

// we have access to object params with value called username in it
// the username must match the name of the dynamic route name ( or [username] )
export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
    const username = (await params).username;
    //will return a component
    // we cant fetch data here because this is server component
  return <UserProfile username={username}/>;
}
