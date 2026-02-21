import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser, updateUser } from "../services/user";

export function useGetUser(){
    return useQuery({
        queryKey:["currentUser"],
        queryFn:getCurrentUser
    })
}

export function useUpdateUser(){
    // not using useQuery b/c that is for fetching
    // we need this for manipulating data
    return useMutation({
        mutationFn:(data:FormData) => updateUser(data),
        // Removing this below because decided to handle in modal to ensure current data is fetched 
        // // we want to invalidate current cache, and update in the ui:
        // onSuccess:() => {
        //     queryClient.invalidateQueries({queryKey:["currentUser"]});
        // }
    })
}