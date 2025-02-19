import React from "react";
import "../styles/MockInterviewPage.css";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../components/AiReference/Sidebar";
import CompanyProfile from "../components/CompanyProfile/CompanyProfile";
import Header from "../components/Result/Header";

function CompanyProfilePage() {
  return (
    <>
      <div className="mock-background">
        <Header />
        <div className="MockMaindashboard-container">
          <Row>
            {/* Sidebar with 3/12 width */}
            <Col md={2} className="p-0">
              <Sidebar />
            </Col>
            {/* Main dashboard with 9/12 width */}
            <Col md={10} className="p-3">
              <CompanyProfile />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default CompanyProfilePage;
