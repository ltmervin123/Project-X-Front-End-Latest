import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddCandidatePopUp from "./AddCandidatePopUp"; // Assuming you have a similar component for adding candidates
import CandidateDetailsPopUp from "./CandidateDetailsPopUp";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Candidates = () => {
  const USER = JSON.parse(localStorage.getItem("user"));
  const companyId = USER?.id;
  const token = USER?.token;
  const API = process.env.REACT_APP_API_URL;
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [candidates, setCandidates] = useState(
    JSON.parse(localStorage.getItem("candidates")) || []
  );
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
      if (!candidates || candidates.length === 0) {
        await fetchCandidates();
      }
    };

    fetchCandidatesWhenRender();
  }, []);

  const handleAddNewCandidate = async () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const refetchCandidates = async () => {
    //Remove the candidates from local storage
    localStorage.removeItem("candidates");
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

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div className="d-flex justify-content-between align-items-end mb-3">
        <div>
          <h3>Candidates</h3>
          <p className="m-0">
            Manage and track your potential hires through the reference checking
            process.
          </p>
        </div>
        <button
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
        )}
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
          <h4>Candidate Lists</h4>
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
                        <button
                          className="btn-view-details"
                          onClick={() => handleViewDetails(candidate)}
                        >
                          View Details
                        </button>{" "}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-center w-100">
              <div className="d-flex justify-content-center align-items-center gap-5 candidate-button-controls h-100">
                <button className="btn-archive">
                  Archive Inactive Candidates
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>No candidate record</div>
        )}
      </div>
      {showDetailsPopup && selectedCandidate && (
        <CandidateDetailsPopUp
          candidates={selectedCandidate}
          onClose={handleCloseDetailsPopup}
        />
      )}
    </div>
  );
};

export default Candidates;
