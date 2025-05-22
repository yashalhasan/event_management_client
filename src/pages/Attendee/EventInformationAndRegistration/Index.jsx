import React from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';

const eventData = [
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

const EventInformationAndRegistrationIndex = () => {
  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Event Information & Registration</h1>

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
                    <button className="text-green-600 hover:underline">View</button>
                    <button className="text-blue-600 hover:underline">Register</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Future feature: Modal for registration */}
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
