import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import StatusDropdown from './StatusDropdown';
import CultureFitScore from './CultureFitScore';

const CandidatesTable = ({
  candidates,
  searchQuery,
  TRANSLATIONS,
  language,
  visibleOptions,
  handleToggleOptions,
  handleViewDetails,
  handleEditCandidate,
  handleDeleteCandidate,
  handleStatusChange,
  getStatusColor
}) => {
  return (
    <div className="scrollable-table-job-container">
      <table>
        <thead>
          <tr>
            <th>{TRANSLATIONS[language].Name}</th>
            <th>{TRANSLATIONS[language].Email}</th>
            <th>{TRANSLATIONS[language].JobName}</th>
            <th>{TRANSLATIONS[language].Status}</th>
            <th>{TRANSLATIONS[language].CultureFit}</th>
            <th className="text-center">
              {TRANSLATIONS[language].Actions}
            </th>
          </tr>
        </thead>
        <tbody>
          {candidates
            .filter((candidate) => {
              let fullName = "";
              if (typeof candidate.name === "string") {
                fullName = candidate.name;
              } else if (
                typeof candidate.name === "object" &&
                candidate.name !== null
              ) {
                fullName = `${candidate.name.firstName || ""} ${
                  candidate.name.lastName || ""
                }`.trim();
              }
              return fullName
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            })
            .slice()
            .reverse()
            .map((candidate) => (
              <tr key={candidate._id}>
                <td>
                  {typeof candidate.name === "string"
                    ? candidate.name
                    : `${candidate.name.firstName || ""} ${
                        candidate.name.lastName || ""
                      }`.trim()}
                </td>
                <td>{candidate.email}</td>
                <td>{candidate.position}</td>
                <td>
                  <StatusDropdown
                    status={candidate.status === "New" ? "Pending" : candidate.status}
                    onChange={(value) => handleStatusChange(candidate._id, value)}
                    getStatusColor={getStatusColor}
                    translations={TRANSLATIONS[language]}
                  />
                </td>
                <td>
                  <CultureFitScore score={60} />
                </td>
                <td>
                  <div className="position-relative d-flex align-items-center w-100 justify-content-center">
                    <div className="position-relative d-flex justify-content-center">
                      <button
                        className="btn-view-details"
                        onClick={() => handleViewDetails(candidate)}
                      >
                        {TRANSLATIONS[language].ViewDetails}
                      </button>
                      <div className="action-menu">
                        <p
                          className="m-0 position-relative d-flex"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => handleToggleOptions(candidate._id, e)}
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
                          {visibleOptions[candidate._id] && (
                            <div
                              id={`options-${candidate._id}`}
                              className="action-options"
                            >
                              <p
                                className="d-flex align-items-center gap-2"
                                onClick={() => handleEditCandidate(candidate._id)}
                                style={{ cursor: "pointer" }}
                              >
                                <FaEdit />
                                {TRANSLATIONS[language].Edit}
                              </p>
                              <p
                                className="d-flex align-items-center gap-2"
                                onClick={() => handleDeleteCandidate(candidate._id)}
                                style={{ cursor: "pointer", color: "red" }}
                              >
                                <FaTrash />
                                {TRANSLATIONS[language].Delete}
                              </p>
                            </div>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          {candidates.filter((candidate) => {
            let fullName = "";
            if (typeof candidate.name === "string") {
              fullName = candidate.name;
            } else if (
              typeof candidate.name === "object" &&
              candidate.name !== null
            ) {
              fullName = `${candidate.name.firstName || ""} ${
                candidate.name.lastName || ""
              }`.trim();
            }
            return fullName.toLowerCase().includes(searchQuery.toLowerCase());
          }).length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                {TRANSLATIONS[language].CandidateNotFound}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesTable;
