import React from 'react'
import { Metadata } from 'next'
import './register.css'
import '../userAuth.css';
import Link from 'next/link'
import Header from '@/components/FormElements/FormHeader/Header';
import TextField from '@/components/FormElements/FormTextField/TextField';
import SubmitError from '@/components/FormElements/SubmitError/SubmitError';

export const metadata: Metadata  = {
    title: "IMDb Registration"
}

const page = () => {
  const photoError = "Photo invalid";

  return (
    <>
    <Header headerText="Create account"/>
    <form action="#" method="post" encType="multipart/form-data">
      <div className='input-container'>
        <label htmlFor="name">Name:</label>
        <TextField fieldType="Text" fieldUse="naMe" withError={true}/>
      </div>

      <div className='input-container'>
        <label htmlFor="email">Email:</label>
        <TextField fieldType='email' fieldUse='email' withError={true}/>
      </div>

      <div className='input-container'>
        <label htmlFor="phone">Phone:</label>
        <TextField fieldType='tel' fieldUse='phone' withError={true}/>
      </div>

      <div className='input-container'>
        <label htmlFor="username">Username:</label>
        <TextField fieldType='text' fieldUse='username' withError={true}/>
      </div>
      <div className='input-container'>
        <label htmlFor="password">Password:</label>
        <TextField fieldType='password' fieldUse='password' withError={true}/>
      </div>

      <div className='input-container'>
        <label htmlFor="profile-photo">Profile Photo:</label>
        <input type="file" id="profile-photo" name="profile-photo" accept="image/*" required /> <br/>
        <small>{photoError}</small>
      </div>
      <div className='submit-container'>
        <SubmitError pageType='register'/>
        <button type="submit" className='button-submit'>Create your account</button>
      </div>
    </form>
    <hr className='hr-separator'/>
    <div className='alternate-container'>
      <p>Already have an account?</p>
      <Link href="/login" className='alternate-button'> Log In </Link>
    </div>
    </>
  )
}

export default page;