"use client"

import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import './SubmitError.css';

function LogInErrorMessage () {
  const isError = useSearchParams ().get ("error")?.toLowerCase () === 'true';
  const errorMessage = (isError) ? "You have entered an invalid username or password." : "";

  return <small> {errorMessage} </small>
}

function RegisterErrorMessage () {
  const isError = useSearchParams ().get ("error")?.toLowerCase () === 'true';
  const errorMessage = (isError) ? "Something went wrong please try again." : "";

  return <small> {errorMessage} </small>
}

const SubmitError:React.FC<{pageType: string}> = ({pageType}) => {
  if (pageType === 'login')
    return (
      <Suspense>
        <LogInErrorMessage/>
      </Suspense>
    )
  else
    return (
      <Suspense>
        <RegisterErrorMessage/>
      </Suspense>
    )
}

export default SubmitError