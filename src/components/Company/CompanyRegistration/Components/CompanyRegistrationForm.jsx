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
  t
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
      ...(name === "country" && { cities: "" })
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
              {t('COMPANY_NAME')}
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('COMPANY_NAME_PLACEHOLDER')}
              id="company-name"
            />
          </Form.Group>

          <Row className="mb-2">
            <Col md={6}>
              <Form.Group className="mb-2 position-relative">
                <Form.Label htmlFor="email-address" className="mb-1">
                  {t('EMAIL')}
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('EMAIL_PLACEHOLDER')}
                  isInvalid={
                    error === t('ERROR_EMAIL_INVALID') ||
                    error === t('ERROR_EMAIL_EXISTS')
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
                  {t('PASSWORD')}
                </Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t('PASSWORD_PLACEHOLDER')}
                  isInvalid={error === t('ERROR_PASSWORD_WEAK')}
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
                {t('LOCATION')}
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
                    <option value="">{t('SELECT_CITY')}</option>
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
                    <option value="">{t('SELECT_COUNTRY')}</option>
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
                  {t('COMPANY_SIZE')}
                </Form.Label>
                <Form.Select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="form-select"
                  id="company-size"
                >
                  <option value="">{t('SELECT_COMPANY_SIZE')}</option>
                  <option value="1-50">{t('COMPANY_SIZE_1_50')}</option>
                  <option value="51-200">{t('COMPANY_SIZE_51_200')}</option>
                  <option value="201+">{t('COMPANY_SIZE_201_PLUS')}</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="industry" className="mb-1">
                  {t('INDUSTRY')}
                </Form.Label>
                <Form.Select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="form-select"
                  id="industry"
                >
                  <option value="">{t('SELECT_INDUSTRY')}</option>
                  <option value="Advertising & Marketing">{t('INDUSTRY_ADVERTISING')}</option>
                  <option value="Aerospace & Defense">{t('INDUSTRY_AEROSPACE')}</option>
                  <option value="IT & Software Development">{t('INDUSTRY_IT')}</option>
                  <option value="Legal">{t('INDUSTRY_LEGAL')}</option>
                  <option value="Manufacturing">{t('INDUSTRY_MANUFACTURING')}</option>
                  <option value="Mining & Metals">{t('INDUSTRY_MINING')}</option>
                  <option value="Retail & E-commerce">{t('INDUSTRY_RETAIL')}</option>
                  <option value="Telecommunications">{t('INDUSTRY_TELECOM')}</option>
                  <option value="Logistics, Warehouse, Transportation & Shipping">{t('INDUSTRY_LOGISTICS')}</option>
                  <option value="Venture Capital & Private Equity">{t('INDUSTRY_VC')}</option>
                  <option value="Other">{t('INDUSTRY_OTHER')}</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div>
            <h5>{t('PERSON_IN_CHARGE')}</h5>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="first-name" className="mb-1">
                    {t('FIRST_NAME')}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={t('FIRST_NAME_PLACEHOLDER')}
                    id="first-name"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="last-name" className="mb-1">
                    {t('LAST_NAME')}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={t('LAST_NAME_PLACEHOLDER')}
                    id="last-name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label htmlFor="hiring-involvement" className="mb-1">
                {t('HIRING_INVOLVEMENT')}
              </Form.Label>
              <Form.Select
                name="hiringInvolvement"
                id="hiring-involvement"
                value={formData.hiringInvolvement}
                onChange={handleChange}
              >
                <option value="">{t('SELECT_INVOLVEMENT')}</option>
                <option value="HR / TA / Recruiter">{t('INVOLVEMENT_HR')}</option>
                <option value="Hiring Manager / Line Manager">{t('INVOLVEMENT_MANAGER')}</option>
                <option value="Board Member / Director">{t('INVOLVEMENT_DIRECTOR')}</option>
                <option value="CEO / President">{t('INVOLVEMENT_CEO')}</option>
              </Form.Select>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="annual-hiring-volume" className="form-label mb-1">
                    {t('ANNUAL_HIRING')}
                  </Form.Label>
                  <Form.Select
                    name="annualHiringVolume"
                    value={formData.annualHiringVolume}
                    onChange={handleChange}
                    className="form-select"
                    id="annual-hiring-volume"
                  >
                    <option value="">{t('SELECT_HIRING_VOLUME')}</option>
                    <option value="1-10">{t('HIRING_1_10')}</option>
                    <option value="11-50">{t('HIRING_11_50')}</option>
                    <option value="51+">{t('HIRING_51_PLUS')}</option>
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
              {t('TERMS_AGREEMENT')}{" "}
              <a
                href="URL_TO_TERMS_OF_SERVICE"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('TERMS_OF_SERVICE')}
              </a>{" "}
              {t('AND')}{" "}
              <a
                href="URL_TO_DATA_PROTECTION_AGREEMENT"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('DATA_PROTECTION')}
              </a>
              .
            </span>
          }
        />
      </Form.Group>      <DPAPopUp
        showModal={showAgreementModal}
        setShowModal={setShowAgreementModal}
        handleContinue={handleContinue}
        t={t}
      />

      <Button
        variant="primary"
        type="button"
        onClick={handleSubmit}
        disabled={isButtonDisabled}
        className={`register-company-btn ${isButtonDisabled ? "disable" : ""}`}
      >
        {selectedCultures.length === 0
          ? t('SELECT_CULTURE')
          : isLoading
          ? t('PROCESSING')
          : t('REGISTER')}
      </Button>
    </Form>
  );
};

export default CompanyRegistrationForm;
