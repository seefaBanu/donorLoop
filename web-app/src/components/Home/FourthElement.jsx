import React, { useState } from "react";
import heartsigIcon from "../../assets/heart_symbool.png";

const FourthElement = () => {
  const [isDonorView, setIsDonorView] = useState(true);

  const toggleView = () => {
    setIsDonorView(!isDonorView);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 sm:text-center ">
        {isDonorView
          ? "HOW TO CONTRIBUTE AS A DONOR"
          : "HOW TO CONTRIBUTE AS A BLOOD BANK"}
      </h1>
      <div className="relative w-full max-w-4xl overflow-hidden">
        <div
          className={`flex transition-transform duration-1000 ${
            isDonorView ? "" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center justify-center w-full flex-shrink-0 sm:flex-row">
            <div className="flex justify-between items-center w-full sm:flex-col space-x-4 sm:space-y-4 ">
              <div></div>
              <div className="text-center flex flex-1 h-full ">
                <div className="flex flex-col items-center justify-between bg-white rounded-3xl p-4 border-2 border-gray-300 flex-1">
                  <span className="text-5xl font-bold">1</span>
                  <span className="mt-2 font-bold">Register as a donor</span>
                  <p className="mt-4 text-gray-700">
                    Join our life-saving community by completing a simple
                    registration process.
                  </p>
                </div>
              </div>
              <div className="text-center flex flex-1  h-full">
                <div className="flex flex-col items-center  justify-between bg-white rounded-3xl p-4 border-2 border-gray-300 flex-1">
                  <span className="text-5xl font-bold">2</span>
                  <span className="mt-2 font-bold">
                    Set your status to "Ready to Donate"
                  </span>
                  <p className="mt-4 text-gray-700">
                    Update your status to indicate your willingness to donate
                    when the need arises.
                  </p>
                </div>
              </div>
              <div className="text-center flex-1 flex h-full">
                <div className="flex flex-col items-center justify-between bg-white rounded-3xl p-4 border-2 border-gray-300 flex-1">
                  <span className="text-5xl font-bold">3</span>
                  <span className="mt-2 font-bold">
                    Find Blood Requests and Camp Details
                  </span>
                  <p className="mt-4 text-gray-700">
                    Stay informed about urgent blood requests and upcoming
                    donation camps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full flex-shrink-0 sm:flex-row">
            <div className="flex justify-between items-center w-full sm:flex-col space-x-4 sm:space-y-4 ">
              <div></div>
              <div className="text-center flex-1 flex h-full">
                <div className="flex flex-col items-center justify-between bg-white rounded-3xl p-4 border-2 border-gray-300 flex-1">
                  <span className=" text-5xl l font-bold">1</span>
                  <span className="mt-2 font-bold">
                    Register as a Blood Bank
                  </span>
                  <p className="mt-4 text-gray-700">
                    Join our life-saving community by completing a simple
                    registration process.
                  </p>
                </div>
              </div>
              <div className="text-center flex-1 flex  h-full">
                <div className="flex flex-col items-center justify-between bg-white rounded-3xl p-4 border-2 border-gray-300 flex-1">
                  <span className="text-5xl font-bold">2</span>
                  <span className="mt-2 font-bold">Create Blood Requests</span>
                  <p className="mt-4 text-gray-700">
                    Update Blood Requests that Blood Donors and Blood Banks can
                    view.
                  </p>
                </div>
              </div>
              <div className="text-center flex-1 flex  h-full">
                <div className="flex flex-col items-center justify-between bg-white rounded-3xl p-4 border-2 border-gray-300 flex-1">
                  <span className="text-5xl font-bold">3</span>
                  <span className="mt-2 font-bold">
                    Find Blood and Create Camps
                  </span>
                  <p className="mt-4 text-gray-700">
                    Stay informed about urgent blood requests and upcoming
                    donation camps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={toggleView}
        className="mt-8 px-4 py-2 bg-black text-white rounded-3xl hover:bg-gray-800"
      >
        {isDonorView ? "View as Blood Bank" : "View as Donor"}
      </button>
    </div>
  );
};

export default FourthElement;
