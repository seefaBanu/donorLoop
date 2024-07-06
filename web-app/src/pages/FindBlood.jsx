import React, { useState } from "react";
import FindBloodFromBloodBanks from "../components/FindBlood/FindBloodFromBloodBanks";
import FindBloodFromBloodDonors from "../components/FindBlood/FindBloodFromBloodDonors";

const FindBlood = () => {
  const [activeTab, setActiveTab] = useState("Blood Banks");

  return (
    <div className="p-8 ">
      <div className="fixed flex flex-row top-20 w-full left-0 right-0 justify-between">
        <button
          className={`flex-1 text-sm  text-center py-2 ${
            activeTab === "Blood Banks"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("Blood Banks")}
        >
          Blood Banks
        </button>
        <button
          className={`flex-1 text-sm  text-center py-2 ${
            activeTab === "Blood Donors"
            ? "bg-black text-white "
            : "bg-white text-black hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("Blood Donors")}
        >
          Blood Donors
        </button>
      </div>

      <div className="rounded-3xl">
        <div>
          {activeTab === "Blood Banks" ? (
            <FindBloodFromBloodBanks />
          ) : (
            <FindBloodFromBloodDonors />
          )}
        </div>
      </div>
    </div>
  );
};

export default FindBlood;
