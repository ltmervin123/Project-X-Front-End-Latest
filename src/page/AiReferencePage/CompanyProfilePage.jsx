import React from "react";
import "../../styles/MockInterviewPage.css";
import "../../styles/UserProfile.css";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../../components/AiReference/Sidebar";
import CompanyProfile from "../../components/AiReference/CompanyProfile/CompanyProfile";
import Header from "../../components/AiReference/Header";

function CompanyProfilePage() {
  return (
    <>
      <div className="mock-background">
        <Header />
        <div className="MockMaindashboard-container">
          <Row>
            <Col md={2} className="p-0">
              <Sidebar />
            </Col>
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
