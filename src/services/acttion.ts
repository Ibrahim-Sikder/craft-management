"use server";

import { cookies } from "next/headers";

export const getUserInfo = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return null;

    // Call your backend API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/me`,
      {
        headers: {
          Cookie: `accessToken=${token}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const result = await response.json();
    console.log("result chckddddddd", result);
    return result.data;
  } catch (error) {
    console.error("Failed to get user info:", error);
    return null;
  }
};
