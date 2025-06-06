import { FaEdit, FaTrash } from "react-icons/fa";
import { memo } from "react";

const JobListSection = ({
  isSearchVisible,
  labels,
  setShowTooltip,
  showTooltip,
  activeJobs,
  searchQuery,
  mapDepartmentToKey,
  shortenJobId,
  formatDate,
  handleAddVacancy,
  handleToggleOptions,
  editToggle,
  handleEditJob,
  handleDeleteJob,
}) => {
  return (
    <>
      <div
        className={`AiReference-active-jobs-container fade-in ${
          isSearchVisible ? "visible" : ""
        }`}
      >
        <div className="AiReference-table-title">
          <h4 className="mb-0 d-flex align-items-center gap-2 ">
            {labels.ActiveJobs}{" "}
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
                  d="M9 11C9 11.2652 8.89464 11.5196 8.70711 11.7071C8.51957 11.8946 8.26522 12 8 12C7.73478 12 7.48043 11.8946 7.29289 11.7071C7.10536 11.5196 7 11.2652 7 11C7 10.7348 7.10536 10.4804 7.29289 10.2929C7.48043 10.1054 7.73478 10 8 10C8.26522 10 8.51957 10.1054 8.70711 10.2929C8.89464 10.4804 9 10.7348 9 11ZM7.5 4C6.83696 4 6.20107 4.26339 5.7039 4.73223C5.26339 5.20107 5 5.83696 5 6.5H7C7 6.36739 7.05268 6.24021 7.14645 6.14645C7.24021 6.05268 7.36739 6 7.5 6H8.146C8.2321 6.00004 8.31566 6.02917 8.38313 6.08265C8.45061 6.13614 8.49803 6.21086 8.51771 6.29468C8.53739 6.3785 8.52818 6.46651 8.49156 6.54444C8.45495 6.62237 8.39309 6.68564 8.316 6.724L7 7.382V9H9V8.618L9.211 8.512C9.69063 8.27189 10.0752 7.87692 10.3024 7.39105C10.5296 6.90517 10.5862 6.35683 10.463 5.8348C10.3398 5.31276 10.044 4.8476 9.62346 4.51461C9.20296 4.18162 8.68238 4.0003 8.146 4H7.5Z"
                  fill="#F46A05"
                />
                <path
                  d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM8 2C7.21207 2 6.43185 2.15519 5.7039 2.45672C4.97595 2.75825 4.31451 3.20021 3.75736 3.75736C3.20021 4.31451 2.75825 4.97595 2.45672 5.7039C2.15519 6.43185 2 7.21207 2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2Z"
                  fill="#F46A05"
                />
              </svg>
              {showTooltip && (
                <span className="job-tooltip-text">
                  {labels.ViewManageTrack}
                </span>
              )}
            </div>
          </h4>
          <p>{labels.ManageAndTrackPositions}</p>
        </div>

        {activeJobs && activeJobs.length > 0 ? (
          <div className="scrollable-table-job-container">
            <table>
              <thead>
                <tr>
                  <th>{labels.JobId}</th>
                  <th>{labels.JobName}</th>
                  <th>{labels.Vacancies}</th>
                  <th>{labels.Department}</th>
                  <th>{labels.HiringManager}</th>
                  <th>{labels.PostedDate}</th>
                  <th className="text-center">{labels.Actions}</th>
                </tr>
              </thead>
              <tbody>
                {activeJobs
                  .filter((job) =>
                    job.jobName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .slice()
                  .reverse()
                  .map((job) => {
                    const deptKey = mapDepartmentToKey(job.department || "");
                    return (
                      <tr key={job._id}>
                        <td title={job._id}>{shortenJobId(job._id)}</td>
                        <td>{job.jobName}</td>
                        <td>{job.vacancies}</td>
                        <td>
                          {job.department
                            ? labels.departments[deptKey] || job.department
                            : "Department not specified"}
                        </td>
                        <td>
                          {" "}
                          {typeof job?.hiringManager === "object"
                            ? `${job.hiringManager.firstName} ${job.hiringManager.lastName}`
                            : job?.hiringManager}
                        </td>
                        <td>{formatDate(job.createdAt)}</td>
                        <td>
                          <div className="position-relative d-flex align-items-center w-100 justify-content-center">
                            <div className="position-relative d-flex justify-content-center">
                              <button
                                className="btn-add-vacancy"
                                onClick={() => handleAddVacancy(job)}
                              >
                                {labels.AddVacancy}
                              </button>
                              <div className="action-menu-job">
                                <p
                                  className="m-0 position-relative d-flex"
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) =>
                                    handleToggleOptions(job._id, e)
                                  }
                                >
                                  <svg
                                    className="menu-icon-candidate"
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
                                {editToggle === job._id && (
                                  <div className="action-options-job">
                                    <p
                                      className="d-flex align-items-center gap-2 m-0 icon-edit-job"
                                      onClick={() => handleEditJob(job._id)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <FaEdit />
                                      {labels.Edit}
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
                                      {labels.Delete}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                {activeJobs.filter((job) =>
                  job.jobName.toLowerCase().includes(searchQuery.toLowerCase())
                ).length === 0 && (
                  <tr>
                    
                    <td colSpan="7" className="text-center">
                      {labels.JobNotFound}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <p>{labels.NoActiveJobs}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(JobListSection);
