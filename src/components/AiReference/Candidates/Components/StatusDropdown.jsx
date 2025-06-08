import React, { useState } from "react";
import { useUpdateCandidateStatus } from "../../../../hook/useCandidate";

const StatusDropdown = ({
  status,
  getStatusColor,
  translations,
  user,
  candidate,
  isOpen,
  onToggle,
}) => {
  const { mutate: updateCandidateStatus, isPending: isUpdating } =
    useUpdateCandidateStatus(user, {
      onSettled: () => {},
    });
  if (status === "Accepted" || status === "Rejected") {
    return (
      <div className="status-display" style={{ color: getStatusColor(status) }}>
        {translations[`Status_${status.replace('ed', '')}`]}
      </div>
    );
  }

  const options = [
    { value: "Accepted", label: translations.Status_Accept },
    { value: "Rejected", label: translations.Status_Reject },
  ];
  const handleSelect = (status) => {
    const candidateId = candidate._id;
    updateCandidateStatus({ candidateId, status });
    onToggle();
  };

  if (isUpdating) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="spinner-border spinner-border-sm text-primary"
          role="status"
        ></div>
      </div>
    );
  }

  return (
    <div className={`custom-status-dropdown ${isOpen ? "open" : ""}`}>      <div
        className={`status-trigger ${isOpen ? "open" : ""}`}
        onClick={onToggle}
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
              style={{ color: getStatusColor(option.label) }}
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
