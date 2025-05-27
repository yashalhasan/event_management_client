import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';

const mockExpos = [
  {
    id: 1,
    title: 'Tech Expo 2025',
    date: '2025-08-15',
    location: 'Los Angeles Convention Center',
    theme: 'Future of AI',
    description: 'Explore the latest in AI and Robotics.',
  },
  {
    id: 2,
    title: 'Green Energy Expo',
    date: '2025-10-05',
    location: 'San Francisco',
    theme: 'Sustainable Innovations',
    description: 'Showcasing green energy solutions.',
  },
];

const ExpoManagementIndex = () => {
  const [expos, setExpos] = useState(mockExpos);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [newExpo, setNewExpo] = useState({
    title: '',
    date: '',
    location: '',
    theme: '',
    description: '',
  });

  const handleEdit = (id) => {
    alert(`Edit expo ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this expo?')) {
      setExpos(expos.filter((expo) => expo.id !== id));
    }
  };

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newId = expos.length > 0 ? Math.max(...expos.map((e) => e.id)) + 1 : 1;
    setExpos((prev) => [...prev, { id: newId, ...newExpo }]);
    setNewExpo({
      title: '',
      date: '',
      location: '',
      theme: '',
      description: '',
    });
    setIsCreateModalOpen(false);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Expo Management</h1>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Expo
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Theme</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expos.map((expo) => (
                <tr
                  key={expo.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{expo.title}</td>
                  <td className="px-6 py-4">{expo.date}</td>
                  <td className="px-6 py-4">{expo.location}</td>
                  <td className="px-6 py-4">{expo.theme}</td>
                  <td className="px-6 py-4">{expo.description}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(expo.id)}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expo.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Booth Allocation Placeholder */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Booth Allocation (Coming Soon)</h2>
          <p className="text-gray-500">You will be able to assign booth spaces on a floor plan here.</p>
        </div>

        {/* Create Expo Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create New Expo</h2>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block mb-1 text-gray-700 dark:text-gray-300">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newExpo.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block mb-1 text-gray-700 dark:text-gray-300">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newExpo.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block mb-1 text-gray-700 dark:text-gray-300">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={newExpo.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="theme" className="block mb-1 text-gray-700 dark:text-gray-300">Theme</label>
                  <input
                    type="text"
                    id="theme"
                    name="theme"
                    value={newExpo.theme}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block mb-1 text-gray-700 dark:text-gray-300">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newExpo.description}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                    rows={3}
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

export default ExpoManagementIndex;
