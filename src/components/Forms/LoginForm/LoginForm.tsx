"use client"

import React, { useState } from 'react'
import './LoginForm.css'
import '@/app/(userAuthForms)/userAuth.css';
import Link from 'next/link'
import Header from '@/components/FormElements/FormHeader/Header';
import TextField from '@/components/FormElements/FormTextField/TextField';
import SubmitError from '@/components/FormElements/SubmitError/SubmitError';
import { encrypt } from '@/components/utility/functions/encryptFunctions';


const LoginForm = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.password = encrypt (data.password.toString ());
    data.username = encrypt (data.username.toString ());

    try {
      const response = await fetch ('/api/authLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify (data),
      });

      if (!response.ok) {
        window.location.href=('/login?error=true');
      } else {
        window.location.href=('/');
      }

    } catch (error) {
      console.error (error);
      throw new Error ('SOMETHING WENT WRONG in login POST response');

    }
  }

  return (
    <>
    <Header headerText="Log In"/>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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

export default LoginForm;