import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EditCandidatePopUp from "./EditCandidatePopUp";
import DeleteConfirmationCandidatePopUp from "./DeleteConfirmationCandidatePopUp"; // Import the confirmation popup
import AddCandidatePopUp from "./AddCandidatePopUp"; // Assuming you have a similar component for adding candidates
import CandidateDetailsPopUp from "./CandidateDetailsPopUp";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";

const Candidates = () => {
  const USER = JSON.parse(localStorage.getItem("user"));
  const companyId = USER?.id;
  const token = USER?.token;
  const API = process.env.REACT_APP_API_URL;
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [visibleOptions, setVisibleOptions] = useState({});
  const [showEditPopup, setShowEditPopup] = useState(false); // Add this line
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for delete confirmation
  const [candidateToDelete, setCandidateToDelete] = useState(null); // State to hold the candidate ID to delete
  const [candidates, setCandidates] = useState(
    JSON.parse(localStorage.getItem("candidates")) || []
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const fetchCandidates = async () => {
    try {
      const URL = `${API}/api/ai-referee/company-candidates/get-candidates-by-companyId/${companyId}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCandidates(response.data.candidates);
        localStorage.setItem(
          "candidates",
          JSON.stringify(response.data.candidates)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCandidatesWhenRender = async () => {
      await fetchCandidates();
    };

    fetchCandidatesWhenRender();
  }, []);

  const handleAddNewCandidate = async () => {
    setShowPopup(true);
  };

  const refetchCandidates = async () => {
    await fetchCandidates();
  };

  const handleAddCandidate = async () => {
    await refetchCandidates();
  };

  // Modify the function to handle "View Details"
  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setShowDetailsPopup(true);
  };

  const handleCloseDetailsPopup = () => {
    setShowDetailsPopup(false);
    setSelectedCandidate(null);
  };

  // Function to get the color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "#F8BD00"; // Yellow
      case "Completed":
        return "#1877F2"; // Blue
      case "New":
        return "#319F43"; // Green
      default:
        return "#6c757d"; // Gray for unknown statuses
    }
  };

  const handleDeleteCandidate = (candidateId) => {
    setCandidateToDelete(candidateId); // Set the candidate ID to delete
    setShowDeleteConfirmation(true); // Show the delete confirmation popup
  };

  const confirmDeleteCandidate = async () => {
    if (isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      const URL = `${API}/api/ai-referee/company-candidates/delete-candidate-by-id/${candidateToDelete}`;
      const response = await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await refetchCandidates();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false); // Close the confirmation popup
      setCandidateToDelete(null); // Reset the candidate ID
    }
  };

  const handleEditCandidate = (id) => {
    const candidateFound = candidates.find((candidate) => candidate._id === id);
    setSelectedCandidate(candidateFound);

    setShowEditPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    setShowEditPopup(false);
    setSelectedCandidate(null);
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

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div className="d-flex justify-content-between align-items-end ">
        <div>
          <h3 className="mb-0">Candidates</h3>
          <p className="mb-2">
            Manage and track your potential hires through the reference checking
            process.
          </p>
        </div>
        {/* <button
          onClick={handleAddNewCandidate}
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
          Add New Candidate
        </button>
        {showPopup && (
          <AddCandidatePopUp
            onClose={handleClosePopup}
            onAddCandidate={handleAddCandidate}
          />
        )} */}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center search-candidates">
          <div className="search-wrapper position-relative">
            <input
              type="text"
              placeholder="Search candidates..."
              className="form-control ps-4 pe-5"
              value={searchQuery} // bind value to the searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // update the searchQuery state on input change
            />

            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
        </div>
      </div>

      <div className="AiReference-candidates-container">
        <div className="AiReference-table-title">
          <h4 className="mb-0">Candidate Lists</h4>
          <p>Overview of all candidates in the system.</p>
        </div>

        {candidates && candidates.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates
                  .filter(
                    (candidate) =>
                      candidate.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) // Filter by name
                  )
                  .slice()
                  .reverse()
                  .map((candidate) => (
                    <tr key={candidate._id}>
                      <td>{candidate.name}</td>
                      <td>{candidate.email}</td>
                      <td>{candidate.position}</td>
                      <td style={{ color: getStatusColor(candidate.status) }}>
                        {candidate.status}
                      </td>

                      <td>
                        <div className="position-relative d-flex align-items-center w-100">
                          <button
                            className="btn-view-details"
                            onClick={() => handleViewDetails(candidate)}
                          >
                            View Details
                          </button>{" "}
                          <p
                            className="m-0"
                            style={{ cursor: "pointer" }}
                            onClick={(e) =>
                              handleToggleOptions(candidate._id, e)
                            } // Pass the candidate's ID and event to handleToggleOptions
                          >
                            <svg
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
                          </p>
                          {visibleOptions[candidate._id] && (
                            <div
                              id={`options-${candidate._id}`}
                              className="action-options"
                            >
                              <p
                                className="d-flex align-items-center gap-2"
                                onClick={() =>
                                  handleEditCandidate(candidate._id)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <FaEdit />
                                Edit
                              </p>
                              <p
                                className="d-flex align-items-center gap-2"
                                onClick={() =>
                                  handleDeleteCandidate(candidate._id)
                                }
                                style={{ cursor: "pointer", color: "red" }}
                              >
                                <FaTrash />
                                Delete
                              </p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        ) : (
          <div>No candidate record</div>
        )}
      </div>
      {showDeleteConfirmation && (
        <DeleteConfirmationCandidatePopUp
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirmDelete={confirmDeleteCandidate}
          isDeleting={isDeleting}
        />
      )}
      {showDetailsPopup && selectedCandidate && (
        <CandidateDetailsPopUp
          candidates={selectedCandidate}
          onClose={handleCloseDetailsPopup}
          onEdit={() => {
            handleCloseDetailsPopup();
            handleEditCandidate(selectedCandidate._id);
          }}
        />
      )}
      {showEditPopup && selectedCandidate && (
        <EditCandidatePopUp
          onClose={handleClosePopup}
          onUpdateCandidate={refetchCandidates}
          candidateDetails={selectedCandidate}
        />
      )}
    </div>
  );
};

export default Candidates;
