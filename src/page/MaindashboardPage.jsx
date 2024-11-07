// src/pages/MaindashboardPage.js
import React from 'react';
import '../styles/MainDashboard.css';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/maindashboard/Sidebar';
import MainDashboard from '../components/maindashboard/Maindashboard';
import Summary from '../components/maindashboard/Summary';
import Header from '../components/maindashboard/Header';

function MaindashboardPage() {
  return (
    <div className="d-flex maindashboard-container">
      <Sidebar />
      <Container className="flex-grow-1 p-4">
        <Header/>
        <Row>
          <Col md={8}>
            <MainDashboard />
          </Col>
          <Col md={3}>
            <Summary />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MaindashboardPage;
