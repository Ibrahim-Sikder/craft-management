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



// import "./globals.css";
// import Providers from "@/lib/Providers";
// import { createTheme, ThemeProvider } from "@mui/material";
// import { Toaster } from "react-hot-toast";

// export const metadata = {
//   title: "craft-international-institute",
//   description: "Dashboard", 
// };

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#facc15",
//     },
//     background: {
//       default: "#f9fafb",
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//   },
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className="antialiased">
//         <ThemeProvider theme={theme}>
//           <Toaster position="top-right" reverseOrder={false} />
//           <Providers>{children}</Providers>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
