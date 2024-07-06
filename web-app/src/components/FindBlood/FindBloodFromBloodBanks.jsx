import React, { useState } from "react";
import { IoSearchCircle } from "react-icons/io5";

// Placeholder data for demonstration
const bloodBanks = [
  {
    id: 1,
    name: "Blood Bank A",
    cluster: "Cluster 1",
    tpNumber: "0712345678",
    availableBloods: "A+, B+",
    location: "Location A",
  },
  {
    id: 2,
    name: "Blood Bank B",
    cluster: "Cluster 2",
    tpNumber: "0723456789",
    availableBloods: "O+, AB-",
    location: "Location B",
  },
];

const FindBloodFromBloodBanks = () => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMoreDetailsClick = (bank) => {
    setSelectedBank(bank);
  };

  const handleClosePopup = () => {
    setSelectedBank(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBloodBanks = bloodBanks.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.cluster.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-4">
        <div>
          <h1 className="text-sm font-semibold text-gray-700 ">
            Find Blood Banks
          </h1>

          <h1 className="text-xs font-light text-gray-700 ">
            Availablity of blood groups in the Blood Banks
          </h1>
        </div>
        <div className="flex border my-auto border-gray-300 bg-white font-light px-4 text-sm text-gray-400 p-2 gap-4 rounded-3xl items-center align-middle">
          <input
            type="text"
            placeholder="Search Blood Banks"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full outline-none"
          />
          <IoSearchCircle className="w-6 h-6" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full ">
          <div className="bg-gray-100">
            <div className="flex justify-between bg-gray-100 items-center mt-6">
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                Blood Bank
              </div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                Cluster
              </div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                Mobile Number
              </div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                Available Bloods
              </div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                Location
              </div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                Actions
              </div>
            </div>
          </div>
          <div className="">
            {filteredBloodBanks.map((bank) => (
              <div
                key={bank.id}
                className="flex justify-between items-center my-2 bg-white rounded-xl p-2"
              >
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  {bank.name}
                </div>
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  {bank.cluster}
                </div>
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  {bank.tpNumber}
                </div>
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  {bank.availableBloods}
                </div>
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  {bank.location}
                </div>
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleMoreDetailsClick(bank)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedBank && (
        <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="popup-inner bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Blood Bank Details</h2>
            <div>
              <p>
                <strong>Name:</strong> {selectedBank.name}
              </p>
              <p>
                <strong>Cluster:</strong> {selectedBank.cluster}
              </p>
              <p>
                <strong>TP Number:</strong> {selectedBank.tpNumber}
              </p>
              <p>
                <strong>Available Bloods:</strong>{" "}
                {selectedBank.availableBloods}
              </p>
              <p>
                <strong>Location:</strong> {selectedBank.location}
              </p>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindBloodFromBloodBanks;
