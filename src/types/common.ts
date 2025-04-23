/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_ROLE } from "@/constant/role";

export type userRole = keyof typeof USER_ROLE;

import { ReactNode } from "react";

export type UserRole = "admin" | "teacher" | "student" | "super_admin";

export const userRoles: UserRole[] = ["admin", "teacher", "student", "super_admin"];
export interface NavigationItem {
    title: string
    path?: string
    icon: ReactNode
    roles?: UserRole[] 
    children?: NavigationItem[]
    segment?: string
  }
  
export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export interface DrawerItem {
  title: string;
  path: string;
  icon?: React.ElementType;
  child?: DrawerItem[];
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages?: string | string[];
}

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
