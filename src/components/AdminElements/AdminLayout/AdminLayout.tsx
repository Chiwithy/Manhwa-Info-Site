import Navbar from '@/components/NavBar/NavBar'
import React from 'react'

const AdminLayout:React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <> <Navbar isLoggedIn={true} isAdmin={true}/> <div className="container-tainer"> <div className="children-container">
        {children}
    </div></div> </>
  )
}

export default AdminLayout