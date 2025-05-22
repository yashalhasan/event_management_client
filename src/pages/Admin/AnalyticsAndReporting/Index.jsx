import React from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';

const analyticsData = [
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
];

const AnalyticsAndReportingIndex = () => {
  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Analytics & Reporting</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Session Name</th>
                <th className="px-6 py-3">Attendees</th>
                <th className="px-6 py-3">Booth Traffic</th>
                <th className="px-6 py-3">Engagement Score</th>
                <th className="px-6 py-3 text-right">Details</th>
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
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="text-blue-600 hover:underline">View Report</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Placeholder for future real-time analytics */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Real-Time Expo Performance</h2>
          <p className="text-gray-500">Live analytics dashboard coming soon...</p>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AnalyticsAndReportingIndex;
