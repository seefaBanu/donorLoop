import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import Notification from "../Items/Notification";
import axios from "axios";
import SingleSelectDropDown from "../Items/SingleSelectDropDown";
import CreateBloodAvailability from "./CreateBloodAvailability";
import Spinner from "../Items/Spinner";
import Snackbar from "@mui/material/Snackbar";
import Services from "../../services/Services";

const BloodAvailability = ({ userDetails, token }) => {
  const [bloodGroups, setBloodGroups] = useState([]);
  const bloodBankId = userDetails.userid;
  const [editIndex, setEditIndex] = useState(null);
  const [availabilityEdits, setAvailabilityEdits] = useState({});
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeout, setTimeoutState] = useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    fetchBloodAvailability();
  }, []);

  const fetchBloodAvailability = async () => {
    try {
      const response = await Services.getBloodAvailability(bloodBankId, token);
      setBloodGroups(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blood availability:", error);
      setLoading(false); // Ensure loading state is set to false on error
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setAvailabilityEdits((prevEdits) => ({
      ...prevEdits,
      [index]: bloodGroups[index].bloodStatus,
    }));
  };

  const handleAvailabilityChange = (index, newAvailability) => {
    setAvailabilityEdits((prevEdits) => ({
      ...prevEdits,
      [index]: newAvailability,
    }));
  };

  const handleUpdateStatus = async (bloodGroup, index) => {
    try {
      const updatedBloodGroup = await updateBloodAvailabilityStatus(bloodGroup);
      if (updatedBloodGroup) {
        // setState({ ...state, open: true });
        const updatedBloodGroups = [...bloodGroups];
        updatedBloodGroups[index] = updatedBloodGroup;
        setBloodGroups(updatedBloodGroups);
        // showNotification(
        //   "Success",
        //   "Blood Availability status updated successfully!",
        //   "success"
        // );
        setEditIndex(null);
        setAvailabilityEdits({});
        fetchBloodAvailability();
      }
    } catch (error) {
      console.error("Error updating blood availability status:", error);
      showNotification(
        "Error",
        "Failed to update blood availability status.",
        "error"
      );
    }
  };

  const updateBloodAvailabilityStatus = async (bloodGroup) => {
    const updatedStatus = availabilityEdits[bloodGroup.bloodAvailabilityId];
    console.log("Updated status:", updatedStatus);
    try {
      const response = await Services.updateBloodAvailabilityStatus(bloodGroup.bloodAvailabilityId, updatedStatus, token );
      return response.data;
    } catch (error) {
      console.error("Error updating blood availability status:", error);
      throw error;
    }
  };

  const handleCancel = () => {
    setAvailabilityEdits({});
    setEditIndex(null);
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

  if (loading) {
    return timeout ? (
      <div className="w-full text-center mt-20">
        Request timed out. Please try again later.
      </div>
    ) : (
      <Spinner />
    );
  }

  if (bloodGroups.length === 0) {
    return (
      <CreateBloodAvailability
        bloodBankId={bloodBankId}
        token={token}
        userDetails={userDetails}
        fetchBloodAvailability={fetchBloodAvailability}
      />
    );
  }

  const handleSnackBarClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
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
            <div className="flex  text-gray-700">{bloodGroup.bloodGroup}</div>
            {editIndex === index ? (
              <div className="flex flex-row align-middle w-3/6 justify-end text-right items-center space-x-4 ">
                <div className="flex-2 w-full">
                  <SingleSelectDropDown
                    options={[
                      "AVAILABLE",
                      "OUT OF STOCK",
                      "LIMITED STOCK",
                      "NOT SET",
                    ]}
                    selectedOption={
                      availabilityEdits[bloodGroup.bloodAvailabilityId] ||
                      bloodGroup.bloodStatus
                    }
                    onChange={(newStatus) =>
                      handleAvailabilityChange(
                        bloodGroup.bloodAvailabilityId,
                        newStatus
                      )
                    }
                  />
                </div>
                <button
                  className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleUpdateStatus(bloodGroup, index)}
                >
                  Update
                </button>
                <button
                  className="flex text-gray-500 px-3 py-1"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="text-gray-700 mr-4">
                  {bloodGroup.bloodStatus}
                </div>
                <button
                  onClick={() => handleEditClick(index)}
                  className="text-gray-500 px-3 py-1"
                >
                  <MdEdit />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodAvailability;
