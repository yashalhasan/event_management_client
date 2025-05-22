import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';

const mockSessions = [
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

const ScheduleManagementAttendeeIndex = () => {
  const [bookmarked, setBookmarked] = useState([]);

  const toggleBookmark = (id) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter((item) => item !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Attendee Schedule Management</h1>

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
              {mockSessions.map((session) => (
                <tr
                  key={session.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {session.title}
                  </td>
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
