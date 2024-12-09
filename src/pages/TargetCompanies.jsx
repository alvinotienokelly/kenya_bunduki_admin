import React, { useEffect, useState } from 'react';
import Layout from '../elements/Layout';
import { getUsersByType } from '../services/api_service';
import toast from 'react-hot-toast';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { FaXTwitter } from 'react-icons/fa6';

const TargetCompanies = () => {
    const [companies, setCompanies] = useState([]);

    const getCompanies = async () => {
        try {
            const data = await getUsersByType('Target Company');
            setCompanies(data.users);
        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch companies');
        }
    };

    useEffect(() => {
        getCompanies();
    }, []);

    return (
        <Layout title="Target Companies">
            <div className="mt-4">

                {companies.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {companies.map((user) => {
                            const sectors = Array.isArray(user.preference_sector)
                                ? user.preference_sector
                                : JSON.parse(user.preference_sector || "[]");

                            const regions = Array.isArray(user.preference_region)
                                ? user.preference_region
                                : JSON.parse(user.preference_region || "[]");

                            return (
                                <div
                                    key={user.id}
                                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg dark:border dark:border-gray-700 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3 h-full">
                                        <img
                                            src={
                                                user.profile_image
                                                    ? user.profile_image
                                                    : 'https://via.placeholder.com/150'
                                            }
                                            alt={`${user.name}'s profile`}
                                            className="w-16 h-16 rounded-full object-cover border dark:border-gray-600"
                                        />
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-primary dark:text-white text-[19px] mb-2">
                                                {user.name}
                                            </p>
                                            <div className="flex items-center gap-2 text-white">
                                                <FaFacebookF className="bg-blue-600 rounded-full p-2" size={28} />
                                                <FaXTwitter className="bg-black rounded-full p-2" size={28} />
                                                <FaLinkedinIn className="bg-blue-500 rounded-full p-2" size={28} />
                                                <FaInstagram className="bg-pink-500 rounded-full p-2" size={28} />
                                                <FaYoutube className="bg-red-500 rounded-full p-2" size={28} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex border-l px-6 h-full border-gray-300 dark:border-gray-600 flex-col items-center justify-center">
                                        <p className="font-medium text-[18px]">Sector focus</p>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {sectors.map((sector, index) => (
                                                <p
                                                    key={index}
                                                    className="bg-gray-200 dark:bg-gray-600 rounded-md font-medium text-[15px] mt-2 dark:text-white px-4 py-0.5 text-primary"
                                                >
                                                    {sector}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex border-l px-6 h-full border-gray-300 dark:border-gray-600 flex-col items-center justify-center">
                                        <p className="font-medium text-[18px]">Geography focus</p>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {regions.map((region, index) => (
                                                <p
                                                    key={index}
                                                    className="bg-gray-200 dark:bg-gray-600 rounded-md font-medium text-[15px] mt-2 dark:text-white px-4 py-0.5 text-primary"
                                                >
                                                    {region}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex border-l px-6 gap-2 h-full border-gray-300 dark:border-gray-600 flex-col items-center justify-center">
                                        <button className="bg-primary text-white px-6 py-1 flex items-center gap-2 text-[14px] rounded-md">
                                            <IoMdAdd />
                                            Add to CRM
                                        </button>
                                        <button className="bg-white hover:bg-gray-300 dark:bg-gray-600 dark:text-white text-primary px-6 py-1 flex items-center gap-2 text-[14px] rounded-md">
                                            <IoMdAdd />
                                            Add Review
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No target companies found.</p>
                )}

            </div>
        </Layout>
    );
};

export default TargetCompanies;
