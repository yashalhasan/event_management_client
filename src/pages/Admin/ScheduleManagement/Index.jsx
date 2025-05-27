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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [newSchedule, setNewSchedule] = useState({
    time: '',
    session: '',
    speaker: '',
    topic: '',
    location: '',
  });

  const handleEdit = (id) => {
    alert(`Edit schedule ID: ${id}`);
  };

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newId = schedule.length > 0 ? Math.max(...schedule.map((s) => s.id)) + 1 : 1;
    setSchedule((prev) => [...prev, { id: newId, ...newSchedule }]);
    setNewSchedule({
      time: '',
      session: '',
      speaker: '',
      topic: '',
      location: '',
    });
    setIsCreateModalOpen(false);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Schedule Management</h1>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Schedule
          </button>
        </div>

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
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.time}</td>
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

        {/* Create Schedule Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Create New Schedule</h2>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label htmlFor="time" className="block mb-1 text-gray-700 dark:text-gray-300">Time Slot</label>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    value={newSchedule.time}
                    onChange={handleInputChange}
                    placeholder="e.g. 02:00 PM - 03:00 PM"
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="session" className="block mb-1 text-gray-700 dark:text-gray-300">Session</label>
                  <input
                    type="text"
                    id="session"
                    name="session"
                    value={newSchedule.session}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="speaker" className="block mb-1 text-gray-700 dark:text-gray-300">Speaker</label>
                  <input
                    type="text"
                    id="speaker"
                    name="speaker"
                    value={newSchedule.speaker}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="topic" className="block mb-1 text-gray-700 dark:text-gray-300">Topic</label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    value={newSchedule.topic}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block mb-1 text-gray-700 dark:text-gray-300">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={newSchedule.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Info text */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">You can create new time slots and update existing sessions from here.</p>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default ScheduleManagementIndex;
