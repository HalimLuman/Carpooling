import React from 'react';
import { FaHandHoldingHeart, FaShieldAlt, FaGavel, FaStar, FaUsers, FaCar, FaExclamationTriangle, FaSyncAlt } from 'react-icons/fa';

const SafetyGuideline = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-n-8">Safety and Respect for All</h1>
        </div>
        <div className="flex flex-col gap-10">
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaHandHoldingHeart className="mr-2 text-red-600" /> Respect Each Other
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Treat everyone with respect: This includes no discrimination based on race, religion, nationality, disability, sexual orientation, sex, marital status, gender identity, age, or any other characteristic.
            </p>
            <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed space-y-2">
              <li>No physical contact with strangers or anyone during the trip.</li>
              <li>Threatening, aggressive, or inappropriate behavior is not tolerated.</li>
              <li>Avoid any form of contact between riders and drivers/delivery people after the trip ends unless necessary.</li>
            </ul>
          </div>
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaShieldAlt className="mr-2 text-blue-600" /> Safety at the Heart of the Experience
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Follow all relevant laws, including traffic regulations and the rules of the road.
            </p>
            <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed space-y-2">
              <li>Be mindful of all road users, including cyclists and pedestrians.</li>
              <li>Drivers should maintain their vehicles in a condition that meets industry safety standards.</li>
              <li>Keep personal information secure and confidential.</li>
            </ul>
          </div>
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaGavel className="mr-2 text-green-600" /> Follow the Law
            </h2>
            <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed space-y-2">
              <li>Uber has a strict no drugs or alcohol policy.</li>
              <li>Uber prohibits riders and drivers from carrying firearms while using the app, to the extent permitted by applicable law.</li>
              <li>Engaging in fraudulent activities or illegal behavior is prohibited.</li>
            </ul>
          </div>
          {/* Add more guidelines here */}
        </div>
      </div>
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Our Commitment to Safety</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center text-white">
              <FaShieldAlt className="text-5xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-lg">We prioritize safety in every aspect of our service.</p>
            </div>
            <div className="flex flex-col items-center text-center text-white">
              <FaGavel className="text-5xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Legal Compliance</h3>
              <p className="text-lg">We adhere to all laws and regulations to ensure a lawful service.</p>
            </div>
            <div className="flex flex-col items-center text-center text-white">
              <FaStar className="text-5xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
              <p className="text-lg">We strive to provide a high-quality experience for all users.</p>
            </div>
            <div className="flex flex-col items-center text-center text-white">
              <FaUsers className="text-5xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Focus</h3>
              <p className="text-lg">We build a supportive community where everyone feels welcome.</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>© 2024 SafetyCo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SafetyGuideline;
