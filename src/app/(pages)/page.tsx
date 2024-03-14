import { Metadata } from 'next'
import React from 'react'
import { connect } from '@/utils/db'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { insertSessionActivity } from '@/components/utility/functions/cookieFunctions'

export const metadata: Metadata = {
  title: "IMDb - Internet Manhwa  Database"
}

const Home = (req: NextRequest) => {
  insertSessionActivity (cookies ());
  return (
    <main>
      me when blank app
    </main>
  )
}

export default Home