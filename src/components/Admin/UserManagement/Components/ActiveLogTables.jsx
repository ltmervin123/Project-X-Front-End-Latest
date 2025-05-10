import React, { useState, useMemo, useEffect } from 'react';

const ActiveLogTables = ({ searchQuery }) => {
  const language = sessionStorage.getItem("preferred-language") || "English";

  const translations = {
    English: {
      columns: {
        company: "Company",
        action: "Action",
        timestamp: "Timestamp",
        details: "Details"
      },
      noData: "No data available"
    },
    Japanese: {
      columns: {
        company: "会社",
        action: "アクション",
        timestamp: "タイムスタンプ",
        details: "詳細"
      },
      noData: "データがありません"
    }
  };

  const t = translations[language];

  const [itemsPerPage, setItemsPerPage] = useState(5);
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

  const activityLogs = [
    { company: "Tech Corp", action: "User Created", timestamp: "2023-07-20", details: "New admin user added" },
    { company: "Global Systems", action: "Password Reset", timestamp: "2023-07-20", details: "Account security update" },
    { company: "Data Solutions", action: "Role Modified", timestamp: "2023-07-19", details: "User role updated to Editor" },
    { company: "Smart Tech", action: "Login Attempt", timestamp: "2023-07-19", details: "Failed login attempt" },
    { company: "Cloud Services", action: "Account Locked", timestamp: "2023-07-18", details: "Multiple failed attempts" },
    { company: "Digital Corp", action: "Settings Changed", timestamp: "2023-07-18", details: "Profile settings updated" },
    { company: "Web Solutions", action: "User Deleted", timestamp: "2023-07-17", details: "Account removal requested" },
  ];

  const filteredLogs = useMemo(() => {
    return activityLogs.filter((log) =>
      log.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activityLogs, searchQuery]);

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
                <td>{log.company}</td>
                <td>{log.action}</td>
                <td>{log.timestamp}</td>
                <td>{log.details}</td>
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

export default ActiveLogTables;
