import './globals.css';
import Providers from "@/lib/Providers";
import { Toaster } from 'react-hot-toast';

export const metadata = {
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
      <body className="antialiased">
        <Toaster position="top-right" reverseOrder={false} />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
