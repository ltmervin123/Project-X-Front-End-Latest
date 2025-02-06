import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../components/AiReferee/Header";
import Sidebar from "../components/AiReferee/Sidebar";
import ReferenceReports from "../components/AiReferee/Reports";
import "../styles/AiRefereeReports.css";


function AiRefereeReportsPage() {
  return (
    <>
      <Header />
      <div className="MockMaindashboard-container h-100">
        <Row>
          {/* Sidebar with 3/12 width */}
          <Col md={2} className="p-0 MockSidebar">
            <Sidebar />
          </Col>
          {/* Main content area with 9/12 width */}
          <Col md={10} className="p-3">
            <ReferenceReports />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AiRefereeReportsPage;
