import React from 'react'
import { useTheme } from '../../context/ThemeContext'

const OtherSettings = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Other Settings</h2>
            <label className="block mb-2">
                <span className="text-gray-700 dark:text-gray-400">Privacy</span>
                <select className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Friends Only</option>
                </select>
            </label>

            <label className="block mb-2">
                <span className="text-gray-700 dark:text-gray-400">Language</span>
                <select className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese</option>
                </select>
            </label>

            {/* Date Format */}
            <label className="block mb-2">
                <span className="text-gray-700 dark:text-gray-400">Date Format</span>
                <select className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY/MM/DD</option>
                </select>
            </label>

            {/* Backup Frequency */}
            <label className="block mb-2">
                <span className="text-gray-700 dark:text-gray-400">Backup Frequency</span>
                <select className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                </select>
            </label>

            <div className="mt-6 flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-400 text-lg font-medium">Theme</span>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="theme"
                            className="sr-only peer"
                            onChange={() => toggleTheme()}
                            checked={theme === 'light'}
                        />
                        <div
                            className={`w-16 h-8 rounded-full border-2 ${theme === 'light' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600'
                                } flex items-center justify-center`}
                        >
                            <span className="text-sm font-medium">Light</span>
                        </div>
                    </label>

                    <label className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="theme"
                            className="sr-only peer"
                            onChange={() => toggleTheme()}
                            checked={theme === 'dark'}
                        />
                        <div
                            className={`w-16 h-8 rounded-full border-2 ${theme === 'dark' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600'
                                } flex items-center justify-center`}
                        >
                            <span className="text-sm font-medium">Dark</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default OtherSettings