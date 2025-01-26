import React from "react";
import "../styles/AiReferenceChecker.css";
import { Container, Row, Col } from 'react-bootstrap';
import Header from "../components/AiReferenceDashboard/Header";
import Sidebar from "../components/AiReferenceDashboard/Sidebar";
import ReferenceChecker from "../components/AiReferenceDashboard/ReferencenceChecker";

function AiReferenceCheckerPage() {
  return (
    <>
      <div className="d-flex aiReferenceContainer">
        <Header />
        <Sidebar />
        <Container className="flex-grow-1 AiReferencebg">
          <Row>
            <Col  md={12}>
              <ReferenceChecker />
            </Col>
          </Row>
          
        </Container>
      </div>

    </>
  );
}

export default AiReferenceCheckerPage;
