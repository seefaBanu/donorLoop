import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import Notification from "../Notification";

const BloodAvailability = () => {
  const [bloodGroups, setBloodGroups] = useState([
    { group: "A+", availability: "Available" },
    { group: "A-", availability: "Out of Stock" },
    { group: "B+", availability: "Limited Stock" },
    // Add more blood groups as needed
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [availabilityEdits, setAvailabilityEdits] = useState({});
  const [notification, setNotification] = useState(null);

  const handleEditClick = (index) => {
    setEditIndex(index);
    setAvailabilityEdits((prevEdits) => ({
      ...prevEdits,
      [index]: bloodGroups[index].availability,
    }));
  };

  const handleAvailabilityChange = (index, newAvailability) => {
    setAvailabilityEdits((prevEdits) => ({
      ...prevEdits,
      [index]: newAvailability,
    }));
  };

  const handleSaveAll = (e) => {
    e.preventDefault();
    const updatedBloodGroups = bloodGroups.map((bloodGroup, index) => ({
      ...bloodGroup,
      availability: availabilityEdits[index] || bloodGroup.availability,
    }));
    setBloodGroups(updatedBloodGroups);
    showNotification();
    setEditIndex(null);
    setAvailabilityEdits({});
  };

  const handleCancel = () => {
    setAvailabilityEdits({});
    setEditIndex(null);
  };

  const showNotification = () => {
    setNotification({
      title: "Success",
      message: "Blood Availablity changes saved successfully!",
      type: "success",
    });

    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  return (
    <div>
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
      <div className="space-y-4 mt-5">
        <div className="flex justify-between text-gray-400 text-sm font-light px-4">
          <p>Blood Group</p>
          <p>Availability Status</p>
        </div>
        {bloodGroups.map((bloodGroup, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-white rounded-lg"
          >
            <div className="text-gray-700">{bloodGroup.group}</div>
            {editIndex === index ? (
              <div className="flex items-center">
                <select
                  value={availabilityEdits[index] || bloodGroup.availability}
                  onChange={(e) =>
                    handleAvailabilityChange(index, e.target.value)
                  }
                  className="inset-0 rounded px-2 py-1 mr-2"
                >
                  <option value="Available" className="inset-0">
                    Available
                  </option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Limited Stock">Limited Stock</option>
                </select>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="text-gray-700 mr-4">
                  {bloodGroup.availability}
                </div>
                <button
                  onClick={() => handleEditClick(index)}
                  className=" text-gray-500 px-3 py-1 "
                >
                  <MdEdit />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <button
          className="border-2 text-black  px-4 py-2 rounded-3xl mt-5 hover:cursor-pointer hover:scale-105 transition duration-300"
          onClick={handleCancel}
        >
          Clear
        </button>
        <button
          onClick={(e) => handleSaveAll(e)}
          className="bg-black text-white px-4 py-2 rounded-3xl mt-5 hover:cursor-pointer hover:scale-105 transition duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default BloodAvailability;
