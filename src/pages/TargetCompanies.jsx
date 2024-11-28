import React, { useEffect, useState } from 'react';
import Layout from '../elements/Layout';
import { getUsersByType } from '../services/api_service';
import toast from 'react-hot-toast';

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {companies.map((company) => (
                            <div
                                key={company.id}
                                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            company.profile_image
                                                ? company.profile_image
                                                : 'https://via.placeholder.com/150'
                                        }
                                        alt={`${company.name}'s profile`}
                                        className="w-16 h-16 rounded-full object-cover border dark:border-gray-600"
                                    />
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                            {company.name}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {company.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        KYC Status:{' '}
                                        <span
                                            className={`font-semibold ${company.kyc_status === 'Approved'
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                }`}
                                        >
                                            {company.kyc_status}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Preferred Sector: {company.preference_sector.join(', ')}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Preferred Region: {company.preference_region.join(', ')}
                                    </p>
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
