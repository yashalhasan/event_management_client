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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [newExhibitor, setNewExhibitor] = useState({
    name: '',
    product: '',
    category: '',
    status: 'pending',
    booth: null,
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExhibitor(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newId = Math.max(...exhibitors.map(e => e.id)) + 1;
    setExhibitors(prev => [...prev, { id: newId, ...newExhibitor }]);
    setNewExhibitor({
      name: '',
      product: '',
      category: '',
      status: 'pending',
      booth: null,
    });
    setIsCreateModalOpen(false);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        {/* Header with Create button on top right */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Exhibitor Management</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Create
          </button>
        </div>

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

        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Create New Exhibitor
              </h2>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="name">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newExhibitor.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="product">
                    Product
                  </label>
                  <input
                    type="text"
                    id="product"
                    name="product"
                    value={newExhibitor.product}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="category">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={newExhibitor.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default ExhibitorManagementIndex;
