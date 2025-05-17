import React from 'react'
import AuthenticatedLayout from '../../layout/AuthenticatedLayout'
import HomeCard from '../../components/HomeCard'

const AdminHome = () => {
  return (
    <AuthenticatedLayout>
       <HomeCard/>
    </AuthenticatedLayout>
  )
}

export default AdminHome