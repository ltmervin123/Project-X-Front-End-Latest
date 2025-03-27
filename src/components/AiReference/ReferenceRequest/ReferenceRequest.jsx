import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddRequestPopUp from "../AddRequestPopUp";
import DeleteConfirmationReferenceRequestPopUp from "./PopUpComponents/DeleteConfirmationReferenceRequestPopUp"; // Import the confirmation popup
import EditRequestPopUp from "./PopUpComponents/EditRequestPopUp"; // Add this line
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ReferenceRequestDetailsPopUp from "./PopUpComponents/ReferenceRequestDetailsPopUp";
import ViewRequest from "./Components/ViewRequest";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../utils/socket/socketSetup";

const ReferenceRequest = () => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const companyId = USER?.id;
  const token = USER?.token;
  const navigate = useNavigate();
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showViewRequest, setShowViewRequest] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  const [selectedReferee, setSelectedReferee] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedReference, setSelectedReference] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for delete confirmation
  const [referenceToDelete, setReferenceToDelete] = useState(null); // State to hold the reference ID to delete
  const [showTooltip, setShowTooltip] = useState(false);

  // For fade in smooth animation
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsSearchVisible(true), 100),
      setTimeout(() => setIsContainerVisible(true), 500),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const toggleDropdown = () => {
    setTimeout(() => {
      setIsExpanded(true);
    }, 50);
  };

  const [reference, setReference] = useState(
    JSON.parse(localStorage.getItem("reference")) || []
  );
  const timeoutRef = useRef(null);
  const abortControllerRef = useRef(new AbortController());

  const fetchReference = async ({ signal } = {}) => {
    try {
      const URL = `${API}/api/ai-referee/company-request-reference/get-reference-request-by-companyId/${companyId}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      });

      if (response.status === 200) {
        localStorage.setItem(
          "reference",
          JSON.stringify(response.data.reference)
        );
        setReference(response.data.reference);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const reFetchReference = async ({ signal }) => {
    try {
      await fetchReference(signal);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleReferenceSubmitted = async (data) => {
      if (data?.completed) {
        await reFetchReference(abortControllerRef.current);
      }
    };

    socket.off("referenceSubmitted");
    socket.on("referenceSubmitted", (data) => {
      handleReferenceSubmitted(data);
    });
  }, []);

  async function refetchAllData(timeoutRef, abortController) {
    if (abortController.signal.aborted) return;

    try {
      await Promise.all([reFetchReference({ signal: abortController.signal })]);
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Request aborted");
        return;
      }
      console.error("Fetch error:", error);
    }

    if (!abortController.signal.aborted) {
      timeoutRef.current = setTimeout(
        () => refetchAllData(timeoutRef, abortController),
        60000 // 1 minute
      );
    }
  }

  useEffect(() => {
    refetchAllData(timeoutRef, abortControllerRef.current);

    return () => {
      // Clear timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Abort fetch requests
      abortControllerRef.current.abort();
    };
  }, []);

  const handleAddNewRequest = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddReference = async () => {
    await reFetchReference(abortControllerRef.current);
  };

  const handleViewDetails = (referee) => {
    // setSelectedCandidate(candidate);
    setSelectedReferee(referee);
    setShowDetailsPopup(true);
  };
  const handleSetCandidate = (referenceId) => {
    const referenceFound = reference.find((ref) => ref._id === referenceId);
    setSelectedCandidate(referenceFound);

    // Show the dropdown immediately when a candidate is selected
    setShowDropDown(true);
    setIsExpanded(false);
    // If the dropdown is already shown, set a timeout to hide it after 2 seconds
    if (showDropDown) {
      setShowDropDown(false);
    }
  };
  const handleViewRequest = () => {
    setShowViewRequest(true);
  };

  const handleCloseDetailsPopup = () => {
    setShowDetailsPopup(false);
  };

  const formatDate = (date) => {
    if (!date) return ""; // Return an empty string or a fallback value if the date is invalid
    return date.split("T")[0]; // Extract only YYYY-MM-DD
  };

  // Function to get the color based on status
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

  // Function to get the color based on status
  const getStatusColorForCandidate = (status) => {
    const statusParts = status.split(" ");
    const count = parseInt(statusParts[0], 10);
    const statusType = statusParts.slice(1).join(" ");

    switch (statusType) {
      case "In Progress":
        return count > 0 ? "#F8BD00" : "black";
      case "Completed":
        return count > 0 ? "#1877F2" : "black";
      case "New":
        return count > 0 ? "#319F43" : "black";
      default:
        return "black";
    }
  };

  const filteredReferences = reference
    .slice()
    .reverse()
    .filter((reference) => {
      const candidateMatch =
        reference.candidate &&
        reference.candidate.toLowerCase().includes(searchQuery.toLowerCase());
      const refereeMatch =
        reference.referee &&
        reference.referee.toLowerCase().includes(searchQuery.toLowerCase());
      const positionMatch =
        reference.position &&
        reference.position.toLowerCase().includes(searchQuery.toLowerCase());

      return candidateMatch || refereeMatch || positionMatch;
    });
  const calculateCandidateStatus = (reference) => {
    const statuses = reference.referees.map((referee) => referee.status);

    const inProgressCount = statuses.filter(
      (status) => status === "In Progress"
    ).length;

    const completedCount = statuses.filter(
      (status) => status === "Completed"
    ).length;

    const expiredCount = statuses.filter(
      (status) => status === "Expired"
    ).length;

    return { inProgressCount, completedCount, expiredCount };
  };
  const handleToggleOptions = (candidateId, event) => {
    const { clientY } = event; // Get the Y position of the click
    setVisibleOptions((prev) => {
      // If the clicked candidate's options are already visible, hide it; otherwise, show it
      if (prev[candidateId]) {
        return { ...prev, [candidateId]: false };
      }
      // Hide options for all other candidates and show options for the clicked candidate
      const updatedOptions = {};
      updatedOptions[candidateId] = true;
      return updatedOptions;
    });

    const optionsElement = document.getElementById(`options-${candidateId}`);
    if (optionsElement) {
      optionsElement.style.top = `${clientY}px`; // Adjust the positioning as needed
    }
  };

  const handleEditReference = (referenceId) => {
    const recordFound = reference.find((ref) => ref._id === referenceId);
    if (recordFound) {
      // Check if recordFound is valid
      setSelectedReference(recordFound);
      setShowEditPopup(true);
    }
  };
  const handleDeleteReference = (referenceId) => {
    setReferenceToDelete(referenceId); // Set the reference ID to delete
    setShowDeleteConfirmation(true); // Show the delete confirmation popup
  };
  const confirmDeleteReference = async () => {
    try {
      const URL = `${API}/api/ai-referee/company-request-reference/delete-reference-request/${referenceToDelete}`;
      const response = await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await fetchReference(abortControllerRef.current);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowDeleteConfirmation(false); // Close the confirmation popup
      setReferenceToDelete(null); // Reset the reference ID
    }
  };

  // Conditional rendering based on showViewRequest state
  if (showViewRequest) {
    return (
      <ViewRequest
        referenceId={selectedCandidate._id}
        refereeId={selectedReferee._id}
        token={token}
        refereeQuestionFormat={selectedReferee.questionFormat}
      />
    );
  }
  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div className="d-flex justify-content-between align-items-end ">
        <div>
          <h3 className="mb-0">Reference Request</h3>
          <p className="mb-2">
            Manage and track reference checks for your candidates.
          </p>
        </div>

        {/* <button
          onClick={handleAddNewRequest}
          className="btn-create-new-candidate d-flex align-items-center justify-content-center gap-1"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.7487 20.0384H20.0404V27.7467C20.0404 28.1556 19.8779 28.5477 19.5888 28.8369C19.2997 29.126 18.9076 29.2884 18.4987 29.2884C18.0898 29.2884 17.6977 29.126 17.4086 28.8369C17.1195 28.5477 16.957 28.1556 16.957 27.7467V20.0384H9.2487C8.83982 20.0384 8.44769 19.876 8.15858 19.5869C7.86946 19.2977 7.70703 18.9056 7.70703 18.4967C7.70703 18.0879 7.86946 17.6957 8.15858 17.4066C8.44769 17.1175 8.83982 16.9551 9.2487 16.9551H16.957V9.24674C16.957 8.83787 17.1195 8.44574 17.4086 8.15662C17.6977 7.8675 18.0898 7.70508 18.4987 7.70508C18.9076 7.70508 19.2997 7.8675 19.5888 8.15662C19.8779 8.44574 20.0404 8.83787 20.0404 9.24674V16.9551H27.7487C28.1576 16.9551 28.5497 17.1175 28.8388 17.4066C29.1279 17.6957 29.2904 18.0879 29.2904 18.4967C29.2904 18.9056 29.1279 19.2977 28.8388 19.5869C28.5497 19.876 28.1576 20.0384 27.7487 20.0384Z"
              fill="white"
            />
          </svg>
          New Reference Request
        </button>
        {showPopup && (
          <AddRequestPopUp
            onClose={handleClosePopup}
            onAddRequest={handleAddReference}
          />
        )} */}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center search-candidates">
          <div
            className={`search-wrapper position-relative fade-in ${
              isSearchVisible ? "visible" : ""
            }`}
          >
            <input
              type="text"
              placeholder="Search request..."
              className="form-control ps-4 pe-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
        </div>
      </div>

      <div
        className={`AiReference-candidates-container Reference-Request fade-in ${
          isSearchVisible ? "visible" : ""
        }`}
      >
        <div className="AiReference-table-title">
          <h4 className="mb-0 d-flex gap-2 align-items-center">
            Reference Requests Lists
            <div className="position-relative d-flex">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <path
                  d="M9 11C9 11.2652 8.89464 11.5196 8.70711 11.7071C8.51957 11.8946 8.26522 12 8 12C7.73478 12 7.48043 11.8946 7.29289 11.7071C7.10536 11.5196 7 11.2652 7 11C7 10.7348 7.10536 10.4804 7.29289 10.2929C7.48043 10.1054 7.73478 10 8 10C8.26522 10 8.51957 10.1054 8.70711 10.2929C8.89464 10.4804 9 10.7348 9 11ZM7.5 4C6.83696 4 6.20107 4.26339 5.73223 4.73223C5.26339 5.20107 5 5.83696 5 6.5H7C7 6.36739 7.05268 6.24021 7.14645 6.14645C7.24021 6.05268 7.36739 6 7.5 6H8.146C8.2321 6.00004 8.31566 6.02917 8.38313 6.08265C8.45061 6.13614 8.49803 6.21086 8.51771 6.29468C8.53739 6.3785 8.52818 6.46651 8.49156 6.54444C8.45495 6.62237 8.39309 6.68564 8.316 6.724L7 7.382V9H9V8.618L9.211 8.512C9.69063 8.27189 10.0752 7.87692 10.3024 7.39105C10.5296 6.90517 10.5862 6.35683 10.463 5.8348C10.3398 5.31276 10.044 4.8476 9.62346 4.51461C9.20296 4.18162 8.68238 4.0003 8.146 4H7.5Z"
                  fill="#F46A05"
                />
                <path
                  d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM8 2C7.21207 2 6.43185 2.15519 5.7039 2.45672C4.97595 2.75825 4.31451 3.20021 3.75736 3.75736C3.20021 4.31451 2.75825 4.97595 2.45672 5.7039C2.15519 6.43185 2 7.21207 2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2Z"
                  fill="#F46A05"
                />
              </svg>
              {showTooltip && (
                <span className="job-tooltip-text">
                  The Reference Requests page allows you to manage and track all
                  reference checks for your candidates. This is where you
                  monitor their completed references.
                </span>
              )}
            </div>
          </h4>
          <p>Overview of all reference requests.</p>
        </div>
        {reference && reference.length > 0 ? (
          <>
            <table className="reference-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Position</th>
                  <th className="text-center">Referees</th>
                  <th>Status</th>
                  <th className="text-center">Date Sent</th>
                  <th className="text-center">Date Due</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reference
                  .slice()
                  .reverse()
                  .filter((reference) => {
                    const candidateMatch =
                      reference.candidate &&
                      reference.candidate
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    const refereeMatch =
                      reference.referee &&
                      reference.referee
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    const positionMatch =
                      reference.position &&
                      reference.position
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());

                    return candidateMatch || refereeMatch || positionMatch;
                  })
                  .map((reference) => (
                    <React.Fragment key={reference._id}>
                      <tr>
                        <td>{reference.candidate}</td>
                        <td>{reference.position}</td>
                        <td className="text-center">
                          {reference.referees &&
                          Array.isArray(reference.referees) &&
                          reference?.referees &&
                          reference.referees.length > 1
                            ? `${reference.referees.length} Referees`
                            : "1 Referee"}
                        </td>
                        <td>
                          {(() => {
                            const status = calculateCandidateStatus(reference);
                            return (
                              <>
                                {status.inProgressCount === 0 &&
                                status.completedCount === 0 &&
                                status.expiredCount === 0 ? (
                                  <span style={{ color: "black" }}>
                                    No Status
                                  </span>
                                ) : (
                                  <>
                                    {status.inProgressCount > 0 && (
                                      <span
                                        style={{
                                          color: getStatusColor("In Progress"),
                                        }}
                                      >
                                        {status.inProgressCount} In Progress
                                      </span>
                                    )}
                                    {status.completedCount > 0 && (
                                      <>
                                        {status.inProgressCount > 0 && (
                                          <>&nbsp;</>
                                        )}
                                        <span
                                          style={{
                                            color: getStatusColor("Completed"),
                                          }}
                                        >
                                          {status.completedCount} Completed
                                        </span>
                                      </>
                                    )}
                                    {status.expiredCount > 0 && (
                                      <>
                                        {status.inProgressCount > 0 ||
                                          (status.completedCount > 0 && (
                                            <>&nbsp;</>
                                          ))}
                                        <span
                                          style={{
                                            color: getStatusColor("Expired"),
                                          }}
                                        >
                                          {status.expiredCount} Expired
                                        </span>
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            );
                          })()}
                        </td>
                        <td className="text-center">
                          {formatDate(reference.dateSent)}
                        </td>
                        <td className="text-center">
                          {formatDate(reference.dueDate)}
                        </td>
                        <td className="d-flex gap-2 align-items-center justify-content-center w-100 ">
                          <div className="position-relative d-flex justify-content-center">
                            <button
                              className={`btn-view-details ${
                                showDropDown &&
                                selectedCandidate._id === reference._id
                                  ? "hide"
                                  : ""
                              }`}
                              onClick={() => {
                                handleSetCandidate(reference._id);
                                toggleDropdown();
                              }}
                            >
                              {showDropDown &&
                              selectedCandidate._id === reference._id
                                ? "Hide Reports"
                                : "View Reports"}
                            </button>
                            <div className="action-menu">
                              <p
                                className="m-0 "
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  handleToggleOptions(reference._id, e)
                                } // Pass the candidate's ID and event to handleToggleOptions
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
                                {visibleOptions[reference._id] && (
                                  <div className="action-options-reference">
                                    {/* <p
                                    className="d-flex align-items-center gap-2"
                                    onClick={() =>
                                      handleEditReference(reference._id)
                                    } // Ensure this line calls the edit function
                                    style={{ cursor: "pointer" }}
                                  >
                                    <FaEdit />
                                    Edit
                                  </p> */}
                                    <p
                                      className="d-flex align-items-center gap-2"
                                      onClick={() =>
                                        handleDeleteReference(reference._id)
                                      }
                                      style={{
                                        cursor: "pointer",
                                        color: "red",
                                      }}
                                    >
                                      <FaTrash />
                                      Delete
                                    </p>
                                  </div>
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {showDropDown &&
                        selectedCandidate._id === reference._id && (
                          <div className="d-flex align-items-center justify-content-start w-100">
                            <div
                              className={`reference-dropdown-container mb-2 ${
                                isExpanded ? "expanded" : ""
                              }`}
                            >
                              <b className="py-2 pb-2 ">
                                {reference.referees &&
                                Array.isArray(reference.referees) &&
                                reference.referees.length > 0
                                  ? reference.referees.length === 1
                                    ? "Referee"
                                    : "Referees"
                                  : "No Referees"}
                              </b>
                              <div className="referee-list w-100 d-flex gap-2 mt-2">
                                {showDropDown && selectedCandidate?.referees ? (
                                  selectedCandidate.referees.map((referee) => (
                                    <div
                                      className="referee-item mb-4"
                                      key={referee?._id}
                                    >
                                      <div classNamesv="referee-details">
                                        <div className="d-flex justify-content-between mb-1">
                                          <div className="referee-left-container d-flex align-items-center">
                                            <span className="referee-name mb-1">
                                              {referee?.name}
                                            </span>
                                          </div>
                                          <div className="d-flex align-items-end">
                                            <span
                                              className="referee-status mb-1 text-center"
                                              style={{
                                                color: getStatusColor(
                                                  referee?.status
                                                ),
                                              }}
                                            >
                                              {referee?.status}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                          <div className="referee-left-container d-flex align-items-center">
                                            <p className="referee-position">
                                              {referee?.position}
                                            </p>
                                            <p className="referee-email m-0">
                                              {referee?.email}
                                            </p>
                                          </div>
                                          <div className="d-flex align-items-end">
                                            <button
                                              className="btn-view-details"
                                              onClick={() =>
                                                handleViewDetails(referee)
                                              }
                                            >
                                              View Referee
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div
                                    className="referee-item"
                                    key={selectedCandidate?._id}
                                  >
                                    <div className="referee-details">
                                      <div className="d-flex justify-content-between mb-1">
                                        <span className="referee-name">
                                          {selectedCandidate?.referee}
                                        </span>
                                        <span
                                          className="referee-status"
                                          style={{
                                            color: getStatusColor(
                                              selectedCandidate?.status
                                            ),
                                          }}
                                        >
                                          {selectedCandidate?.status}
                                        </span>
                                      </div>
                                      <div className="d-flex justify-content-between">
                                        <div className="referee-left-container d-flex align-items-center">
                                          <p className="referee-position">
                                            {
                                              selectedCandidate?.question
                                                ?.formatType
                                            }
                                            position diri addi
                                          </p>
                                          <p className="referee-email m-0 ">
                                            {selectedCandidate?.refereeEmail}
                                          </p>
                                        </div>
                                        <div className="d-flex align-items-end">
                                          <button
                                            className="btn-view-details"
                                            onClick={() =>
                                              handleViewDetails(
                                                selectedCandidate?._id
                                              )
                                            }
                                          >
                                            View Referee
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                    </React.Fragment>
                  ))}
                {reference.filter((ref) => {
                  const candidateMatch =
                    ref.candidate &&
                    ref.candidate
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());
                  const refereeMatch =
                    ref.referee &&
                    ref.referee
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());
                  const positionMatch =
                    ref.position &&
                    ref.position
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());
                  return candidateMatch || refereeMatch || positionMatch;
                }).length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Reference requests not found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        ) : (
          <div>No reference requests record</div>
        )}
      </div>
      {showDeleteConfirmation && (
        <DeleteConfirmationReferenceRequestPopUp
          onClose={() => setShowDeleteConfirmation(false)} // Close the confirmation popup
          onConfirmDelete={confirmDeleteReference} // Confirm deletion
        />
      )}
      {/* {showEditPopup && selectedReference && (
        <EditRequestPopUp
          onClose={() => setShowEditPopup(false)}
          onEditRequest={handleAddReference}
          requestData={selectedReference} 
        />
      )} */}
      {showDetailsPopup && selectedCandidate && (
        <ReferenceRequestDetailsPopUp
          candidate={selectedCandidate}
          referee={selectedReferee}
          onClose={handleCloseDetailsPopup}
          onViewReference={handleViewRequest}
        />
      )}
    </div>
  );
};

export default ReferenceRequest;
