/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { authKey } from "@/constant/authkey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setAccessToken = async (token: string, option?: any) => {
  cookies().set(authKey, token);
  if (option && option.redirect) {
    redirect(option.redirect);
  }
};
