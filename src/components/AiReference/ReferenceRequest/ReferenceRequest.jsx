import React, { useEffect, useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteConfirmationReferenceRequestPopUp from "./PopUpComponents/DeleteConfirmationReferenceRequestPopUp";
import { FaTrash, FaSearch } from "react-icons/fa";
import ReferenceRequestDetailsPopUp from "./PopUpComponents/ReferenceRequestDetailsPopUp";
import ViewRequest from "./Components/ViewRequest";
import axios from "axios";
import { socket } from "../../../utils/socket/socketSetup";

const ReferenceRequest = () => {
  const queryClient = useQueryClient();
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const companyId = USER?.id;
  const token = USER?.token;
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showViewRequest, setShowViewRequest] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  const [selectedReferee, setSelectedReferee] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); 
  const [referenceToDelete, setReferenceToDelete] = useState(null); 
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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      abortControllerRef.current.abort();
    };
  }, []);

  const handleViewDetails = (referee) => {
    setSelectedReferee(referee);
    setShowDetailsPopup(true);
  };
  const handleSetCandidate = (referenceId) => {
    const referenceFound = reference.find((ref) => ref._id === referenceId);
    setSelectedCandidate(referenceFound);

    setShowDropDown(true);
    setIsExpanded(false);

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
    if (!date) return "";
    return date.split("T")[0];
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

  const filteredReferences = reference
    .slice()
    .reverse()
    .filter((reference) => {
      const candidateMatch = (() => {
        const c = reference.candidate;
        if (typeof c === "string") {
          return c.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (typeof c === "object" && c !== null) {
          const fullName = `${c.firstName || ""} ${c.lastName || ""}`.trim();
          return fullName.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })();

      const refereeMatch =
        reference.referee &&
        reference.referee.toLowerCase().includes(searchQuery.toLowerCase());
      const positionMatch =
        reference.position &&
        reference.position.toLowerCase().includes(searchQuery.toLowerCase());
      const statusMatch = reference.referees.some((referee) =>
        referee.status.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return candidateMatch || refereeMatch || positionMatch || statusMatch;
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

  const handleDeleteReference = (referenceId) => {
    setReferenceToDelete(referenceId);
    setShowDeleteConfirmation(true);
  };
  const confirmDeleteReference = async () => {
    setIsDeleting(true);
    try {
      const URL = `${API}/api/ai-referee/company-request-reference/delete-reference-request/${referenceToDelete}`;
      const response = await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await fetchReference(abortControllerRef.current);
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceRequest"],
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false);
      setReferenceToDelete(null);
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
        onClose={() => {
          setShowViewRequest(false);
          setShowDetailsPopup(false);
        }}
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
              placeholder="Search by reference request..."
              className="form-control ps-4 pe-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
        </div>
      </div>

      <div
        className={`AiReference-reference-request-container fade-in ${
          isSearchVisible ? "visible" : ""
        }`}
      >
        <div className="AiReference-table-title">
          <h4 className="mb-0 d-flex gap-2 align-items-center">
            Reference Request List
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
                  Review and manage reference requests for candidates, track
                  their status, and take action.{" "}
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
                {filteredReferences.length > 0 ? (
                  filteredReferences.map((reference) => (
                    <React.Fragment key={reference._id}>
                      <tr>
                        <td data-label="Candidate">
                          {`${reference.candidate.firstName} ${reference.candidate.lastName}`}
                        </td>
                        <td data-label="Position">{reference.position}</td>
                        <td data-label="Referees" className="text-center">
                          {reference.referees &&
                          Array.isArray(reference.referees) &&
                          reference.referees.length > 1
                            ? `${reference.referees.length} Referees`
                            : "1 Referee"}
                        </td>
                        <td data-label="Status">
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
                        <td data-label="Date Sent" className="text-center">
                          {formatDate(reference.dateSent)}
                        </td>
                        <td data-label="Date Due" className="text-center">
                          {formatDate(reference.dueDate)}
                        </td>
                        <td data-label="Actions" className="d-flex gap-2 align-items-center justify-content-center w-100">
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
                                }
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
                                {showDropDown &&
                                  selectedCandidate?.referees &&
                                  selectedCandidate.referees.map((referee) => (
                                    <div
                                      className="referee-item mb-4"
                                      key={referee?._id}
                                    >
                                      <div className="referee-details">
                                        <div className="d-flex justify-content-between mb-1">
                                          <div className="referee-left-container d-flex align-items-center">
                                            <span className="referee-name mb-1">
                                              {typeof referee?.name === "string"
                                                ? referee?.name
                                                : `${referee?.name.firstName} ${referee?.name.lastName}`}
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
                                              className="btn-view-referee"
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
                                  ))}
                              </div>
                            </div>
                          </div>
                        )}
                    </React.Fragment>
                  ))
                ) : (
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
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirmDelete={confirmDeleteReference}
          isDeleting={isDeleting}
        />
      )}

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
