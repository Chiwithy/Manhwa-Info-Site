import React from 'react'
import { Metadata } from 'next'
import './register.css'
import '../userAuth.css';
import RegisterForm from '@/components/Forms/RegisterForm/RegisterForm';
import { cookies } from 'next/headers';
import { insertSessionActivity } from '@/components/utility/functions/cookieFunctions';
import { checkIfLoggedInCookies } from '@/components/utility/functions/authFunctions';
import { NextResponse } from 'next/server';
import RedirectToHome from '@/components/RedirectToHome/page';

export const metadata: Metadata  = {
    title: "IMDb Registration"
}

const page = async () => {
  await insertSessionActivity (cookies ());
  const isLoggedIn = await checkIfLoggedInCookies (cookies ());
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