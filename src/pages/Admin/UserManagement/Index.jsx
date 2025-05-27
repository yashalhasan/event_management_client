import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';

const initialUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: '••••••••',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: '••••••••',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: '••••••••',
  },
];

const UserManagementIndex = () => {
  const [users, setUsers] = useState(initialUsers);
  const [modal, setModal] = useState({ type: null, user: null });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Open create modal
  const openCreateModal = () => {
    setFormData({ name: '', email: '', password: '' });
    setModal({ type: 'create', user: null });
  };

  // Open view modal
  const openViewModal = (user) => {
    setModal({ type: 'view', user });
  };

  // Open edit modal
  const openEditModal = (user) => {
    setFormData({ name: user.name, email: user.email, password: '' });
    setModal({ type: 'edit', user });
  };

  // Close any modal
  const closeModal = () => {
    setModal({ type: null, user: null });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle create user
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: formData.name,
      email: formData.email,
      password: formData.password ? '••••••••' : '••••••••', // just mask
    };
    setUsers(prev => [...prev, newUser]);
    closeModal();
  };

  // Handle edit user
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUsers(prev =>
      prev.map(u =>
        u.id === modal.user.id
          ? { ...u, name: formData.name, email: formData.email, password: formData.password ? '••••••••' : u.password }
          : u
      )
    );
    closeModal();
  };

  // Handle delete user
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">User Management</h1>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create User
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Password</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.password}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openViewModal(user)}
                      className="text-green-600 hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => openEditModal(user)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
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

        {/* Modal */}
        {modal.type && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
              {modal.type === 'view' && (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">View User</h2>
                  <p><strong>Name:</strong> {modal.user.name}</p>
                  <p><strong>Email:</strong> {modal.user.email}</p>
                  <p><strong>Password:</strong> {modal.user.password}</p>
                  <div className="mt-4 text-right">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {(modal.type === 'create' || modal.type === 'edit') && (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {modal.type === 'create' ? 'Create User' : 'Edit User'}
                  </h2>
                  <form onSubmit={modal.type === 'create' ? handleCreateSubmit : handleEditSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block mb-1 text-gray-700 dark:text-gray-300">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block mb-1 text-gray-700 dark:text-gray-300">
                        Password {modal.type === 'edit' && <small>(leave blank to keep current)</small>}
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                      >
                        {modal.type === 'create' ? 'Create' : 'Save'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
};

export default UserManagementIndex;
