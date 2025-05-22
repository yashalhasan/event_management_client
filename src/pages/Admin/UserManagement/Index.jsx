import React from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';

const mockUsers = [
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
  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">User Management</h1>

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
              {mockUsers.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.password}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-green-600 hover:underline">View</button>
                    <button className="text-blue-600 hover:underline">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
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

export default UserManagementIndex;
