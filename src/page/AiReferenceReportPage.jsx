import React from "react";
import "../styles/AiReferenceReport.css";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "../components/AiReferenceDashboard/Sidebar";
import Report from "../components/AiReferenceDashboard/Report";

function AiReferenceReportPage() {
  return (
    <>
      <div className="d-flex ">
        <Sidebar />
        <Container className="flex-grow-1  AiReferencebg">
          <Row>
            <Col  md={12}>
              <Report />
            </Col>
          </Row>
          
        </Container>
      </div>

    </>
  );
}

export default AiReferenceReportPage;
