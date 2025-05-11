import React, { useState, useMemo, useEffect } from 'react';

const APIUsageTable = ({ searchQuery }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      columns: {
        endpoint: "Endpoint",
        timestamp: "Timestamp",
        status: "Status",
        method: "Method"
      },
      noData: "No data available"
    },
    Japanese: {
      columns: {
        endpoint: "エンドポイント",
        timestamp: "タイムスタンプ",
        status: "状態",
        method: "メソッド"
      },
      noData: "データがありません"
    }
  };

  const t = translations[language];

  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    // Calculate items per page based on table height
    // Assuming each row is approximately 53px (including padding and borders)
    // and table header is about 40px
    const tableHeight = window.innerHeight * 0.6; // 60vh in pixels
    const rowHeight = 53; // approximate height of each row
    const headerHeight = 40;
    const availableHeight = tableHeight - headerHeight;
    const calculatedItems = Math.floor(availableHeight / rowHeight);
    setItemsPerPage(Math.max(calculatedItems, 1)); // Ensure at least 1 item
  }, []);

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

  const filteredLogs = useMemo(() => {
    return apiLogs.filter((log) =>
      log.endpoint.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [apiLogs, searchQuery]);

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLogs, currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(filteredLogs.length / itemsPerPage))
    );
  };

  return (
    <div className="user-table-container bg-white shadow d-flex flex-column justify-content-between p-3 mb-2">
      <table className="mb-0">
        <thead>
          <tr>
            {Object.keys(t.columns).map(key => (
              <th key={key}>{t.columns[key]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedLogs.length > 0 ? (
            paginatedLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.endpoint}</td>
                <td>{log.timestamp}</td>
                <td>{log.status}</td>
                <td>{log.method}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">{t.noData}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex company-prev-next-btn-control justify-content-center align-items-center gap-3 ">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.371133 5.62144L6.08746 0.0244005L7.48647 1.45323L2.48456 6.35077L7.3821 11.3527L5.95327 12.7517L0.356225 7.03536C0.170741 6.84587 0.0681127 6.59047 0.0709085 6.32532C0.0737042 6.06017 0.181695 5.80698 0.371133 5.62144Z" fill="#F46A05"/>
          </svg>
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredLogs.length / itemsPerPage)}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.14131 7.071L1.48431 12.728L0.0703125 11.314L5.02031 6.364L0.0703125 1.414L1.48431 0L7.14131 5.657C7.32878 5.84453 7.4341 6.09884 7.4341 6.364C7.4341 6.62916 7.32878 6.88347 7.14131 7.071Z" fill="#F46A05"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default APIUsageTable;
