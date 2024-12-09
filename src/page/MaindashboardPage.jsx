// src/pages/MaindashboardPage.js
import React from "react";
import "../styles/MainDashboard.css";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/maindashboard/Sidebar";
import MainDashboard from "../components/maindashboard/Maindashboard";
import Summary from "../components/maindashboard/Summary";
import Header from "../components/maindashboard/Header";

function MaindashboardPage() {
  return (
    <>
      <div className="d-flex maindashboard-container">
        <Sidebar />
        <Container className="flex-grow-1 ">
          <Header />
          <Row>
            <Col md={8}>
              <MainDashboard />
            </Col>
            <Col md={4}>
              <Summary />
            </Col>
          </Row>
        </Container>
      </div>
      <svg
        className="background-svg1"
        width="auto"
        height="300" // Fixed height
        viewBox="0 0 381 343"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M220.229 230.82C220.229 277.568 182.332 315.464 135.585 315.464C88.8372 315.464 50.9408 277.568 50.9408 230.82C50.9408 184.073 88.8372 146.176 135.585 146.176C182.332 146.176 220.229 184.073 220.229 230.82Z"
          fill="#1706AC"
        />
        <path
          d="M88.5392 149.38C182.129 -16.0003 68.8119 -10.2521 0.454468 13.2946V344.679H321.138C427.941 252.432 365.639 253.609 321.138 265.729C204.609 295.855 -5.05087 314.761 88.5392 149.38Z"
          fill="#F46A05"
          stroke="#F46A05"
        />
      </svg>
    </>
  );
}

export default MaindashboardPage;
