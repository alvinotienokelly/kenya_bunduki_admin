import React, { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import OtherSettings from "./OtherSettings";
import RoleSettings from "./RoleSettings";
import Layout from "../../elements/Layout";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("general");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Layout title="Settings">
            <div className="border-t border-gray-200 pt-4 mx-auto mt-4 dark:border-gray-700 dark:bg-gray-900">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-full md:w-[15%] flex border-b mb-6 md:flex-col">
                        <button
                            className={`text-start py-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md ${activeTab === "general" ? "border-l-2 border-primary dark:border-white text-primary font-semibold dark:text-white dark:hover:bg-gray-700" : "text-gray-500 dark:text-gray-400"}`}
                            onClick={() => handleTabChange("general")}
                        >
                            General
                        </button>
                        <button
                            className={`text-start py-1.5 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md ${activeTab === "roles" ? "border-l-2 border-primary dark:border-white text-primary font-semibold dark:text-white dark:hover:bg-gray-700" : "text-gray-500 dark:text-gray-400"}`}
                            onClick={() => handleTabChange("roles")}
                        >
                            User Roles
                        </button>
                        <button
                            className={`text-start py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-md ${activeTab === "other" ? "border-l-2 border-primary dark:border-white text-primary font-semibold dark:text-white dark:hover:bg-gray-700" : "text-gray-500 dark:text-gray-400"}`}
                            onClick={() => handleTabChange("other")}
                        >
                            Other Settings
                        </button>
                    </div>

                    <div className="w-full md:w-[85%] p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                        {activeTab === "general" && (
                            <GeneralSettings />
                        )}
                        {activeTab === "roles" && (
                            <RoleSettings />
                        )}
                        {activeTab === "other" && (
                            <OtherSettings />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;