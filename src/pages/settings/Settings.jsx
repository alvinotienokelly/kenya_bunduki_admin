import React, { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import OtherSettings from "./OtherSettings";
import RoleSettings from "./RoleSettings";
import ContactPersonList from "./ContactPersonList";
import GeographicFocus from "./GeographicFocus";
import FundStrategy from "./FundStrategy";
import Layout from "../../elements/Layout";
import SectorFocus from "./SectorFocus";
import DealTypePreference from "./DealTypePreference";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout title="Settings">
      <div className="border-t border-gray-200 pt-4 mx-auto mt-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-full md:w-[30%] flex border-b mb-6 md:flex-col">
            <button
              className={`text-start py-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md ${
                activeTab === "general"
                  ? "border-l-2 border-primary dark:border-white text-primary font-semibold dark:text-white dark:hover:bg-gray-700"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => handleTabChange("general")}
            >
              General
            </button>
            <button
              className={`text-start py-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md ${
                activeTab === "roles"
                  ? "border-l-2 border-primary dark:border-white text-primary font-semibold dark:text-white dark:hover:bg-gray-700"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => handleTabChange("roles")}
            >
              User Roles
            </button>
            <button
              className={`text-start py-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md ${
                activeTab === "contact_persons"
                  ? "border-l-2 border-primary dark:border-white text-primary font-semibold dark:text-white dark:hover:bg-gray-700"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => handleTabChange("contact_persons")}
            >
              Contact Persons
            </button>
            <button
              className={`text-start py-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md ${
                activeTab === "deal_type"
                  ? "border-l-2 border-primary dark:border-white text-primary font-semibold dark:text-white dark:hover:bg-gray-700"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => handleTabChange("deal_type")}
            >
              Deal Type
            </button>
            <button
              className={`text-start py-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md ${
                activeTab === "fund_strategy"
                  ? "border-l-2 border-primary dark:border-white text-primary font-semibold dark:text-white dark:hover:bg-gray-700"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => handleTabChange("fund_strategy")}
            >
              Fund Strategy & preferences
            </button>
            <button
              className={`text-start py-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md ${
                activeTab === "sector_focus"
                  ? "border-l-2 border-primary dark:border-white text-primary font-semibold dark:text-white dark:hover:bg-gray-700"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => handleTabChange("sector_focus")}
            >
              Sector Focus
            </button>
            <button
              className={`text-start py-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md ${
                activeTab === "geographic_focus"
                  ? "border-l-2 border-primary dark:border-white text-primary font-semibold dark:text-white dark:hover:bg-gray-700"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => handleTabChange("geographic_focus")}
            >
              Geographic Focus
            </button>
            <button
              className={`text-start py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md ${
                activeTab === "other"
                  ? "border-l-2 border-primary dark:border-white text-primary font-semibold dark:text-white dark:hover:bg-gray-700"
                  : "text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => handleTabChange("other")}
            >
              Other Settings
            </button>
          </div>

          <div className="w-full md:w-[80%] p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            {activeTab === "general" && <GeneralSettings />}
            {activeTab === "roles" && <RoleSettings />}
            {activeTab === "contact_persons" && <ContactPersonList />}
            {activeTab === "fund_strategy" && <FundStrategy />}
            {activeTab === "deal_type" && <DealTypePreference />}
            {activeTab === "geographic_focus" && <GeographicFocus />}
            {activeTab === "sector_focus" && <SectorFocus />}
            {activeTab === "other" && <OtherSettings />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
