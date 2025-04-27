import React, { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as AdminAPI from "../../../../api/ai-reference/admin/admin-api";

const CompanyListSection = ({ searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const rowHeight = 40; // Set the height of each row in pixels

  const { data: result } = useQuery({
    queryKey: ["adminDashboardCompanyList"],
    queryFn: AdminAPI.getCompanies,
    staleTime: 1000 * 60 * 1,
  });

  const companies = useMemo(() => {
    return result || [];
  }, [result]);

  const filteredCompanies = useMemo(() => {
    if (!companies) return [];

    return companies.filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [result, searchQuery]);

  useEffect(() => {
    const tableHeight = window.innerHeight * 0.4; // 50vh in pixels
    const calculatedItemsPerPage = Math.floor(tableHeight / rowHeight);
    setItemsPerPage(calculatedItemsPerPage);
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(filteredCompanies.length / itemsPerPage))
    );
  };

  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCompanies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCompanies, currentPage, itemsPerPage]);

  return (
    <div className="company-table-container d-flex justify-content-between flex-column bg-white shadow p-3 mb-2">
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
              <th key={key} className="sortable" style={{ cursor: "pointer" }}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedCompanies.length !== 0 ? (
            <>
              {paginatedCompanies.map((company, index) => (
                <tr key={index}>
                  <td>{company.personInCharge}</td>
                  <td>{company.email}</td>
                  <td>{company.name}</td>
                  <td
                    style={{
                      color:
                        company.isLogin === "Active" ? "#319F43" : "#FF0000",
                    }}
                  >
                    {company.isLogin}
                  </td>
                  <td>{company.lastLoginAt}</td>
                </tr>
              ))}

              {Array.from({
                length: itemsPerPage - paginatedCompanies.length,
              }).map((_, index) => (
                <tr key={`empty-${index}`} style={{ height: "54px" }}>
                  <td colSpan={5}>&nbsp;</td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex company-prev-next-btn-control justify-content-center align-items-center gap-3 ">
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
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(companies.length / itemsPerPage)}
        >
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
