import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AnalyticsAndReportingIndex = () => {
  const [analyticsData, setAnalyticsData] = useState([
    {
      id: 1,
      session: 'Opening Keynote',
      attendees: 320,
      boothTraffic: 150,
      engagementScore: 85,
    },
    {
      id: 2,
      session: 'AI in Healthcare',
      attendees: 180,
      boothTraffic: 95,
      engagementScore: 72,
    },
    {
      id: 3,
      session: 'Green Tech Innovations',
      attendees: 210,
      boothTraffic: 120,
      engagementScore: 78,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null); // null = creating new

  const validationSchema = Yup.object({
    session: Yup.string().required('Session name is required'),
    attendees: Yup.number()
      .required('Attendees count is required')
      .min(0, 'Cannot be negative'),
    boothTraffic: Yup.number()
      .required('Booth traffic is required')
      .min(0, 'Cannot be negative'),
    engagementScore: Yup.number()
      .required('Engagement score is required')
      .min(0, 'Cannot be negative')
      .max(100, 'Score cannot exceed 100'),
  });

  const formik = useFormik({
    enableReinitialize: true, // important for editing
    initialValues: editingSession || {
      session: '',
      attendees: '',
      boothTraffic: '',
      engagementScore: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (editingSession) {
        // Update existing entry
        setAnalyticsData((prev) =>
          prev.map((item) =>
            item.id === editingSession.id ? { ...item, ...values, attendees: Number(values.attendees), boothTraffic: Number(values.boothTraffic), engagementScore: Number(values.engagementScore) } : item
          )
        );
      } else {
        // Add new entry
        const newEntry = {
          id: analyticsData.length + 1,
          ...values,
          attendees: Number(values.attendees),
          boothTraffic: Number(values.boothTraffic),
          engagementScore: Number(values.engagementScore),
        };
        setAnalyticsData((prev) => [...prev, newEntry]);
      }
      setIsModalOpen(false);
      setEditingSession(null);
    },
  });

  const openCreateModal = () => {
    setEditingSession(null);
    setIsModalOpen(true);
  };

  const openEditModal = (session) => {
    setEditingSession(session);
    setIsModalOpen(true);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        {/* Header with Create Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Analytics & Reporting</h1>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Create
          </button>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Session Name</th>
                <th className="px-6 py-3">Attendees</th>
                <th className="px-6 py-3">Booth Traffic</th>
                <th className="px-6 py-3">Engagement Score</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.map((data) => (
                <tr
                  key={data.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{data.session}</td>
                  <td className="px-6 py-4">{data.attendees}</td>
                  <td className="px-6 py-4">{data.boothTraffic}</td>
                  <td className="px-6 py-4">{data.engagementScore} / 100</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(data)}
                      className="text-yellow-500 hover:underline"
                    >
                      Edit
                    </button>
                    <a href="#" className="text-blue-600 hover:underline">View Report</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {editingSession ? 'Edit Session' : 'Create New Session'}
              </h2>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Session Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Session Name
                  </label>
                  <input
                    type="text"
                    name="session"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.session}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {formik.touched.session && formik.errors.session && (
                    <p className="text-red-500 text-sm">{formik.errors.session}</p>
                  )}
                </div>

                {/* Attendees */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Attendees
                  </label>
                  <input
                    type="number"
                    name="attendees"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.attendees}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {formik.touched.attendees && formik.errors.attendees && (
                    <p className="text-red-500 text-sm">{formik.errors.attendees}</p>
                  )}
                </div>

                {/* Booth Traffic */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Booth Traffic
                  </label>
                  <input
                    type="number"
                    name="boothTraffic"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.boothTraffic}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {formik.touched.boothTraffic && formik.errors.boothTraffic && (
                    <p className="text-red-500 text-sm">{formik.errors.boothTraffic}</p>
                  )}
                </div>

                {/* Engagement Score */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Engagement Score
                  </label>
                  <input
                    type="number"
                    name="engagementScore"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.engagementScore}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {formik.touched.engagementScore && formik.errors.engagementScore && (
                    <p className="text-red-500 text-sm">{formik.errors.engagementScore}</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingSession(null);
                    }}
                    className="px-4 py-2 border rounded text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    {editingSession ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Placeholder */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Real-Time Expo Performance</h2>
          <p className="text-gray-500">Live analytics dashboard coming soon...</p>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AnalyticsAndReportingIndex;
