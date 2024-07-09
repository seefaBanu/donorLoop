import React, { useState, useEffect } from "react";
import Notification from "../Items/Notification";
import axios from "axios";

const AddDonationPopup = ({ isOpen, onClose, token, userDetails, selectedDonation, onSubmit }) => {
  const [date, setDate] = useState("");
  const [units, setUnits] = useState("");
  const [location, setLocation] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (selectedDonation) {
      setDate(new Date(selectedDonation.donatedDate).toISOString().split("T")[0]);
      setUnits(selectedDonation.bloodUnits);
      setLocation(selectedDonation.donatedLocation);
    } else {
      setDate("");
      setUnits("");
      setLocation("");
    }
  }, [selectedDonation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationData = {
      bloodDonorId: userDetails.userid,
      donatedDate: date,
      bloodUnits: units,
      donatedLocation: location,
      createdTime: new Date(),
    };

    try {
      let response;
      if (selectedDonation) {
        // Update donation
        donationData.donationHistoryId = selectedDonation.donationHistoryId;
        response = await axios.put(
          `http://localhost:8080/donation-history/update`,
          donationData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // Create new donation
        response = await axios.post(
          `http://localhost:8080/donation-history/create`,
          donationData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      onSubmit(response.data);
      showNotification("Success", "Donation History saved successfully!", "success");
      onClose();
    } catch (error) {
      console.error("Error saving donation history", error);
      showNotification("Error", "Failed to save donation history!", "error");
    }
  };

  const showNotification = (title, message, type) => {
    setNotification({
      title,
      message,
      type,
    });

    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <div
      className={`fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center z-50 transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
        />
      )}
      <div
        className={`bg-white rounded-3xl shadow-lg w-96 transition-transform duration-300 ${
          isOpen ? "transform scale-100" : "transform scale-95"
        }`}
      >
        <div className="bg-black text-white p-8 py-6 text-center rounded-t-3xl">
        <h2 className="text-lg font-bold mb-2›">
          {selectedDonation ? "Edit Donation History" : "Add Donation History"}
        </h2>
        <h3 className="text-sm font-light text-gray-400 ">
           Enter the details of your recent blood donation.
        </h3>
        </div>
        <form onSubmit={handleSubmit} className="p-8 " >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 ">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border-[1px] p-2 text-gray-500  rounded-md shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-0"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Blood Units</label>
            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="mt-1 block w-full border-[1px] p-2 text-gray-500  rounded-md shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-0"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full border-[1px] p-2 text-gray-500  rounded-md shadow-sm focus:border-black focus:ring focus:ring-black focus:ring-opacity-0"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-3xl hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-3xl hover:bg-gray-900"
            >
              {selectedDonation ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDonationPopup;
