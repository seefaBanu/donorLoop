import React, { useState } from "react";
import MultiSelectDropDown from "../MultiSelectDropDown";
import SingleSelectDropDown from "../SingleSelectDropDown";
import Services from "../../services/Services";

const AddRequestPopup = ({ onClose, token, userDetails }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    bloodBankId: userDetails.userid, // Assuming this is a fixed value or should be dynamically set
    bloodBankName: "",
    cluster: "",
    tpNumber: "",
    bloodNeeded: [],
    reqDate: "",
    status: "",
    location: "",
    specialNote: "",
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = {};
    if (!formData.bloodBankName)
      validationErrors.bloodBankName = "Blood Bank Name is required";
    if (!formData.cluster) validationErrors.cluster = "Cluster is required";
    if (!formData.tpNumber)
      validationErrors.tpNumber = "Mobile Number is required";
    if (formData.bloodNeeded.length === 0)
      validationErrors.bloodNeeded =
        "At least one Blood Needed type is required";
    if (!formData.reqDate)
      validationErrors.reqDate = "Requested Date is required";
    if (!formData.status) validationErrors.status = "Status is required";
    if (!formData.location) validationErrors.location = "Location is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const bloodRequest = { ...formData };

    Services.createBloodRequest(bloodRequest, token)
      .then((response) => {
        console.log("Blood request submitted:", response.data);
        onClose(); // Close the popup after successful submission
      })
      .catch((error) => {
        console.error("Error submitting blood request:", error);
      });
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBloodNeededChange = (selectedOptions) => {
    setFormData({ ...formData, bloodNeeded: selectedOptions });
  };

  const handleStatusChange = (selectedOption) => {
    setFormData({ ...formData, status: selectedOption });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white w-full max-w-max p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">Add Blood Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Blood Bank Name
              </label>
              <input
                type="text"
                name="bloodBankName"
                value={formData.bloodBankName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 text-sm font-light text-gray-500 border-gray-300 rounded-lg border  focus:border-white sm:text-sm"
              />
              {errors.bloodBankName && (
                <p className="text-red-500 text-sm">{errors.bloodBankName}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Cluster
              </label>
              <input
                type="text"
                name="cluster"
                value={formData.cluster}
                onChange={handleChange}
                className="mt-1 block w-full p-2 text-sm font-light text-gray-500 border-gray-300 rounded-lg border  focus:border-white sm:text-sm"
              />
              {errors.cluster && (
                <p className="text-red-500 text-sm">{errors.cluster}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="text"
              name="tpNumber"
              value={formData.tpNumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 text-sm font-light text-gray-500 border-gray-300 rounded-lg border  focus:border-white sm:text-sm"
            />
            {errors.tpNumber && (
              <p className="text-red-500 text-sm">{errors.tpNumber}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Blood Needed
            </label>
            <MultiSelectDropDown
              options={[
                "ANY",
                "A+",
                "A-",
                "B+",
                "B-",
                "O+",
                "O-",
                "AB+",
                "AB-",
              ]}
              selectedOptions={formData.bloodNeeded}
              onChange={handleBloodNeededChange}
            />
            {errors.bloodNeeded && (
              <p className="text-red-500 text-sm">{errors.bloodNeeded}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Requested Date
            </label>
            <input
              type="date"
              name="reqDate"
              value={formData.reqDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 text-sm font-light text-gray-500 border-gray-300 rounded-lg border  focus:border-white sm:text-sm"
            />
            {errors.reqDate && (
              <p className="text-red-500 text-sm">{errors.reqDate}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <SingleSelectDropDown
              options={["Urgent", "Critical", "Routine"]}
              selectedOption={formData.status}
              onChange={handleStatusChange}
            />
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full p-2 text-sm font-light text-gray-500 border-gray-300 rounded-lg border  focus:border-white sm:text-sm"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Special Note
            </label>
            <input
              type="text"
              name="specialNote"
              value={formData.specialNote}
              onChange={handleChange}
              className="mt-1 block w-full p-2 text-sm font-light text-gray-500 border-gray-300 rounded-lg border  focus:border-white sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRequestPopup;
