import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-red-500 mb-4">Error 404!</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-8">Page not found.</h2>
                <Link to="/" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Go back to Homepage</Link>
            </div>
        </div>
    );
};

export default NotFound;
