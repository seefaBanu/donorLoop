import React from "react";
import { IoSearchCircle } from "react-icons/io5";
import AddDonationPopup from "./AddDonationPopup";
import { useState } from "react";

const DonationHistory = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [donations, setDonations] = useState([]);

  const handleAddDonation = (donation) => {
    setDonations([...donations, donation]);
  };
  return (
    <div>
      <div className="flex justify-end p-8 gap-8 align-middle">
        <div className="flex border my-auto border-gray-300 font-light px-4 text-sm text-gray-400 p-2 gap-4 rounded-3xl items-center align-middle ">
          Search Donations
          <IoSearchCircle className="w-4 h-4" />
        </div>
        <div onClick={() => setIsPopupOpen(true)} className="flex border bg-black align-middle my-auto text-white text-sm p-2 rounded-3xl hover:bg-white hover:text-black hover:border transition duration-500">
          <p >+ Add New Donation</p>
        </div>
      </div>

      <div className="flex flex-col min-w-full bg-gray-200 rounded-3xl p-8 ">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <th className="py-2 px-4 text-left w-1/3 border-gray-300 text-gray-500 font-light text-sm">
              Date
            </th>
            <th className="py-2 px-4 text-left w-1/3 borde r-gray-300 text-gray-500 font-light text-sm">
              Blood Units
            </th>
            <th className="py-2 px-4 text-left w-1/3 border-gray-300 text-gray-500 font-light text-sm">
              Location
            </th>
          </div>
        </div>
        <div className="flex flex-col my-2">
          <div className="flex p-2 font-light text-sm flex-row  bg-white my-2 rounded-3xl">
            <div className="py-2 px-4 w-1/3 ">01/01/2023</div>
            <div className="py-2 px-4 w-1/3 ">2 Units</div>
            <div className="py-2 px-4 w-1/3 ">New York, NY</div>
          </div>
          <div className="flex p-2 font-light text-sm flex-row  bg-white my-2 rounded-3xl">
            <div className="py-2 px-4 w-1/3 ">01/01/2023</div>
            <div className="py-2 px-4 w-1/3 ">2 Units</div>
            <div className="py-2 px-4 w-1/3 ">New York, NY</div>
          </div>
          <div className="flex p-2 font-light text-sm flex-row  bg-white my-2 rounded-3xl">
            <div className="py-2 px-4 w-1/3 ">01/01/2023</div>
            <div className="py-2 px-4 w-1/3 ">2 Units</div>
            <div className="py-2 px-4 w-1/3 ">New York, NY</div>
          </div>

          {/* Add more donation history rows here */}
        </div>
      </div>
      <AddDonationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleAddDonation}
      />
    </div>
  );
};

export default DonationHistory;
