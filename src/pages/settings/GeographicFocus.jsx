import React, { useEffect, useState } from "react";
import {
  fetchContinents,
  fetchCountries,
  getUserContinentPreferences,
  fetchRegions,
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
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

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
    fetchUserContinents();
  }, []);

  const continentOptions = continents.map((dealType) => ({
    value: dealType,
    label: dealType,
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
            <select
              className="w-[30%] pl-3 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region.region_id} value={region.region_id}>
                  {region.name}
                </option>
              ))}
            </select>
            <select
              className="w-[30%] pl-3 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country.country_id} value={country.country_id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeographicFocus;
