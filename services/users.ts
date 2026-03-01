import axios from "axios";
import { User } from "../types/user";

export async function getSuggestedUsers(): Promise<{ users: User[] }> {
  try {
    const response = await axios.get("/api/users/suggestions");
    return response.data;
    // now we need a react query hook to fire this response and fetch data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.error || "Failed to fetch suggestions",
      );
    } else {
      throw error;
    }
  }
}

// react query custom hook will fire this function
export async function getUserDetails(username: string): Promise<User> {
  try {
    // dynamic route
    const response = await axios.get(`/api/users/profile/${username}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.error || "Failed to fetch suggestions",
      );
    } else {
      throw error;
    }
  }
}
