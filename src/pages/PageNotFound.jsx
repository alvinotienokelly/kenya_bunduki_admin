import React from 'react';
import logo from '../assets/noble_capital_logo.svg';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <header className="flex justify-center py-6">
                <img
                    src={logo}
                    alt="Nobble Capital Logo"
                    className="h-14 w-auto drop-shadow-md dark:drop-shadow-none"
                />
            </header>

            <main className="flex-grow flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 w-[90%] md:w-[45%] text-center">
                    <h1 className="text-8xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-5">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        The page you’re looking for doesn’t exist or has been moved to a different location. Let’s
                        get you back on track with our innovative investment solutions.
                    </p>
                    <button
                        onClick={handleGoHome}
                        className="px-8 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition duration-300 font-semibold text-[15px] shadow-lg"
                    >
                        Back to Homepage
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 mt-auto bg-gradient-to-br from-indigo-50 via-white to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 shadow-t">
                <div className="flex flex-col items-center space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} Noblestride Capital. All rights
                        reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a
                            href="/company/privacy-policy"
                            className="hover:underline text-indigo-500 dark:text-indigo-400 font-medium"
                        >
                            Privacy Policy
                        </a>
                        <span>|</span>
                        <a
                            href="/company/terms-of-service"
                            className="hover:underline text-indigo-500 dark:text-indigo-400 font-medium"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PageNotFound;
