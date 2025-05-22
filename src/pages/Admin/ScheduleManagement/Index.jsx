import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';

const mockSchedule = [
  {
    id: 1,
    time: '09:00 AM - 10:00 AM',
    session: 'Opening Ceremony',
    speaker: 'Dr. Ayesha Khan',
    topic: 'Welcome & Vision',
    location: 'Main Hall',
  },
  {
    id: 2,
    time: '10:15 AM - 11:15 AM',
    session: 'Tech Trends 2025',
    speaker: 'John Doe',
    topic: 'Future of AI',
    location: 'Conference Room A',
  },
  {
    id: 3,
    time: '11:30 AM - 12:30 PM',
    session: 'Green Energy Panel',
    speaker: 'Panel Discussion',
    topic: 'Sustainable Innovation',
    location: 'Conference Room B',
  },
];

const ScheduleManagementIndex = () => {
  const [schedule, setSchedule] = useState(mockSchedule);

  const handleEdit = (id) => {
    alert(`Edit schedule ID: ${id}`);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Schedule Management</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Time Slot</th>
                <th className="px-6 py-3">Session</th>
                <th className="px-6 py-3">Speaker</th>
                <th className="px-6 py-3">Topic</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {item.time}
                  </td>
                  <td className="px-6 py-4">{item.session}</td>
                  <td className="px-6 py-4">{item.speaker}</td>
                  <td className="px-6 py-4">{item.topic}</td>
                  <td className="px-6 py-4">{item.location}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Future improvement: Add schedule creation form/modal */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">You can create new time slots and update existing sessions from here.</p>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ScheduleManagementIndex;
