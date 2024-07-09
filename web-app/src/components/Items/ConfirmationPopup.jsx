import React from "react";

const ConfirmationPopup = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <div
      className={`fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center z-50 transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white p-8 rounded-3xl shadow-lg w-96 transition-transform duration-300 ${
          isOpen ? "transform scale-100" : "transform scale-95"
        }`}
      >
        <h2 className="text-lg font-bold mb-4">Confirmation</h2>
        <p className="text-sm font-light text-gray-500 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-3xl hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-600 text-white px-6 py-2 rounded-3xl hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
