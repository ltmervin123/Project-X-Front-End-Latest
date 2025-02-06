import React from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../components/AiReferee/Header";
import Sidebar from "../components/AiReferee/Sidebar";
import Jobs from "../components/AiReferee/Jobs";
import "../styles/AiRefereeJobs.css";

function AiRefereeCheckerPage() {
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
            <Jobs />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AiRefereeCheckerPage;
