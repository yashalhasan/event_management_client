import React from 'react'

const HomeCard = () => {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
 
  <a href="#" class="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Total : Attendee
    </h5>
    <p class="font-normal text-gray-700 dark:text-gray-400 text-2xl font-bold">
    100 
    </p>
  </a>


  <a href="#" class="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    Total : Exhibitor
    </h5>
    <p class="font-normal text-gray-700 dark:text-gray-400 text-2xl font-bold">
      200
    </p>
  </a>


  <a href="#" class="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    Total : Booking
    </h5>
    <p class="font-normal text-gray-700 dark:text-gray-400 text-2xl font-bold">
      200
    </p>
  </a>

 
  <a href="#" class="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    Total : Users
    </h5>
    <p class="font-normal text-gray-700 dark:text-gray-400 text-2xl font-bold">
      500
    </p>
  </a>
</div>

  )
}

export default HomeCard