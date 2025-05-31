import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialSessions = [
  {
    id: 1,
    title: 'Opening Keynote: The Future of Tech',
    speaker: 'Dr. Ayesha Khan',
    time: '9:00 AM - 10:00 AM',
    location: 'Main Hall',
  },
  {
    id: 2,
    title: 'AI in Healthcare',
    speaker: 'Dr. Omar Siddiqui',
    time: '10:30 AM - 11:30 AM',
    location: 'Room 2B',
  },
  {
    id: 3,
    title: 'Green Energy Workshop',
    speaker: 'Sara Ahmed',
    time: '1:00 PM - 2:30 PM',
    location: 'Conference Room A',
  },
];

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  speaker: Yup.string().required('Speaker is required'),
  time: Yup.string().required('Time is required'),
  location: Yup.string().required('Location is required'),
});

const ScheduleManagementAttendeeIndex = () => {
  const [sessions, setSessions] = useState(initialSessions);
  const [bookmarked, setBookmarked] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleBookmark = (id) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter((item) => item !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      speaker: '',
      time: '',
      location: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newSession = {
        id: sessions.length + 1,
        ...values,
      };
      setSessions([...sessions, newSession]);
      resetForm();
      setShowModal(false);
    },
  });

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Attendee Schedule Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Session
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-xl relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Create Session</h2>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {[
                  { label: 'Session Title', name: 'title', type: 'text' },
                  { label: 'Speaker', name: 'speaker', type: 'text' },
                  { label: 'Time', name: 'time', type: 'text' },
                  { label: 'Location', name: 'location', type: 'text' },
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

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Session Title</th>
                <th className="px-6 py-3">Speaker</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr
                  key={session.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{session.title}</td>
                  <td className="px-6 py-4">{session.speaker}</td>
                  <td className="px-6 py-4">{session.time}</td>
                  <td className="px-6 py-4">{session.location}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => alert('Registered for session!')}
                    >
                      Register
                    </button>
                    <button
                      onClick={() => toggleBookmark(session.id)}
                      className={`${
                        bookmarked.includes(session.id)
                          ? 'text-yellow-500'
                          : 'text-gray-500'
                      } hover:underline`}
                    >
                      {bookmarked.includes(session.id) ? 'Bookmarked' : 'Bookmark'}
                    </button>
                    <button
                      onClick={() => alert('Reminder set!')}
                      className="text-green-600 hover:underline"
                    >
                      Notify Me
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

export default ScheduleManagementAttendeeIndex;
