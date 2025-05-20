import React from 'react'
import AuthenticatedNavbar from '../components/AuthenticatedNavbar'
import Footer from '../components/Footer'

const AuthenticatedLayout = ({children}) => {
  return (
    <>
    <AuthenticatedNavbar/>
    <div className='h-screen  '>
         {children}
         </div>
    <Footer/>
    </>
  )
} 

export default AuthenticatedLayout 