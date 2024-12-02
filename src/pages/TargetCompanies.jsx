import React, { useEffect, useState } from 'react';
import Layout from '../elements/Layout';
import { getUsersByType } from '../services/api_service';
import toast from 'react-hot-toast';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
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
                        {companies.map((company) => (
                            <div
                                key={company.id}
                                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg dark:border dark:border-gray-700 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3 h-full">
                                    <img
                                        src={
                                            company.profile_image
                                                ? company.profile_image
                                                : 'https://via.placeholder.com/150'
                                        }
                                        alt={`${company.name}'s profile`}
                                        className="w-16 h-16 rounded-full object-cover border dark:border-gray-600"
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-primary dark:text-white text-[19px] mb-2">Atlas investment holdings</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <FaFacebookF className='bg-blue-600 rounded-full p-2' size={32} />
                                            <FaXTwitter className='bg-black rounded-full p-2' size={32}  />
                                            <FaLinkedinIn className='bg-blue-500 rounded-full p-2' size={32}  />
                                            <FaInstagram className='bg-pink-500 rounded-full p-2' size={32}  />
                                            <FaYoutube className='bg-red-500 rounded-full p-2' size={32} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex border-l px-6 h-full border-gray-300 dark:border-gray-600 flex-col items-center justify-center">
                                    <p className="font-semibold text-[18px]">Sector focus</p>
                                    <div className="flex items-center gap-2">
                                        <p className="bg-gray-200 dark:bg-gray-600 rounded-md font-medium text-[15px] mt-2 dark:text-white px-4 py-0.5 text-primary">Tech</p>
                                        <p className="bg-gray-200 dark:bg-gray-600 rounded-md font-medium text-[15px] mt-2 dark:text-white px-4 py-0.5 text-primary">Tech</p>
                                    </div>
                                </div>
                                <div className="flex border-l px-6 h-full border-gray-300 dark:border-gray-600 flex-col items-center justify-center">
                                    <p className="font-semibold text-[18px]">Geography focus</p>
                                    <div className="flex items-center gap-2">
                                        <p className="bg-gray-200 dark:bg-gray-600 rounded-md font-medium text-[15px] mt-2 dark:text-white px-4 py-0.5 text-primary">Asia</p>
                                        <p className="bg-gray-200 dark:bg-gray-600 rounded-md font-medium text-[15px] mt-2 dark:text-white px-4 py-0.5 text-primary">Africa</p>
                                    </div>
                                </div>
                                <div className="flex border-l px-6 gap-2 h-full border-gray-300 dark:border-gray-600 flex-col items-center justify-center">
                                    <button className="bg-primary text-white px-6 py-1 flex items-center gap-2 font-medium text-[15px] rounded-md">
                                        <IoMdAdd />
                                        Add to CRM
                                    </button>
                                    <button className="bg-white hover:bg-gray-300 dark:bg-gray-600 dark:text-white text-primary px-6 py-1 flex items-center gap-2 font-medium text-[15px] rounded-md">
                                        <IoMdAdd />
                                        Add Review
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                        No target companies found.
                    </p>
                )}
            </div>
        </Layout>
    );
};

export default TargetCompanies;
