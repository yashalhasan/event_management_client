import React from 'react'
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout'

const RegistrationAndProfileManagementIndex = () => {
  return (
    <AuthenticatedLayout>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Company Name</th>
              <th scope="col" className="px-6 py-3">Products / Services</th>
              <th scope="col" className="px-6 py-3">Logo</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Contact Info</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">TechNova Inc.</td>
              <td className="px-6 py-4">AI-powered CRM, Chatbots</td>
              <td className="px-6 py-4">
                <img src="/logos/technova.png" alt="TechNova Logo" className="h-8 w-auto" />
              </td>
              <td className="px-6 py-4">Leading solutions in customer engagement and automation.</td>
              <td className="px-6 py-4">contact@technova.com<br />+1 234 567 8901</td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>

            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">GreenCore Solutions</td>
              <td className="px-6 py-4">Solar Panels, Energy Consulting</td>
              <td className="px-6 py-4">
                <img src="/logos/greencore.png" alt="GreenCore Logo" className="h-8 w-auto" />
              </td>
              <td className="px-6 py-4">Eco-friendly innovations for sustainable power generation.</td>
              <td className="px-6 py-4">info@greencore.com<br />+44 1234 567890</td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  )
}

export default RegistrationAndProfileManagementIndex
