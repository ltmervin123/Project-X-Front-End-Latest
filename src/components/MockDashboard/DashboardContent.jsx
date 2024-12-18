import React from "react";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";

const DashboardContent = () => {
  return (
    <Container className="text-center py-5 d-flex gap-3 flex-column dashboard-section">
      {/* Header Text */}
      <h2 className="dashoard-title">Let's turn your professional dreams into reality!</h2>

      {/* Content Row */}
      <Row className="justify-content-center">
        {/* Column 1 - Video Tutorial */}
        <Col md={6} className="mb-4">
          <Card className="dashboard-content-card h-100">
            <Card.Body>
              <Card.Title>Video Tutorial</Card.Title>
              <Card.Text>Learn how to make the most of our platform</Card.Text>
              <div className="mb-3 video-play-container">
                <video width="100%" controls>
                  <source src="path-to-your-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <Button className="btn-watch">Watch Now</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Column 2 - Upgrade to Premium */}
        <Col md={6} className="mb-4">
          <Card className="dashboard-content-card h-100">
            <Card.Body>
              <Card.Title>Upgrade to Premium</Card.Title>
              <Card.Text>Get access to all features and boost your interview</Card.Text>
              <ListGroup variant="flush" className="text-start mb-3 video-play-container">
                <ListGroup.Item>Unlimited mock interviews</ListGroup.Item>
                <ListGroup.Item>Unlimited mock interviews</ListGroup.Item>
                <ListGroup.Item>Advanced resume analysis</ListGroup.Item>
                <ListGroup.Item>Advanced resume analysis</ListGroup.Item>
              </ListGroup>
              <Button  className="btn-upgrade-now">Upgrade Now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardContent;
