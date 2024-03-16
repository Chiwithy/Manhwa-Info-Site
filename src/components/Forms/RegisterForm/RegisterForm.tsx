"use client"

import React, { useState } from 'react'
import './RegisterForm.css'
import '@/app/(userAuthForms)/userAuth.css';
import Link from 'next/link'
import Header from '@/components/FormElements/FormHeader/Header';
import TextField from '@/components/FormElements/FormTextField/TextField';
import SubmitError from '@/components/FormElements/SubmitError/SubmitError';
import { encrypt } from '@/components/utility/functions/encryptFunctions';

const RegisterForm = () => {
  const [file, setFile] = useState<File | null> (null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const maxImageSize = parseInt (process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE!);
      if (event.target.files[0].size >= maxImageSize) {
        alert ("Please upload files less than 3MB");
        event.target.value = "";
      }
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    formData.set ('password', encrypt (data.password.toString ()));
    formData.set ('email', encrypt (data.email.toString ()));
    formData.set ('phone', encrypt (data.phone.toString ()));

    if (!file) {
      formData.set ('image', 'default');
    } else {
      formData.set ('image', file);
    }

      const response = await fetch (process.env.NEXT_PUBLIC_URL + '/api/authRegister', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        window.location.href = ('/register?error=true');
      } else if (response.status === 403) {
        window.location.href = ('/');
      } else {
        window.location.href = ('/login');
      }

    } catch (error) {
      console.error (error);
      throw new Error ('SOMETHING WENT WRONG in login POST response');

    }
  }

  return (
    <>
    <Header headerText="Create account"/>
    <form onSubmit={handleSubmit}>
      <div className='input-container'>
        <label htmlFor="name">Name:</label>
        <TextField fieldType="Text" fieldUse="name" withError={true}/>
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
        <label htmlFor="image">Profile Photo:</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange}/> <br/>
        {/* <small>{photoError}</small> */}
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

export default RegisterForm;