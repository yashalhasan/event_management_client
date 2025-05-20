import React from 'react'
import { Link } from 'react-router-dom'
import GuestLayout from '../layout/GuestLayout'

const Register = () => {
  return (
    <GuestLayout enable_btn={false}>
    <section class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
  <div class="w-full max-w-sm px-6 py-8 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700 mt-4">
    <a href="#" class="flex justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
      Flowbite
    </a>
    <h1 class="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">
      Create an account
    </h1>
    <form class="space-y-4" action="#">
      <div>
        <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" name="email" id="email" placeholder="name@company.com"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      <div>
        <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" name="password" id="password" placeholder="••••••••"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      <div>
        <label for="confirm-password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
        <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      <div class="flex items-start">
        <input id="terms" type="checkbox"
          class="w-4 h-4 text-blue-600 border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600" required />
        <label for="terms" class="ml-2 text-sm font-light text-gray-500 dark:text-gray-300">
          I accept the <a class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and Conditions</a>
        </label>
      </div>
      <button type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-5 py-2.5 text-center focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
        Create an account
      </button>
      <p class="text-sm font-light text-center text-gray-500 dark:text-gray-400">
        Already have an account?
        <Link to="/" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</Link>
      </p>
    </form>
  </div>
</section>
</GuestLayout>
  )
}

export default Register