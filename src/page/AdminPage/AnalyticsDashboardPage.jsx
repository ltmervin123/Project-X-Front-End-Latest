import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/Admin/Header";
import Sidebar from "../../components/Admin/Sidebar";

import AnalyticsDashboard from "../../components/Admin/AnalyticsDashboard/AnalyticsDashboard";
import "../../styles/AdminStyles/AnalyticsDashboardPage.css";

function AnalyticsDashboardPage() {
  return (
    <>
      <Header />
      <div className="MockMaindashboard-container ">
        <Row>
          <Col md={2} className="p-0 MockSidebar">
            <Sidebar />
          </Col>

          <Col md={10} className="p-3">
            <AnalyticsDashboard />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AnalyticsDashboardPage;
