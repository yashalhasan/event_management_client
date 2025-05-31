import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';  // Ensure you have this layout component
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Initial dummy data for companies
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

// Yup validation schema for form validation
const CompanySchema = Yup.object().shape({
  name: Yup.string().required('Company Name is required'),
  products: Yup.string().required('Products / Services are required'),
  logo: Yup.string().url('Invalid URL format').required('Logo URL is required'),
  description: Yup.string().required('Description is required'),
  contact: Yup.string().required('Contact Info is required'),
});

const RegistrationAndProfileManagementIndex = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCompany = (values, { resetForm }) => {
    const newCompany = {
      id: companies.length + 1,
      name: values.name,
      products: values.products,
      logo: values.logo,
      description: values.description,
      contact: values.contact,
    };
    setCompanies([...companies, newCompany]);
    resetForm();
    setIsModalOpen(false);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Company
        </button>

        {/* Modal for adding new company */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg shadow-lg relative">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create New Company</h3>

              <Formik
                initialValues={{
                  name: '',
                  products: '',
                  logo: '',
                  description: '',
                  contact: '',
                }}
                validationSchema={CompanySchema}
                onSubmit={handleAddCompany}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                        Company Name
                      </label>
                      <Field
                        name="name"
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label htmlFor="products" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                        Products / Services
                      </label>
                      <Field
                        name="products"
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                      />
                      <ErrorMessage
                        name="products"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label htmlFor="logo" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                        Logo URL
                      </label>
                      <Field
                        name="logo"
                        type="url"
                        className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                      />
                      <ErrorMessage
                        name="logo"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                        Description
                      </label>
                      <Field
                        name="description"
                        as="textarea"
                        rows="3"
                        className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                        Contact Info
                      </label>
                      <Field
                        name="contact"
                        as="textarea"
                        rows="2"
                        className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                      />
                      <ErrorMessage
                        name="contact"
                        component="div"
                        className="text-red-600 text-sm mt-1"
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}

        {/* Companies table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Company Name</th>
                <th scope="col" className="px-6 py-3">Products / Services</th>
                <th scope="col" className="px-6 py-3">Logo</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Contact Info</th>
                <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr
                  key={company.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{company.name}</td>
                  <td className="px-6 py-4">{company.products}</td>
                  <td className="px-6 py-4">
                    <img src={company.logo} alt={`${company.name} Logo`} className="h-8 w-auto" />
                  </td>
                  <td className="px-6 py-4">{company.description}</td>
                  <td className="px-6 py-4 whitespace-pre-line">{company.contact}</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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

export default RegistrationAndProfileManagementIndex;
