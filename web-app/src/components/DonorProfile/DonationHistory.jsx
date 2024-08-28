import React, { useEffect, useState } from "react";
import { IoSearchCircle } from "react-icons/io5";
import AddDonationPopup from "./AddDonationPopup";
import ConfirmationPopup from "../Items/ConfirmationPopup";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import Services from "../../services/Services";

const DonationHistory = ({ userDetails, token }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [donationToDelete, setDonationToDelete] = useState(null);

  useEffect(() => {
    fetchDonations();
  }, [token, userDetails.userid]);

  const fetchDonations = async () => {
    try {
      const response = await Services.getDonationHistoryByBloodDonorId(
        userDetails.userid,
        token
      );
      if (response.ok) {
        const data = await response.json();
        setDonations(data);
      } else {
        console.error("Failed to fetch donation history");
      }
    } catch (error) {
      console.error("Error fetching donation history:", error);
    }
  };

  const handleAddDonation = (donation) => {
    setDonations([...donations, donation]);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/donation-history/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setDonations(
          donations.filter((donation) => donation.donationHistoryId !== id)
        );
        fetchDonations();
      } else {
        console.error("Failed to delete donation history");
      }
    } catch (error) {
      console.error("Error deleting donation history:", error);
    }
    setIsConfirmationPopupOpen(false);
  };

  const handleEdit = (donation) => {
    setSelectedDonation(donation);
    setIsPopupOpen(true);
  };

  const confirmDelete = (id) => {
    setDonationToDelete(id);
    setIsConfirmationPopupOpen(true);
  };

  const handleAddClickDonation = () => {
    setSelectedDonation(null);
    setIsPopupOpen(true);
  };

  return (
    <div>
      <div className="flex justify-end p-8 gap-8 align-middle">
        {/* <div className="flex border my-auto border-gray-300 font-light px-4 text-sm text-gray-400 p-2 gap-4 rounded-3xl items-center align-middle ">
          Search Donations
          <IoSearchCircle className="w-4 h-4" />
        </div> */}
        <div
          onClick={() => {
            handleAddClickDonation();
          }}
          className="flex border bg-black align-middle my-auto text-white text-sm p-2 rounded-3xl hover:bg-white hover:text-black hover:border transition duration-500 "
        >
          <p>+ Add New Donation</p>
        </div>
      </div>
      <div className="flex flex-col w-full rounded-3xl p-8 sm:p-4 overflow-x-auto ">
        <div className="flex flex-col w-full sm:w-fit ">
          <div className="flex flex-row justify-between">
            <th className="flex-1 px-4 text-center border-gray-300 text-gray-500 font-light text-sm">
              Date & Time
            </th>
            <th className="flex-1 px-4 text-center border-gray-300 text-gray-500 font-light text-sm">
              Blood Units
            </th>
            <th className="flex-1 px-4 text-center border-gray-300 text-gray-500 font-light text-sm">
              Location
            </th>
            <th className="flex-1 px-4 text-center border-gray-300 text-gray-500 font-light text-sm">
              Actions
            </th>
          </div>
        </div>
        <div className="flex flex-col w-full my-2  sm:w-fit rounded-3xl">
          {donations.length === 0 && (
            <div className="flex justify-center text-gray-500  bg- bg-gray-200 font-base text-sm p-4 rounded-3xl">
              You have no donations yet
            </div>
          )}
          {donations.map((donation) => (
            <div
              key={donation.donationHistoryId}
              className="flex py-3 w-full  font-light text-sm flex-row bg-white my-1 rounded-3xl justify-between "
            >
              <div className="flex-1 px-4 text-center ">
                {new Date(donation.donatedDate).toLocaleString()}
              </div>
              <div className="flex-1 px-4 text-center ">
                {donation.bloodUnits} Units
              </div>
              <div className="flex-1 px-4 text-center ">
                {donation.donatedLocation}
              </div>
              <div className="flex-1 px-4 text-center flex gap-4 justify-center">
                <button
                  onClick={() => handleEdit(donation)}
                  className="text-gray-500 hover:cursor-pointer"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => confirmDelete(donation.donationHistoryId)}
                  className="text-gray-500 hover:cursor-pointer"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddDonationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleAddDonation}
        userDetails={userDetails}
        token={token}
        selectedDonation={selectedDonation}
      />
      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        message="Are you sure you want to delete this donation history? This cannot be undone"
        onConfirm={() => handleDelete(donationToDelete)}
        onCancel={() => setIsConfirmationPopupOpen(false)}
      />
    </div>
  );
};

export default DonationHistory;
