import React, { useState } from 'react'
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { Metadata } from 'next'
import './login.css'
import '../userAuth.css';
import LoginForm from '@/components/Forms/LoginForm/LoginForm';
import { cookies } from 'next/headers';
import { insertSessionActivity } from '@/components/utility/functions/cookieFunctions';
import { checkIfLoggedIn } from '@/components/utility/functions/authFunctions';
import RedirectToHome from '@/components/RedirectToHome/page';

export const metadata: Metadata  = {
  title: "IMDb Log In",
}


const page = async () => {
  const cookieStore: ReadonlyRequestCookies = cookies ();
  const sessionToken = cookieStore.get ('session')!.value
  await insertSessionActivity (cookieStore);
  const isLoggedIn = await checkIfLoggedIn (sessionToken);
  
  if (!isLoggedIn) {
    return (
      <>
      <LoginForm/>
      </>
    )
  }
  else {
    return (
      <RedirectToHome/>
    )
  }
}

export default page;