import React from "react";
import "../styles/AiReference.css";
import { Container, Row, Col } from 'react-bootstrap';
import Header from "../components/AiReferenceDashboard/Header";
import Sidebar from "../components/AiReferenceDashboard/Sidebar";
// import Maindashboard from "../components/Analytics/Maindashboard";

function AiReferencePage() {
  return (
    <>
      <div className="d-flex maindashboard-container">
        <Sidebar />
        <Container className="flex-grow-1 ">
          <Header />
          {/* <Row>
            <Col  md={12}>
              <Maindashboard />
            </Col>
          </Row> */}
          
        </Container>
      </div>

    </>
  );
}

export default AiReferencePage;
