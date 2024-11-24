import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Image, Nav } from "react-bootstrap";
import { FaUpload, FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import "../../styles/UserProfile.css";
import defaultAvatart from "../../assets/default.png";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("personal-info");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [isToggled, setIsToggled] = useState(false); // State for two-factor authentication
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false); // State for notifications
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleChange = () => {
    setIsToggled(!isToggled);
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
  };

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Container className="user-profile-section">
      <h4>USER PROFILE</h4>
      <p>Manage your account settings and preferences.</p>
      
      {/* Navigation Links */}
      <Nav className="mb-4 user-nav d-flex justify-content-center">
        <Nav.Item>
          <Nav.Link 
            href="#personal-info" 
            onClick={() => handleNavClick("personal-info")} 
            active={activeSection === "personal-info"}
          >
            Personal Info
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            href="#security" 
            onClick={() => handleNavClick("security")} 
            active={activeSection === "security"}
          >
            Security
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            href="#preferences" 
            onClick={() => handleNavClick("preferences")} 
            active={activeSection === "preferences"}
          >
            Preferences
          </Nav.Link>
        </Nav.Item>
      </Nav>
      
      {activeSection === "personal-info" && (
        <div id="personal-info">
          {/* Personal Info Form */}
          <Row className="personal-info-container">
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
              <h5>Subscription</h5>
              <div className="d-flex">
                <div>
                  <p className="currentPlanTitle">Current Plan: Pro (Annual)</p>
                  <p>15 days Remaining</p>
                </div>
                <Button type="button">
                    Update Subscription
                </Button>
              </div>
            </div>
          </Row>
        </div>
      )}

      {activeSection === "security" && (
        <div id="security">
          <Row className="security-container">
            <Form className="d-flex flex-column gap-3">
              <Form.Group controlId="formPass">
                <Form .Label>Password</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control 
                    type={showPassword ? "text" : "password"} 
                    placeholder="*********" 
                  />
                  <Button 
                    className="btn-hide-unhide"
                    variant="outline-secondary" 
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <Button className="btn-change-pass" type="button">Change Password</Button>
              {/* Toggle Switch */}
              <Form.Group controlId="toggleSwitch">
                <Form.Check 
                  type="switch"
                  id="custom-switch"
                  label={isToggled ? "Enable Two-Factor Authentication" : "Disable Two-Factor Authentication"}
                  checked={isToggled}
                  onChange={handleToggleChange}
                  className="custom-switch"
                />
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <div className="footer-personal-info w-100">
              <h5>Subscription</h5>
              <div className="d-flex">
                <div>
                  <p className="currentPlanTitle">Current Plan: Pro (Annual)</p>
                  <p>15 days Remaining</p>
                </div>
                <Button type="button">
                    Update Subscription
                </Button>
              </div>
            </div>
          </Row>
        </div>
      )}
      
      {activeSection === "preferences" && (
        <div id="preferences">
          <Row className="preferences-container">
            <Form className="d-flex flex-column gap-3">
              {/* Language Selection */}
              <Form.Group controlId="formLanguage">
                <Form.Label>Select a Language</Form.Label>
                <Form.Control as="select">
                  <option>Select</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  {/* Add more languages as needed */}
                </Form.Control>
              </Form.Group>

              {/* Enable Notifications Toggle */}
              <Form.Group controlId="toggleNotifications">
                <Form.Check 
                  type="switch"
                  id="notification-switch"
                  label={isNotificationsEnabled ? "Enable Notifications" : "Disable Notifications"}
                  checked={isNotificationsEnabled}
                  onChange={handleNotificationsToggle}
                  className="custom-switch"
                />
              </Form.Group>

              {/* Light/Dark Mode Toggle */}
              <Form.Group controlId="toggleMode">
                <Form.Check 
                  type="switch"
                  id="mode-switch"
                  label={isDarkMode ?  "Dark Mode" : "Light Mode"}
                  checked={isDarkMode}
                  onChange={handleModeToggle}
                  className="custom-switch"
                />
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <div className="footer-personal-info w-100">
              <h5>Subscription</h5>
              <div className="d-flex">
                <div>
                  <p className="currentPlanTitle">Current Plan: Pro (Annual)</p>
                  <p>15 days Remaining</p>
                </div>
                <Button type="button">
                    Update Subscription
                </Button>
              </div>
            </div>
          </Row>
        </div>
      )}
      
    </Container>
  );
};

export default UserProfile;