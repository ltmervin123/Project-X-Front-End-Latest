import React, { useState } from "react";
import { useSnappcheckTranslation } from "./Hooks/useTranslation";

const CustomDropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useSnappcheckTranslation();

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
        return t('MOCK_AI_LABEL');
      case "AI_REFERENCE":
        return t('AI_REF_CHECKER_LABEL');
      default:
        return option; // Fallback for any other options
    }
  };

  return (
    <div
      className={`login-custom-dropdown d-none ${isOpen ? "open" : ""}`}
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
              {formatOption(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;