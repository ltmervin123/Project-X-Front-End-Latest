import React, { useState, useMemo } from 'react';

const ActiveLogTables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const activityLogs = [
    { company: "Tech Corp", action: "User Created", timestamp: "2023-07-20", details: "New admin user added" },
    { company: "Global Systems", action: "Password Reset", timestamp: "2023-07-20", details: "Account security update" },
    { company: "Data Solutions", action: "Role Modified", timestamp: "2023-07-19", details: "User role updated to Editor" },
    { company: "Smart Tech", action: "Login Attempt", timestamp: "2023-07-19", details: "Failed login attempt" },
    { company: "Cloud Services", action: "Account Locked", timestamp: "2023-07-18", details: "Multiple failed attempts" },
    { company: "Digital Corp", action: "Settings Changed", timestamp: "2023-07-18", details: "Profile settings updated" },
    { company: "Web Solutions", action: "User Deleted", timestamp: "2023-07-17", details: "Account removal requested" },
    { company: "Info Systems", action: "Permission Changed", timestamp: "2023-07-17", details: "Access level modified" },
    { company: "Tech Hub", action: "Document Access", timestamp: "2023-07-16", details: "File permissions granted" },
    { company: "Data Corp", action: "Profile Updated", timestamp: "2023-07-16", details: "User info modified" }
  ];

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return activityLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [activityLogs, currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(activityLogs.length / itemsPerPage))
    );
  };

  return (
    <div className="user-table-container bg-white shadow p-3 mb-4">
      <table className="mb-0">
        <thead>
          <tr>
            <th>Company</th>
            <th>Action</th>
            <th>Timestamp</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.company}</td>
              <td>{log.action}</td>
              <td>{log.timestamp}</td>
              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex company-prev-next-btn-control justify-content-center align-items-center gap-3 mt-3">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.371133 5.62144L6.08746 0.0244005L7.48647 1.45323L2.48456 6.35077L7.3821 11.3527L5.95327 12.7517L0.356225 7.03536C0.170741 6.84587 0.0681127 6.59047 0.0709085 6.32532C0.0737042 6.06017 0.181695 5.80698 0.371133 5.62144Z" fill="#F46A05"/>
          </svg>
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(activityLogs.length / itemsPerPage)}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.14131 7.071L1.48431 12.728L0.0703125 11.314L5.02031 6.364L0.0703125 1.414L1.48431 0L7.14131 5.657C7.32878 5.84453 7.4341 6.09884 7.4341 6.364C7.4341 6.62916 7.32878 6.88347 7.14131 7.071Z" fill="#F46A05"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ActiveLogTables;
