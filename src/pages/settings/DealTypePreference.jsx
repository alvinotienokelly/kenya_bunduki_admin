import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import {
  createMultipleDealTypePreferences,
  getUserMultipleDealTypePreferences,
} from "../../services/api_service";

const dealTypes = ["Equity", "Debt", "Equity and Debt"];

const DealTypePreference = () => {
  const [selectedDealTypes, setSelectedDealTypes] = useState([]);
  const [predefinedDealTypes, setPredefinedDealTypes] = useState([]);

  const handleInputChange = (selectedOptions) => {
    setSelectedDealTypes(selectedOptions);
  };

  const fetchDealTypePreferences = async () => {
    try {
      const response = await getUserMultipleDealTypePreferences();
      const userDealTypes = response.preferences.map((dealType) => ({
        value: dealType.deal_type,
        label: dealType.deal_type,
      }));
      setSelectedDealTypes(userDealTypes);
    } catch (error) {
      toast.error("Failed to fetch deal type preferences.");
    }
  };

  useEffect(() => {
    fetchDealTypePreferences();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const dealTypeValues = selectedDealTypes.map((option) => option.value);

    createMultipleDealTypePreferences({
      deal_types: dealTypeValues,
    });
    toast.success("Deal type preferences saved successfully!");
    fetchDealTypePreferences();
  };

  const dealTypeOptions = dealTypes.map((dealType) => ({
    value: dealType,
    label: dealType,
  }));

  return (
    <div className="">
      <div className="">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="dealTypes"
              className="block text-sm font-medium text-gray-700"
            >
              Deal Types
            </label>
            <Select
              id="dealTypes"
              isMulti
              options={dealTypeOptions}
              onChange={handleInputChange}
              value={selectedDealTypes}
              className="mt-1"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DealTypePreference;
