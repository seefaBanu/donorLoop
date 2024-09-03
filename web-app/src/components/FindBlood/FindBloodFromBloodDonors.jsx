import React, { useState, useEffect } from "react";
import { IoSearchCircle } from "react-icons/io5";
import axios from "axios";
import Spinner from "../Items/Spinner";
import Services from "../../services/Services";
import { IoClose } from "react-icons/io5";
import { CiHospital1 } from "react-icons/ci";
import { GiArrowCluster } from "react-icons/gi";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { MdBloodtype } from "react-icons/md";
import {
  IoLocationSharp,
  IoMailSharp,
  IoDocumentTextSharp,
} from "react-icons/io5";

const FindBloodFromBloodDonors = ({ token }) => {
  const [bloodDonors, setBloodDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBloodDonors = async () => {
      setLoading(true);
      try {
        const response = await Services.findBloodByBloodDonors(token);
        setBloodDonors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blood donors:", error);
        setLoading(false);
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
          <h1 className="text-sm font-semibold text-gray-700">
            Find Blood Donors
          </h1>
          <h1 className="text-xs font-light text-gray-700">
            Availability of blood donors by city and blood group
          </h1>
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
        {loading ? (
          <Spinner />
        ) : (
          <div className="min-w-full">
            {filteredBloodDonors.length > 0 ? (
              <>
                <div className="bg-gray-100">
                  <div className="flex justify-between bg-gray-100 items-center mt-6">
                    <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                      Name
                    </div>
                    <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                      Blood Group
                    </div>
                    <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                      District
                    </div>
                    <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                      Email
                    </div>
                    <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                      TP Number
                    </div>
                    <div className="flex-1 text-sm font-regular text-gray-400 px-4 py-2 text-center">
                      Actions
                    </div>
                  </div>
                </div>
                <div>
                  {filteredBloodDonors.map((donor) => (
                    <div
                      key={donor.bloodDonorId}
                      className="flex justify-between items-center my-2 bg-white rounded-xl p-2"
                    >
                      <div className="flex-1 text-sm px-4 py-2 text-center">
                        {donor.bloodDonorName}
                      </div>
                      <div className="flex-1 text-sm px-4 py-2 text-center">
                        {donor.bloodGroups}
                      </div>
                      <div className="flex-1 text-sm px-4 py-2 text-center">
                        {donor.district}
                      </div>
                      <div className="flex-1 text-sm px-4 py-2 text-center">
                        {donor.email}
                      </div>
                      <div className="flex-1 text-sm px-4 py-2 text-center">
                        {donor.tpNumber}
                      </div>
                      <div className="flex-1 text-sm px-4 py-2 text-center">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleMoreDetailsClick(donor)}
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center py-10">
                <h2 className="text-gray-500 text-sm">
                  No blood donors available at the moment.
                </h2>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedDonor && (
        <div
          className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center "
          onClick={handleClosePopup}
        >
            <div className="popup-inner bg-white  bg-opacity-100 shadow-inner rounded-3xl w-full backdrop-blur-sm mx-80 md:mx-10 sm:mx-5 xs:mx-5">
              <div className=" bg-black  p-6 rounded-t-3xl flex-col justify-center ">
                <button className=" justify-end float-end text-sm text-black hover:text-gray-700 hover:bg-gray-200 rounded-full bg-white ">
                  <IoClose size={24} onClick={handleClosePopup} />
                </button>
                <h2 className="text-base font-light text-white text-center">
                  Blood Donor Details
                </h2>
              </div>
              <div className="p-6">
                <div className="p-6  grid grid-cols-2 sm:grid-cols-none sm:gap-0 gap-4 text-sm font-semibold">
                  <div className="grid  mb-2 flex items-center">
                    <div className="mb-2 flex items-center">
                      <CiHospital1 className="text-gray-400 mr-2" />
                      <span className="font-light">Name:</span>{" "}
                      {selectedDonor.bloodDonorName}
                    </div>
                    <div className="mb-2 flex items-center">
                      <CiHospital1 className="text-gray-400 mr-2" />
                      <span className="font-light">Blood Group:</span>{" "}
                      {selectedDonor.bloodGroups}
                    </div>
                    <div className="mb-2 flex items-center">
                      <CiHospital1 className="text-gray-400 mr-2" />
                      <span className="font-light">District:</span>{" "}
                      {selectedDonor.district}
                    </div>
                    <div className="mb-2 flex items-center">
                      <CiHospital1 className="text-gray-400 mr-2" />
                      <span className="font-light">Email:</span>{" "}
                      {selectedDonor.email}
                    </div>
                  </div>
                  <div className="grid mb-2 flex items-center">
                    <div className="mb-2 flex items-center">
                      <CiHospital1 className="text-gray-400 mr-2" />
                      <span className="font-light">Address:</span>{" "}
                      {selectedDonor.location}
                    </div>
                    <div className="mb-2 flex items-center">
                      <CiHospital1 className="text-gray-400 mr-2" />
                      <span className="font-light">TP Number:</span>{" "}
                      {selectedDonor.tpNumber}
                    </div>
                    <div className="mb-2 flex items-center">
                      <CiHospital1 className="text-gray-400 mr-2" />
                      <span className="font-light">Donation status:</span>{" "}
                      {selectedDonor.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default FindBloodFromBloodDonors;
