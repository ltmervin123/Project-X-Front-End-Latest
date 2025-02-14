import React, { useState, useMemo } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import RegisterCompanyAvatar from "../../assets/companyregisteravatar.png";
import { useSignup } from "../../hook/useSignup";

const CompanyRegistrationForm = () => {
  const SERVICE = "AI_REFERENCE";
  const { signup, isLoading, error, message } = useSignup();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    size: "",
    industry: "",
    annualHiringVolume: "",
    firstName: "",
    lastName: "",
    positionTitle: "",
  });

  const buttonDisable = useMemo(() => {
    return Object.values(formData).some((value) => value.trim() === "");
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <Row>
            <Col md={9}>
              <Form.Group controlId="company-name">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Company Name"
                />
              </Form.Group>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="email-address">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email Address"
                    />
                    {/* Error warning for email */}
                    {(error === "Email is not valid" ||
                      error === "Email already exists") && <div>{error}</div>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                    />
                    {/* Error warning for password */}
                    {error === "Password is not strong enough" && (
                      <div>{error}</div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

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
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                    >
                      <option value="">Select Company Size</option>
                      <option value="1-50">1-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201+">201+ employees</option>
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
                    <option value="1-10">1-10 hires</option>
                    <option value="11-50">11-50 hires</option>
                    <option value="51+">51+ hires</option>
                  </Form.Control>
                </Form.Group>
                {/* Success message here  */}
                <div>
                  Company account has been created! Please check the registered
                  email for activation
                </div>
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

          <Button variant="primary" type="submit" disabled={buttonDisable}>
            Register Company
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;
