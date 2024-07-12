import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const SafetyGuideline = () => {
  const safetyTopics = [
    {
      title: 'Verify Driver Information',
      content: 'Always verify the driver\'s information before getting into the car. Check the driver’s name, photo, and license plate number to ensure they match the details provided by the ride-sharing app. If something doesn’t match, do not get in the car and report the issue to the app immediately.'
    },
    {
      title: 'Share Trip Details',
      content: 'Share your trip details with a trusted friend or family member. Most ride-sharing apps have a feature that allows you to share your ride’s progress in real-time. This ensures that someone you trust knows your whereabouts and can track your journey.'
    },
    {
      title: 'Meet in Public Locations',
      content: 'When waiting for your ride, choose a well-lit, public location with plenty of people around. Avoid isolated or dark areas, especially late at night. Public locations enhance your safety and make it easier to get help if needed.'
    },
    {
      title: 'Buckle Up',
      content: 'Always wear your seatbelt, regardless of where you are sitting in the car. Seatbelts save lives and reduce the risk of injury in case of an accident. Ensure all passengers are buckled up before the trip begins.'
    },
    {
      title: 'Stay Alert',
      content: 'Stay aware of your surroundings throughout the trip. Avoid distractions such as using your phone excessively. If you feel uncomfortable or notice anything suspicious, trust your instincts and take necessary actions, such as asking the driver to pull over or contacting emergency services.'
    }
  ];

  return (
    <div className="safety-guidelines-page bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Safety Guidelines</h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {safetyTopics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FiCheckCircle className="text-green-500 w-8 h-8 flex-shrink-0" />
                  <h2 className="text-lg font-semibold ml-3">{topic.title}</h2>
                </div>
                <p className="text-base text-gray-700 leading-relaxed">{topic.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors duration-300 shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuideline;
