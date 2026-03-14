/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import Image from "next/image";
import bg from "../assets/img/bg.webp";
import logo from "../assets/img/logo/logo.png";
import Link from "next/link";
import { Button } from "@mui/material";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import toast from "react-hot-toast";
import CraftForm from "@/components/Forms/Form";
import CraftInput from "@/components/Forms/Input";

const loginSchema = z.object({
  credential: z
    .string({
      required_error: "Please enter your email, phone or student ID",
    })
    .min(1, "Credential is required"),
  password: z
    .string({
      required_error: "Please enter your password",
    })
    .min(6, "Password must be at least 6 characters long"),
});

const LoginDashboard = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (data: FieldValues) => {
    try {
      console.log("Login attempt with:", data);

      const res = await login(data).unwrap();
      console.log("Login response:", res);

      if (res?.success) {
        toast.success(res.message || "Login Successful!");

        // Don't check for cookies with js-cookie - just redirect
        // The browser will automatically include cookies in subsequent requests
        router.push("/dashboard");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage =
        err?.data?.message || err?.message || "An error occurred during login.";
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
            objectFit: "cover",
            objectPosition: "bottom center",
          }}
          className="overflow-hidden"
          quality={100}
          priority
        />
      </div>

      <CraftForm onSubmit={handleSubmit} resolver={zodResolver(loginSchema)}>
        <div className="relative z-10 md:w-full md:max-w-lg p-3 md:p-4 lg:p-8 m-2 bg-white rounded-xl shadow-lg">
          <div className="text-center mb-8 flex flex-col items-center">
            <Image
              src={logo}
              alt="Craft International Institute"
              className="h-20 w-auto md:w-[220px]"
            />
            <p className="text-gray-600 mt-2">
              ‍<span className="text-[#4F0187]"> লগইন </span>
              করতে অনুগ্রহ করে আপনার আইডি, ইমেইল বা ফোন নম্বর লিখুন!
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="credential"
                className="block text-sm font-medium text-gray-700"
              >
                আইডি / ইমেইল
              </label>
              <CraftInput
                type="text"
                placeholder="আপনার আইডি, ইমেইল বা ফোন নম্বর লিখুন"
                name="credential"
                fullWidth
                size="small"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                পাসওয়ার্ড
              </label>
              <CraftInput
                type="password"
                fullWidth
                size="small"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                name="password"
              />
            </div>

            <div className="flex justify-end">
              <Link
                href="#"
                className="text-sm text-[#9A5AE3] hover:text-blue-800 underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              sx={{
                backgroundColor: "#9A5AE3",
                color: "white",
                fontFamily: "inherit",
                "&:hover": {
                  backgroundColor: "#9b73c9",
                },
                "&:disabled": {
                  backgroundColor: "#cccccc",
                },
              }}
              className="w-full py-2 px-4 text-white font-medium rounded-lg transition duration-200"
            >
              {isLoading ? "লগইন হচ্ছে..." : "লগইন"}
            </Button>
          </div>
        </div>
      </CraftForm>
    </div>
  );
};

export default LoginDashboard;
