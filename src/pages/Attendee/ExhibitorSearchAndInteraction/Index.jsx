import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';

const mockExhibitors = [
  {
    id: 1,
    name: 'TechWorld Inc.',
    category: 'Electronics',
    products: 'Laptops, Tablets',
    booth: 'A-12',
    email: 'contact@techworld.com',
  },
  {
    id: 2,
    name: 'HealthZone',
    category: 'Healthcare',
    products: 'Wearables, Trackers',
    booth: 'B-8',
    email: 'info@healthzone.com',
  },
  {
    id: 3,
    name: 'GreenEnergy Co.',
    category: 'Renewables',
    products: 'Solar Panels, Batteries',
    booth: 'C-5',
    email: 'sales@greenenergy.com',
  },
];

const ExhibitorSearchAndInteractionIndex = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExhibitors = mockExhibitors.filter((exhibitor) =>
    `${exhibitor.name} ${exhibitor.category} ${exhibitor.products}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Exhibitor Search & Interaction</h1>

        {/* Search Box */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, category, or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Exhibitor Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Products</th>
                <th className="px-6 py-3">Booth</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExhibitors.length > 0 ? (
                filteredExhibitors.map((exhibitor) => (
                  <tr
                    key={exhibitor.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {exhibitor.name}
                    </td>
                    <td className="px-6 py-4">{exhibitor.category}</td>
                    <td className="px-6 py-4">{exhibitor.products}</td>
                    <td className="px-6 py-4">{exhibitor.booth}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="text-blue-600 hover:underline">View Profile</button>
                      <button
                        onClick={() => window.location = `mailto:${exhibitor.email}`}
                        className="text-green-600 hover:underline"
                      >
                        Email
                      </button>
                      <button className="text-indigo-600 hover:underline">Chat</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No exhibitors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ExhibitorSearchAndInteractionIndex;
