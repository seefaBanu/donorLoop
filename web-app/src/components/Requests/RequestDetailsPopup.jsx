import React from "react";
import { IoClose } from "react-icons/io5";
import { CiHospital1 } from "react-icons/ci";
import { GiArrowCluster } from "react-icons/gi";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { MdBloodtype } from "react-icons/md";
import {
  IoLocationSharp,
  IoMailSharp,
  IoDocumentTextSharp,
} from "react-icons/io5";

const RequestDetailsPopup = ({ request, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-3xl z-10 w-1/3 relative w-[50%]">
        <div className="bg-black p-6 rounded-t-3xl flex justify-center items-center relative">
          <h2 className=" text-base font-light text-white">
            Blood Request Details
          </h2>
          <button
            className="absolute top-4 text-sm right-4 text-black hover:text-gray-700 hover:bg-gray-200 rounded-full bg-white"
            onClick={onClose}
          >
            <IoClose size={24} />
          </button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4 text-sm font-semibold">
          <div className="mb-2 flex items-center">
            <CiHospital1 className="text-gray-400 mr-2" />
            <span className="font-light">Blood Bank:</span>{" "}
            {request.bloodBankName}
          </div>
          <div className="mb-2 flex items-center">
            <GiArrowCluster className="text-gray-400 mr-2" />
            <span className="font-light">Cluster:</span> {request.cluster}
          </div>
          <div className="mb-2 flex items-center">
            <GiArrowCluster className="text-gray-400 mr-2" />
            <span className="font-light">Mobile Number:</span>{" "}
            {request.tpNumber}
          </div>
          <div className="mb-2 flex items-center">
            <MdBloodtype className="text-gray-400 mr-2" />
            <span className="font-light">Blood Needed:</span>{" "}
            {request.bloodNeeded}
          </div>
          <div className="mb-2 flex items-center">
            <IoDocumentTextSharp className="text-gray-400 mr-2" />
            <span className="font-light">Requested Date:</span>{" "}
            {new Date(request.reqDate).toLocaleString()}
          </div>
          <div className="mb-2 flex items-center">
            <GrStatusCriticalSmall className="text-gray-400 mr-2" />
            <span className="font-light">Status:</span> {request.status}
          </div>
          <div className="mb-2 flex items-center">
            <IoLocationSharp className="text-gray-400 mr-2" />
            <span className="font-light">District:</span> {request.district}
          </div>
          {/* <div className="mb-2 flex items-center">
            <IoMailSharp className="text-gray-400 mr-2" />
            <span className="font-light">Email:</span> {request.email}
          </div> */}
          <div className="mb-2 flex items-center">
            <IoDocumentTextSharp className="text-gray-400 mr-2" />
            <span className="font-light">Additional Notes:</span>{" "}
            {request.additionalNotes}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsPopup;
