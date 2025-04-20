import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EditJobPopUp from "./PopUpComponents/EditJobPopUp";
import DeleteConfirmationJobPopUp from "./PopUpComponents/DeleteConfirmationJobPopUp";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Jobs = () => {
  const queryClient = useQueryClient();
  const API = process.env.REACT_APP_API_URL;
  const USER = JSON.parse(localStorage.getItem("user"));
  const id = USER?.id;
  const token = USER?.token;
  const [visibleOptions, setVisibleOptions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [activeJobs, setActiveJobs] = useState(
    JSON.parse(localStorage.getItem("jobs")) || []
  );
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const timers = [setTimeout(() => setIsSearchVisible(true), 300)];

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
    if (!date) return "";
    return date.split("T")[0];
  };

  const refetchJobs = async () => {
    try {
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

  const handleEditJob = (jobId) => {
    const recordFound = activeJobs.find((job) => job._id === jobId);
    setSelectedJob(recordFound);
    setShowEditPopup(true);
  };

  const handleDeleteJob = (jobId) => {
    setJobToDelete(jobId);
    setShowDeleteConfirmation(true);
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
        queryClient.invalidateQueries({
          queryKey: ["archivedCandidates"],
        });
        queryClient.invalidateQueries({
          queryKey: ["archivedReferenceRequest"],
        });
        queryClient.invalidateQueries({
          queryKey: ["archivedJobs"],
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirmation(false);
    }
  };

  const handleClosePopup = () => {
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
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center search-candidates ">
          <div
            className={`search-wrapper position-relative fade-in ${
              isSearchVisible ? "visible" : ""
            }`}
          >
            <input
              type="text"
              placeholder="Search job name..."
              className="form-control ps-4 pe-5"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
          </div>
        </div>
      </div>

      <div
        className={`AiReference-active-jobs-container fade-in ${
          isSearchVisible ? "visible" : ""
        }`}
      >
        <div className="AiReference-table-title">
          <h4 className="mb-0 d-flex align-items-center gap-2 ">
            Active Jobs{" "}
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
                  View, manage, and track open job positions. You can edit
                  details or delete listings as needed.
                </span>
              )}
            </div>
          </h4>
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
                .filter((job) =>
                  job.jobName.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice()
                .reverse()
                .map((job) => {
                  return (
                    <tr key={job._id}>
                      <td>{job.jobName}</td>
                      <td className="text-center">{job.vacancies}</td>
                      <td>{job.department || "Department not specified"}</td>
                      <td>
                        {" "}
                        {typeof job?.hiringManager === "object"
                          ? `${job.hiringManager.firstName} ${job.hiringManager.lastName}`
                          : job?.hiringManager}
                      </td>
                      <td className="text-center">
                        {formatDate(job.createdAt)}
                      </td>
                      <td>
                        <div className="position-relative d-flex justify-content-center align-items-center w-100 gap-3">
                          <p
                            className="d-flex align-items-center gap-2 m-0 icon-edit-job"
                            onClick={() => handleEditJob(job._id)}
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
          jobDetails={selectedJob}
        />
      )}
    </div>
  );
};

export default Jobs;
