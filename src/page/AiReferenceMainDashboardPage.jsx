import React from "react";
import "../styles/AiReferenceMaindashboard.css";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "../components/AiReferenceDashboard/Sidebar";
import Maindashboard from "../components/AiReferenceDashboard/Maindashboard";

function AiReferenceMainDashboardPage() {
  return (
    <>
      <div className="d-flex aiReferenceContainer">
        <Sidebar />
        <Container className="flex-grow-1 AiReferencebg">
          <Row>
            <Col  md={12}>
              <Maindashboard />
            </Col>
          </Row>
          
        </Container>
      </div>

    </>
  );
}

export default AiReferenceMainDashboardPage;
