import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/NavBar/NavBar";
import Headtag from "@/components/HeadTag/HeadTag";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Headtag/>
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}