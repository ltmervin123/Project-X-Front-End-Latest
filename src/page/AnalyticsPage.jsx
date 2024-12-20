import React from "react";
import "../styles/Analytics.css";
import { Container, Row, Col } from 'react-bootstrap';
import Header from "../components/Result/Header";
import Sidebar from "../components/MockMainDashboard/Sidebar";
import MainDashboard from "../components/Analytics/Maindashboard";

function Analytics() {
  return (
    <>
      <Header />
      <div className="MockMaindashboard-container">
          <Row>
            {/* Sidebar with 3/12 width */}
            <Col md={2} className="p-0 MockSidebar">
              <Sidebar />
            </Col>
            {/* Main dashboard with 9/12 width */}
            <Col md={9} className="p-3">
              <MainDashboard />
            </Col>
          </Row>
      </div>
    </>
  );
}

export default Analytics;
