import React, { useEffect, useState } from 'react';
import Layout from '../elements/Layout';
import { getUsersByType } from '../services/api_service';
import toast from 'react-hot-toast';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaStar, FaRegStar } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { FaXTwitter } from 'react-icons/fa6';
import Modal from '../elements/Modal';

const TargetCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [reviewData, setReviewData] = useState({
        rating: 0,
        review_note: '',
        relationship: '',
    });

    const relationships = ['I contacted them', 'They contacted me', 'We are partners'];

    const getCompanies = async () => {
        try {
            const data = await getUsersByType('Target Company');
            setCompanies(data.users);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch companies');
        }
    };

    useEffect(() => {
        getCompanies();
    }, []);

    const handleOpenReview = (company) => {
        setSelectedCompany(company);
        setReviewData({ rating: 0, review_note: '', relationship: '' });
        setShowModal(true);
    };

    const handleRatingChange = (value) => {
        setReviewData({ ...reviewData, rating: value });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReviewData({ ...reviewData, [name]: value });
    };

    const handleSubmitReview = async () => {
        try {
            const payload = {
                company_id: selectedCompany.id,
                ...reviewData,
            };
            console.log('Submitting Review:', payload);

            toast.success('Review submitted successfully!');
            setShowModal(false);
        } catch (error) {
            console.error('Failed to submit review', error);
            toast.error('Failed to submit review');
        }
    };

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
                                    <div className="flex border-l px-6 gap-2 h-full border-gray-300 dark:border-gray-600 flex-col items-center justify-center">
                                        <button
                                            className="bg-primary text-white px-6 py-1 flex items-center gap-2 text-[14px] rounded-md"
                                            onClick={() => handleOpenReview(user)}
                                        >
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

            {showModal && (
                <Modal title="Add Review" onClose={() => setShowModal(false)}>
                    <div className="flex flex-col gap-4">
                        <p className="text-gray-700 font-medium">Rate your experience</p>
                        <div className="flex gap-2">
                            {Array.from({ length: 5 }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleRatingChange(index + 1)}
                                    className={`text-2xl ${reviewData.rating > index ? 'text-yellow-500' : 'text-gray-300'
                                        }`}
                                >
                                    {reviewData.rating > index ? <FaStar /> : <FaRegStar />}
                                </button>
                            ))}
                        </div>

                        <div>
                            <p className="text-gray-700 font-medium mb-2">Relationship</p>
                            <select
                                name="relationship"
                                value={reviewData.relationship}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Relationship</option>
                                {relationships.map((rel) => (
                                    <option key={rel} value={rel}>
                                        {rel}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <p className="text-gray-700 font-medium mb-2">Review Note</p>
                            <textarea
                                name="review_note"
                                value={reviewData.review_note}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full p-2 border rounded"
                                placeholder="Write your review here..."
                            ></textarea>
                        </div>

                        <button
                            onClick={handleSubmitReview}
                            className="bg-primary text-white p-2 rounded hover:bg-primary-dark"
                        >
                            Submit Review
                        </button>
                    </div>
                </Modal>
            )}
        </Layout>
    );
};

export default TargetCompanies;
