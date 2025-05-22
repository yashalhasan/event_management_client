import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';

const mockExhibitors = [
  {
    id: 1,
    name: 'TechCorp Inc.',
    product: 'Robotic Arms',
    category: 'Automation',
    status: 'pending',
    booth: null,
  },
  {
    id: 2,
    name: 'Green Innovations',
    product: 'Solar Panels',
    category: 'Renewable Energy',
    status: 'approved',
    booth: 'B12',
  },
  {
    id: 3,
    name: 'FutureWare',
    product: 'AR Glasses',
    category: 'Wearables',
    status: 'rejected',
    booth: null,
  },
];

const ExhibitorManagementIndex = () => {
  const [exhibitors, setExhibitors] = useState(mockExhibitors);

  const updateStatus = (id, newStatus) => {
    setExhibitors(prev =>
      prev.map(e => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  const assignBooth = (id) => {
    const booth = prompt('Enter booth number:');
    if (booth) {
      setExhibitors(prev =>
        prev.map(e => (e.id === id ? { ...e, booth } : e))
      );
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Exhibitor Management</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Booth</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exhibitors.map((exhibitor) => (
                <tr
                  key={exhibitor.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {exhibitor.name}
                  </td>
                  <td className="px-6 py-4">{exhibitor.product}</td>
                  <td className="px-6 py-4">{exhibitor.category}</td>
                  <td className="px-6 py-4 capitalize">{exhibitor.status}</td>
                  <td className="px-6 py-4">{exhibitor.booth || 'Not assigned'}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {exhibitor.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(exhibitor.id, 'approved')}
                          className="text-green-600 hover:underline"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(exhibitor.id, 'rejected')}
                          className="text-red-600 hover:underline"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {exhibitor.status === 'approved' && (
                      <button
                        onClick={() => assignBooth(exhibitor.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Assign Booth
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ExhibitorManagementIndex;
