// service function that makes network request through the user route.ts

import axios from "axios";
import { User } from "../types/user"; //created this type

// async function, when done running, will return a promise of type User (user's details)

// will not be  using this function directly, but instead with react query because we want
// fetched data to be cached
export async function getCurrentUser(): Promise<User> {
  try {
    //making the request
    const response = await axios.get("/api/auth/user");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error || "Failed to fetch user");
    } else {
      throw new Error("Network error occured");
    }
  }
}

// again, will not be using this function directly, but instead with react query because we want
// fetched data to be cached
export async function updateUser(data: FormData) {
  try {
    // need this because the route takes a patch request
    const response = await axios.patch("/api/auth/user", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("Failed to update user");
    }
  }
}
