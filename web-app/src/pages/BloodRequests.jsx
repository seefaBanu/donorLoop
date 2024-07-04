import React, { useState, useEffect } from "react";
import RequestDetailsPopup from "../components/Requests/RequestDetailsPopup";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoSearchCircle } from "react-icons/io5";
import Services from "../services/Services"; // Make sure the path is correct

const BloodRequests = ({ token }) => {
  const [requests, setRequests] = useState([]); // Array of blood requests
  const [selectedRequest, setSelectedRequest] = useState(null); // Track selected request for details popup
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search term

  useEffect(() => {
    // Fetch blood requests from the backend
    Services.getBloodRequests(token)
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blood requests:", error);
        setError(error);
        setLoading(false);
      });
  }, [token]);

  // Function to handle click on More Details button
  const handleMoreDetailsClick = (request) => {
    setSelectedRequest(request);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setSelectedRequest(null);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.bloodBankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.cluster.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Blood Requests</h1>

      <div className="flex justify-end items-center mb-4 gap-4">
        {/* <div className="flex flex-row gap-8 mx-10">
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 font-light py-1">Blood Bank</p>
            <div className="flex flex-row items-center justify-between border rounded-lg px-2 py-1">
              <p className="text-gray-500 text-sm font-light">any</p>
              <IoMdArrowDropdown className="text-gray-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 font-light py-1">Cluster</p>
            <div className="flex flex-row items-center justify-between border rounded-lg px-2 py-1">
              <p className="text-gray-500 text-sm font-light">any</p>
              <IoMdArrowDropdown className="text-gray-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-500 font-light py-1">Status</p>
            <div className="flex flex-row items-center justify-between border rounded-lg px-2 py-1">
              <p className="text-gray-500 text-sm font-light">any</p>
              <IoMdArrowDropdown className="text-gray-500" />
            </div>
          </div>
        </div> */}
        <div className="flex border my-auto border-gray-300 font-light px-4 text-sm text-gray-400 bg-white p-2 gap-4 rounded-3xl items-center align-middle ">
          <input
            type="text"
            placeholder="Search Donations"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full outline-none"
          />
          <IoSearchCircle className="w-4 h-4" />
        </div>
        <button className="flex border bg-black align-middle my-auto text-white text-sm p-2 rounded-3xl hover:bg-white hover:text-black hover:border transition duration-500">
          + Add Request
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div>
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
                Blood Needed
              </div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                Requested Date
              </div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                Status
              </div>
              <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                Actions
              </div>
            </div>
          </div>
          <div className="">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="flex justify-between items-center my-2 bg-white rounded-xl p-2"
              >
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  {request.bloodBankName}
                </div>
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  {request.cluster}
                </div>
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  {request.tpNumber}
                </div>
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  {request.bloodNeeded}
                </div>
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  {request.reqDate}
                </div>
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  {request.status}
                </div>
                <div className="flex-1 text-sm px-4 py-2 text-center">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleMoreDetailsClick(request)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Popup */}
      {selectedRequest && (
        <RequestDetailsPopup
          request={selectedRequest}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default BloodRequests;
