import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const GuestLayout = ({children,enable_btn=true}) => {
  return (
   <>
   <Navbar enable_btn={enable_btn} />
        {children}
   <Footer/>
   </>
  )
}

export default GuestLayout