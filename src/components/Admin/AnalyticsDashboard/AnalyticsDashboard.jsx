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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState("All Company");
  const [showCustomizeDropdown, setShowCustomizeDropdown] = useState(false);

  const {
    data: analyticsData,
    isLoading: isLoadingAnalyticsData,
    isError: isErrorAnalyticsData,
  } = useQuery({
    queryKey: ["adminDashboardStat"],
    queryFn: AdminAPI.getDashboardStat,
    staleTime: 1000 * 60 * 1,
  });

  // Sample companies data
  const companies = [
    {
      name: "HR-HΛTCH",
      totalUser: 150,
      totalActiveUsers: 75,
      totalReferenceCheck: 280,
      totalRevenue: 15000,
    },
    {
      name: "TechCorp",
      totalUser: 200,
      totalActiveUsers: 120,
      totalReferenceCheck: 350,
      totalRevenue: 20000,
    },
    {
      name: "GlobalHR",
      totalUser: 180,
      totalActiveUsers: 90,
      totalReferenceCheck: 310,
      totalRevenue: 17000,
    },
  ];

  // Add filtered companies based on search query
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (searchQuery) {
      setShowSuggestions(true);
      const filteredResults = companies.filter((company) =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredResults.length === 1) {
        setSelectedCompany(filteredResults[0].name);
      }
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      const filteredCompanies = companies.filter((company) =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // If there's exactly one match, select that company
      if (filteredCompanies.length === 1) {
        setSelectedCompany(filteredCompanies[0].name);
      }
      // If search is cleared, reset to "All Company"
      else if (searchQuery === "") {
        setSelectedCompany("All Company");
      }
      setShowCustomizeDropdown(true);
    }
  }, [searchQuery]);

  // Add this effect to handle dropdown visibility
  useEffect(() => {
    if (searchQuery) {
      setShowCustomizeDropdown(false);
    }
  }, [searchQuery]);

  // Get current company data or combined data if "All Company" is selected
  const getCurrentCompanyData = () => {
    if (selectedCompany === "All Company") {
      return {
        totalUser: analyticsData?.totalCompany || 0,
        totalActiveUsers: analyticsData?.activeCompany || 0,
        totalReferenceCheck: analyticsData?.referenceCheck || 0,
        totalRevenue: 0,
      };
    }
    return (
      companies.find((company) => company.name === selectedCompany) ||
      companies[0]
    );
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
    const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const newUsers = [55, 42, 58, 50, 62, 48, 55];
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
    switch (activeTab) {
      case "userStatistics":
        return (
          <UserStatisticsChartSection
            selectedCompany={selectedCompany}
            companies={companies}
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
        return (
          <SystemUsageChartSection
            isVisible={isLineChartVisible}
            selectedCompany={selectedCompany}
            companies={companies}
          />
        );
      case "subscription":
        return (
          <SubscriptionChartSection
            isVisible={isLineChartVisible}
            selectedCompany={selectedCompany}
            companies={companies}
          />
        );
      case "peakHours":
        return (
          <PeakHoursChartSection
            isVisible={isLineChartVisible}
            selectedCompany={selectedCompany}
            companies={companies}
          />
        );
      default:
        return null;
    }
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
              xs={12}  // Full width on extra small devices
              sm={6}   // Half width on small devices
              md={3}   // Quarter width on medium and larger devices
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
          <div className={`analytics-dashboard-button-controller mb-3 d-flex align-items-center justify-content-center fade-in ${
            isButtonControllerVisible ? "visible" : ""
          }`}>
            <button
              className={activeTab === "userStatistics" ? "active" : ""}
              onClick={() => setActiveTab("userStatistics")}
            >
              User Statistics
            </button>
            <button
              className={activeTab === "systemUsage" ? "active" : ""}
              onClick={() => setActiveTab("systemUsage")}
            >
              System Usage
            </button>
            <button
              className={activeTab === "subscription" ? "active" : ""}
              onClick={() => setActiveTab("subscription")}
            >
              Subscription
            </button>
            <button
              className={activeTab === "peakHours" ? "active" : ""}
              onClick={() => setActiveTab("peakHours")}
            >
              Peak Hours
            </button>
          </div>
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-center mb-2">
          <div className={`search-company d-flex justify-content-between w-100 fade-in ${
                isButtonControllerVisible ? "visible" : ""
              }`}>
            <div className="d-flex align-items-center">
              <div className="search-wrapper position-relative">
                <input
                  type="text"
                  placeholder="Search company..."
                  className="form-control ps-4 pe-5"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="search-icon position-absolute top-50 end-0 translate-middle-y" />
                {showSuggestions && searchQuery && (
                  <div className="search-suggestions position-absolute w-100 mt-1">
                    {filteredCompanies.length > 0 ? (
                      filteredCompanies.map((company, index) => (
                        <div
                          key={index}
                          className={`suggestion-item p-2 ${
                            selectedCompany === company.name ? "active" : ""
                          }`}
                          onClick={() => {
                            setSelectedCompany(company.name);
                            setSearchQuery("");
                            setShowSuggestions(false);
                          }}
                        >
                          {company.name}
                        </div>
                      ))
                    ) : (
                      <div className="suggestion-item p-2 text-muted">
                        No companies found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="customize-dropdown position-relative">
              <button
                className={`btn-dropdown-company d-flex align-items-center gap-2 ${
                  showCustomizeDropdown ? "dropdown-open" : ""
                }`}
                onClick={() =>
                  !searchQuery &&
                  setShowCustomizeDropdown(!showCustomizeDropdown)
                }
              >
                {selectedCompany}
              </button>
              {showCustomizeDropdown && !searchQuery && (
                <div className="dropdown-menu show position-absolute end-0">
                  <div
                    className={`dropdown-item ${
                      selectedCompany === "All Company" ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedCompany("All Company");
                      setShowCustomizeDropdown(false);
                    }}
                  >
                    All Company
                  </div>
                  {companies.map((company, index) => (
                    <div
                      key={index}
                      className={`dropdown-item ${
                        selectedCompany === company.name ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedCompany(company.name);
                        setShowCustomizeDropdown(false);
                      }}
                    >
                      {company.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
      {renderActiveSection()}
    </div>
  );
};

export default AnalyticsDashboard;
