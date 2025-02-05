import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaRegFileAlt,
  FaUsers,
  FaMoneyBillWave,
  FaTasks,
  FaFlag,
} from "react-icons/fa";
import DealMeetings from "./DealMeetings";
import DealTasks from "./DealTasks";
import DealMilestones from "./DealMilestones";
import { fetchDeal, expressInterest } from "../../services/api_service";
import Loading from "../../elements/Loading";
import moment from "moment";
import Layout from "../../elements/Layout";
import Modal from "../../elements/Modal";
import toast from "react-hot-toast";

const ViewDeal = () => {
  const [activeTab, setActiveTab] = useState("Trail");
  const [deal, setDeal] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("loading");

  const tabs = [
    { name: "Trail", icon: <FaRegFileAlt className="w-5 h-5" /> },
    { name: "Meetings", icon: <FaUsers className="w-5 h-5" /> },
    { name: "Transactions", icon: <FaMoneyBillWave className="w-5 h-5" /> },
    { name: "Tasks", icon: <FaTasks className="w-5 h-5" /> },
    { name: "Milestones", icon: <FaFlag className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const getDealData = async () => {
      try {
        const data = await fetchDeal(id);
        setDeal(data.deal);
      } catch (error) {
        console.error("Error fetching deal:", error);
      }
    };
    getDealData();
  }, [id]);

  if (!deal) {
    return <Loading />;
  }

  const handleExpressInterest = () => {
    try {
      setShowModal(true);
      setModalContent("loading");
      expressInterest(id);
      setModalContent("success");
      toast.success("Interest expressed successfully");
    } catch (error) {
      console.error("Error expressing interest:", error);
      setModalContent("error");
      toast.error("Error expressing interest");
    }
  };

  return (
    <Layout
      rightContent={
        <button
          onClick={handleExpressInterest}
          className="bg-primary text-[13px] text-white px-2 py-0.5  rounded"
        >
          Express Interest
        </button>
      }
      title="Deal Details"
    >
      <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg mt-4">
        <div className="flex flex-col border-b border-gray-200 dark:border-gray-700 pb-4">
          <p className="text-[17px] font-medium text-black dark:text-white">
            Title
          </p>
          <p className="text-[14px] text-gray-800 dark:text-gray-300">
            {deal?.title}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {[
            { label: "Sector", value: deal?.sector },
            { label: "Region", value: deal?.region },
            { label: "Deal Stage", value: deal?.deal_stage },
            { label: "Deal Size", value: deal?.deal_size || "Not provided" },
            { label: "Status", value: deal?.status },
            {
              label: "Key Investors",
              value: deal?.key_investors || "Not provided",
            },
            { label: "Visibility", value: deal?.visibility },
            { label: "Deal Type", value: deal?.deal_type || "Not provided" },
            {
              label: "Maximum Selling Stake",
              value: deal?.maximum_selling_stake || "Not provided",
            },
            { label: "Teaser", value: deal?.teaser || "Not provided" },
            { label: "Model", value: deal?.model || "Not provided" },
            { label: "Project", value: deal?.project || "Not provided" },
            {
              label: "Ticket Size",
              value: deal?.ticket_size || "Not provided",
            },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col">
              <p className="text-[17px] font-medium text-black dark:text-white">
                {label}
              </p>
              <p className="text-[14px] text-gray-800 dark:text-gray-300">
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-[17px] font-medium text-black dark:text-white">
            Description
          </p>
          <p className="text-[14px] text-gray-800 dark:text-gray-300">
            {deal?.description}
          </p>
        </div>
      </div>

      {/* Target Company Info */}
      <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg mt-4">
        <div className="flex flex-col border-b border-gray-200 dark:border-gray-700 pb-4">
          <p className="text-[17px] font-medium text-black dark:text-white">
            Target Company
          </p>
          <p className="text-[14px] text-gray-800 dark:text-gray-300">
            {deal?.targetCompany?.name}
          </p>
          <p className="text-[14px] text-gray-800 dark:text-gray-300">
            {deal?.targetCompany?.email}
          </p>
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-[17px] font-medium text-black dark:text-white">
            KYC Status
          </p>
          <p className="text-[14px] text-gray-800 dark:text-gray-300">
            {deal?.targetCompany?.kyc_status || "Not provided"}
          </p>
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-[17px] font-medium text-black dark:text-white">
            Preferences
          </p>
          <p className="text-[14px] text-gray-800 dark:text-gray-300">
            {`Sectors: ${
              deal?.targetCompany?.preference_sector?.join(", ") ||
              "Not provided"
            }`}
          </p>
          <p className="text-[14px] text-gray-800 dark:text-gray-300">
            {`Regions: ${
              deal?.targetCompany?.preference_region?.join(", ") ||
              "Not provided"
            }`}
          </p>
        </div>
      </div>

      {/* Creator Info */}
      <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg mt-4">
        <div className="flex flex-col border-b border-gray-200 dark:border-gray-700 pb-4">
          <p className="text-[17px] font-medium text-black dark:text-white">
            Created By
          </p>
          <p className="text-[14px] text-gray-800 dark:text-gray-300">
            {deal?.createdBy?.name}
          </p>
          <p className="text-[14px] text-gray-800 dark:text-gray-300">
            {deal?.createdBy?.email}
          </p>
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-[17px] font-medium text-black dark:text-white">
            Role
          </p>
          <p className="text-[14px] text-gray-800 dark:text-gray-300">
            {deal?.createdBy?.role}
          </p>
        </div>
      </div>

      {/* Timestamps */}
      <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg mt-4">
        <div className="flex flex-col">
          <p className="text-[17px] font-medium text-black dark:text-white">
            Timestamps
          </p>
          <p className="text-[14px] text-gray-800 dark:text-gray-300">
            {`Uploaded: ${moment(deal?.createdAt).format(
              "MMMM Do YYYY, hh:mm A"
            )}`}
          </p>
          <p className="text-[14px] text-gray-800 dark:text-gray-300">
            {`Last modified: ${moment(deal?.updatedAt).format(
              "MMMM Do YYYY, hh:mm A"
            )}`}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full overflow-x-auto flex mt-4 space-x-4 border-b border-gray-200 dark:border-gray-600 pb-2">
        {tabs.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => setActiveTab(name)}
            className={`flex items-center space-x-2 px-4 py-2 font-medium ${
              activeTab === name
                ? "text-primary dark:text-white border-b-2 border-primary dark:border-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {icon}
            <span>{name}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {activeTab === "Trail" && <p>Audit trail details go here...</p>}
        {activeTab === "Meetings" && <DealMeetings />}
        {activeTab === "Tasks" && <DealTasks />}
        {activeTab === "Milestones" && <DealMilestones />}
      </div>
    </Layout>
  );
};

export default ViewDeal;
