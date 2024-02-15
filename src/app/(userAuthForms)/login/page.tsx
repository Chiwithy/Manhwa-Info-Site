import React, { useState } from 'react'
import { Metadata } from 'next'
import './login.css'
import '../userAuth.css';
import LoginForm from '@/components/Forms/LoginForm/LoginForm';
import { cookies } from 'next/headers';
import { insertSessionActivity } from '@/components/utility/functions/cookieFunctions';
import { checkIfLoggedInCookies } from '@/components/utility/functions/authFunctions';
import RedirectToHome from '@/components/RedirectToHome/page';

export const metadata: Metadata  = {
  title: "IMDb Log In",
}


const page = async () => {
  await insertSessionActivity (cookies ());
  const isLoggedIn = await checkIfLoggedInCookies (cookies ());
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