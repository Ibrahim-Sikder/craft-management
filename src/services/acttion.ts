/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: 'admin' | 'teacher' | 'student';
  id: string;
  email: string;
  [key: string]: any; 
}

export const getUserInfo = async (): Promise<JwtPayload | null> => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get('craft-token')?.value;

    if (!token) return null;

    const decoded = jwtDecode<JwtPayload>(token);

    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};
