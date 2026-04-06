"use server";

import { cookies } from "next/headers";

export const getUserInfo = async () => {
  try {
    const cookieStore = cookies();
    const cookieString = cookieStore.toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieString,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error("Response not OK:", response.status);
      return null;
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Failed to get user info:", error);
    return null;
  }
};
