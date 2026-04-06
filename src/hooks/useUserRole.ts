//this is for dasbaord sidebar

import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/acttion";
import { UserRole } from "@/types/common";

export const useUserRole = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  useEffect(() => {
    getUserInfo().then(info => setUserRole(info?.role || null));
  }, []);
  return userRole;
};