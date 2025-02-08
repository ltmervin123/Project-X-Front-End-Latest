import React from "react";
import { Row, Col } from 'react-bootstrap';
import Header from "../components/AiReference/Header";
import Sidebar from "../components/AiReference/Sidebar";
import Maindashboard from "../components/AiReference/Maindashboard";
import "../styles/AiReferenceMaindashboard.css";

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
