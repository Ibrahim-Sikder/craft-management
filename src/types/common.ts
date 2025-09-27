/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_ROLE } from "@/constant/role";

export type userRole = keyof typeof USER_ROLE;

import { ReactNode } from "react";

export type UserRole = "admin" | "teacher" | "student" | "super_admin" | 'class_teacher' | 'super_visor' | 'accountant';

export const userRoles: UserRole[] = ['super_admin', 'admin', 'student', 'teacher', 'super_visor', 'class_teacher', 'accountant'];
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

export type Payment = {
  date: Date | string
  amount: number
  type: "principal" | "interest" | string
  remainingBalance: number
  note?: string
}

export type Loan = {
  id: string | number
  borrowerLender: string
  lenderName?: string
  borrowerName?: string
  type: "GIVEN" | "TAKEN"
  principalAmount: number
  remainingAmount: number
  totalPaid?: number
  remainingBalance?: number
  interestRate: number
  startDate: Date | string
  maturityDate: Date | string
  monthlyPayment?: number
  status: "ACTIVE" | "PAID" | "OVERDUE" | string
  repaymentHistory?: Payment[]
}
