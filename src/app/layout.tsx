

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import { Toaster } from 'react-hot-toast';
const siliguri = Hind_Siliguri({
  weight: "400",
  subsets: ["latin"],
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "craft-international-institute",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${siliguri.className} antialiased`}
      >
           <Toaster position="top-right" reverseOrder={false} />
       <Providers>
       {children}
       </Providers>
      </body>
    </html>
  );
}
