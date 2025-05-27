import React, { useState } from 'react';

const StatusDropdown = ({ status, onChange, getStatusColor, translations }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (status === 'Accept' || status === 'Reject') {
    return (
      <div 
        className="status-display"
        style={{ color: getStatusColor(status) }}
      >
        {translations[`Status_${status}`]}
      </div>
    );
  }

  const options = [
    { value: 'Accept', label: translations.Status_Accept },
    { value: 'Reject', label: translations.Status_Reject }
  ];

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`custom-status-dropdown ${isOpen ? 'open' : ''}`}>
      <div 
        className={`status-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: getStatusColor(status) }}
      >
        {translations[`Status_${status}`]}
      </div>
      {isOpen && (
        <div className="status-options">
          {options.map((option) => (
            <div
              key={option.value}
              className="status-option"
              onClick={() => handleSelect(option.value)}
              style={{ color: getStatusColor(option.value) }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
