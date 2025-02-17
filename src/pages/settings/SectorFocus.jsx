import React, { useEffect, useState } from "react";
import { fetchSectors, fetchSubsectors } from "../../services/api_service";
import { GoPlus } from "react-icons/go";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import Modal from "../../elements/Modal";
import toast from "react-hot-toast";

const SectorFocus = () => {
  const [sectors, setSectors] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState("");
  const [subsectors, setSubSectors] = useState([]);
  const [selectedSubSectors, setSelectedSubSectors] = useState("");

  const fetchSystemSectors = async () => {
    try {
      const response = await fetchSectors();
      setSectors(response.sectors);
    } catch (error) {
      toast.error("Error fetching tasks");
    } finally {
    }
  };
  const fetchSystemSubSectors = async () => {
    try {
      const response = await fetchSubsectors();
      setSubSectors(response.subsectors);
    } catch (error) {
      toast.error("Error fetching tasks");
    } finally {
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  useEffect(() => {
    fetchSystemSectors();
    fetchSystemSubSectors();
  }, []);

  return (
    <div className="">
      <div className="">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative mb-4 flex gap-4">
            <select
              className="w-[50%] pl-3 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedSectors}
              onChange={(e) => setSelectedSectors(e.target.value)}
            >
              <option value="">All Sectors</option>
              {sectors.map((sector) => (
                <option key={sector.sector_id} value={sector.sector_id}>
                  {sector.name}
                </option>
              ))}
            </select>

            <select
              className="w-[50%] pl-3 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedSubSectors}
              onChange={(e) => setSelectedSubSectors(e.target.value)}
            >
              <option value="">All Subsectors</option>
              {subsectors.map((subsector) => (
                <option
                  key={subsector.subsector_id}
                  value={subsector.subsector_id}
                >
                  {subsector.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SectorFocus;
