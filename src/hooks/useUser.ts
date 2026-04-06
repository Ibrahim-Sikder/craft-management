import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/acttion";

export interface User {
  name: string;
  email: string;
  role: string;
  // add other fields as needed
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const info = await getUserInfo();
        setUser(info as User);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading };
};