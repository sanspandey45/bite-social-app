import { createPost } from "../services/post";

export function useCreatePost() {
    return useMutation({
        mutationFn:(data:FormData) => createPost(data),
        onSuccess:() => {
            // invalidate the post query with the key here once created
        }
    })
}