import React from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';

const CommunicationIndex = () => {
  return (
    <AuthenticatedLayout>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Communication Center</h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">Ravi (Exhibitor)</td>
              <td className="px-6 py-4">Alisha (Attendee)</td>
              <td className="px-6 py-4">Product Inquiry</td>
              <td className="px-6 py-4">May 21, 2025</td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline mr-2">View</a>
                <a href="#" className="text-green-600 dark:text-green-400 hover:underline">Reply</a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">Event Support</td>
              <td className="px-6 py-4">Bright Displays</td>
              <td className="px-6 py-4">Booth Setup Assistance</td>
              <td className="px-6 py-4">May 20, 2025</td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline mr-2">View</a>
                <a href="#" className="text-green-600 dark:text-green-400 hover:underline">Reply</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
};

export default CommunicationIndex;
