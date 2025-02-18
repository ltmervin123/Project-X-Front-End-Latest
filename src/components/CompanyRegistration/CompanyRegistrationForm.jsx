import React, { useState, useMemo } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import RegisterCompanyAvatar from "../../assets/companyregisteravatar.png";
import { useSignup } from "../../hook/useSignup";
import { useNavigate } from "react-router-dom";

const CompanyRegistrationForm = () => {
  const SERVICE = "AI_REFERENCE";
  const { signup, isLoading, error, message } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false); // Separate state to keep checkbox unchecked until "Continue" is clicked

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      if (!agreeChecked) {
        setShowModal(true); // Show modal only if the user hasn't agreed yet
      } else {
        setIsChecked(true); // Allow checking again without modal
      }
    } else {
      setIsChecked(false);
      setAgreeChecked(false); // Reset agreement state when unchecked
    }
  };
  

  const handleContinue = () => {
    setAgreeChecked(true); // Mark that the user has agreed
    setIsChecked(true); // Keep the checkbox checked
    setShowModal(false); // Close modal
  };

  const handleClose = () => {
    setShowModal(false);
    setIsChecked(false); // Keep the checkbox unchecked if modal is closed without clicking "Continue"
  };


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

  const validateForm = useMemo(() => {
    return Object.values(formData).some((value) => value.trim() === "");
  }, [formData]);

  const disableButton = useMemo(() => {
    return validateForm || isLoading;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData, SERVICE);
  };

  return (
    <div className="company-reg-container d-flex align-items-center flex-column justify-content-center">
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

        <form onSubmit={handleSubmit} className="form-company-reg">
          <Row>
            <Col md={9}>
              <div className="mb-3">
                <label htmlFor="company-name" className="form-label">
                  Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Company Name"
                  className="form-control"
                  id="company-name"
                />
              </div>

              <Row className="mb-4">
                <Col md={6}>
                  <div className="mb-3 position-relative">
                    <label htmlFor="email-address" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email Address"
                      className={`form-control ${
                        error === "Email is not valid" ||
                        error === "Email already exists"
                          ? "is-invalid"
                          : ""
                      }`}
                      id="email-address"
                    />
                    {(error === "Email is not valid" ||
                      error === "Email already exists") && (
                      <div className="invalid-feedback">{error}</div>
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"} // This toggles the type between text and password
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      className={`form-control ${
                        error === "Password is not strong enough"
                          ? "is-invalid"
                          : ""
                      }`}
                      id="password"
                    />
                    <span
                      className={`toggle-password ${
                        error === "Password is not strong enough"
                          ? "is-invalid"
                          : ""
                      }`}
                      onClick={() => setShowPassword(!showPassword)} // Toggle the password visibility
                      style={{
                        cursor: "pointer",
                        zIndex: 10,
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                      {/* Toggle icon */}
                    </span>
                    {error === "Password is not strong enough" && (
                      <div className="invalid-feedback ">{error}</div>
                    )}
                  </div>
                </Col>
              </Row>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter Company Location"
                  className="form-control"
                  id="location"
                />
              </div>

              <Row className="mb-4">
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="company-size" className="form-label">
                      Company Size
                    </label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="form-select"
                      id="company-size"
                    >
                      <option value="">Select Company Size</option>
                      <option value="1-50">1-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201+">201+ employees</option>
                    </select>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label htmlFor="industry" className="form-label">
                      Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="form-select"
                      id="industry"
                    >
                      <option value="">Select Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                </Col>
              </Row>

              <div className="my-4">
                <h5>Person In-charge</h5>

                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="first-name" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                        className="form-control"
                        id="first-name"
                      />
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="mb-3">
                      <label htmlFor="last-name" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                        className="form-control"
                        id="last-name"
                      />
                    </div>
                  </Col>
                </Row>

                <div className="mb-3">
                  <label htmlFor="position-title" className="form-label">
                    Position Title
                  </label>
                  <input
                    type="text"
                    name="positionTitle"
                    value={formData.positionTitle}
                    onChange={handleChange}
                    placeholder="Ex. HR Manager"
                    className="form-control"
                    id="position-title"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="annual-hiring-volume" className="form-label">
                    Annual Hiring Volume
                  </label>
                  <select
                    name="annualHiringVolume"
                    value={formData.annualHiringVolume}
                    onChange={handleChange}
                    className="form-select"
                    id="annual-hiring-volume"
                  >
                    <option value="">Select Hiring Volume</option>
                    <option value="1-10">1-10 hires</option>
                    <option value="11-50">11-50 hires</option>
                    <option value="51+">51+ hires</option>
                  </select>
                </div>
                {/* Success message here */}
                {message && <div>{message}</div>}
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

          <div className="cr-agreement-box-check">
            <input 
              type="checkbox"
              id="cr-form-check-input"
              className="cr-form-check-input btn-modal"
              checked={isChecked}
              onChange={handleCheckboxChange} />
            <label for="cr-form-check-input" className="text-center form-check-label">
              By continuing, you agree to HR-HATCH  Terms of Service and
              acknowledge you've read our Data Protection Agreement.
            </label>
          </div>
          
          <Modal
            show={showModal}
            onHide={handleClose}
            centered
            className="cr-dpa-modal-agreement"
            backdrop="static"
          >
            <Modal.Body>
              <div className="cr-dpa-container d-flex justify-content-between align-items-center">
                <div className="cr-dpa-content d-flex flex-column align-items-center justify-content-start">
                  <h2>Data Protection Agreement (DPA)</h2>
                  <p>
                    This Data Protection Agreement ("Agreement") is entered into by and between the Subscriber ("User") and [HR-HATCH] ("Company") regarding the processing of personal data in connection with the User's online subscription.
                  </p>
                  <div className="cr-section">
                    <span className="cr-section-title">Purpose and Scope:</span>
                    <p className="cr-section-description">
                      This Agreement outlines how the Company collects, uses, stores, and protects the User's personal data in compliance with applicable data protection laws, including but not limited to the General Data Protection Regulation (GDPR) and relevant local regulations. The Company is committed to ensuring the privacy and security of all personal data it processes and will act in accordance with the principles of lawfulness, fairness, transparency, purpose limitation, data minimization, accuracy, storage limitation, integrity, and confidentiality.
                      This Agreement applies to all data processing activities related to the online subscription services provided by the Company, including the collection, storage, transfer, and deletion of personal data.
                    </p>
                  </div>
                  <div className="cr-section">
                    <span className="cr-section-title">Data Collected:</span>
                    <p className="cr-cr-section-description">
                      The Company may collect the following personal data during the subscription process:
                      <ul>
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Payment information</li>
                        <li>IP address and device information</li>
                        <li>Usage data and preferences</li>
                        <li>Billing and shipping addresses</li>
                        <li>Resumes or Curriculum Vitaes</li>
                        <li>Communication preferences</li>
                      </ul>
                      Data is collected directly from the User through account registration forms, interactions with our services, and automated means such as cookies and tracking technologies.
                    </p>
                  </div>
                  <div className="cr-section">
                    <span className="cr-section-title">Purpose of Data Processing: </span>
                    <p className="cr-section-description">
                      The personal data collected is processed for the following purposes:
                      <ul>
                        <li>To create and manage the User's account</li>
                        <li>To provide access to subscription services</li>
                        <li>To communicate important updates and notifications</li>
                        <li>To improve service performance and user experience</li>
                        <li>To comply with legal obligations</li>
                        <li>To conduct customer satisfaction surveys and market research</li>
                        <li>To personalize content and recommendations</li>
                        <li>To prevent fraudulent activities and enhance security measures</li>
                      </ul>
                    </p>
                  </div>
                  <div className="cr-section">
                    <span className="cr-section-title">Data Storage and Security:</span>
                    <p className="cr-section-description">
                      The Company implements appropriate technical and organizational measures to protect personal data against unauthorized access, loss, or misuse. Data is stored in secure servers with encryption protocols. Measures include:
                      <ul>
                        <li>Encryption of sensitive information during transmission and at rest</li>
                        <li>Regular security audits and vulnerability assessments</li>
                        <li>Access controls to limit data access to authorized personnel only</li>
                        <li>Employee training on data protection principles and practices</li>
                      </ul>
                      Data is stored in accordance with industry standards, and security practices are regularly reviewed and updated to address emerging threats.
                    </p>
                  </div>
                  <div className="cr-section">
                    <span className="cr-section-title">Data Sharing and Transfers:</span>
                    <p className="cr-section-description">
                      Personal data may be shared with trusted third-party service providers for operational purposes, such as payment processing or analytics. Data transfers outside the User's jurisdiction will comply with applicable legal safeguards, such as Standard Contractual Clauses (SCCs) or other approved mechanisms.
                      The Company may disclose personal data if required by law, regulatory authorities, or legal proceedings, provided that such disclosure is necessary to comply with legal obligations or protect the Company's rights.
                    </p>
                  </div>
                  <div className="cr-section">
                    <span className="cr-section-title">User Rights: </span>
                    <p className="cr-section-description">
                      The User has the right to:
                      <ul>
                        <li>Access their personal data</li>
                        <li>Request corrections or updates</li>
                        <li>Request data deletion (subject to legal requirements)</li>
                        <li>Object to certain types of processing</li>
                        <li>Restrict processing under certain circumstances</li>
                        <li>Data portability, where technically feasible</li>
                      </ul>
                    </p>
                  </div>
                  <div className="cr-section">
                    <span className="cr-section-title">International Data Transfers</span>
                    <p className="cr-section-description">
                      If personal data is transferred outside the User's jurisdiction, the Company will ensure adequate data protection measures are in place. Transfers to countries without an adequacy decision from the relevant data protection authority will be based on binding corporate rules, standard contractual clauses, or other approved mechanisms.
                    </p>
                  </div>
                  <div className="cr-section">
                    <span className="cr-section-title">Changes to the Agreement:</span>
                    <p className="cr-section-description">
                      The Company reserves the right to update this Agreement as needed to reflect changes in data processing practices, legal requirements, or business operations. Users will be notified of significant changes through email or platform notifications. Continued use of the subscription services after changes take effect indicates acceptance of the updated Agreement.
                    </p>
                  </div>
                  <div className="cr-section">
                    <span className="cr-section-title">Contact Information:</span>
                    <p className="cr-section-description">
                      For questions or concerns regarding this Agreement or data processing practices, Users can contact the Company at:
                      <ul>
                        <li>Email: [contact email]</li>
                        <li>Phone: [contact number]</li>
                        <li>Mailing Address: [company address]</li>
                      </ul>
                    </p>
                  </div>
                  <div className="cr-section">
                    <span className="cr-section-title">Acceptance</span>
                    <p className="cr-section-description acceptance">
                      By registering for the online subscription, the User acknowledges that they have read, understood, and agreed to the terms outlined in this Data Protection Agreement.
                    </p>
                  </div>
                  <button
                    className="btn-cr-continue "
                    variant="link"
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
                
              </div>
            </Modal.Body>
          </Modal>
          <Button
            variant="primary"
            type="submit"
            disabled={disableButton}
          >
            {!isLoading ? "Register Company" : "Processing..."}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;
