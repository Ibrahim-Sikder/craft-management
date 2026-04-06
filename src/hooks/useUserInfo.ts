/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useUserInfo.ts
"use client";

import { instance } from "@/axios/axiosInstance";
import { useState, useEffect } from "react";

interface UserInfo {
  userId: string;
  email: string;
  name: string;
  role: string;
  _id: string;
}

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await instance.get("/auth/me");

        if (response.data?.success && response.data?.data) {
          setUserInfo(response.data.data);
        } else {
          setUserInfo(null);
        }
      } catch (err: any) {
        console.error("Failed to fetch user info:", err);
        setError(err.message);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { userInfo, loading, error };
};
