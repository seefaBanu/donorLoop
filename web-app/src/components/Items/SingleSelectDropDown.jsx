import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

const SingleSelectDropDown = ({ options, selectedOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionChange = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="flex flex-row items-center justify-between border rounded-lg px-2 py-1"
        onClick={toggleDropdown}
      >
        <p className="text-gray-500 text-sm font-light">
          {selectedOption || 'Select status'}
        </p>
        <IoMdArrowDropdown className="text-gray-500" />
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <div key={option} className="flex items-center px-4 py-2">
              <input
                type="radio"
                className="form-radio"
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
              />
              <label className="ml-2 text-gray-700 text-sm">{option}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleSelectDropDown;
