import React from 'react'
import { Metadata } from 'next'
import './login.css'
import '../userAuth.css';
import Link from 'next/link'
import Header from '@/components/FormElements/FormHeader/Header';
import TextField from '@/components/FormElements/FormTextField/TextField';
import SubmitError from '@/components/FormElements/SubmitError/SubmitError';

export const metadata: Metadata  = {
  title: "IMDb Log In",
}

const page = () => {
  return (
    <>
    <Header headerText="Log In"/>
    <form action="#" method="post" encType="multipart/form-data">
      <div className='input-container'>
        <label htmlFor="username">Username:</label>
        <TextField fieldType='text' fieldUse='username' withError={false}/>
      </div>
      <div className='input-container'>
        <label htmlFor="password">Password:</label>
        <TextField fieldType='password' fieldUse='password' withError={false}/>
      </div>

      <div className='submit-container'>
        <SubmitError pageType='login'/>
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