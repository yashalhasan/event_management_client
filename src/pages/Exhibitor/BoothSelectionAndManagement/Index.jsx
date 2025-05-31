import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialBooths = [
  {
    id: 1,
    companyName: 'TechNova Inc.',
    contactPerson: 'Ravi Sharma',
    productService: 'AI Solutions',
    status: 'Pending Approval',
  },
  {
    id: 2,
    companyName: 'Bright Displays',
    contactPerson: 'Alisha Khan',
    productService: 'LED Panels',
    status: 'Approved',
  },
  {
    id: 3,
    companyName: 'Future Foods',
    contactPerson: 'Mohit Verma',
    productService: 'Organic Snacks',
    status: 'Incomplete',
  },
];

const validationSchema = Yup.object({
  companyName: Yup.string().required('Company Name is required'),
  contactPerson: Yup.string().required('Contact Person is required'),
  productService: Yup.string().required('Product/Service is required'),
  status: Yup.string().required('Status is required'),
});

const BoothSelectionAndManagementIndex = () => {
  const [booths, setBooths] = useState(initialBooths);
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      companyName: '',
      contactPerson: '',
      productService: '',
      status: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newBooth = {
        id: booths.length + 1,
        ...values,
      };
      setBooths([...booths, newBooth]);
      resetForm();
      setShowModal(false);
    },
  });

  return (
    <AuthenticatedLayout>
      <div className="p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Booth Registration & Profile Management</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Booth
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-lg relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold mb-4 dark:text-white">Create Booth</h3>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {[
                  { label: 'Company Name', name: 'companyName' },
                  { label: 'Contact Person', name: 'contactPerson' },
                  { label: 'Product/Service', name: 'productService' },
                  { label: 'Status', name: 'status' },
                ].map(({ label, name }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {label}
                    </label>
                    <input
                      type="text"
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

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Company Name</th>
              <th className="px-6 py-3">Contact Person</th>
              <th className="px-6 py-3">Product/Service</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {booths.map((booth) => (
              <tr
                key={booth.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {booth.companyName}
                </td>
                <td className="px-6 py-4">{booth.contactPerson}</td>
                <td className="px-6 py-4">{booth.productService}</td>
                <td className="px-6 py-4">{booth.status}</td>
                <td className="px-6 py-4 text-right">
                  <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline mr-2">
                    View
                  </a>
                  <a href="#" className="text-green-600 dark:text-green-400 hover:underline">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthenticatedLayout>
  );
};

export default BoothSelectionAndManagementIndex;
