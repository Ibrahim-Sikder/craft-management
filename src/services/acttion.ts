"use server";

import { cookies } from "next/headers";

export const getUserInfo = async () => {
  try {
    // Get cookies from the request
    const cookieStore = cookies();
    const cookieString = cookieStore.toString();

    console.log("Server Action - Cookies available:", !!cookieString);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Forward all cookies to the backend
          Cookie: cookieString,
        },
        cache: "no-store",
      },
    );

    console.log("Server Action - Response status:", response.status);

    if (!response.ok) {
      console.error("Response not OK:", response.status);
      return null;
    }

    const result = await response.json();
    console.log("Server Action - User info result:", result);

    return result.data;
  } catch (error) {
    console.error("Failed to get user info:", error);
    return null;
  }
};
