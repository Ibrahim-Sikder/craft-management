import "./global.css";
import Providers from "@/lib/Providers";
import ThemeRegistry from "@/components/ThemeRegistry";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "craft-international-institute",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeRegistry>
          <Toaster position="top-right" reverseOrder={false} />
          <Providers>{children}</Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}