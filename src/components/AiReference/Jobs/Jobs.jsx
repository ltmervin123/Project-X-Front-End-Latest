import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddJobPopUp from "../AddJobPopUp";
import EditJobPopUp from "./PopUpComponents/EditJobPopUp";
import DeleteConfirmationJobPopUp from "./PopUpComponents/DeleteConfirmationJobPopUp"; // Add this line
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import axios from "axios";

const Jobs = () => {
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const id = USER?.id;
  const token = USER?.token;
  const [visibleOptions, setVisibleOptions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Add this line
  const [jobToDelete, setJobToDelete] = useState(null); // Add this line
  const [activeJobs, setActiveJobs] = useState(
    JSON.parse(localStorage.getItem("jobs")) || []
  );

    // For fade in smooth animation 
      const [isSearchVisible, setIsSearchVisible] =
        useState(false);
      const [isContainerVisible, setIsContainerVisible] = useState(false);
    
    
      useEffect(() => {
        const timers = [
          setTimeout(() => setIsSearchVisible(true), 300),
          setTimeout(() => setIsContainerVisible(true), 700),
        ];
    
        return () => timers.forEach((timer) => clearTimeout(timer));
      }, []);
  
  const fetchJobs = async () => {
    try {
      const URL = `${API}/api/ai-referee/company-jobs/get-jobs-by-id/${id}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        localStorage.setItem("jobs", JSON.stringify(response.data.jobs));
        setActiveJobs(response.data.jobs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    if (!date) return ""; // Return an empty string or a fallback value if the date is invalid
    return date.split("T")[0]; // Extract only YYYY-MM-DD
  };

  const refetchJobs = async () => {
    try {
      //fetch the jobs again
      await fetchJobs();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getJobsWhenFirstRender = async () => {
      await fetchJobs();
    };

    getJobsWhenFirstRender();
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const handleCreateNewJob = () => {
    setShowPopup(true);
  };

  const handleAddJob = () => {
    refetchJobs();
  };
  
  const handleToggleOptions = (jobId, event) => {
    const { clientY } = event; // Get the Y position of the click
    setVisibleOptions((prev) => {
      // If the clicked jobId is already visible, hide it; otherwise, show it
      if (prev[jobId]) {
        return { ...prev, [jobId]: false };
      }
      // Hide options for all other jobs and show options for the clicked job
      const updatedOptions = {};
      updatedOptions[jobId] = true;
      return updatedOptions;
    });

    const optionsElement = document.getElementById(`options-${jobId}`);
    if (optionsElement) {
      optionsElement.style.top = `${clientY}px`; // Adjust as needed
    }
  };

  const handleEditJob = (jobId) => {
    const recordFound = activeJobs.find((job) => job._id === jobId);
    setSelectedJob(recordFound);
    setShowEditPopup(true);
  };

  const handleDeleteJob = (jobId) => {
    setJobToDelete(jobId); // Set the job ID to delete
    setShowDeleteConfirmation(true); // Show the delete confirmation popup
  };

  const confirmDeleteJob = async () => {
    if (isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      const URL = `${API}/api/ai-referee/company-jobs/delete-job-by-id/${jobToDelete}`;
      const response = await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        await refetchJobs();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowEditPopup(false);
    setSelectedJob(null);
  };
  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div className="d-flex justify-content-between align-items-end ">
        <div>
          <h3 className="mb-0">Jobs</h3>
          <p className="mb-2">Manage and track your open positions.</p>
        </div>
        {/* <button
          onClick={handleCreateNewJob}
          className="btn-create-new-job d-flex align-items-center justify-content-center gap-1"
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
          Create New Job
        </button>

        {showPopup && (
          <AddJobPopUp onClose={handleClosePopup} onAddJob={handleAddJob} />
        )} */}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center search-candidates ">
          <div 
          className={`search-wrapper position-relative fade-in ${
            isSearchVisible ? "visible" : ""
          }`}>
            <input
              type="text"
              placeholder="Search job name..."
              className="form-control ps-4 pe-5"
              value={searchQuery} // bind value to the searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // update the searchQuery state on input change
            />

            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
        </div>
      </div>

      <div 
      className={`AiReference-active-jobs-container fade-in ${
            isSearchVisible ? "visible" : ""
          }`}>
        <div className="AiReference-table-title">
          <h4 className="mb-0">Active Jobs</h4>
          <p>Manage and track your open positions.</p>
        </div>

        {activeJobs && activeJobs.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Job Name</th>
                <th className="text-center">Vacancies</th>
                <th>Department</th>
                <th>Hiring Manager</th>
                <th className="text-center">Posted Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeJobs
                .filter(
                  (job) =>
                    job.jobName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) // Filter by job name
                )
                .slice()
                .reverse()
                .map((job) => {
                  const showOptions = visibleOptions[job._id] || false;
                  return (
                    <tr key={job._id}>
                      <td>{job.jobName}</td>
                      <td className="text-center">{job.vacancies}</td>
                      <td>{job.department || "Department not specified"}</td>
                      <td>{job.hiringManager}</td>
                      <td className="text-center">{formatDate(job.createdAt)}</td>
                      <td >
                        <div className="position-relative d-flex justify-content-center align-items-center w-100 gap-3">

                              <p
                                className="d-flex align-items-center gap-2 m-0 icon-edit-job"
                                onClick={() => handleEditJob(job._id)} // Change this line
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                <FaEdit />
                          
                              </p>
                              <p
                                className="d-flex align-items-center gap-2 m-0 icon-delete-job" 
                                onClick={() => handleDeleteJob(job._id)}
                                style={{
                                  cursor: "pointer",
                                  color: "red",
                                }}
                              >
                                <FaTrash />
                              </p>
                        
                      
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {activeJobs.filter((job) =>
          job.jobName.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 && (
          <tr>
            <td colSpan="6" className="text-center">
              Job not found
            </td>
          </tr>
        )}
            </tbody>
          </table>
        ) : (
          <div>
            <p>No active jobs record</p>
          </div>
        )}
      </div>
      {showDeleteConfirmation && (
        <DeleteConfirmationJobPopUp
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirmDelete={confirmDeleteJob}
          isDeleting={isDeleting}
        />
      )}
      {showEditPopup && (
        <EditJobPopUp
          onClose={handleClosePopup}
          onUpdateJob={refetchJobs}
          jobDetails={selectedJob} // Pass the selected job details to the edit popup
        />
      )}
    </div>
  );
};

export default Jobs;
