import React from "react";

const RequestDetailsPopup = ({ request, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-sm font-light mb-4">Request Details</h2>
        <p>
          <span className="font-light">Blood Bank:</span> {request.bloodBank}
        </p>
        <p>
          <span className="font-bold">Cluster:</span> {request.cluster}
        </p>
        <p>
          <span className="font-bold">Mobile Number:</span>{" "}
          {request.mobileNumber}
        </p>
        <p>
          <span className="font-bold">Blood Needed:</span> {request.bloodNeeded}
        </p>
        <p>
          <span className="font-bold">Requested Date:</span>{" "}
          {request.requestedDate}
        </p>
        <p>
          <span className="font-bold">Status:</span> {request.status}
        </p>
        <p>
          <span className="font-bold">More Details:</span> {request.details}
        </p>
      </div>
    </div>
  );
};

export default RequestDetailsPopup;
