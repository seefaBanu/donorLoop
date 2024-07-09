import React, { useState, useEffect } from "react";
import { IoSearchCircle } from "react-icons/io5";
import axios from "axios";

const FindBloodFromBloodDonors = ({ token }) => {
  const [bloodDonors, setBloodDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBloodDonors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/find-blood/blood-donors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBloodDonors(response.data);
      } catch (error) {
        console.error("Error fetching blood donors:", error);
      }
    };

    fetchBloodDonors();
  }, [token]);

  const handleMoreDetailsClick = (donor) => {
    setSelectedDonor(donor);
  };

  const handleClosePopup = () => {
    setSelectedDonor(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBloodDonors = bloodDonors.filter(
    (donor) =>
      donor.bloodDonorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-semibold text-gray-700">Find Blood Donors</h1>
          <h1 className="text-xs font-light text-gray-700">Availability of blood donors by city and blood group</h1>
        </div>
        <div className="flex border my-auto border-gray-300 bg-white font-light px-4 text-sm text-gray-400 p-2 gap-4 rounded-3xl items-center align-middle">
          <input
            type="text"
            placeholder="Search Blood Donors"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full outline-none"
          />
          <IoSearchCircle className="w-6 h-6" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="bg-gray-100">
            <div className="flex justify-between bg-gray-100 items-center mt-6">
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">Name</div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">Blood Group</div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">District</div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">Email</div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">TP Number</div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">Actions</div>
            </div>
          </div>
          <div>
            {filteredBloodDonors.map((donor) => (
              <div key={donor.bloodDonorId} className="flex justify-between items-center my-2 bg-white rounded-xl p-2">
                <div className="flex-1 text-sm px-4 py-2 text-center">{donor.bloodDonorName}</div>
                <div className="flex-1 text-sm px-4 py-2 text-center">{donor.bloodGroups}</div>
                <div className="flex-1 text-sm px-4 py-2 text-center">{donor.district}</div>
                <div className="flex-1 text-sm px-4 py-2 text-center">{donor.email}</div>
                <div className="flex-1 text-sm px-4 py-2 text-center">{donor.tpNumber}</div>
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  <button className="text-blue-500 hover:underline" onClick={() => handleMoreDetailsClick(donor)}>
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedDonor && (
        <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="popup-inner bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Blood Donor Details</h2>
            <div>
              <p><strong>Name:</strong> {selectedDonor.bloodDonorName}</p>
              <p><strong>Blood Group:</strong> {selectedDonor.bloodGroups}</p>
              <p><strong>District:</strong> {selectedDonor.district}</p>
              <p><strong>Email:</strong> {selectedDonor.email}</p>
              <p><strong>Address:</strong> {selectedDonor.location}</p>
              <p><strong>TP Number:</strong> {selectedDonor.tpNumber}</p>
            </div>
            <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindBloodFromBloodDonors;
