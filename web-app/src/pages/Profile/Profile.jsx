import React, { useEffect } from "react";
import { useState } from "react";
import AboutDonor from "../../components/DonorProfile/AboutDonor";
import TopProfile from "../../components/DonorProfile/TopProfile";
import DonationHistory from "../../components/DonorProfile/DonationHistory";
import BloodAvailablity from "../../components/DonorProfile/BloodAvailablity";

export const Profile = ({ userDetails, userGroup, token }) => {
  const [activeTab, setActiveTab] = useState("About");

  return (
    <div className=" px-4 py-8 mt-20">
      <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8 ">
        <TopProfile userDetails={userDetails} token={token} />
        <div className="mt-8 w-full max-w-4xl rounded-3xl ">
          <div className="flex ">
            <button
              className={`px-4 py-2  rounded-t-lg ${
                activeTab === "About"
                  ? " text-black border-b-2 border-gray-900 hover:scale-100"
                  : " text-gray-700 hover:scale-105 transition duration-300"
              }`}
              onClick={() => setActiveTab("About")}
            >
              About
            </button>
            {userGroup.includes("blood_bank") ? (
              <button
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === "Blood Availablity"
                    ? " text-black border-b-2 border-gray-900 hover:scale-100"
                    : " text-gray-700 hover:scale-105 transition duration-300"
                }`}
                onClick={() => setActiveTab("Blood Availablity")}
              >
                Blood Availablity
              </button>
            ) : (
              <button
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === "Donation History"
                    ? " text-black border-b-2 border-gray-900 hover:scale-100"
                    : " text-gray-700 hover:scale-105 transition duration-300"
                }`}
                onClick={() => setActiveTab("Donation History")}
              >
                Donation History
              </button>
            )}
          </div>
          <hr className="border-gray-300" />
          <div className="p-4 ">
            {activeTab === "About" && <AboutDonor userDetails={userDetails} />}
            {activeTab === "Donation History" && <DonationHistory  userDetails={userDetails} token={token} />}
            {activeTab === "Blood Availablity" && <BloodAvailablity userDetails={userDetails} token={token} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
