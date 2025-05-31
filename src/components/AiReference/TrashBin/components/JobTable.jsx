import { useState, memo, useCallback } from "react";
import { FaTrashRestore, FaTrash } from "react-icons/fa";
import DeleteConfirmationJobPopUp from "../PopUpComponents/DeletePopup/DeleteConfirmationJobPopUp";
import RestoreConfirmationJobPopUp from "../PopUpComponents/RestorePopup/RestoreConfirmationJobPopUp";

const JobTable = ({
  data,
  selectedCount,
  isSelected,
  onSelect,
  onRestore,
  onDelete,
  isDeletingJobs,
  isRestoringJobs,
  labels,
}) => {
  const [visibleOptions, setVisibleOptions] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showRestoreConfirmation, setShowRestoreConfirmation] = useState(false);

  const handleToggleOptions = (candidateId, event) => {
    event.stopPropagation();

    const { clientY } = event;
    setVisibleOptions((prev) => {
      if (prev[candidateId]) {
        return { ...prev, [candidateId]: false };
      }

      const updatedOptions = {};
      updatedOptions[candidateId] = true;
      return updatedOptions;
    });

    const optionsElement = document.getElementById(`options-${candidateId}`);
    if (optionsElement) {
      optionsElement.style.top = `${clientY}px`;
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirmation(true);
    setVisibleOptions({});
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(data._id);
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setShowDeleteConfirmation(false);
    }
  };

  const handleRestoreClick = (e) => {
    e.stopPropagation();
    setShowRestoreConfirmation(true);
    setVisibleOptions({});
  };

  const handleConfirmRestore = async () => {
    try {
      await onRestore(data._id);
    } catch (error) {
      console.error("Error restoring job:", error);
    } finally {
      setShowRestoreConfirmation(false);
    }
  };

  const mapDepartmentToKey = useCallback((dept) => {
    const manualMapping = {
      "Human Resources (HR)": "hr",
      "IT (Information Technology)": "it",
      "Research and Development (R&D)": "rAndD",
      "Public Relations (PR)": "pr",
      "Business Development": "businessDev",
      "Customer Service": "customerService",
      "Risk Management": "riskManagement",
      "Product Development": "productDevelopment",
      "Logistics, Supply Chain & Procurement": "logistics",
    };

    if (manualMapping[dept]) {
      return manualMapping[dept];
    }

    return dept
      .toLowerCase()
      .replace(/[\s()&]/g, "")
      .replace(/and/g, "And")
      .replace(
        /(^[a-z]|[A-Z])[a-z]*/g,
        (word) => word.charAt(0).toLowerCase() + word.slice(1)
      );
  }, []);

  return (
    <>
      <tr
        className={isSelected ? "table-active" : ""}
        onClick={() => onSelect(data._id)}
        style={{ cursor: "pointer" }}
      >
        <td
          style={{ width: "30px", cursor: "pointer" }}
          onClick={(e) => e.stopPropagation()}
        >
          {" "}
          <input
            type="checkbox"
            className="form-check-input custom-checkbox"
            checked={isSelected}
            onChange={() => onSelect(data._id)}
          />
        </td>
        <td>{data.jobName}</td>
        <td>
          {data.department
            ? labels.departments[mapDepartmentToKey(data.department)] ||
              data.department
            : "Department not specified"}
        </td>
        <td>{data.hiringManager}</td>
        <td>{data.deletedAt.toString().split("T")[0]}</td>
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
                    {labels.restore}
                  </p>
                  <p
                    className="d-flex align-items-center gap-2"
                    onClick={handleDeleteClick}
                    style={{
                      cursor: "pointer",
                      color: "red",
                    }}
                  >
                    <FaTrash />
                    {labels.delete}
                  </p>
                </div>
              )}
            </p>
          </div>
        </td>
      </tr>
      {showDeleteConfirmation && (
        <DeleteConfirmationJobPopUp
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirmDelete={handleConfirmDelete}
          selectedCount={selectedCount}
          isSingleItem={selectedCount === 1}
          isAll={selectedCount === data.length}
          isDeletingJobs={isDeletingJobs}
        />
      )}
      {showRestoreConfirmation && (
        <RestoreConfirmationJobPopUp
          onClose={() => setShowRestoreConfirmation(false)}
          onConfirmRestore={handleConfirmRestore}
          selectedCount={selectedCount}
          isSingleItem={selectedCount === 1}
          isAll={selectedCount === data.length}
          isRestoringJobs={isRestoringJobs}
        />
      )}
    </>
  );
};

export default memo(JobTable, (prevProps, nextProps) => {
  return (
    prevProps.data._id === nextProps.data._id &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.isDeletingJobs === nextProps.isDeletingJobs &&
    prevProps.isRestoringJobs === nextProps.isRestoringJobs
  );
});
