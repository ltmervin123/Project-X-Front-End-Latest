import React, { useCallback, useMemo, useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { capitalizeWords } from "../../utils/helper";
import DPAPopUp from "../PopUpComponent/DPAPopUp";

const CompanyRegistrationForm = ({
  setShowCultureModal,
  formData,
  isLoading,
  setFormData,
  error,
  selectedCultures,
  onSubmit,
  setIsChecked,
  isChecked,
  agreeChecked,
  setAgreeChecked,
}) => {
  const [countries, setCountries] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);

  const selectedCountryData = useMemo(() => {
    return (
      countries.find((country) => country.name === formData.country) || {
        cities: [],
      }
    );
  }, [formData.country, countries]);

  const isFormValid = useMemo(() => {
    return Object.values(formData).every((value) => value.trim() !== "");
  }, [formData]);

  const isButtonDisabled = useMemo(() => {
    return !isFormValid || isLoading || !isChecked;
  }, [isFormValid, isLoading, isChecked]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await import(
          "../../../../utils/countries/countries+cities.json"
        );
        setCountries(data.default);
      } catch (error) {
        console.error("Failed to load countries data:", error);
      }
    };
    loadCountries();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const formattedValue =
      name === "name" || name === "firstName" || name === "lastName"
        ? capitalizeWords(value)
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  }, []);

  const handleCheckboxChange = useCallback(
    (e) => {
      if (e.target.checked) {
        if (!agreeChecked) {
          setShowAgreementModal(true);
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

  const handleContinue = useCallback(() => {
    setAgreeChecked(true);
    setIsChecked(true);
    setShowAgreementModal(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    //Show modal initialy if user not yet selecting prefere culture
    if (selectedCultures.length === 0) {
      setShowCultureModal(true);
      return;
    }

    await onSubmit();
  }, [selectedCultures, setShowCultureModal, onSubmit]);

  return (
    <Form className="form-company-reg">
      <Row>
        <Col md={12}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="company-name" className="mb-1">
              Company Name
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Company Name"
              id="company-name"
            />
          </Form.Group>

          <Row className="mb-2">
            <Col md={6}>
              <Form.Group className="mb-2 position-relative">
                <Form.Label htmlFor="email-address" className="mb-1">
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  isInvalid={
                    error === "Email is not valid" ||
                    error === "Email already exists"
                  }
                  id="email-address"
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2 position-relative">
                <Form.Label htmlFor="password" className="mb-1">
                  Password
                </Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  isInvalid={error === "Password is not strong enough"}
                  id="password"
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", zIndex: 10 }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2">
            <Form.Group>
              <Form.Label htmlFor="city" className="mb-1">
                Location
              </Form.Label>
              <Row>
                <Col md={6}>
                  <Form.Select
                    name="cities"
                    value={formData.cities}
                    onChange={handleChange}
                    className="mb-2"
                    id="city"
                  >
                    <option value="">Select City</option>
                    {selectedCountryData.cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    id="country"
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="company-size" className="mb-1">
                  Company Size
                </Form.Label>
                <Form.Select
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
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="industry" className="mb-1">
                  Industry
                </Form.Label>
                <Form.Select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="form-select"
                  id="industry"
                >
                  <option value="">Select an Industry</option>
                  <option value="Advertising & Marketing">
                    Advertising & Marketing
                  </option>
                  <option value="Aerospace & Defense">
                    Aerospace & Defense
                  </option>
                  <option value="Agriculture & Farming">
                    Agriculture & Farming
                  </option>
                  <option value="Automotive">Automotive</option>
                  <option value="Banking & Financial Services">
                    Banking & Financial Services
                  </option>
                  <option value="Biotechnology, Pharmaceuticals & Life Science">
                    Biotechnology, Pharmaceuticals & Life Science
                  </option>
                  <option value="Construction & Real Estate">
                    Construction & Real Estate
                  </option>
                  <option value="Business, Strategy & IT Consulting">
                    Business, Strategy & IT Consulting
                  </option>
                  <option value="Consumer Goods (FMCG)">
                    Consumer Goods (FMCG)
                  </option>
                  <option value="Energy & Utilities">Energy & Utilities</option>
                  <option value="Entertainment & Media">
                    Entertainment & Media
                  </option>
                  <option value="Fashion & Apparel">Fashion & Apparel</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Government & Public Sector">
                    Government & Public Sector
                  </option>
                  <option value="Healthcare & Medical">
                    Healthcare & Medical
                  </option>
                  <option value="Hospitality & Tourism">
                    Hospitality & Tourism
                  </option>
                  <option value="Human Resources & Recruitment">
                    Human Resources & Recruitment
                  </option>
                  <option value="Insurance">Insurance</option>
                  <option value="IT & Software Development">
                    IT & Software Development
                  </option>
                  <option value="Legal">Legal</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Mining & Metals">Mining & Metals</option>
                  <option value="Retail & E-commerce">
                    Retail & E-commerce
                  </option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Logistics, Warehouse, Transportation & Shipping">
                    Logistics, Warehouse, Transportation & Shipping
                  </option>
                  <option value="Venture Capital & Private Equity">
                    Venture Capital & Private Equity
                  </option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div>
            <h5>Person In-charge</h5>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="first-name" className="mb-1">
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    id="first-name"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="last-name" className="mb-1">
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    id="last-name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label htmlFor="hiring-involvement" className="mb-1">
                How are you involved in the hiring process?
              </Form.Label>
              <Form.Select
                className="form-control"
                name="hiringInvolvement"
                id="hiring-involvement"
                value={formData.hiringInvolvement}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="HR / TA / Recruiter">HR / TA / Recruiter</option>
                <option value="Hiring Manager / Line Manager">
                  Hiring Manager / Line Manager
                </option>
                <option value="Board Member / Director">
                  Board Member / Director
                </option>
                <option value="CEO / President">CEO / President</option>
              </Form.Select>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label
                    htmlFor="annual-hiring-volume"
                    className="form-label mb-1"
                  >
                    Annual Hiring Volume
                  </Form.Label>
                  <Form.Select
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
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Form.Group className="cr-agreement-box-check d-flex align-items-center gap-2 w-100">
        <Form.Check
          type="checkbox"
          id="cr-form-check-input"
          className="custom-checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          label={
            <span className="privacy-content">
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
            </span>
          }
        />
      </Form.Group>

      <DPAPopUp
        showModal={showAgreementModal}
        setShowModal={setShowAgreementModal}
        handleContinue={handleContinue}
      />

      <Button
        variant="primary"
        type="button"
        onClick={handleSubmit}
        disabled={isButtonDisabled}
        className={`register-company-btn ${isButtonDisabled ? "disable" : ""}`}
      >
        {/* {!isLoading ? "Select Culture Preferences" : "Processing..."} */}
        {selectedCultures.length === 0
          ? "Select Culture Preferences"
          : isLoading
          ? "Processing..."
          : "Register Company"}
      </Button>
    </Form>
  );
};

export default CompanyRegistrationForm;
