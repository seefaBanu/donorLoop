import React, { useState, useEffect } from "react";
import RequestDetailsPopup from "../components/Requests/RequestDetailsPopup";
import {
  IoIosArrowDropleft,
  IoIosArrowDropright,
  IoMdArrowBack,
  IoMdArrowDropdown,
} from "react-icons/io";
import { IoSearchCircle } from "react-icons/io5";
import Services from "../services/Services";
import AddRequestPopup from "../components/Requests/AddRequestPopup";
import MultiSelectDropDown from "../components/MultiSelectDropDown";

const BloodRequests = ({ token, userDetails, groups }) => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
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

  const handleMoreDetailsClick = (request) => {
    setSelectedRequest(request);
  };

  const handleClosePopup = () => {
    setSelectedRequest(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleAddPopup = () => {
    setShowAddPopup(!showAddPopup);
  };

  const handleAddRequest = (newRequest) => {
    console.log("Adding new request:", newRequest);
    setShowAddPopup(false);
  };

  const resetSearch = () => {
    setSearchTerm("");
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.bloodBankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.cluster.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "urgent":
        return "bg-orange-100";
      case "critical":
        return "bg-red-100";
      case "routine":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  // Calculate paginated requests
  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  return (
    <div className=" px-4 py-8 mt-20">
      <div className="p-8">
        <div className="flex justify-between">
          <div>
            <h1 className="text-sm font-semibold text-gray-700 ">
              Blood Requests
            </h1>

            <h1 className="text-xs font-light text-gray-700 ">
              Blood requests from the Blood Banks
            </h1>
          </div>
          <div className="flex justify-end items-center mb-4 gap-4">
            <div className="flex border my-auto border-gray-300 bg-white font-light px-4 text-sm text-gray-400 p-2 gap-4 rounded-3xl items-center align-middle ">
              <input
                type="text"
                placeholder="Search Donations"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full outline-none"
              />
              <IoSearchCircle className="w-4 h-4" />
            </div>
            {groups.includes("blood_bank") && (
              <button
                className="flex border bg-black align-middle my-auto text-white text-sm p-2 rounded-3xl hover:bg-white hover:text-black hover:border transition duration-500"
                onClick={toggleAddPopup}
              >
                + Add Request
              </button>
            )}
          </div>
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
              {currentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex justify-between items-center my-2 bg-white rounded-3xl p-2"
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
                  <div className="flex-1 text-sm px-4 py-2 text-center rounded-3xl justify-center">
                    <p
                      className={`flex w-fit text-sm px-4 py-2 text-center rounded-3xl mx-auto ${getStatusClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </p>
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

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 mx-1 hover:bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <IoIosArrowDropleft />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 mx-1 text-sm text-gray-500 ${
                currentPage === index + 1
                  ? "border border-gray-300"
                  : "border border-gray-100"
              } rounded`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 mx-1 hover:bg-gray-300 rounded disabled:opacity-50"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <IoIosArrowDropright />
          </button>
        </div>

        {/* Details Popup */}
        {selectedRequest && (
          <RequestDetailsPopup
            request={selectedRequest}
            onClose={handleClosePopup}
          />
        )}

        {/* Add Request Popup */}
        {showAddPopup && (
          <AddRequestPopup
            onClose={toggleAddPopup}
            onAddRequest={handleAddRequest}
            token={token}
            userDetails={userDetails}
          />
        )}
      </div>
    </div>
  );
};

export default BloodRequests;
