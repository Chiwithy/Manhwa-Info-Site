import React from 'react'
import { Metadata } from 'next'
import './register.css'
import '../userAuth.css';
import Link from 'next/link'
import Header from '@/components/FormHeader/Header';

export const metadata: Metadata  = {
    title: "IMDb Registration"
}

const page = () => {
  const usernameError = "Username is invalid";
  const nameError = "Name contains invalid characters";
  const emailError = "Email is not valid";
  const phoneError = "Phone number format is invalid";
  const photoError = "Photo invalid";

  return (
    <>
    <Header headerText="Create account"/>
    <form action="#" method="post" encType="multipart/form-data">
      <div className='input-container'>
        <label htmlFor="name">Name:</label>
        <input className='input-text-field' type="text" id="name" name="name" required />
        <small>{nameError}</small>
      </div>

      <div className='input-container'>
        <label htmlFor="email">Email:</label>
        <input className='input-text-field' type="email" id="email" name="email" required />
        <small>{emailError}</small>
      </div>

      <div className='input-container'>
        <label htmlFor="phone">Phone:</label>
        <input
          className='input-text-field'
          type="tel"
          id="phone"
          name="phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
        />
        <small>Format: 123-456-7890</small><br/>
        <small>{phoneError}</small>
      </div>
      <div className='input-container'>
        <label htmlFor="username">Username:</label>
        <input className='input-text-field' type="text" id="username" name="username" required />
        <small>{usernameError}</small>
      </div>
      <div className='input-container'>
        <label htmlFor="password">Password:</label>
        <input className='input-text-field' type="password" id="password" name="password" required />

        <small className="password-requirements">
          Password requirements:
          <ul>
            <li>- Must be at least 8 characters</li>
            <li>- At least 1 special character</li>
            <li>- At least 1 lowercase character</li>
            <li>- At least 1 uppercase character</li>
            <li>- At least 1 number</li>
          </ul>
        </small>
      </div>

      <div className='input-container'>
        <label htmlFor="profile-photo">Profile Photo:</label>
        <input type="file" id="profile-photo" name="profile-photo" accept="image/*" required /> <br/>
        <small>{photoError}</small>
      </div>
      <div className='submit-container'>
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