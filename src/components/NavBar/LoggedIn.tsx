"use client"

import Link from 'next/link'
import React from 'react'



const LoggedIn: React.FC<{username: string}> = ({username}) => {
    const logOutUser = async () => {
      try {
        const res = await fetch ('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!res.ok)
          throw new Error ("Failed to log out");
        else
          window.location.href = ('/');
      } catch (error) {
        console.error ("error");
        throw new Error ("ERROR LOGGING OUT XD")
      }
    }
  return (
    <> <li>
        <Link href={"/user/" + username}> My Account </Link>
    </li>
    <li>
        <p onClick={logOutUser}> Log Out </p>
    </li> </>
  )
}

export default LoggedIn