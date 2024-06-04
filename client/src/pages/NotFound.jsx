import React from 'react';
import { Link } from 'react-router-dom';
import { notFound } from '../assets';
import NavbarSettings from '../components/NavbarSettings';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Navbar */}
      <NavbarSettings />

      {/* Main content */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center py-8">
        {/* Left section with image */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img
            src={notFound}
            alt="Page Not Found"
            className="w-full md:max-w-md mx-auto"
          />
        </div>

        {/* Right section with description */}
        <div className="md:w-1/2 px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
          <p className="text-lg text-gray-700 mb-4">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <p className="text-lg text-gray-700 mb-4">Please try the following:</p>
          <ul className="text-lg text-gray-700 mb-4">
            <li className="mb-2">
              <Link to="/" className="text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-300">Go to Home Page</Link>
            </li>
            <li className="mb-2">Check your URL for typos</li>
            <li className="mb-2">Contact the website administrator</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
