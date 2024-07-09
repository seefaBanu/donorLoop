import React, { useState } from "react";
import MultiSelectDropDown from "../Items/MultiSelectDropDown";
import SingleSelectDropDown from "../Items/SingleSelectDropDown";
import Services from "../../services/Services";

const AddRequestPopup = ({ onClose, token, userDetails }) => {
  const [formData, setFormData] = useState({
    bloodBankId: userDetails.userid, // Assuming this is a fixed value or should be dynamically set
    bloodBankName: userDetails.givenName || "",
    cluster: userDetails.cluster || "",
    tpNumber: "",
    bloodNeeded: [],
    reqDate: "",
    status: "",
    location: userDetails.location || "",
    district: "",
    specialNote: "",
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = {};
    if (!formData.tpNumber)
      validationErrors.tpNumber = "Mobile Number is required";
    if (formData.bloodNeeded.length === 0)
      validationErrors.bloodNeeded =
        "At least one Blood Needed type is required";
    if (!formData.reqDate)
      validationErrors.reqDate = "Requested Date is required";
    if (!formData.status) validationErrors.status = "Status is required";
    if (!formData.district) validationErrors.district = "Location is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const bloodRequest = { ...formData };
    setLoading(true);
    Services.createBloodRequest(bloodRequest, token)
      .then((response) => {
        console.log("Blood request submitted:", response.data);
        onClose(); // Close the popup after successful submission
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error submitting blood request:", error);
      });
  };

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
      <div className="bg-white w-full mx-16 rounded-3xl sm:mx-8">
        <div className="bg-black text-white p-8 py-6 text-center rounded-t-3xl">
          <h2 className="text-2xl font-bold">Add Blood Request</h2>
          <h3 className="text-sm font-light text-gray-400 ">
           Enter the details of the Blood Request
        </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex flex-row gap-4 ">
            <div className="mb-4 w-full">
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
            <div className="mb-4 w-full">
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
              District
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="mt-1 block w-full p-2 text-sm font-light text-gray-500 border-gray-300 rounded-lg border  focus:border-white sm:text-sm"
            />
            {errors.district && (
              <p className="text-red-500 text-sm">{errors.district}</p>
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
              className="mr-4 py-2 px-4 border border-transparent text-sm font-medium rounded-3xl text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            {loading ? ( <p className="text-sm text-gray-500">Loading...</p>) : (
            <button
              type="submit"
              className="py-2 px-4 border border-transparent text-sm font-medium rounded-3xl text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Request
            </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRequestPopup;
