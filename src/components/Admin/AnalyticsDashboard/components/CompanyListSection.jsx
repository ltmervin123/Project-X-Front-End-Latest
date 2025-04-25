import React, { useState } from "react";

const CompanyListSection = ({ searchQuery }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const companies = [
    {
      name: "John Smith",
      email: "john.smith@hrhatch.com",
      company: "HR-HΛTCH",
      status: "Active",
      lastLogin: "2024-01-15",
      checks: 1250,
    },
    {
      name: "Sarah Johnson",
      email: "sarah.j@techcorp.com",
      company: "TechCorp",
      status: "Inactive",
      lastLogin: "2024-01-14",
      checks: 980,
    },
    {
      name: "Michael Chen",
      email: "m.chen@globalhr.com",
      company: "GlobalHR",
      status: "Active",
      lastLogin: "2024-01-15",
      checks: 1500,
    },
    {
      name: "Emma Davis",
      email: "emma.d@innovatech.com",
      company: "InnovaTech",
      status: "Active",
      lastLogin: "2024-01-15",
      checks: 2100,
    },
    {
      name: "Alex Wong",
      email: "alex.w@nexushr.com",
      company: "NexusHR",
      status: "Active",
      lastLogin: "2024-01-15",
      checks: 1750,
    },
    {
      name: "Maria Garcia",
      email: "maria.g@talentpro.com",
      company: "TalentPro",
      status: "Inactive",
      lastLogin: "2024-01-13",
      checks: 850,
    },
    {
      name: "David Kim",
      email: "david.k@hrmaster.com",
      company: "HR Master",
      status: "Active",
      lastLogin: "2024-01-15",
      checks: 1620,
    },
    {
      name: "Lisa Thompson",
      email: "lisa.t@peoplefirst.com",
      company: "People First",
      status: "Active",
      lastLogin: "2024-01-15",
      checks: 1890,
    },
    {
      name: "James Wilson",
      email: "james.w@workday.com",
      company: "WorkDay Solutions",
      status: "Inactive",
      lastLogin: "2024-01-12",
      checks: 720,
    },
    {
      name: "Sophie Martin",
      email: "sophie.m@talentwise.com",
      company: "TalentWise",
      status: "Active",
      lastLogin: "2024-01-15",
      checks: 1380,
    },
  ];
  const filteredCompanies = companies.filter((company) =>
    company.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Get paginated data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCompanies.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  // Add sort function
  const sortData = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sortedData = [...filteredCompanies].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortedData;
  };
  return (
    <div className="company-table-container bg-white shadow p-3 mb-4">
      <table className=" mb-0">
        <thead>
          <tr>
            {[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "company", label: "Company" },
              { key: "status", label: "Status" },
              { key: "lastLogin", label: "Last Login" },
            ].map(({ key, label }) => (
              <th
                key={key}
                onClick={() => sortData(key)}
                className="sortable"
                style={{ cursor: "pointer" }}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getPaginatedData().map((company, index) => (
            <tr key={index}>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>{company.company}</td>
              <td
                style={{
                  color: company.status === "Active" ? "#319F43" : "#FF0000",
                }}
              >
                {company.status}
              </td>
              <td>{company.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex company-prev-next-btn-control justify-content-center align-items-center gap-3 mt-3">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.371133 5.62144L6.08746 0.0244005L7.48647 1.45323L2.48456 6.35077L7.3821 11.3527L5.95327 12.7517L0.356225 7.03536C0.170741 6.84587 0.0681127 6.59047 0.0709085 6.32532C0.0737042 6.06017 0.181695 5.80698 0.371133 5.62144Z"
              fill="#F46A05"
            />
          </svg>
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.14131 7.071L1.48431 12.728L0.0703125 11.314L5.02031 6.364L0.0703125 1.414L1.48431 0L7.14131 5.657C7.32878 5.84453 7.4341 6.09884 7.4341 6.364C7.4341 6.62916 7.32878 6.88347 7.14131 7.071Z"
              fill="#F46A05"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CompanyListSection;
