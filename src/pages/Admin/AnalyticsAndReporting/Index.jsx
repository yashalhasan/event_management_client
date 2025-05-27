import React, { useState } from 'react';
import AuthenticatedLayout from '../../../layout/AuthenticatedLayout';

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
  const [formData, setFormData] = useState({
    session: '',
    attendees: '',
    boothTraffic: '',
    engagementScore: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: analyticsData.length + 1,
      session: formData.session,
      attendees: parseInt(formData.attendees),
      boothTraffic: parseInt(formData.boothTraffic),
      engagementScore: parseInt(formData.engagementScore),
    };
    console.log('📦 Created Entry:', newEntry);
    setAnalyticsData([...analyticsData, newEntry]);
    setFormData({ session: '', attendees: '', boothTraffic: '', engagementScore: '' });
    setIsModalOpen(false);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        {/* Header with Create Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Analytics & Reporting</h1>
          <button
            onClick={() => setIsModalOpen(true)}
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

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Create New Session</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Session Name</label>
                  <input
                    type="text"
                    name="session"
                    value={formData.session}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Attendees</label>
                  <input
                    type="number"
                    name="attendees"
                    value={formData.attendees}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Booth Traffic</label>
                  <input
                    type="number"
                    name="boothTraffic"
                    value={formData.boothTraffic}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Engagement Score</label>
                  <input
                    type="number"
                    name="engagementScore"
                    value={formData.engagementScore}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Create
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
