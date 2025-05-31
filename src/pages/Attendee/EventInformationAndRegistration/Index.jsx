import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialEvents = [
  {
    id: 1,
    name: 'Tech Expo 2025',
    date: '2025-08-15',
    location: 'Expo Center, Karachi',
    sessions: 12,
    exhibitors: 45,
    floorPlan: 'Hall A & B',
  },
  {
    id: 2,
    name: 'Startup Innovation Day',
    date: '2025-09-05',
    location: 'NEST I/O, Karachi',
    sessions: 8,
    exhibitors: 20,
    floorPlan: 'Main Auditorium',
  },
];

const validationSchema = Yup.object({
  name: Yup.string().required('Event name is required'),
  date: Yup.string().required('Date is required'),
  location: Yup.string().required('Location is required'),
  sessions: Yup.number().min(0, 'Must be at least 0').required('Sessions count is required'),
  exhibitors: Yup.number().min(0, 'Must be at least 0').required('Exhibitors count is required'),
  floorPlan: Yup.string().required('Floor plan is required'),
});

const EventInformationAndRegistrationIndex = () => {
  const [eventData, setEventData] = useState(initialEvents);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // For edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

  // Create formik
  const createFormik = useFormik({
    initialValues: {
      name: '',
      date: '',
      location: '',
      sessions: '',
      exhibitors: '',
      floorPlan: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newEvent = {
        id: eventData.length > 0 ? Math.max(...eventData.map(e => e.id)) + 1 : 1,
        ...values,
      };
      setEventData([...eventData, newEvent]);
      resetForm();
      setShowCreateModal(false);
    },
  });

  // Edit formik with enableReinitialize for loading selected event data
  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: editingEventId
      ? eventData.find((e) => e.id === editingEventId) || {
          name: '',
          date: '',
          location: '',
          sessions: '',
          exhibitors: '',
          floorPlan: '',
        }
      : {
          name: '',
          date: '',
          location: '',
          sessions: '',
          exhibitors: '',
          floorPlan: '',
        },
    validationSchema,
    onSubmit: (values) => {
      setEventData((prevEvents) =>
        prevEvents.map((event) =>
          event.id === editingEventId ? { ...event, ...values } : event
        )
      );
      setShowEditModal(false);
      setEditingEventId(null);
    },
  });

  // Open edit modal with event id
  const handleEditClick = (id) => {
    setEditingEventId(id);
    setShowEditModal(true);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Event Information & Registration</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Event
          </button>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-xl relative">
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Create Event</h2>
              <form onSubmit={createFormik.handleSubmit} className="space-y-4">
                {[
                  { label: 'Event Name', name: 'name', type: 'text' },
                  { label: 'Date', name: 'date', type: 'date' },
                  { label: 'Location', name: 'location', type: 'text' },
                  { label: 'Sessions', name: 'sessions', type: 'number' },
                  { label: 'Exhibitors', name: 'exhibitors', type: 'number' },
                  { label: 'Floor Plan', name: 'floorPlan', type: 'text' },
                ].map(({ label, name, type }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={createFormik.values[name]}
                      onChange={createFormik.handleChange}
                      onBlur={createFormik.handleBlur}
                      className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {createFormik.touched[name] && createFormik.errors[name] && (
                      <p className="text-red-500 text-sm">{createFormik.errors[name]}</p>
                    )}
                  </div>
                ))}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
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

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-xl relative">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingEventId(null);
                  editFormik.resetForm();
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Edit Event</h2>
              <form onSubmit={editFormik.handleSubmit} className="space-y-4">
                {[
                  { label: 'Event Name', name: 'name', type: 'text' },
                  { label: 'Date', name: 'date', type: 'date' },
                  { label: 'Location', name: 'location', type: 'text' },
                  { label: 'Sessions', name: 'sessions', type: 'number' },
                  { label: 'Exhibitors', name: 'exhibitors', type: 'number' },
                  { label: 'Floor Plan', name: 'floorPlan', type: 'text' },
                ].map(({ label, name, type }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={editFormik.values[name]}
                      onChange={editFormik.handleChange}
                      onBlur={editFormik.handleBlur}
                      className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {editFormik.touched[name] && editFormik.errors[name] && (
                      <p className="text-red-500 text-sm">{editFormik.errors[name]}</p>
                    )}
                  </div>
                ))}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingEventId(null);
                      editFormik.resetForm();
                    }}
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Event Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Event Name</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Sessions</th>
                <th className="px-6 py-3">Exhibitors</th>
                <th className="px-6 py-3">Floor Plan</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {eventData.map((event) => (
                <tr
                  key={event.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{event.name}</td>
                  <td className="px-6 py-4">{event.date}</td>
                  <td className="px-6 py-4">{event.location}</td>
                  <td className="px-6 py-4">{event.sessions}</td>
                  <td className="px-6 py-4">{event.exhibitors}</td>
                  <td className="px-6 py-4">{event.floorPlan}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEditClick(event.id)}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button className="text-green-600 hover:underline">View</button>
                    <button className="text-blue-600 hover:underline">Register</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Click "Register" to enroll in events, sessions, or workshops.
          </p>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default EventInformationAndRegistrationIndex;
