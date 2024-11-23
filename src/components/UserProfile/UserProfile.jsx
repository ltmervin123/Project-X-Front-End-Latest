import React from "react";
import { Container, Form, Button, Row, Col, Image, Nav } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import "../../styles/UserProfile.css";
import defaultAvatart from "../../assets/default.png";

const UserProfile = () => {


  return (
    <Container className="user-profile-section">
      <h4>USER PROFILE</h4>
      <p>Manage your account settings and preferences.</p>
      
      {/* Navigation Links */}
      <Nav className="mb-4 user-nav d-flex justify-content-center">
        <Nav.Item>
          <Nav.Link href="#personal-info">Personal Info</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#security">Security</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#preferences">Preferences</Nav.Link>
        </Nav.Item>
      </Nav>
      
      <div id="personal-info">
        <Row >
          <Col md={7}>
            <Form className="d-flex flex-column gap-3">
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="John Doe" />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="123 Main St, City, Country" />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="sample@example.com" />
              </Form.Group>
              <Button className="btn-update-user-info" type="button">Update Personal Info</Button>
            </Form>
          </Col>
          <Col md={5} className="d-flex align-items-center justify-content-end">
            <div className="avatar-container d-flex justify-content-center position-relative">
              <Image src={defaultAvatart} className="user-default-img" />
              <FaUpload className="upload-icon position-absolute" />
            </div>
          </Col>
        </Row>
        <Row>
          <div className="footer-personal-info w-100">
            <h5>Subcription</h5>
            <div className="d-flex">
              <div>
                <p className="currentPlanTitle">Current Plan: Pro (Annual)</p>
                <p>15 days Remaining</p>
              </div>
              <Button type="button">
                  Update Subcription
              </Button>
            </div>
          </div>
        </Row>
      </div>

    </Container>
  );
};

export default UserProfile;