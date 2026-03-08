import axios from "axios";

export async function createPost(data: FormData) {
  try {
    const response = await axios.post("/api/posts", data, {
        headers:{
            "Content-Type":"multipart/form-data",
        },
    });

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error deleting post:", error.response?.data);
      throw new Error(error.response?.data.error || "Failed to delete post");
    } else{
        throw error;
    }
  }
}
