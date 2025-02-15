import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddRequestPopUp from "./AddRequestPopUp"; // Assuming you have a similar component for adding candidates
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ReferenceRequest = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle navigation on button click
  const handleViewRequest = () => {
    navigate("/ViewRequest"); // Navigate to '/ViewRequest' when the button is clicked
  };
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  const [requests, setRequests] = useState([
    {
      id: 1,
      candidate: "John Doe",
      referee: "Steve", // Add a referee
      position: "Software Engineer",
      status: "In Progress",
      dateSent: "2025-02-01",
      dateDue: "2025-02-15",
      actions: [],
    },
    {
      id: 2,
      candidate: "Jane Smith",
      referee: "Steve",
      position: "Product Manager",
      status: "Completed",
      dateSent: "2025-01-15",
      dateDue: "2025-01-22",
      actions: [],
    },
    {
      id: 3,
      candidate: "Alice Johnson",
      referee: "Steve",
      position: "UX Designer",
      status: "In Progress",
      dateSent: "2025-01-30",
      dateDue: "2025-02-05",
      actions: [],
    },
    {
      id: 4,
      candidate: "Bob Brown",
      referee: "Stella",
      position: "Data Scientist",
      status: "Completed",
      dateSent: "2025-01-10",
      dateDue: "2025-01-18",
      actions: [],
    },
    {
      id: 5,
      candidate: "Charlie Davis",
      referee: "Stella",
      position: "DevOps Engineer",
      status: "Completed",
      dateSent: "2025-01-20",
      dateDue: "2025-01-28",
      actions: [],
    },
    {
      id: 6,
      candidate: "Diana Prince",
      referee: "Steve",
      position: "Marketing Specialist",
      status: "In Progress",
      dateSent: "2025-02-02",
      dateDue: "2025-02-10",
      actions: [],
    },
    {
      id: 7,
      candidate: "Ethan Hunt",
      referee: "Steve",
      position: "Software Engineer",
      status: "In Progress",
      dateSent: "2025-02-03",
      dateDue: "2025-02-15",
      actions: [],
    },
    {
      id: 8,
      candidate: "Fiona Green",
      referee: "Steve",
      position: "HR Manager",
      status: "New",
      dateSent: "2025-02-05",
      dateDue: "2025-02-12",
      actions: [],
    },
    {
      id: 9,
      candidate: "George White",
      referee: "Steve",
      position: "Sales Executive",
      status: "New",
      dateSent: "2025-02-07",
      dateDue: "2025-02-14",
      actions: [],
    },
    {
      id: 10,
      candidate: "Hannah Black",
      referee: "Steve",
      position: "Content Writer",
      status: "New",
      dateSent: "2025-02-06",
      dateDue: "2025-02-13",
      actions: [],
    },
    {
      id: 11,
      candidate: "Ian Gray",
      referee: "Stella",
      position: "Web Developer",
      status: "In Progress",
      dateSent: "2025-02-04",
      dateDue: "2025-02-11",
      actions: [],
    },
  ]);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewRequest = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddRequest = (newRequest) => {
    setRequests((prevRequests) => [
      ...prevRequests,
      { id: prevRequests.length + 1, ...newRequest },
    ]);
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
        return "black"; // Default color for unknown statuses
    }
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3>Reference Request</h3>
        <p>Manage and track reference checks for your candidates.</p>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center search-candidates">
          <div className="search-wrapper position-relative">
            <input
              type="text"
              placeholder="Search request..."
              className="form-control ps-4 pe-5" // padding start (left) and end (right)
              value={searchQuery} // Bind value to searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
            />
            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
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
            onAddRequest={handleAddRequest}
          />
        )}
      </div>

      <div className="AiReference-candidates-container">
        <div className="AiReference-table-title">
          <h4>Reference Requests Lists</h4>
          <p>Overview of all reference requests</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Referee</th>
              <th>Position</th>
              <th>Status</th>
              <th>Date Sent</th>
              <th>Date Due</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests
              .filter(
                (request) =>
                  request.candidate
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  request.referee
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  request.position
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) // Search in candidate, referee, and position
              )
              .map((request) => (
                <tr key={request.id}>
                  <td>{request.candidate}</td>
                  <td>{request.referee}</td>
                  <td>{request.position}</td>
                  <td style={{ color: getStatusColor(request.status) }}>
                    {request.status}
                  </td>
                  <td>{request.dateSent}</td>
                  <td>{request.dateDue}</td>
                  <td>
                    <button onClick={handleViewRequest} className="btn-view-details">View</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-center w-100">
          <div className="d-flex justify-content-center gap-5 mt-3 candidate-button-controls">
            <button className="btn-export">Export Request</button>
            <button className="btn-archive">Manage Templates</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceRequest;
