import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialMessages = [
  {
    id: 1,
    from: 'Ravi (Exhibitor)',
    to: 'Alisha (Attendee)',
    subject: 'Product Inquiry',
    message: 'Can you provide more details about your product?',
    date: 'May 21, 2025',
  },
  {
    id: 2,
    from: 'Event Support',
    to: 'Bright Displays',
    subject: 'Booth Setup Assistance',
    message: 'We will assist you with the booth setup on May 23.',
    date: 'May 20, 2025',
  },
];

const validationSchema = Yup.object({
  from: Yup.string().required('Sender is required'),
  to: Yup.string().required('Recipient is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message body is required'),
});

const CommunicationIndex = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [showModal, setShowModal] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);

  const openCreateModal = () => {
    setEditingMessage(null);
    setShowModal(true);
  };

  const openEditModal = (msg) => {
    setEditingMessage(msg);
    setShowModal(true);
  };

  const closeModal = () => {
    formik.resetForm();
    setEditingMessage(null);
    setShowModal(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editingMessage || {
      from: '',
      to: '',
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (editingMessage) {
        // Update existing message
        const updatedMessages = messages.map((msg) =>
          msg.id === editingMessage.id ? { ...msg, ...values } : msg
        );
        setMessages(updatedMessages);
      } else {
        // Create new message
        const newMessage = {
          id: messages.length + 1,
          ...values,
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        };
        setMessages([newMessage, ...messages]);
      }
      resetForm();
      setEditingMessage(null);
      setShowModal(false);
    },
  });

  return (
    <AuthenticatedLayout>
      <div className="p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Communication Center</h2>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Compose Message
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                {editingMessage ? 'Edit Message' : 'Compose Message'}
              </h3>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {[
                  { label: 'From', name: 'from' },
                  { label: 'To', name: 'to' },
                  { label: 'Subject', name: 'subject' },
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-red-500 text-sm">{formik.errors.message}</p>
                  )}
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
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    {editingMessage ? 'Update' : 'Send'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Messages Table */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr
                key={msg.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{msg.from}</td>
                <td className="px-6 py-4">{msg.to}</td>
                <td className="px-6 py-4">{msg.subject}</td>
                <td className="px-6 py-4">{msg.date}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openEditModal(msg)}
                    className="text-green-600 dark:text-green-400 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
                    View
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

export default CommunicationIndex;
