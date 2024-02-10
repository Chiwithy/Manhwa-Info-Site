import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import "./userAuth.css";
import Headtag from "@/components/HeadTag/HeadTag";
import Image from "next/image";
import Link from "next/link";

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
        <div className='image-container'> <Link href="/">
            <Image src={"/site-images/logo.png"} width={120} height={60} alt="IMDb logo"/>
        </Link> </div>
        <div className='form-container'>
          {children}
        </div>
      </body>
    </html>
  );
}
