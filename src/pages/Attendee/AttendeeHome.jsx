import React from 'react';
import AuthenticatedLayout from '../../layout/AuthenticatedLayout';

const AttendeeHome = () => {
  // Dummy data (replace with actual counts from backend if needed)
  const eventCount = 5;
  const exhibitorCount = 12;
  const sessionCount = 9;

  const cards = [
    {
      title: 'Event Information & Registration',
      count: `${eventCount} Events`,
      description:
        'Access schedule, exhibitor list, floor plans. Register for events, sessions, or workshops.',
      link: '/attendee/event-info',
    },
    {
      title: 'Exhibitor Search & Interaction',
      count: `${exhibitorCount} Exhibitors`,
      description:
        'Search and filter exhibitors, view profiles, booths, and contact them for inquiries.',
      link: '/attendee/exhibitor-search',
    },
    {
      title: 'Schedule Management',
      count: `${sessionCount} Sessions`,
      description:
        'Browse sessions and workshops, bookmark or register, and get session reminders.',
      link: '/attendee/schedule',
    },
  ];

  return (
    <AuthenticatedLayout>    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, Attendee!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{card.description}</p>
            <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4">{card.count}</p>
            <a
              href={card.link}
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </div>
    </AuthenticatedLayout>

  );
};

export default AttendeeHome;
