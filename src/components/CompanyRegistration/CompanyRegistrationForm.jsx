import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignup } from "../../hook/useSignup";
import DPAPopUp from "./DPAPopUp";
import { useNavigate } from "react-router-dom";
import RegisterCompanyAvatar from "../../assets/companyregisteravatar.png";

const CompanyRegistrationForm = () => {
  const SERVICE = "AI_REFERENCE";
  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    size: "",
    industry: "",
    annualHiringVolume: "",
    firstName: "",
    lastName: "",
    positionTitle: "",
    country: "",
    cities: "",
  });

  useEffect(() => {
    import("../../utils/countries/countries+cities.json").then((data) => {
      setCountries(data.default);
    });
  }, []);

  // Memoize filtered country data to prevent unnecessary re-renders
  const selectedCountryData = useMemo(() => {
    return (
      countries.find((country) => country.name === formData.country) || {
        cities: [],
      }
    );
  }, [formData.country]);

  const validateForm = useMemo(() => {
    return Object.values(formData).every((value) => value.trim() !== "");
  }, [formData]);

  const disableButton = useMemo(() => {
    return !validateForm || isLoading || !isChecked;
  }, [validateForm, isLoading, isChecked]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleCheckboxChange = useCallback(
    (e) => {
      if (e.target.checked) {
        if (!agreeChecked) {
          setShowModal(true);
        } else {
          setIsChecked(true);
        }
      } else {
        setIsChecked(false);
        setAgreeChecked(false);
      }
    },
    [agreeChecked]
  );

  const handleContinue = () => {
    setAgreeChecked(true);
    setIsChecked(true);
    setShowModal(false);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const status = await signup(formData, SERVICE);
      if (status === 201) {
        navigate("/company-email-verification", {
          state: { email: formData.email },
        });
        setFormData({
          name: "",
          email: "",
          password: "",
          size: "",
          industry: "",
          annualHiringVolume: "",
          firstName: "",
          lastName: "",
          positionTitle: "",
          country: "",
          cities: "",
        });
        setIsChecked(false);
      }
    },
    [formData, signup, navigate]
  );

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
              <div className="mb-1">
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

              <Row className="mb-1">
                <Col md={6}>
                  <div className="mb-1 position-relative">
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
                  <div className="mb-1 position-relative">
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
              <Row className="mb-1">
                <label htmlFor="city" className="form-label">
                  Location
                </label>
                <Col md={6}>
                  <div className="mb-1">
                    <select
                      name="cities" // Change this to "location"
                      value={formData.cities}
                      onChange={handleChange}
                      className="form-control"
                      id="city"
                    >
                      <option value="">Select City</option>
                      {selectedCountryData.cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-1">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="form-control"
                      id="country"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md={6}>
                  <div className="mb-1">
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
                  <div className="mb-1">
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
                    <div className="mb-1">
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
                    <div className="mb-1">
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

                <div className="mb-1">
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
                <Row>
                  <Col md={6}>
                    <div className="mb-1">
                      <label
                        htmlFor="annual-hiring-volume"
                        className="form-label"
                      >
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
                  </Col>
                </Row>
              </div>
            </Col>

            <Col md={3} className="d-flex align-items-start position-relative">
              <img
                src={RegisterCompanyAvatar}
                className="companyregisteravatar"
                alt="Register Avatar"
              />
            </Col>
          </Row>

          <div className="cr-agreement-box-check d-flex align-items-center gap-2">
            <input
              type="checkbox"
              id="cr-form-check-input"
              className="cr-form-check-input btn-modal"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label
              for="cr-form-check-input"
              className="text-left form-check-label w-100 privacy-content"
            >
              By continuing, you agree to{" "}
              <a
                href="URL_TO_TERMS_OF_SERVICE"
                target="_blank"
                rel="noopener noreferrer"
              >
                HR-HATCH Terms of Service
              </a>{" "}
              and acknowledge you've read our{" "}
              <a
                href="URL_TO_DATA_PROTECTION_AGREEMENT"
                target="_blank"
                rel="noopener noreferrer"
              >
                Data Protection Agreement
              </a>
              .
            </label>
          </div>

          {/* Add this line before the form ends */}
          <DPAPopUp
            showModal={showModal}
            setShowModal={setShowModal}
            handleContinue={handleContinue}
          />

          <button
            variant="primary"
            type="submit"
            disabled={disableButton}
            className={`register-company-btn ${disableButton ? "disable" : ""}`} // Add "disable" class if disableButton is true
          >
            {!isLoading ? "Register Company" : "Processing..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;
