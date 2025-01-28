import React from "react";
import "../styles/AiReferenceMaindashboard.css";
import { Row, Col } from 'react-bootstrap';
import Header from "../components/AiReferenceDashboard/Header";

import Sidebar from "../components/AiReferenceDashboard/Sidebar";
import Maindashboard from "../components/AiReferenceDashboard/Maindashboard";

function AiReferenceMainDashboardPage() {
  return (
    <>
        <Header />
        <div className="MockMaindashboard-container ">
          <Row>
            {/* Sidebar with 3/12 width */}
            <Col md={2} className="p-0 MockSidebar">
              <Sidebar />
            </Col>
            {/* Main content area with 9/12 width */}
              <Col md={10} className="p-3">
                <Maindashboard />
              </Col>
          </Row>
        </div>

    </>
  );
}

export default AiReferenceMainDashboardPage;
