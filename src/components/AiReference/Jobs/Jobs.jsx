import { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLabels } from "./hooks/useLabels";
import { useGetJobs } from "../../../hook/useJob";
import JobListSection from "./Component/JobList.Section";
import SearchBarSection from "./Component/SearchBarSection";
import AddVacancyComponent from "./Component/AddVacancyComponent";
import EditJobPopUp from "./PopUpComponents/EditJobPopUp";
import DeleteConfirmationJobPopUp from "./PopUpComponents/DeleteConfirmationJobPopUp";

const Jobs = () => {
  //Constants
  const user = JSON.parse(localStorage.getItem("user"));
  const language = sessionStorage.getItem("preferred-language") || "English";

  //States
  const [showAddVacancy, setShowAddVacancy] = useState(false);
  const [job, setJob] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  //Hooks
  const { data: activeJobs = [] } = useGetJobs(user);
  const { labels } = useLabels(language);

  useEffect(() => {
    const timer = setTimeout(() => setIsSearchVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = useCallback((date) => {
    if (!date) return "";
    return date.split("T")[0];
  }, []);

  const handleEditJob = useCallback(
    (jobId) => {
      const recordFound = activeJobs.find((job) => job._id === jobId);
      setSelectedJob(recordFound);
      setShowEditPopup(true);
    },
    [activeJobs]
  );

  const handleDeleteJob = useCallback((jobId) => {
    setJobToDelete(jobId);
    setShowDeleteConfirmation(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setShowEditPopup(false);
    setSelectedJob(null);
  }, []);

  const handleToggleOptions = useCallback(
    (jobId, event) => {
      event.stopPropagation();
      setVisibleOptions(visibleOptions === jobId ? null : jobId);
    },
    [visibleOptions]
  );

  const handleAddVacancy = useCallback((jobDetails) => {
    setJob(jobDetails);
    setShowAddVacancy(true);
  }, []);

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

  const shortenJobId = useCallback((id) => {
    return id.slice(-6);
  }, []);

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      {showAddVacancy ? (
        <AddVacancyComponent
          onBack={() => setShowAddVacancy(false)}
          jobData={job}
          onCancel={() => setShowAddVacancy(false)}
        />
      ) : (
        <>
          {/* SEARCH BAR SECTION */}
          <SearchBarSection
            labels={labels}
            isSearchVisible={isSearchVisible}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* JOBS TABLE */}
          <JobListSection
            isSearchVisible={isSearchVisible}
            labels={labels}
            setShowTooltip={setShowTooltip}
            showTooltip={showTooltip}
            activeJobs={activeJobs}
            searchQuery={searchQuery}
            mapDepartmentToKey={mapDepartmentToKey}
            shortenJobId={shortenJobId}
            formatDate={formatDate}
            handleAddVacancy={handleAddVacancy}
            handleToggleOptions={handleToggleOptions}
            visibleOptions={visibleOptions}
            handleEditJob={handleEditJob}
            handleDeleteJob={handleDeleteJob}
          />
        </>
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmationJobPopUp
          onClose={() => setShowDeleteConfirmation(false)}
          user={user}
          jobId={jobToDelete}
        />
      )}
      {showEditPopup && (
        <EditJobPopUp
          onClose={handleClosePopup}
          jobDetails={selectedJob}
          user={user}
        />
      )}
    </div>
  );
};

export default Jobs;
