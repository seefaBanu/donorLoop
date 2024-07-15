import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaTint,
} from "react-icons/fa";

const AboutDonor = ({ userDetails, userGroup }) => {
  const [address, setAddress] = useState("-");

  useEffect(() => {
    if (userDetails && userDetails.address) {
      setAddress(userDetails.address.street_address);
    }
  }, [userDetails]);

  return (
    <div className="bg-gray-200 p-8 rounded-3xl max-w mx-auto mt-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <FaUser className="w-4 h-4 mr-4 text-gray-400" />
          <div className="font-semibold text-gray-700">
            {userDetails.givenName || "John Doe"}
          </div>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="w-4 h-4 mr-4 text-gray-400" />
          <div className="text-gray-700 font-light">
            {userDetails.email || "john.doe@example.com"}
          </div>
        </div>

        {userGroup.includes("blood_bank") ? (
          <div className="flex items-center">
            <FaMapMarkerAlt className="w-4 h-4 mr-4 text-gray-400" />
            <div className="text-gray-700 font-light">
              {userDetails.district || "-"}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center">
              <FaTint className="w-4 h-4 mr-4 text-gray-400" />
              <div className="text-gray-700 font-light">
                {userDetails.bloodgroup}
              </div>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="w-4 h-4 mr-4 text-gray-400" />
              <div className="text-gray-700 font-light">{userDetails.district}</div>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="w-4 h-4 mr-4 text-gray-400" />
              <div className="text-gray-700 font-light">{address}</div>
            </div>
          </>
        )}
        <div className="flex items-center">
          <FaPhone className="w-4 h-4 mr-4 text-gray-400" />
          <div className="text-gray-700 font-light">
            {userDetails.phone || "(123) 456-7890"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDonor;
