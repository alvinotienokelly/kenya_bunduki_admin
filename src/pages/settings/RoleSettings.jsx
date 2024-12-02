import React from 'react'

const RoleSettings = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">User Roles</h2>
            <label className="block mb-2">
                <span className="text-gray-700 dark:text-gray-400">Assign Role</span>
                <select className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white">
                    <option>Admin</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                </select>
            </label>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500">
                Save Roles
            </button>
        </div>
    )
}

export default RoleSettings