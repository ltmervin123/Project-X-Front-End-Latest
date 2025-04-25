import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import UserStatisticsChartSection from "./components/UserStatisticsChartSection";
import SystemUsageChartSection from "./components/SystemUsageChartSection";
import SubscriptionChartSection from "./components/SubscriptionChartSection";
import PeakHoursChartSection from "./components/PeakHoursChartSection";
import CompanyListSection from "./components/CompanyListSection";
import DashboardController from "./components/DashboardController";
import CardMetrics from "./components/CardMetrics";

const AnalyticsDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTable, setShowTable] = useState(false);
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

  return (
    <div className="MockMainDashboard-content d-flex flex-column gap-2">
      <div>
        <h3 className="mb-0"> Admin Dashboard</h3>
        <p className="mb-2">View analytics and metrics for your application.</p>
      </div>

      <div>
        <CardMetrics isAiReferenceCardVisible={isAiReferenceCardVisible} />
      </div>
      <Row>
        <DashboardController
          isButtonControllerVisible={isButtonControllerVisible}
          showTable={showTable}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setShowTable={setShowTable}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </Row>

      {showTable ? (
        <Row>
          <Col xs={12}>
            <CompanyListSection searchQuery={searchQuery} />
          </Col>
        </Row>
      ) : (
        renderActiveSection()
      )}
    </div>
  );
};

export default AnalyticsDashboard;
