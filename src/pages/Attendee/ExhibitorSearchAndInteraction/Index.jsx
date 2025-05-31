import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialExhibitors = [
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

const validationSchema = Yup.object({
  name: Yup.string().required('Exhibitor name is required'),
  category: Yup.string().required('Category is required'),
  products: Yup.string().required('Products are required'),
  booth: Yup.string().required('Booth number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ExhibitorSearchAndInteractionIndex = () => {
  const [exhibitors, setExhibitors] = useState(initialExhibitors);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredExhibitors = exhibitors.filter((exhibitor) =>
    `${exhibitor.name} ${exhibitor.category} ${exhibitor.products}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      products: '',
      booth: '',
      email: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newExhibitor = {
        id: exhibitors.length + 1,
        ...values,
      };
      setExhibitors([...exhibitors, newExhibitor]);
      resetForm();
      setShowModal(false);
    },
  });

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Exhibitor Search & Interaction</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Exhibitor
          </button>
        </div>

        {/* Modal Form */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-xl relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Create Exhibitor</h2>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {[
                  { label: 'Exhibitor Name', name: 'name', type: 'text' },
                  { label: 'Category', name: 'category', type: 'text' },
                  { label: 'Products', name: 'products', type: 'text' },
                  { label: 'Booth', name: 'booth', type: 'text' },
                  { label: 'Email', name: 'email', type: 'email' },
                ].map(({ label, name, type }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={formik.values[name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {formik.touched[name] && formik.errors[name] && (
                      <p className="text-red-500 text-sm">{formik.errors[name]}</p>
                    )}
                  </div>
                ))}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{exhibitor.name}</td>
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
