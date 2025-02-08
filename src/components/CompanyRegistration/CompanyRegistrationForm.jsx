import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import RegisterCompanyAvatar from "../../assets/companyregisteravatar.png";

const CompanyRegistrationPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    location: "",
    companySize: "",
    industry: "",
    firstName: "",
    lastName: "",
    positionTitle: "",
    annualHiringVolume: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="company-reg-container  d-flex align-items-center flex-column justify-content-center">
      <h4 className="text-center">Company Registration</h4>
      <i className="text-center">
        Join our platform and start hiring top talent today!
      </i>

      <div className="my-4 company-registration-container-form">
        <div className="company-reg-title">
          <h5 className="m-0">Register Your Company</h5>
          <p className="m-0">
            Provide your company details to create an account
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="form-company-reg">
          <Row >
            <Col md={9}>
              <Form.Group controlId="company-name">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter Company Name"
                />
              </Form.Group>

              <Form.Group controlId="email-address">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                />
              </Form.Group>

              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter Company Location"
                />
              </Form.Group>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="company-size">
                    <Form.Label>Company Size</Form.Label>
                    <Form.Control
                      as="select"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                    >
                      <option value="">Select Company Size</option>
                      <option value="small">1-50 employees</option>
                      <option value="medium">51-200 employees</option>
                      <option value="large">201+ employees</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="industry">
                    <Form.Label>Industry</Form.Label>
                    <Form.Control
                      as="select"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                    >
                      <option value="">Select Industry</option>
                      <option value="tech">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <div className="my-4">
                <h5>Person In-charge</h5>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="first-name">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="last-name">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="position-title">
                  <Form.Label>Position Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="positionTitle"
                    value={formData.positionTitle}
                    onChange={handleChange}
                    placeholder="Ex. HR Manager "
                  />
                </Form.Group>

                <Form.Group controlId="annual-hiring-volume">
                  <Form.Label>Annual Hiring Volume</Form.Label>
                  <Form.Control
                    as="select"
                    name="annualHiringVolume"
                    value={formData.annualHiringVolume}
                    onChange={handleChange}
                  >
                    <option value="">Select Hiring Volume</option>
                    <option value="low">1-10 hires</option>
                    <option value="medium">11-50 hires</option>
                    <option value="high">51+ hires</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </Col>

            <Col md={3} className="d-flex align-items-start position-relative">
              <img
                src={RegisterCompanyAvatar}
                className="companyregisteravatar"
                alt="Image not found"
              />

            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Register Company
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CompanyRegistrationPage;
