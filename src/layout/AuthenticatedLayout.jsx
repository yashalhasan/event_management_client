import React from 'react'
import AuthenticatedNavbar from '../components/AuthenticatedNavbar'
import Footer from '../components/Footer'

const AuthenticatedLayout = ({children}) => {
  return (
    <>
    <AuthenticatedNavbar/>
         {children}
    <Footer/>
    </>
  )
}

export default AuthenticatedLayout