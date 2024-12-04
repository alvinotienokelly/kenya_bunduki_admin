import React, { useState } from 'react'

const GeneralSettings = () => {
    const [systemTitle, setSystemTitle] = useState("");
    const [timezone, setTimezone] = useState("GMT");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [address, setAddress] = useState("");
    const [logo, setLogo] = useState(null);

    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            systemTitle,
            timezone,
            telephone,
            email,
            country,
            city,
            location,
            address,
            logo,
        };
        console.log("Form submitted with data:", formData);
    };
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">General Settings</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block mb-2">
                            <span className="text-gray-700 dark:text-gray-400">System Title</span>
                            <input
                                type="text"
                                className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                                value={systemTitle}
                                onChange={(e) => setSystemTitle(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="col-span-1">
                        <label className="block mb-2">
                            <span className="text-gray-700 dark:text-gray-400">Timezone</span>
                            <select
                                className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                                value={timezone}
                                onChange={(e) => setTimezone(e.target.value)}
                            >
                                <option>GMT</option>
                                <option>EST</option>
                                <option>PST</option>
                                <option>CST</option>
                                <option>UTC</option>
                            </select>
                        </label>
                    </div>
                    <div className="col-span-1">
                        <label className="block mb-2">
                            <span className="text-gray-700 dark:text-gray-400">Telephone</span>
                            <input
                                type="text"
                                className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2">
                            <span className="text-gray-700 dark:text-gray-400">Email</span>
                            <input
                                type="email"
                                className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="col-span-1">
                        <label className="block mb-2">
                            <span className="text-gray-700 dark:text-gray-400">Country</span>
                            <input
                                type="text"
                                className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="col-span-1">
                        <label className="block mb-2">
                            <span className="text-gray-700 dark:text-gray-400">City</span>
                            <input
                                type="text"
                                className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="col-span-1">
                        <label className="block mb-2">
                            <span className="text-gray-700 dark:text-gray-400">Location</span>
                            <input
                                type="text"
                                className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="col-span-1">
                        <label className="block mb-2">
                            <span className="text-gray-700 dark:text-gray-400">Address</span>
                            <input
                                type="text"
                                className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2">
                            <span className="text-gray-700 dark:text-gray-400">System Logo</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="block w-full mt-1 p-2 border rounded-md dark:border-gray-600 focus:outline-none focus:border-primary text-primary dark:bg-gray-700 dark:text-white"
                                onChange={handleLogoChange}
                            />
                        </label>
                    </div>
                    <div className="col-span-2 text-right">
                        <button type="submit" className="px-6 py-1.5 bg-primary text-white rounded hover:bg-gray-800 dark:bg-primary dark:hover:bg-gray-700">
                            Save Settings
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default GeneralSettings