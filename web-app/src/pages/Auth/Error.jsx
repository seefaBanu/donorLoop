import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ErrorIcon from "../../assets/planet.png";

export const Error = () => {
    const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoHome = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/");
    }, 1000); // Simulate a delay
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <img src={ErrorIcon} className="w-[20%] h-[20%]" alt="Error" />
      <h1 className="text-xl font-semibold text-gray-500 mb-2">
        Something Went Wrong
      </h1>
      <p className="text-sm font-light text-gray-500 mb-6">
        We encountered an error while processing your request. Please try again
        later.
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleGoHome}
          className="bg-gray-600 text-white px-4 py-2 rounded-3xl hover:bg-gray-700 transition duration-300 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            "Refresh Page"
          )}
        </button>
      </div>
    </div>
  );
};

export default Error;
