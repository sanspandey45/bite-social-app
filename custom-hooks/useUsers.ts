import { useQuery } from "@tanstack/react-query";
import { getSuggestedUsers, getUserDetails } from "../services/users";

export function useFollowSuggestions() {
  return useQuery({
    queryFn: getSuggestedUsers,
    queryKey: ["followSuggestions"],
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000,
  });
}

export function useUserDetails(username:String) {
  return useQuery({
    queryFn:() => getUserDetails(username),
    //we want to cache user details by their username so we can update one user at a time, better for performance
    queryKey:["userDetails", username],
    enabled:!!username, //only when we actually have a username
    staleTime: 5*60*1000,
  });
}