import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const mockExhibitors = [
  { id: 1, name: 'TechCorp Inc.', product: 'Robotic Arms', category: 'Automation', status: 'pending', booth: null },
  { id: 2, name: 'Green Innovations', product: 'Solar Panels', category: 'Renewable Energy', status: 'approved', booth: 'B12' },
  { id: 3, name: 'FutureWare', product: 'AR Glasses', category: 'Wearables', status: 'rejected', booth: null },
];

const ExhibitorManagementIndex = () => {
  const [exhibitors, setExhibitors] = useState(mockExhibitors);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // EDIT modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editExhibitor, setEditExhibitor] = useState(null);

  // Create formik for Create form
  const createFormik = useFormik({
    initialValues: {
      name: '',
      product: '',
      category: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Company name is required'),
      product: Yup.string().required('Product is required'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: (values) => {
      const newId = Math.max(...exhibitors.map(e => e.id)) + 1;
      setExhibitors(prev => [...prev, { id: newId, status: 'pending', booth: null, ...values }]);
      createFormik.resetForm();
      setIsCreateModalOpen(false);
    },
  });

  // Edit formik - dynamically initialized when opening edit modal
  const editFormik = useFormik({
    enableReinitialize: true, // important to update values when editExhibitor changes
    initialValues: {
      name: editExhibitor?.name || '',
      product: editExhibitor?.product || '',
      category: editExhibitor?.category || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Company name is required'),
      product: Yup.string().required('Product is required'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: (values) => {
      setExhibitors(prev =>
        prev.map(e => (e.id === editExhibitor.id ? { ...e, ...values } : e))
      );
      setIsEditModalOpen(false);
      setEditExhibitor(null);
    },
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

  const openEditModal = (exhibitor) => {
    setEditExhibitor(exhibitor);
    setIsEditModalOpen(true);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Exhibitor Management</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Create
          </button>
        </div>

        {/* Exhibitors Table */}
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
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{exhibitor.name}</td>
                  <td className="px-6 py-4">{exhibitor.product}</td>
                  <td className="px-6 py-4">{exhibitor.category}</td>
                  <td className="px-6 py-4 capitalize">{exhibitor.status}</td>
                  <td className="px-6 py-4">{exhibitor.booth || 'Not assigned'}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(exhibitor)}
                      className="text-indigo-600 hover:underline"
                    >
                      Edit
                    </button>
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

        {/* Create Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create New Exhibitor</h2>
              <form onSubmit={createFormik.handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 text-gray-700 dark:text-gray-300">Company Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={createFormik.handleChange}
                    onBlur={createFormik.handleBlur}
                    value={createFormik.values.name}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                  {createFormik.touched.name && createFormik.errors.name && (
                    <p className="text-red-500 text-sm">{createFormik.errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="product" className="block mb-1 text-gray-700 dark:text-gray-300">Product</label>
                  <input
                    id="product"
                    name="product"
                    type="text"
                    onChange={createFormik.handleChange}
                    onBlur={createFormik.handleBlur}
                    value={createFormik.values.product}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                  {createFormik.touched.product && createFormik.errors.product && (
                    <p className="text-red-500 text-sm">{createFormik.errors.product}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="category" className="block mb-1 text-gray-700 dark:text-gray-300">Category</label>
                  <input
                    id="category"
                    name="category"
                    type="text"
                    onChange={createFormik.handleChange}
                    onBlur={createFormik.handleBlur}
                    value={createFormik.values.category}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                  {createFormik.touched.category && createFormik.errors.category && (
                    <p className="text-red-500 text-sm">{createFormik.errors.category}</p>
                  )}
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

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Edit Exhibitor</h2>
              <form onSubmit={editFormik.handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 text-gray-700 dark:text-gray-300">Company Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    value={editFormik.values.name}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                  {editFormik.touched.name && editFormik.errors.name && (
                    <p className="text-red-500 text-sm">{editFormik.errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="product" className="block mb-1 text-gray-700 dark:text-gray-300">Product</label>
                  <input
                    id="product"
                    name="product"
                    type="text"
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    value={editFormik.values.product}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                  {editFormik.touched.product && editFormik.errors.product && (
                    <p className="text-red-500 text-sm">{editFormik.errors.product}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="category" className="block mb-1 text-gray-700 dark:text-gray-300">Category</label>
                  <input
                    id="category"
                    name="category"
                    type="text"
                    onChange={editFormik.handleChange}
                    onBlur={editFormik.handleBlur}
                    value={editFormik.values.category}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                  {editFormik.touched.category && editFormik.errors.category && (
                    <p className="text-red-500 text-sm">{editFormik.errors.category}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditExhibitor(null);
                    }}
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Save Changes
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
