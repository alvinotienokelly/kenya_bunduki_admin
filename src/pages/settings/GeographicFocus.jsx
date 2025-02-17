import React, { useEffect, useState } from "react";
import {
  fetchContinents,
  fetchCountries,
  getUserContinentPreferences,
  getRegionPreferences,
  fetchRegions,
  getCountryPreferences,
} from "../../services/api_service";
import { GoPlus } from "react-icons/go";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Modal from "../../elements/Modal";
import toast from "react-hot-toast";
import Select from "react-select";

const GeographicFocus = () => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [sectors, setSectors] = useState([]);
  const [continents, setContinents] = useState([]);
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState("");

  const getContinents = async () => {
    try {
      const response = await fetchContinents();
      setContinents(response.continents);
    } catch (error) {
      console.error("Failed to fetch sectors", error);
    }
  };

  const fetchUserContinents = async () => {
    try {
      const response = await getUserContinentPreferences();
      const userContinents = response.preferences.map((continent) => ({
        value: continent.continent.continent_id,
        label: continent.continent.name,
      }));
      setSelectedContinents(userContinents);
    } catch (error) {
      toast.error("Failed to fetch deal type preferences.");
    }
  };

  const fetchUserCountries = async () => {
    try {
      const response = await getCountryPreferences();
      const userCountries = response.preferences.map((country) => ({
        value: country.country.country_id,
        label: country.country.name,
      }));
      setSelectedCountries(userCountries);
    } catch (error) {
      toast.error("Failed to fetch deal type preferences.");
    }
  };
  const fetchUserRegions = async () => {
    try {
      const response = await getRegionPreferences();
      const userRegions = response.preferences.map((region) => ({
        value: region.region.region_id,
        label: region.region.name,
      }));
      setSelectedRegions(userRegions);
    } catch (error) {
      toast.error("Failed to fetch deal type preferences.");
    }
  };
  const getCountries = async () => {
    try {
      const response = await fetchCountries();
      setCountries(response.countries);
    } catch (error) {
      console.error("Failed to fetch sectors", error);
    }
  };
  const getRegions = async () => {
    try {
      const response = await fetchRegions();
      setRegions(response.regions);
    } catch (error) {
      console.error("Failed to fetch sectors", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      if (preferenceId) {
        const response = updateTicketPreference(preferenceId, {
          ticket_size_min: formData.ticket_size_min,
          ticket_size_max: formData.ticket_size_max,
        });

        toast.success("Preferences updated successfully");
      } else {
        const response = createUserTicketPreference({
          ticket_size_min: formData.ticket_size_min,
          ticket_size_max: formData.ticket_size_max,
        });
        toast.success("Preferences created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error saving preferences");
    }
  };
  useEffect(() => {
    getCountries();
    getContinents();
    getRegions();
    fetchUserRegions();
    fetchUserContinents();
    fetchUserCountries();
  }, []);

  const continentOptions = continents.map((dealType) => ({
    value: dealType,
    label: dealType,
  }));

  const regionOptions = regions.map((region) => ({
    value: region,
    label: region,
  }));

  const countryOptions = regions.map((country) => ({
    value: country,
    label: country,
  }));

  return (
    <div className="">
      <div className="">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative mb-4 flex gap-4">
            <Select
              id="dealTypes"
              isMulti
              options={continents.map((continent) => ({
                value: continent.continent_id,
                label: continent.name,
              }))} // Ensure options have value-label pairs
              onChange={setSelectedContinents} // Update state when user selects
              value={selectedContinents} // Show previously selected continents
              className="w-[30%] pl-3 pr-4 py-2  focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Select
              id="regions"
              isMulti
              options={regions.map((region) => ({
                value: region.region_id,
                label: region.name,
              }))} // Ensure options have value-label pairs
              onChange={setSelectedRegions} // Update state when user selects
              value={selectedRegions} // Show previously selected continents
              className="w-[30%] pl-3 pr-4 py-2  focus:outline-none focus:ring-2 focus:ring-primary"
            />
           <Select
              id="countries"
              isMulti
              options={countries.map((country) => ({
                value: country.country_id,
                label: country.name,
              }))} // Ensure options have value-label pairs
              onChange={setSelectedCountries} // Update state when user selects
              value={selectedCountries} // Show previously selected continents
              className="w-[30%] pl-3 pr-4 py-2  focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeographicFocus;
