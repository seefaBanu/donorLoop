import React from "react";
import { useState } from "react";
import SingleSelectDropDown from "../Items/SingleSelectDropDown";
import Notification from "../Items/Notification";
import axios from "axios";
import Services from "../../services/Services";

const CreateBloodAvailability = ({
  bloodBankId,
  token,
  userDetails,
  fetchBloodAvailability,
}) => {
  const [notification, setNotification] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newBloodGroups, setNewBloodGroups] = useState([
    { bloodBankId, bloodGroup: "A+", bloodStatus: "NOT_SET" },
    { bloodBankId, bloodGroup: "A-", bloodStatus: "NOT_SET" },
    { bloodBankId, bloodGroup: "B+", bloodStatus: "NOT_SET" },
    { bloodBankId, bloodGroup: "B-", bloodStatus: "NOT_SET" },
    { bloodBankId, bloodGroup: "AB+", bloodStatus: "NOT_SET" },
    { bloodBankId, bloodGroup: "AB-", bloodStatus: "NOT_SET" },
    { bloodBankId, bloodGroup: "O+", bloodStatus: "NOT_SET" },
    { bloodBankId, bloodGroup: "O-", bloodStatus: "NOT_SET" },
  ]);

  const handleCreateBloodAvailability = async () => {
    const profileDTO = {
      bloodBankProfile: {
        bloodBankUserId: userDetails.userid || "",
        bloodBankName: userDetails.givenName || "",
        cluster: userDetails.cluster || "",
        tpNumber: userDetails.phoneNumber || "",
        location: userDetails.location || "",
        district: userDetails.district || "",
      },
      bloodAvailabilityList: newBloodGroups,
    };

    try {
      await Services.createBloodAvailability(profileDTO,token) ;
      fetchBloodAvailability();
      showNotification(
        "Success",
        "Blood Availability profile created successfully!",
        "success"
      );
      setShowCreatePopup(false);
    } catch (error) {
      console.error("Error creating blood availability:", error);
      showNotification(
        "Error",
        "Failed to create blood availability profile.",
        "error"
      );
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
    <div className="flex items-center align-middle text-center justify-center mt-20 ">
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
        />
      )}
      <div>
        <p className="text-center text-gray-700">
          No blood availability profile found for this blood bank.
        </p>
        <button
          onClick={() => setShowCreatePopup(true)}
          className="bg-black text-white px-4 py-2 rounded-3xl mt-5 hover:cursor-pointer hover:scale-105 transition duration-300"
        >
          Create Blood Availability Profile
        </button>
      </div>

      {showCreatePopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center rounded-3xl">
          <div className="bg-white rounded-3xl shadow-lg w-1/2 sm:w-full sm:m-10">
            <h2 className="text-xl text-white mb-4 p-6  bg-black rounded-t-3xl">
              Create Blood Availability Profile
            </h2>
            <div className="grid grid-cols-2 gap-4 p-6 ">
              {newBloodGroups.slice(0, 4).map((bloodGroup, index) => (
                <div key={index} className="mb-4 flex items-center gap-4">
                  <label className="text-sm flex-4 font-bold">
                    {bloodGroup.bloodGroup}
                  </label>
                  <div className="flex-1">
                    <SingleSelectDropDown
                      options={[
                        "AVAILABLE",
                        "OUT OF STOCK",
                        "LIMITED STOCK",
                        "NOT SET",
                      ]}
                      selectedOption={bloodGroup.bloodStatus}
                      onChange={(newStatus) =>
                        setNewBloodGroups((prev) =>
                          prev.map((group, i) =>
                            i === index
                              ? { ...group, bloodStatus: newStatus }
                              : group
                          )
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 px-6">
              {newBloodGroups.slice(4, 8).map((bloodGroup, index) => (
                <div key={index} className="mb-4 flex items-center gap-4">
                  <label className="text-sm flex-4 font-bold">
                    {bloodGroup.bloodGroup}
                  </label>
                  <div className="flex-1">
                    <SingleSelectDropDown
                      className=""
                      options={[
                        "AVAILABLE",
                        "OUT OF STOCK",
                        "LIMITED STOCK",
                        "NOT SET",
                      ]}
                      selectedOption={bloodGroup.bloodStatus}
                      onChange={(newStatus) =>
                        setNewBloodGroups((prev) =>
                          prev.map((group, i) =>
                            i === index + 4
                              ? { ...group, bloodStatus: newStatus }
                              : group
                          )
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-4 p-6">
              <button
                onClick={() => setShowCreatePopup(false)}
                className="border-2 text-black px-4 py-2 rounded-3xl hover:cursor-pointer hover:scale-105 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBloodAvailability}
                className="bg-black text-white px-4 py-2 rounded-3xl hover:cursor-pointer hover:scale-105 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBloodAvailability;
