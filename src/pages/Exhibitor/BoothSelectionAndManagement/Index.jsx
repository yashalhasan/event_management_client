import React from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';

const BoothSelectionAndManagementIndex = () => {
  return (
    <AuthenticatedLayout>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Booth Registration & Profile Management</h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Company Name</th>
              <th scope="col" className="px-6 py-3">Contact Person</th>
              <th scope="col" className="px-6 py-3">Product/Service</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">TechNova Inc.</td>
              <td className="px-6 py-4">Ravi Sharma</td>
              <td className="px-6 py-4">AI Solutions</td>
              <td className="px-6 py-4">Pending Approval</td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline mr-2">View</a>
                <a href="#" className="text-green-600 dark:text-green-400 hover:underline">Edit</a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Bright Displays</td>
              <td className="px-6 py-4">Alisha Khan</td>
              <td className="px-6 py-4">LED Panels</td>
              <td className="px-6 py-4">Approved</td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline mr-2">View</a>
                <a href="#" className="text-green-600 dark:text-green-400 hover:underline">Edit</a>
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Future Foods</td>
              <td className="px-6 py-4">Mohit Verma</td>
              <td className="px-6 py-4">Organic Snacks</td>
              <td className="px-6 py-4">Incomplete</td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline mr-2">View</a>
                <a href="#" className="text-green-600 dark:text-green-400 hover:underline">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
};

export default BoothSelectionAndManagementIndex;
