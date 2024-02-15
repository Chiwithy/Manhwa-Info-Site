"use client"

import React from 'react'

const RedirectToHome = () => {
    window.location.href = "/"
  return (
    <>
        <img src="/site-images/logo.png"/>
        <div>U're just going back home</div>
    </>
  )
}

export default RedirectToHome