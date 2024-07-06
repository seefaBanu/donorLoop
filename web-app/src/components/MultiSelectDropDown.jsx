import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

const MultiSelectDropDown = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionChange = (option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    onChange(newSelectedOptions);
  };

  return (
    <div className="relative">
      <div
        className="flex flex-row items-center justify-between border rounded-lg px-2 py-1"
        onClick={toggleDropdown}
      >
        <p className="text-gray-500 text-sm font-light">
          {Array.isArray(selectedOptions) && selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select options'}
        </p>
        <IoMdArrowDropdown className="text-gray-500" />
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <div key={option} className="flex items-center px-4 py-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedOptions.includes(option)}
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

export default MultiSelectDropDown;
