import React from 'react'
import AuthenticatedLayout from '../../layout/AuthenticatedLayout'



const ExhibitorHome = () => {
  // Dummy counts – replace with real data from props or API
  const stats = [
   
    { title: "Booth Management", count: 3, description: "Booth details updated" },
    { title: "Organizer Messages", count: 4, description: "Messages from event organizers" },
    { title: "Exhibitor Interactions", count: 5, description: "Chats or contacts with neighbors" },
  ]

  return (
    
    <AuthenticatedLayout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exhibitor Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{item.count}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
    </AuthenticatedLayout>
  )
}

export default ExhibitorHome
