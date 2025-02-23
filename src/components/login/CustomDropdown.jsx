import React, { useState } from "react";

const CustomDropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  // Function to format the display of options
  const formatOption = (option) => {
    switch (option) {
      case "MOCK_AI":
        return "Mock AI";
      case "AI_REFERENCE":
        return "AI Reference Checker";
      default:
        return option; // Fallback for any other options
    }
  };

  return (
    <div
      className={`login-custom-dropdown ${isOpen ? "open" : ""}`}
      onClick={toggleDropdown}
    >
      <div className={`dropdown-header ${isOpen ? "open" : ""}`}>
        {formatOption(selectedOption)}
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map((option) => (
            <div
              key={option}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {formatOption(option)} {/* Format the display of each option */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;