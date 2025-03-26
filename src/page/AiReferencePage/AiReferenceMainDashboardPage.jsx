import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/AiReference/Header";
import Sidebar from "../../components/AiReference/Sidebar";
import PopupGuide from "../../components/AiReference/PopupGuide";
import Maindashboard from "../../components/AiReference/Maindashboard/Maindashboard";
import "../../styles/AiReferenceStyles/AiReferenceMaindashboard.css";;

function AiReferenceMainDashboardPage() {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <>
        <Header />
        <div className="MockMaindashboard-container "
      >
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
        {showGuide && (
        <PopupGuide introKey="mainDashboard" />
      )}
    </>
  );
}

export default AiReferenceMainDashboardPage;
