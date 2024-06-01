import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 text-gray-800 overflow-hidden">
            {/* Background Circles */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="w-64 h-64 bg-blue-500 rounded-full absolute top-1/4 left-1/4 animate-bounce-slow"></div>
                <div className="w-48 h-48 bg-blue-300 rounded-full absolute top-3/4 left-3/4 animate-bounce-slow"></div>
                <div className="w-56 h-56 bg-blue-700 rounded-full absolute top-2/3 right-1/4 animate-bounce-slow"></div>
                {/* Additional Circles */}
                <div className="w-24 h-24 bg-blue-600 rounded-full absolute bottom-1/4 left-1/4 animate-bounce-slow"></div>
                <div className="w-40 h-40 bg-blue-300 rounded-full absolute bottom-1/2 right-1/4 animate-bounce-slow"></div>
            </div>
            {/* Logo */}
            <img src="../../public/vite.svg" alt="Logo" className="w-24 h-24 mb-8" />
            {/* 404 Text */}
            <h1 className="text-9xl font-extrabold mb-4 text-blue-600 animate-pulse">404</h1>
            {/* Description */}
            <p className="text-2xl mb-8">Unfortunately, the page you are looking for is not found</p>
            {/* Go Home Button */}
            <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-110">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
