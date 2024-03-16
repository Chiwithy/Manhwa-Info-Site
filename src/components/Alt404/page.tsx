import "./Alt404.css";
import React from 'react'
import { Inter } from "next/font/google";
import Headtag from "../HeadTag/HeadTag";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404: This page could not be found."
}

const Alt404 = () => {
  return (
    <html lang="en">
      <Headtag/>
      <body className={inter.className}>
        <div className="error-container">
          <h1 className="error-heading">404</h1>
          <div>
            <h2 className="error-message">This page could not be found.</h2>
          </div>
        </div>
      </body>
    </html>
  )
}

export default Alt404

