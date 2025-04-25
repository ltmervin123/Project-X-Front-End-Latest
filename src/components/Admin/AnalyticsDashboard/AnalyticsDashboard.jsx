import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserStatisticsChartSection from "./components/UserStatisticsChartSection";
import SystemUsageChartSection from "./components/SystemUsageChartSection";
import SubscriptionChartSection from "./components/SubscriptionChartSection";
import PeakHoursChartSection from "./components/PeakHoursChartSection";
import * as AdminAPI from "../../../api/ai-reference/admin/admin-api";
import { useQuery } from "@tanstack/react-query";

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [showCustomizeDropdown, setShowCustomizeDropdown] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // Add table sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const {
    data: analyticsData,
    isLoading: isLoadingAnalyticsData,
    isError: isErrorAnalyticsData,
  } = useQuery({
    queryKey: ["adminDashboardStat"],
    queryFn: AdminAPI.getDashboardStat,
    staleTime: 1000 * 60 * 1,
  });

  const getCurrentCompanyData = () => {
    return {
      totalUser: analyticsData?.totalCompany || 0,
      totalActiveUsers: analyticsData?.activeCompany || 0,
      totalReferenceCheck: analyticsData?.referenceCheck || 0,
      totalRevenue: 0,
    };
  };

  const currentCompanyData = getCurrentCompanyData();

  // Replace static data with dynamic data
  const { totalUser, totalActiveUsers, totalReferenceCheck, totalRevenue } =
    currentCompanyData;

  // For fade in smooth animation
  const [isAiReferenceCardVisible, setIsAiReferenceCardVisible] =
    useState(false);
  const [isLineChartVisible, setIsLineChartVisible] = useState(false);
  const [isButtonControllerVisible, setIsButtonControllerVisible] =
    useState(false);
  const [isBarChartVisible, setIsBarChartVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("userStatistics");

  useEffect(() => {
    const timers = [
      setTimeout(() => setIsAiReferenceCardVisible(true), 300),
      setTimeout(() => setIsButtonControllerVisible(true), 600),
      setTimeout(() => setIsLineChartVisible(true), 900),
      setTimeout(() => setIsBarChartVisible(true), 1200),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const getWeeklyData = () => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const activeUsers = [8, 12, 15, 10, 9, 5, 3];
    const inactiveUsers = [4, 6, 8, 5, 7, 10, 12];
    return { weekDays, activeUsers, inactiveUsers };
  };

  function getMonthlyNewUsers() {
    const months = [
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const newUsers = [44, 11, 55, 42, 58, 50, 62, 48, 55];
    return { months, newUsers };
  }

  function getUserRolesData() {
    const rawData = [40, 60]; // Regular users first (80%), Premium users second (20%)
    const total = rawData.reduce((a, b) => a + b, 0);
    const data = rawData.map((value) =>
      Number(((value / total) * 100).toFixed(0))
    );

    return {
      labels: ["Premium", "Regular"], // Switched order to match rawData
      datasets: [
        {
          data: data,
          backgroundColor: ["#f46a05", "#1706ac"], // Colors match the new label order
          borderWidth: 0,
        },
      ],
    };
  }

  function calculateLabelPosition(percentage, index, total) {
    const startAngle = -Math.PI / 1; // Start from the top (12 o'clock position)

    // Calculate cumulative percentages for segments before the current one
    let cumulativePercentage = 0;
    for (let i = 0; i < index; i++) {
      cumulativePercentage += getUserRolesData().datasets[0].data[i];
    }

    // Calculate angle for the current segment
    const currentAngle =
      startAngle + (cumulativePercentage / total) * (2 * Math.PI);
    const segmentAngle = (percentage / 100) * (2 * Math.PI);
    const midAngle = currentAngle + segmentAngle / 2; // Mid-angle for label positioning

    // Adjust label distance for centering
    const labelDistance = 230; // Adjust this value as needed for centering

    // Calculate x and y positions
    const x = Math.cos(midAngle) * labelDistance;
    const y = Math.sin(midAngle) * labelDistance;

    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: "translate(-50%, -50%)",
      position: "absolute",
      textAlign: "center",
      width: "120px",
      fontSize: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };
  }

  // Chart configurations
  const { weekDays, activeUsers, inactiveUsers } = getWeeklyData();
  const { months, newUsers } = getMonthlyNewUsers();

  const doubleBarData = {
    labels: weekDays,
    datasets: [
      {
        label: "Active Users",
        data: activeUsers,
        backgroundColor: "#f46a05",
        borderRadius: 4,
      },
      {
        label: "Inactive Users",
        data: inactiveUsers,
        backgroundColor: "#1706ac",
        borderRadius: 4,
      },
    ],
  };

  const doubleBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    barPercentage: 0.7,
    categoryPercentage: 0.8,
  };

  const barData = {
    labels: months,
    datasets: [
      {
        label: "New Users",
        backgroundColor: "#1706ac",
        borderColor: "transparent",
        borderWidth: 2,
        data: newUsers,
        borderRadius: 10,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#000",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#000",
        },
      },
    },
  };

  const cardData = [
    {
      title: "Total Users",
      count: totalUser,
      color: "#f46a05",
      path: "/AnalyticsDashboard",
    },
    {
      title: "Active Users",
      count: totalActiveUsers,
      color: "#F8BD00",
      path: "/AnalyticsDashboard",
    },
    {
      title: "Reference Checks",
      count: totalReferenceCheck,
      color: "#319F43",
      path: "/AnalyticsDashboard",
    },
    {
      title: "Revenue",
      count: `¥ ${totalRevenue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      color: "#686868",
      path: "/AnalyticsDashboard",
    },
  ];

  const renderActiveSection = () => {
    if (showTable) {
      return null;
    }

    switch (activeTab) {
      case "userStatistics":
        return (
          <UserStatisticsChartSection
            isLineChartVisible={isLineChartVisible}
            isBarChartVisible={isBarChartVisible}
            doubleBarData={doubleBarData}
            doubleBarOptions={doubleBarOptions}
            barData={barData}
            barOptions={barOptions}
            getUserRolesData={getUserRolesData}
            calculateLabelPosition={calculateLabelPosition}
          />
        );
      case "systemUsage":
        return <SystemUsageChartSection isVisible={isLineChartVisible} />;
      case "subscription":
        return <SubscriptionChartSection isVisible={isLineChartVisible} />;
      case "peakHours":
        return <PeakHoursChartSection isVisible={isLineChartVisible} />;
      default:
        return null;
    }
  };

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

  // Add search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredCompanies = companies.filter((company) =>
    company.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Get paginated data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCompanies.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  // Handle page changes
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3 className="mb-0"> Admin Dashboard</h3>
        <p className="mb-2">View analytics and metrics for your application.</p>
      </div>

      <div>
        <Row className="mb-3 AiReferenceCard-container">
          {cardData.map((card, index) => (
            <Col
              key={index}
              xs={12} // Full width on extra small devices
              sm={6} // Half width on small devices
              md={3} // Quarter width on medium and larger devices
              className={`mb-2 fade-in ${
                isAiReferenceCardVisible ? "visible" : ""
              }`}
            >
              <div
                className="AiReferenceCard"
                onClick={() => navigate(card.path)}
              >
                <div className="h-100">
                  <p className="d-flex title">
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: card.color,
                        marginRight: "10px",
                      }}
                    ></div>
                    {card.title}
                  </p>
                  <p className="d-flex align-items-center justify-content-center count">
                    {card.count}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Row>
        <Col xs={12} md={6}>
          <div
            className={`analytics-dashboard-button-controller mb-3 d-flex align-items-center justify-content-center fade-in ${
              isButtonControllerVisible ? "visible" : ""
            }`}
          >
            <button
              className={
                activeTab === "userStatistics" && !showTable ? "active" : ""
              }
              onClick={() => {
                setActiveTab("userStatistics");
                setShowTable(false);
              }}
            >
              User Statistics
            </button>
            <button
              className={
                activeTab === "systemUsage" && !showTable ? "active" : ""
              }
              onClick={() => {
                setActiveTab("systemUsage");
                setShowTable(false);
              }}
            >
              System Usage
            </button>
            <button
              className={
                activeTab === "subscription" && !showTable ? "active" : ""
              }
              onClick={() => {
                setActiveTab("subscription");
                setShowTable(false);
              }}
            >
              Subscription
            </button>
            <button
              className={
                activeTab === "peakHours" && !showTable ? "active" : ""
              }
              onClick={() => {
                setActiveTab("peakHours");
                setShowTable(false);
              }}
            >
              Peak Hours
            </button>
          </div>
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-center mb-2">
          <div
            className={`search-company d-flex  w-100 fade-in ${
              isButtonControllerVisible ? "visible" : ""
            }`}
          >
            <div className="d-flex align-items-center justify-content-end w-100">
              <div className="search-wrapper position-relative ">
                <input
                  type="text"
                  placeholder="Search companies..."
                  className="form-control ps-4 pe-5"
                  value={searchQuery}
                  onClick={() => setShowTable(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {showTable ? (
        <Row>
          <Col xs={12}>
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
                          color:
                            company.status === "Active" ? "#319F43" : "#FF0000",
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
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
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
                      d="M0.371133 5.62144L6.08746 0.0244005L7.48647 1.45323L2.48456 6.35077L7.3821 11.3527L5.95327 12.7517L0.356225 7.03536C0.170741 6.84587 0.0681127 6.59047 0.0709085 6.32532C0.0737042 6.06017 0.181695 5.80698 0.371133 5.62144Z"
                      fill="#F46A05"
                    />
                  </svg>
                </button>
                <span>{currentPage}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
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
          </Col>
        </Row>
      ) : (
        renderActiveSection()
      )}
    </div>
  );
};

export default AnalyticsDashboard;
