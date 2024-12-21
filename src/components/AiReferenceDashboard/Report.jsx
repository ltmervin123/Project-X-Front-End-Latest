import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Report = () => {
  // Sample reference data
  const referenceData = [
    { refId: '#REF-001', candidate: 'Levi Mella', position: 'Graphic Designer', type: 'Basic', status: 'Completed', created: '2024-01-15' },
    { refId: '#REF-002', candidate: 'Kirk Delagente', position: 'Prompt Eng.', type: 'Customize', status: 'Pending', created: '2024-01-15' },
    { refId: '#REF-003', candidate: 'Aivan Sumalinog', position: 'Web Developer', type: 'Manage Fo.', status: 'In Progress', created: '2024-01-15' },
  ];

  // Helper function to determine the status color with inline styles
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return { color: "green", fontWeight: "300" };
      case "Pending":
        return { color: "#F8BD00", fontWeight: "300" };
      case "In Progress":
        return { color: "blue", fontWeight: "300" }; // you can change blue if needed
      default:
        return { color: "black" }; // Default color if the status is unknown
    }
  };

  return (
    <div className="AiReferenceReportContent mt-5">
      <div className="d-flex justify-content-end">
        <Button className='btn-newreference d-flex align-items-center justify-content-center gap-2' variant="primary">
            <svg width="20" height="20" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.8113 15.1498H14.9251V26.0376H11.2964V15.1498H0.410156V11.5206H11.2964V0.632812H14.9251V11.5206H25.8113V15.1498Z" fill="white"/>
            </svg>

            New Reference Check
        </Button>
      </div>

      <div className="AiReferenceReportContainer mt-4">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="search">
              <Form.Label>Search</Form.Label>
              <Form.Control type="text" placeholder="Search..." />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" placeholder="Enter status..." />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control type="text" placeholder="Enter type..." />
            </Form.Group>
          </Col>
        </Row>

        <table className="table mt-4">
          <thead>
            <tr>
              <th>Reference ID</th>
              <th>Candidate</th>
              <th>Position</th>
              <th>Type</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {referenceData.map((ref) => {
              const { color, fontWeight } = getStatusColor(ref.status);
              return (
                <tr key={ref.refId}>
                  <td>{ref.refId}</td>
                  <td>{ref.candidate}</td>
                  <td>{ref.position}</td>
                  <td>{ref.type}</td>
                  <td>
                    <span style={{ color, fontWeight }}>{ref.status}</span>
                  </td>
                  <td>{ref.created}</td>
                  <td>
                    <Button className="btn-view" variant="link">View</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
