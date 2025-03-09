import React, { useDebugValue, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddRequestPopUp from "./AddRequestPopUp";
import { FaSearch } from "react-icons/fa";
import ReferenceRequestDetailsPopUp from "./ReferenceRequestDetailsPopUp";
import ViewRequest from "./ViewRequest";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { socket } from "../../utils/socket/socketSetup";

const ReferenceRequest = () => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const companyId = USER?.id;
  const token = USER?.token;
  const navigate = useNavigate();
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  // const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showViewRequest, setShowViewRequest] = useState(false); // New state for toggling view
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState([]);
  const [selectedReferee, setSelectedReferee] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [reference, setReference] = useState(
    JSON.parse(localStorage.getItem("reference")) || []
  );

  const fetchReference = async () => {
    try {
      const URL = `${API}/api/ai-referee/company-request-reference/get-reference-request-by-companyId/${companyId}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  const reFetchReference = async () => {
    try {
      await fetchReference();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getReferenceWhenFirstRender = async () => {
      if (reference.length === 0) {
        await fetchReference();
      }
    };

    getReferenceWhenFirstRender();
  }, []);

  useEffect(() => {
    const handleReferenceSubmitted = async (data) => {
      if (data?.completed) {
        await reFetchReference();
      }
    };

    socket.on("referenceSubmitted", (data) => {
      handleReferenceSubmitted(data);
    });
  }, []);

  const handleAddNewRequest = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddReference = async () => {
    await reFetchReference();
  };

  const handleViewDetails = (referee) => {
    // setSelectedCandidate(candidate);
    setSelectedReferee(referee);
    setShowDetailsPopup(true);
  };
  const handleSetCandidate = (referenceId) => {
    setShowDropDown((prev) => !prev);
    const referenceFound = reference.find((ref) => ref._id === referenceId);
    setSelectedCandidate(referenceFound);
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
  // Conditional rendering based on showViewRequest state
  if (showViewRequest) {
    return (
      <ViewRequest
        referenceId={selectedCandidate._id}
        refereeId={selectedReferee._id}
        token={token}
      />
    );
  }
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

    return { inProgressCount, completedCount };
  };
  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div className="d-flex justify-content-between align-items-end mb-3">
        <div>
          <h3>Reference Request</h3>
          <p className="m-0">
            Manage and track reference checks for your candidates.
          </p>
        </div>

        <button
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
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center search-candidates">
          <div className="search-wrapper position-relative">
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

      <div className="AiReference-candidates-container Reference-Request">
        <div className="AiReference-table-title">
          <h4>Reference Requests Lists</h4>
          <p>Overview of all reference requests.</p>
        </div>
        {reference && reference.length > 0 ? (
          <>
            <table className="reference-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Position</th>
                  <th>Referees</th>
                  <th>Status</th>
                  <th>Date Sent</th>
                  <th>Date Due</th>
                  <th>Actions</th>
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
                        <td>
                          {reference.referees &&
                          Array.isArray(reference.referees) &&
                          reference?.referees &&
                          reference.referees.length > 1
                            ? `${reference.referees.length} referees`
                            : "1 referee"}
                        </td>
                        <td>
                          {(() => {
                            const status = calculateCandidateStatus(reference);
                            return (
                              <>
                                {status.inProgressCount === 0 &&
                                status.completedCount === 0 ? (
                                  <span style={{ color: "black" }}>
                                    No Status
                                  </span>
                                ) : (
                                  <>
                                    {status.inProgressCount > 0 && (
                                      <span style={{ color: "#F8BD00" }}>
                                        {status.inProgressCount} In Progress
                                      </span>
                                    )}
                                    {status.completedCount > 0 && (
                                      <>
                                        {status.inProgressCount > 0 && (
                                          <>&nbsp;</>
                                        )}{" "}
                                        {/* Add space if In Progress is shown */}
                                        <span style={{ color: "#1877F2" }}>
                                          {status.completedCount} Completed
                                        </span>
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            );
                          })()}
                        </td>
                        <td>{formatDate(reference.dateSent)}</td>
                        <td>{formatDate(reference.dueDate)}</td>
                        <td className="d-flex gap-2 align-items-center">
                          <button
                            className={`btn-view-details ${
                              showDropDown &&
                              selectedCandidate._id === reference._id
                                ? "isDropdown"
                                : ""
                            }`}
                            onClick={() => handleSetCandidate(reference._id)}
                          >
                            {showDropDown &&
                            selectedCandidate._id === reference._id
                              ? "Hide Reports"
                              : "View Reports"}
                          </button>
                          <div className="reference-dropdown-icon">
                            <svg
                              width="9"
                              height="7"
                              viewBox="0 0 9 7"
                              fill="none"
                              className={`${
                                showDropDown &&
                                selectedCandidate._id === reference._id
                                  ? "rotate"
                                  : ""
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M3.73951 5.87734L0.240111 1.24127L1.14286 0.0960037L4.20491 4.15267L7.36518 0.143433L8.23988 1.30225L4.62823 5.88412C4.50851 6.03596 4.34763 6.12054 4.18097 6.11927C4.01431 6.118 3.85552 6.03098 3.73951 5.87734Z"
                                fill="#686868"
                              />
                            </svg>
                          </div>
                        </td>
                      </tr>
                      {showDropDown &&
                        selectedCandidate._id === reference._id && (
                          <div className="d-flex aling-items-center justify-content-center">
                            <div className="reference-dropdown-table mb-2">
                              <b className="py-2 pb-2">
                                Referee for {reference.candidate}
                              </b>{" "}
                              <table className="">
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Date Sent</th>
                                    <th>Date Due</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {showDropDown &&
                                  selectedCandidate?.referees ? (
                                    selectedCandidate.referees.map(
                                      (referee) => (
                                        <tr key={referee?._id}>
                                          <td>{referee?.name}</td>
                                          <td
                                            style={{
                                              color: getStatusColor(
                                                referee?.status
                                              ),
                                            }}
                                          >
                                            {referee?.status}{" "}
                                          </td>
                                          <td>
                                            {formatDate(reference.dateSent)}
                                          </td>
                                          <td>
                                            {formatDate(reference.dueDate)}
                                          </td>
                                          <td>
                                            <button
                                              className="btn-view-details"
                                              onClick={() =>
                                                handleViewDetails(referee)
                                              }
                                            >
                                              View Details
                                            </button>
                                          </td>
                                        </tr>
                                      )
                                    )
                                  ) : (
                                    <tr key={selectedCandidate?._id}>
                                      <td>{selectedCandidate?.referee}</td>
                                      <td>{selectedCandidate?.refereeEmail}</td>
                                      <td
                                        style={{
                                          color: getStatusColor(
                                            selectedCandidate?.status
                                          ),
                                        }}
                                      >
                                        {selectedCandidate?.status}{" "}
                                      </td>
                                      <td>
                                        {
                                          selectedCandidate?.question
                                            ?.formatType
                                        }
                                      </td>
                                      <td>
                                        <button
                                          className="btn-view-details"
                                          onClick={() =>
                                            handleViewDetails(
                                              selectedCandidate?._id
                                            )
                                          }
                                        >
                                          View Details
                                        </button>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </>
        ) : (
          <div>No reference requests record</div>
        )}
      </div>

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
