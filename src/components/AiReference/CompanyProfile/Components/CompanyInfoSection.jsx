import React, { useEffect, useCallback, useState } from "react";
import { Form, Row, Col, Image } from "react-bootstrap";
import { capitalizeWords } from "../utils/helper";

const CompanyInfo = ({
  labels,
  setCountries,
  setFormData,
  formData,
  setAvatar,
  countries,
  avatar,
}) => {
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
      ...(name === "country" && { cities: "" }),
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg"];
    const maxSize = 2 * 1024 * 1024;

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG or JPEG images are allowed.");
      return;
    }

    if (file.size > maxSize) {
      alert("Image size should be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const selectedCountryData = countries.find(
    (country) => country.name === formData.country
  ) || { cities: [] };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="company-info-container">
        <Col md={7}>
          <div className="d-flex flex-column gap-3">
            <Form.Group controlId="formName">
              <Form.Label>{labels.companyInfo.companyName}</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Doe"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Form.Group controlId="formAddress">
                <Form.Label htmlFor="city" className="mb-1">
                  {labels.companyInfo.location || "Location"}
                </Form.Label>
                <Row>
                  <Col md={6}>
                    <Form.Select
                      name="cities"
                      value={formData.cities}
                      onChange={handleChange}
                      id="city"
                    >
                      <option value="" disabled>
                        {labels.companyInfo.selectCity}
                      </option>
                      {Array.from(
                        new Set(
                          selectedCountryData.cities.map((city) => city.name)
                        )
                      ).map((cityName, index) => (
                        <option key={index} value={cityName}>
                          {cityName}
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
                      <option value="" disabled>
                        {labels.companyInfo.selectCountry}
                      </option>
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

            <Form.Group controlId="formEmail">
              <Form.Label>{labels.companyInfo.email}</Form.Label>
              <Form.Control
                type="email"
                placeholder="sample@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </Col>

        <Col
          md={5}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="avatar-container d-flex justify-content-center position-relative">
            <Image src={avatar} className="company-default-img" />
            <div className="upload-icon d-flex align-items-center justify-content-center z-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="d-flex align-items-center justify-content-center"
              >
                <svg
                  width="37"
                  height="36"
                  viewBox="0 0 37 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.125 27V8.6625L10.275 14.5125L7.125 11.25L18.375 0L29.625 11.25L26.475 14.5125L20.625 8.6625V27H16.125ZM4.875 36C3.6375 36 2.5785 35.5597 1.698 34.6792C0.8175 33.7987 0.3765 32.739 0.375 31.5V24.75H4.875V31.5H31.875V24.75H36.375V31.5C36.375 32.7375 35.9347 33.7972 35.0542 34.6792C34.1738 35.5612 33.114 36.0015 31.875 36H4.875Z"
                    fill="black"
                  />
                </svg>
              </label>
            </div>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default CompanyInfo;
