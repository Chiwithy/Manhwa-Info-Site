import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/NavBar/NavBar";
import Headtag from "@/components/HeadTag/HeadTag";
import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { checkIfAdminCookies, checkIfLoggedInCookies } from "@/components/utility/functions/authFunctions";

const inter = Inter({ subsets: ["latin"] });

async function getAccess (cookieStore: ReadonlyRequestCookies): Promise<[boolean, boolean]> {
  const isLoggedIn = await checkIfLoggedInCookies (cookieStore);
  if (isLoggedIn) {
    const isAdmin = await checkIfAdminCookies (cookieStore);

    if (isAdmin) {
      return [true, true];
    }

    return [true, false];
  }

  return [false, false];
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, isAdmin] = await getAccess (cookies ());
  return (
    <html lang="en">
      <Headtag/>
      <body className={inter.className}>
        <Navbar isLoggedIn={isLoggedIn as boolean} isAdmin={isAdmin as boolean}/>
        {children}
      </body>
    </html>
  );
}