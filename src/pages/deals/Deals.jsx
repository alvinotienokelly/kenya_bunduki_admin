import React, { useEffect, useState } from "react";
import Layout from "../../elements/Layout";
import { fetchDeals, expressInterest } from "../../services/api_service";
import Modal from "../../elements/Modal";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("loading");
  const navigate = useNavigate();

  const getDeals = async () => {
    try {
      const response = await fetchDeals();
      setDeals(response.deals);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch deals", error);
    }
  };

  useEffect(() => {
    getDeals();
  }, []);

  const handleExpressInterest = (deal_id) => {
    setShowModal(true);
    setModalContent("loading");
    expressInterest(deal_id);

    setTimeout(() => {
      setModalContent("success");
    }, 3000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Layout
      title="Deals"
      rightContent={
        <div className="flex items-center px-2 border -mt-6 rounded-md">
          <input
            type="text"
            placeholder="Search"
            className="outline-none py-1 px-3 text-[14px] text-gray-400"
          />
        </div>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg"
              >
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mt-4"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mt-4"></div>
              </div>
            ))
          : deals.map((deal) => (
              <div
                key={deal.id}
                className="border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <img
                  className="w-full h-auto object-cover rounded-t-lg"
                  src="https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW52ZXN0fGVufDB8fDB8fHww"
                  alt=""
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-primary">
                    Project {deal.project}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Sector:</strong> {deal.sector}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Country:</strong> {deal.country}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ticket Size: {deal.ticket_size}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Use of Funds: {deal.use_of_funds}
                  </p>
                </div>
                <div className="flex px-4 pb-4 items-center w-full gap-4 mt-6">
                  <button
                    onClick={() => handleExpressInterest(deal.deal_id)}
                    className="bg-primary text-[13px] text-white px-2 py-0.5 w-1/2 rounded"
                  >
                    Interested
                  </button>
                  <button
                    onClick={() => navigate(`/dashboard/deals/${deal.deal_id}`)}
                    className="border border-primary text-primary font-medium w-1/2 text-[13px] px-2 py-0.5 rounded"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
      </div>
      {showModal && (
        <Modal title="Expressing Interest" onClose={closeModal}>
          {modalContent === "loading" ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-t-primary border-gray-300 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Processing your request...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <svg
                className="w-16 h-16 text-green-500 mb-4 border-4 border-green-500 rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Thank you! Your Interest has <br /> been noted.
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our team will get back to you within two business days.
              </p>
              <button
                onClick={closeModal}
                className="bg-primary px-6 py-1 rounded-md text-white font-medium text-[14px] mt-2 flex items-center justify-center gap-2"
              >
                <FaAngleLeft />
                Go back
              </button>
            </div>
          )}
        </Modal>
      )}
    </Layout>
  );
};

export default Deals;
