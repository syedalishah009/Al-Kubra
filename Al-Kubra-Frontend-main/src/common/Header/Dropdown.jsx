import React, { useState } from "react";

const Dropdown = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <div className="cursor-pointer" onClick={toggleDropdown}>
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 py-2 w-40 bg-white border rounded shadow">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={closeDropdown} // Close dropdown on option click
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
