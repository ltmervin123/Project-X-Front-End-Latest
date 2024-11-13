import React from 'react';
import '../styles/Analytics.css';
import { Container} from 'react-bootstrap';
import Header from '../components/Analytics/Header';
import Sidebar from '../components/Analytics/Sidebar';
import Maindashboard from '../components/Analytics/Maindashboard';

function Analytics() {
  return (
    <div className="d-flex maindashboard-container">
      <Sidebar />
      <Container className="flex-grow-1 p-4">
        <Header/>
        <Maindashboard/>
      </Container>
    </div>
  );
}

export default Analytics;
