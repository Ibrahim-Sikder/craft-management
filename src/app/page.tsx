/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React from 'react';
import Image from 'next/image';
import bg from '../assets/img/bg.webp';
import logo from '../assets/img/logo/logo.png';
import Link from 'next/link';
import { Button } from '@mui/material';
import * as z from "zod";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.services";
import { FieldValues } from "react-hook-form";
import { setCookie } from "@/axios/Cookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from '@/redux/features/auth/auth.api';
import toast from 'react-hot-toast';
import CraftForm from '@/components/Forms/Form';
import CraftInput from '@/components/Forms/Input';


const loginSchema = z.object({
  email: z
    .string({
      required_error: "Please enter your email address",
      invalid_type_error: "Please enter a valid email address",
    })
    .email("Please enter a valid email address"),
  password: z
    .string({
      required_error: "Please enter your password",
      invalid_type_error: "Please enter a valid password",
    })
    .min(6, "Password must be at least 6 characters long"),
});

interface LoginResponse {

  data: {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    }
  };
  message: string;
}

// const defualtValues = {
//   email: '',
//   password: '',
// }

const LoginDashboard = () => {
  const [login, { error, isLoading, isSuccess }] = useLoginMutation() as any;
  const router = useRouter()
  const handleSubmit = async (data: FieldValues) => {
    try {
      const res = await login(data).unwrap() as LoginResponse;
     

      // Store accessToken to cookie
      setCookie('craft-token', res?.data?.accessToken, { expires: 7 });

      // Store entire user data in localStorage
      localStorage.setItem('user-info', JSON.stringify(res.data?.user));

      // Optional: store just the token too if you still want it separately
      storeUserInfo({ accessToken: res?.data?.accessToken });

      toast.success(res.message || 'Login Successful!');
      router.push('/dashboard');
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || 
        err?.error || 
        'An error occurred during login.';
      
      toast.error(errorMessage);
    }
    
  };


  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="fixed inset-0 z-0 h-screen">
        <Image
          src={bg}
          alt="Background"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'bottom center',
          }}
          className="overflow-hidden"
          quality={100}
          priority
        />
      </div>


      <CraftForm onSubmit={handleSubmit} resolver={zodResolver(loginSchema)}>
        <div className="relative z-10 w-full max-w-lg p-3 md:p-4 lg:p-8 m-2 bg-white rounded-xl shadow-lg">
          <div className="text-center mb-8 flex flex-col items-center">
            <Image src={logo} alt='Craft International Institute' className='h-20 w-[220px]' />
            {/* <h1 className="text-3xl font-bold text-[#9A5AE3]">লগইন
          </h1> */}
            <p className="text-gray-600 mt-2">
              ‍<span className='text-[#4F0187]'> লগইন </span>
              করতে অনুগ্রহ করে আপনার ইমেইল বা ফোন নম্বর লিখুন!</p>
          </div>

          <div className="space-y-3">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                ইমেইল বা ফোন নম্বর
              </label>
              <CraftInput
                type="email"
                placeholder="আপনার ইমেইল বা ফোন নম্বর লিখুন"
                name='email'
                fullWidth
                size='small'
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>
              <CraftInput
                type="password"
                fullWidth
                size='small'
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                name='password'
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">

              <Link href="#" className="text-sm text-[#9A5AE3] hover:text-blue-800 underline">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <Button
              type="submit"

              sx={{
                backgroundColor: '#9A5AE3',
                color: 'white',
                fontFamily: 'inherit',
                ":hover": {
                  backgroundColor: '#9b73c9', color: 'white'
                }
              }}
              className="w-full py-2 px-4  text-white font-medium rounded-lg transition duration-200"
            >
              লগইন
            </Button>
          </div>
        </div>
      </CraftForm>

    </div>
  );
};

export default LoginDashboard;