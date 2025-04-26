import React, { useState, useMemo } from 'react';

const ReferenceLogsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const referenceLogs = [
    { company: "Tech Corp", pending: 5, success: 120, failed: 3, deleted: 2 },
    { company: "Global Systems", pending: 8, success: 95, failed: 7, deleted: 4 },
    { company: "Data Solutions", pending: 3, success: 150, failed: 5, deleted: 1 },
    { company: "Smart Tech", pending: 12, success: 80, failed: 9, deleted: 6 },
    { company: "Cloud Services", pending: 6, success: 200, failed: 4, deleted: 3 },
    { company: "Digital Corp", pending: 4, success: 175, failed: 6, deleted: 5 },
    { company: "Web Solutions", pending: 9, success: 90, failed: 8, deleted: 7 },
    { company: "Info Systems", pending: 7, success: 130, failed: 5, deleted: 4 },
    { company: "Tech Hub", pending: 5, success: 160, failed: 3, deleted: 2 },
    { company: "Data Corp", pending: 10, success: 110, failed: 7, deleted: 5 }
  ];

  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return referenceLogs.slice(startIndex, startIndex + itemsPerPage);
  }, [referenceLogs, currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(referenceLogs.length / itemsPerPage))
    );
  };

  return (
    <div className="user-table-container bg-white shadow p-3 mb-4">
      <table className="mb-0">
        <thead>
          <tr>
            <th>Company</th>
            <th className='text-center'>Pending</th>
            <th className='text-center'>Success</th>
            <th className='text-center'>Failed</th>
            <th className='text-center'>Deleted</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.company}</td>
              <td className='text-center'>{log.pending}</td>
              <td className='text-center'>{log.success}</td>
              <td className='text-center'>{log.failed}</td>
              <td className='text-center'>{log.deleted}</td>
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
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(referenceLogs.length / itemsPerPage)}>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.14131 7.071L1.48431 12.728L0.0703125 11.314L5.02031 6.364L0.0703125 1.414L1.48431 0L7.14131 5.657C7.32878 5.84453 7.4341 6.09884 7.4341 6.364C7.4341 6.62916 7.32878 6.88347 7.14131 7.071Z" fill="#F46A05"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ReferenceLogsTable;
