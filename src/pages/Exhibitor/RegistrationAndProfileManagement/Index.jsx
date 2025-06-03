import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialCompanies = [
  {
    id: 1,
    name: 'TechNova Inc.',
    products: 'AI-powered CRM, Chatbots',
    logo: '/logos/technova.png',
    description: 'Leading solutions in customer engagement and automation.',
    contact: 'contact@technova.com\n+1 234 567 8901',
  },
  {
    id: 2,
    name: 'GreenCore Solutions',
    products: 'Solar Panels, Energy Consulting',
    logo: '/logos/greencore.png',
    description: 'Eco-friendly innovations for sustainable power generation.',
    contact: 'info@greencore.com\n+44 1234 567890',
  },
];

const CompanySchema = Yup.object().shape({
  name: Yup.string().required('Company Name is required'),
  products: Yup.string().required('Products / Services are required'),
  logo: Yup.string().url('Invalid URL format').required('Logo URL is required'),
  description: Yup.string().required('Description is required'),
  contact: Yup.string().required('Contact Info is required'),
});

const CompanyManagementPage = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const openCreateModal = () => {
    setEditingCompany(null);
    setIsModalOpen(true);
  };

  const openEditModal = (company) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCompany(null);
  };

  const handleSubmit = (values, { resetForm }) => {
    if (editingCompany) {
      setCompanies((prev) =>
        prev.map((comp) => (comp.id === editingCompany.id ? { ...comp, ...values } : comp))
      );
    } else {
      const newCompany = {
        id: companies.length + 1,
        ...values,
      };
      setCompanies((prev) => [...prev, newCompany]);
    }
    resetForm();
    closeModal();
  };

  return (
    <AuthenticatedLayout>
      <div className="p-4">
        {/* Header with Right-Aligned Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Company Registration & Profile Management</h2>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create New Company
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg shadow-lg relative">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {editingCompany ? 'Edit Company' : 'Create New Company'}
              </h3>

              <Formik
                enableReinitialize
                initialValues={
                  editingCompany || {
                    name: '',
                    products: '',
                    logo: '',
                    description: '',
                    contact: '',
                  }
                }
                validationSchema={CompanySchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    {['name', 'products', 'logo', 'description', 'contact'].map((field) => (
                      <div key={field}>
                        <label
                          htmlFor={field}
                          className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
                        >
                          {field === 'name'
                            ? 'Company Name'
                            : field === 'products'
                            ? 'Products / Services'
                            : field === 'logo'
                            ? 'Logo URL'
                            : field === 'description'
                            ? 'Description'
                            : 'Contact Info'}
                        </label>
                        <Field
                          name={field}
                          as={field === 'description' || field === 'contact' ? 'textarea' : 'input'}
                          rows={field === 'description' ? 3 : field === 'contact' ? 2 : undefined}
                          type="text"
                          className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                        />
                        <ErrorMessage
                          name={field}
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                    ))}

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Saving...' : editingCompany ? 'Update' : 'Save'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Company Name</th>
                <th className="px-6 py-3">Products / Services</th>
                <th className="px-6 py-3">Logo</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Contact Info</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr
                  key={company.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {company.name}
                  </td>
                  <td className="px-6 py-4">{company.products}</td>
                  <td className="px-6 py-4">
                    <img src={company.logo} alt="logo" className="h-8" />
                  </td>
                  <td className="px-6 py-4">{company.description}</td>
                  <td className="px-6 py-4 whitespace-pre-line">{company.contact}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openEditModal(company)}
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Edit
                    </button>
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

export default CompanyManagementPage;
