import React, { memo } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
const ReferenceRequestTable = ({
  labels,
  filteredReferences,
  showDropDown,
  selectedCandidate,
  isExpanded,
  handleSetCandidate,
  toggleDropdown,
  visibleOptions,
  handleToggleOptions,
  handleDeleteReference,
  handleViewDetails,
  getStatusColor,
  formatDate,
  calculateCandidateStatus,
  getTranslatedStatus,
  showTooltip,
  setShowTooltip,
}) => {
  return (
    <div
      className={`AiReference-reference-request-container fade-in ${
        true ? "visible" : ""
      }`}
    >
      <div className="AiReference-table-title">
        <h4 className="mb-0 d-flex gap-2 align-items-center">
          {labels.referenceRequestList}
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
                d="M9 11C9 11.2652 8.89464 11.5196 8.70711 11.7071C8.51957 11.8946 8.26522 12 8 12C7.73478 12 7.48043 11.8946 7.29289 11.7071C7.10536 11.5196 7 11.2652 7 11C7 10.7348 7.10536 10.4804 7.29289 10.2929C7.48043 10.1054 7.73478 10 8 10C8.26522 10 8.51957 10.1054 8.70711 10.2929C8.89464 10.4804 9 10.7348 9 11ZM7.5 4C6.83696 4 6.20107 4.26339 5.7039 4.45672C5.20683 4.64645 4.79891 4.95182 4.53757 5.34315C4.27778 5.72485 4.146 6.15685 4.146 6.59375H5.854C5.854 6.46957 5.90568 6.3538 6.04877 6.20711C6.19186 6.06042 6.36739 6 6.5 6H8.146C8.2321 6.00004 8.31566 6.02917 8.38313 6.08265C8.45061 6.13614 8.49803 6.21086 8.51771 6.29468C8.53739 6.3785 8.52818 6.46651 8.49156 6.54444C8.45495 6.62237 8.39309 6.68564 8.316 6.724L7 7.382V9H9V8.618L9.211 8.512C9.69063 8.27189 10.0752 7.87692 10.3024 7.39105C10.5296 6.90517 10.5862 6.35683 10.463 5.8348C10.3398 5.31276 10.044 4.8476 9.62346 4.51461C9.20296 4.18162 8.68238 4.0003 8.146 4H7.5Z"
                fill="#F46A05"
              />
              <path
                d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM8 2C7.21207 2 6.43185 2.15519 5.7039 2.45672C4.97595 2.75825 4.31451 3.20021 3.75736 3.75736C3.20021 4.31451 2.75825 4.97595 2.45672 5.7039C2.15519 6.43185 2 7.21207 2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2Z"
                fill="#F46A05"
              />
            </svg>
            {showTooltip && (
              <span className="job-tooltip-text">
                {labels.manageTrackTooltip}
              </span>
            )}
          </div>
        </h4>
        <p>{labels.referenceRequestListDesc}</p>
      </div>
        <div className="scrollable-table-container">
          <table>
            <thead>
              <tr>
                <th>{labels.applicants}</th>
                <th>{labels.jobName}</th>
                <th>{labels.referees}</th>
                <th>{labels.status}</th>
                <th>{labels.dateSent}</th>
                <th>{labels.dueDate}</th>
                <th className="text-center">{labels.actions}</th>
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
                      <td data-label="Referees">
                        {Array.isArray(reference.referees) &&
                        reference.referees.length > 1
                          ? `${reference.referees.length} ${labels.referees}`
                          : `1 ${labels.referee}`}
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
                                  {labels.noStatus}
                                </span>
                              ) : (
                                <>
                                  {status.inProgressCount > 0 && (
                                    <span
                                      style={{
                                        color: getStatusColor("In Progress"),
                                      }}
                                    >
                                      {status.inProgressCount}{" "}
                                      {labels.inProgress}
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
                                        {status.completedCount}{" "}
                                        {labels.completed}
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
                                        {status.expiredCount} {labels.expired}
                                      </span>
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          );
                        })()}
                      </td>
                      <td data-label="Date Sent">
                        {formatDate(reference.dateSent)}
                      </td>
                      <td data-label="Date Due">
                        {formatDate(reference.dueDate)}
                      </td>
                      <td data-label="Actions">
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
                              ? labels.hideReports
                              : labels.viewReports}
                          </button>

                          <div className="position-relative">
                            <div className="action-menu-reference">
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
                                      {labels.Delete}
                                    </p>
                                  </div>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {showDropDown &&
                      selectedCandidate._id === reference._id && (
                        <tr
                          className={`reference-dropdown-container ${
                            isExpanded ? "expanded" : ""
                          }`}
                        >
                          <td colSpan="7">
                            <div className="w-100">
                              <b className="py-2 pb-2">
                                {reference.referees &&
                                Array.isArray(reference.referees) &&
                                reference.referees.length > 0
                                  ? reference.referees.length === 1
                                    ? labels.referee
                                    : labels.referees
                                  : ""}
                              </b>
                              <div className="referee-list d-flex gap-2 mt-2">
                                {showDropDown &&
                                  selectedCandidate?.referees &&
                                  selectedCandidate.referees.map((referee) => (
                                    <>
                                      <div
                                        className="referee-item justify-content-center flex-column "
                                        key={referee?._id}
                                      >
                                        <div className="d-flex align-items-center  w-100 mb-1">
                                          <span className="referee-name mb-1">
                                            {typeof referee?.name === "string"
                                              ? referee?.name
                                              : `${referee?.name.firstName} ${referee?.name.lastName}`}
                                          </span>

                                          <div className="d-flex referee-status  justify-content-center ">
                                            <span
                                              className="mb-1 text-center"
                                              style={{
                                                color: getStatusColor(
                                                  referee?.status
                                                ),
                                              }}
                                            >
                                              {getTranslatedStatus(
                                                referee?.status,
                                                labels
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="d-flex align-items-center  w-100">
                                          <p className="referee-email m-0">
                                            {referee?.email}
                                          </p>

                                          <div className="d-flex referee-status  justify-content-end">
                                            <button
                                              className="btn-view-referee"
                                              onClick={() =>
                                                handleViewDetails(referee)
                                              }
                                            >
                                              {labels.viewReferee}
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                ))
              ) : filteredReferences && filteredReferences.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">{labels.noRecord}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    {labels.notFound}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

    </div>
  );
};

export default memo(ReferenceRequestTable);
