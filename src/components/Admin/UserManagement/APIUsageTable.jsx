import React, { useState, useMemo } from 'react';

const APIUsageTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const apiLogs = [
    { endpoint: "/api/users", timestamp: "2023-07-20", status: "200 OK", method: "GET" },
    { endpoint: "/api/auth", timestamp: "2023-07-20", status: "401 Unauthorized", method: "POST" },
    { endpoint: "/api/products", timestamp: "2023-07-20", status: "200 OK", method: "GET" },
    { endpoint: "/api/orders", timestamp: "2023-07-20", status: "201 Created", method: "POST" },
    { endpoint: "/api/users/1", timestamp: "2023-07-20", status: "404 Not Found", method: "GET" },
    { endpoint: "/api/settings", timestamp: "2023-07-20", status: "200 OK", method: "PUT" },
    { endpoint: "/api/reports", timestamp: "2023-07-20", status: "500 Server Error", method: "GET" },
    { endpoint: "/api/auth/logout", timestamp: "2023-07-20", status: "200 OK", method: "POST" },
    { endpoint: "/api/profile", timestamp: "2023-07-20", status: "200 OK", method: "GET" },
    { endpoint: "/api/dashboard", timestamp: "2023-07-20", status: "403 Forbidden", method: "GET" }
  ];

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return apiLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [apiLogs, currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(apiLogs.length / itemsPerPage))
    );
  };

  return (
    <div className="user-table-container bg-white shadow p-3 mb-4">
      <table className="mb-0">
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Timestamp</th>
            <th>Status</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.endpoint}</td>
              <td>{log.timestamp}</td>
              <td>{log.status}</td>
              <td>{log.method}</td>
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
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(apiLogs.length / itemsPerPage)}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.14131 7.071L1.48431 12.728L0.0703125 11.314L5.02031 6.364L0.0703125 1.414L1.48431 0L7.14131 5.657C7.32878 5.84453 7.4341 6.09884 7.4341 6.364C7.4341 6.62916 7.32878 6.88347 7.14131 7.071Z" fill="#F46A05"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default APIUsageTable;
