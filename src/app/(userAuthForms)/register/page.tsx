import React from 'react'
import { Metadata } from 'next'
import './register.css'
import '../userAuth.css';
import RegisterForm from '@/components/Forms/RegisterForm/RegisterForm';
import { cookies } from 'next/headers';
import { insertSessionActivity } from '@/components/utility/functions/cookieFunctions';
import { checkIfLoggedIn } from '@/components/utility/functions/authFunctions';
import { NextResponse } from 'next/server';
import RedirectToHome from '@/components/RedirectToHome/page';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const metadata: Metadata  = {
    title: "IMDb Registration"
}

const page = async () => {
  const cookieStore: ReadonlyRequestCookies = cookies ();
  const sessionToken = cookieStore.get ('session')!.value
  await insertSessionActivity (cookieStore);
  const isLoggedIn = await checkIfLoggedIn (sessionToken);
  
  if (!isLoggedIn) {
    return (
      <>
      <RegisterForm/>
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