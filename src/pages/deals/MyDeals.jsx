import React, { useEffect, useState } from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Layout from '../../elements/Layout';

const MyDeals = ({ deals, isLoading }) => {
  const navigate = useNavigate();

  const [dealsData, setDealsData] = useState({
    totalDeals: 0,
    activeDeals: 0,
    inactiveDeals: 0,
    dealsPercentageChange: 0,
    activeDealsPercentageChange: 0,
    totalDealSizePercentageChange: 0,
    deals: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDeals = async () => {
      setLoading(true);
      try {
        const data = await fetchDeals();
        console.log(data)
        setDealsData(data);
      } catch (error) {
        setError('Failed to fetch deals');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  const truncateTitle = (title, wordLimit = 5) => {
    const words = title.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return title;
  }

  const renderShimmer = () => (
    Array.from({ length: 5 }).map((_, index) => (
      <tr key={index} className="animate-pulse bg-gray-200 dark:bg-gray-700">
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </td>
      </tr>
    ))
  );

  return (
    <Layout>
      <>
        <div className="overflow-x-auto bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg hidden md:flex">
          <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white text-left">
                <th className="px-4 py-3">Deal Title</th>
                <th className="px-4 py-3">Target Company</th>
                <th className="px-4 py-3">Deal Size</th>
                <th className="px-4 py-3">Deal Stage</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                renderShimmer()
              ) :
                deals?.map((deal, index) => (
                  <tr
                    key={deal.deal_id}
                    className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-600' : 'bg-gray-100 dark:bg-gray-700'} text-gray-700 dark:text-gray-100 text-[14px]`}
                  >
                    <td className="px-4 py-2">
                      {truncateTitle(deal.title)}
                    </td>
                    <td className="px-4 py-2">{deal.targetCompany.name}</td>
                    <td className="px-4 py-2">{deal.deal_size}</td>
                    <td className="px-4 py-2">{deal.deal_stage}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/dashboard/deals/${deal.deal_id}/view-details`)}
                        className="text-primary bg-secondary p-2 rounded-full hover:bg-[#D1D7E0]"
                      >
                        <FaEye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              }
              {/* )} */}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:hidden">
          {deals?.map((deal, index) => (
            <div key={deal.deal_id} className="bg-white border dark:bg-gray-800 dark:border-gray-500 rounded-lg p-4 my-1">
              <div className="flex items-center justify-between">
                <div className="flex items-start flex-col gap-2">
                  <p className="text-primary dark:text-white font-semibold text-[16px]">
                    {truncateTitle(deal.title)}
                  </p>
                  <p className="text-gray-500 text-[14px] dark:text-gray-300">{deal.targetCompany.name}</p>
                </div>
                <div className="flex flex-col justify-end">
                  <p className="text-gray-500 text-end text-[14px] dark:text-gray-300">{deal.deal_size}</p>
                  <div className="flex items-end gap-1">
                    <button
                      onClick={() => navigate(`/dashboard/deals/${deal.deal_id}/view-details`)}
                      className="text-primary bg-secondary p-2 rounded-full hover:bg-[#D1D7E0]"
                    >
                      <FaEye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </Layout>
  );
};

export default MyDeals;
