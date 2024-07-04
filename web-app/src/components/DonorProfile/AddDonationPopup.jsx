import React, { useState } from "react";
import Notification from "../Notification";

const AddDonationPopup = ({ isOpen, onClose, onSubmit }) => {
  const [date, setDate] = useState("");
  const [units, setUnits] = useState("");
  const [location, setLocation] = useState("");
  const [notification, setNotification] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, units, location });
    showNotification();
    onClose(); // Close the popup after submission
  };

  const showNotification = () => {
    setNotification({
      title: "Success",
      message: "Donation History saved successfully!",
      type: "success",
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
          insert={notification.insert}
          container={notification.container}
          duration={notification.duration}
        />
      )}
      <div
        className={`bg-white p-8 rounded-3xl shadow-lg w-96 transition-transform duration-300 ${
          isOpen ? "transform scale-100" : "transform scale-95"
        }`}
      >
        <h2 className="text-lg font-bold mb-2">Add Donation History</h2>
        <h3 className="text-sm font-light text-gray-500 mb-6">
          Please enter the details of your recent blood donation.
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Blood Units</label>
            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              className="bg-red-600 text-white px-6 py-2 rounded-3xl hover:bg-red-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDonationPopup;
