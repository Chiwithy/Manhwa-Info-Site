"use client"

import React from 'react'
import { Metadata } from 'next'
import './login.css'
import '../userAuth.css';
import Link from 'next/link'
import Header from '@/components/FormHeader/Header';
import { useCounterStore } from '@/stores/userAuthFormStore';

// separate components that use the store
// export const metadata: Metadata  = {
//     title: "IMDb Registration"
// }

const page = ({count}: { count: number}) => {
  // const loginError = useCounterStore ((state) => state.count);
  const loginError = "You have entered an invalid username or password.";

  return (
    <>
    <Header headerText="Log In"/>
    <form action="#" method="post" encType="multipart/form-data">
      <div className='input-container'>
        <label htmlFor="username">Username:</label>
        <input className='input-text-field' type="text" id="username" name="username" required />
      </div>
      <div className='input-container'>
        <label htmlFor="password">Password:</label>
        <input className='input-text-field' type="password" id="password" name="password" required />
      </div>

      <div className='submit-container'>
        <small> {loginError} </small>
        <button type="submit" className='button-submit'>Log In</button>
      </div>
    </form>
    <hr className='hr-separator'/>
    <div className='alternate-container'>
      <p>New to IMDb?</p>
      <Link href="/register" className='alternate-button'> Create your account </Link>
    </div>
    </>
  )
}

export default page;