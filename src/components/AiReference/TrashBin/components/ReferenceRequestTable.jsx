import React, { useState } from "react";
import { FaTrashRestore, FaTrash } from "react-icons/fa";
import DeleteConfirmationReferenceRequestPopUp from "../PopUpComponents/DeletePopup/DeleteConfirmationReferenceRequestPopUp";
import RestoreConfirmationReferenceRequestPopUp from "../PopUpComponents/RestorePopup/RestoreConfirmationReferenceRequestPopUp";

const ReferenceRequestTable = ({
  data,
  selectedItems,
  onSelect,
  onRestore,
  onDelete,
  showCheckboxes,
  isDeletingReferenceRequest,
  isRestoringReferenceRequest,
}) => {
  const [visibleOptions, setVisibleOptions] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showRestoreConfirmation, setShowRestoreConfirmation] = useState(false);
  const selectedCount = selectedItems.length;

  const handleToggleOptions = (candidateId, event) => {
    event.stopPropagation(); // Stop event propagation here
    const { clientY } = event;
    setVisibleOptions((prev) => {
      if (prev[candidateId]) {
        return { ...prev, [candidateId]: false };
      }
      const updatedOptions = {};
      updatedOptions[candidateId] = true;
      return updatedOptions;
    });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirmation(true);
    setVisibleOptions({});
  };

  const handleRestoreClick = (e) => {
    e.stopPropagation();
    setShowRestoreConfirmation(true);
    setVisibleOptions({});
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(data._id);
    } catch (error) {
      console.error("Error deleting reference request: ", error);
    } finally {
      setShowDeleteConfirmation(false);
    }
  };

  const handleConfirmRestore = async () => {
    try {
      await onRestore(data._id);
    } catch (error) {
      console.error("Error restoring reference request: ", error);
    } finally {
      setShowRestoreConfirmation(false);
    }
  };

  const filterDataBySearch = (requests, searchTerm) => {
    return requests.filter((request) => {
      const referees = request.referees;
      const refereesString = Array.isArray(referees)
        ? referees.join(", ")
        : typeof referees === "string"
        ? referees
        : "";
      return refereesString.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "#F8BD00";
      case "Expired":
        return "#FF0000";
      case "Completed":
        return "#1877F2";
      case "New":
        return "#319F43";
      default:
        return "black";
    }
  };
  function concatenateStatus() {
    if (!Array.isArray(data.status)) return "";

    const statusCount = {};

    data.status.forEach((status) => {
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    return Object.entries(statusCount)
      .map(([status, count]) => `${count} ${status}`)
      .join(" - ");
  }

  return (
    <>
      <tr
        className={selectedItems.includes(data._id) ? "table-active" : ""}
        onClick={() => onSelect(data._id)}
        style={{ cursor: "pointer" }}
      >
        {/* Add stopPropagation to checkbox container */}
        <td
          style={{ width: "30px", cursor: "pointer" }}
          onClick={(e) => e.stopPropagation()}
        >
          {" "}
          <input
            type="checkbox"
            className="form-check-input custom-checkbox"
            checked={selectedItems.includes(data._id)}
            onChange={() => onSelect(data._id)}
          />
        </td>

        {/* <td style={{ width: "12%" }}>{data.applicant}</td> */}
        <td>{data.applicant}</td>
        <td className="text-center">{data.referees}</td>
        <td>
          {(() => {
            const concatenatedStatus = concatenateStatus();
            if (!concatenatedStatus) {
              return <span style={{ color: "black" }}>No Status</span>;
            }
            return concatenatedStatus.split(" - ").map((status, index) => {
              const [count, ...statusParts] = status.split(" ");
              const statusText = statusParts.join(" ");
              return (
                <span key={index} style={{ color: getStatusColor(statusText) }}>
                  {count} {statusText}
                  {index !== concatenatedStatus.split(" - ").length - 1 && " "}
                </span>
              );
            });
          })()}
        </td>
        <td className="text-center">
          {data.deletedAt.toString().split("T")[0]}
        </td>
        <td className="position-relative text-center">
          <div className="action-menu d-flex justify-content-center align-items-center">
            <p
              className="m-0 position-relative"
              style={{ cursor: "pointer" }}
              onClick={(e) => handleToggleOptions(data._id, e)}
            >
              <svg
                className="menu-icon-request"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.6562 18.6875C13.6562 19.2594 13.4291 19.8078 13.0247 20.2122C12.6203 20.6166 12.0719 20.8437 11.5 20.8438C10.9281 20.8437 10.3797 20.6166 9.9753 20.2122C9.57093 19.8078 9.34375 19.2594 9.34375 18.6875C9.34375 18.1156 9.57093 17.5672 9.9753 17.1628C10.3797 16.7584 10.9281 16.5312 11.5 16.5312C12.0719 16.5312 12.6203 16.7584 13.0247 17.1628C13.4291 17.5672 13.6562 18.1156 13.6562 18.6875ZM13.6562 11.5C13.6562 12.0719 13.4291 12.6203 13.0247 13.0247C12.6203 13.4291 12.0719 13.6562 11.5 13.6562C10.9281 13.6562 10.3797 13.4291 9.9753 13.0247C9.57093 12.6203 9.34375 12.0719 9.34375 11.5C9.34375 10.9281 9.57093 10.3797 9.9753 9.9753C10.3797 9.57093 10.9281 9.34375 11.5 9.34375C12.0719 9.34375 12.6203 9.57093 13.0247 9.9753C13.4291 10.3797 13.6562 10.9281 13.6562 11.5ZM13.6562 4.3125C13.6562 4.88437 13.4291 5.43282 13.0247 5.8372C12.6203 6.24157 12.0719 6.46875 11.5 6.46875C10.9281 6.46875 10.3797 6.24157 9.9753 5.8372C9.57093 5.43282 9.34375 4.88437 9.34375 4.3125C9.34375 3.74063 9.57093 3.19218 9.9753 2.7878C10.3797 2.38343 10.9281 2.15625 11.5 2.15625C12.0719 2.15625 12.6203 2.38343 13.0247 2.7878C13.4291 3.19218 13.6562 3.74063 13.6562 4.3125Z"
                  fill="black"
                />
              </svg>
              {visibleOptions[data._id] && (
                <div className="action-options">
                  <p
                    className="d-flex align-items-center gap-2"
                    onClick={handleRestoreClick}
                    style={{ cursor: "pointer" }}
                  >
                    <FaTrashRestore />
                    Restore
                  </p>
                  <p
                    className="d-flex align-items-center gap-2"
                    onClick={handleDeleteClick}
                    style={{ cursor: "pointer", color: "red" }}
                  >
                    <FaTrash />
                    Delete
                  </p>
                </div>
              )}
            </p>
          </div>
        </td>
      </tr>
      {showDeleteConfirmation && (
        <DeleteConfirmationReferenceRequestPopUp
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirmDelete={handleConfirmDelete}
          selectedCount={selectedCount}
          isSingleItem={selectedCount === 1}
          isAll={selectedCount === data.length}
          isDeletingReferenceRequest={isDeletingReferenceRequest}
        />
      )}
      {showRestoreConfirmation && (
        <RestoreConfirmationReferenceRequestPopUp
          onClose={() => setShowRestoreConfirmation(false)}
          onConfirmRestore={handleConfirmRestore}
          selectedCount={selectedCount}
          isSingleItem={selectedCount === 1}
          isAll={selectedCount === data.length}
          isRestoringReferenceRequest={isRestoringReferenceRequest}
        />
      )}
    </>
  );
};

export default ReferenceRequestTable;
