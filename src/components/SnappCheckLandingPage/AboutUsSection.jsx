import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AboutUs from "../../assets/snappchecklanding/about-us.svg";

// AboutUsSection functional component
const AboutUsSection = () => {
  return (
    <>
      {/* Hero Section Container */}
      <section
        id="about"
        className={
          "snappcheck-about-us-container d-flex align-items-center  w-100 "
        }
      >
        <Row className="w-100  snappcheck-left-content">
          <Col md="6">
            <h3 className="color-blue mb-2">About Us</h3>
            <h2 className="mb-4">Streamline Your Hiring Process</h2>
            <p className="snappcheck-about-us-desc1 mb-4">
              SNAPPCHECK is an innovative tool that automates the reference
              check process, saving you time and effort while ensuring accuracy
              and consistency. Let our app handle the heavy lifting by
              conducting thorough, unbiased reference interviews to help you
              make smarter hiring decisions.
            </p>
            <p className="snappcheck-about-us-desc2 mb-4">
              Effortlessly gather insights, validate applicants, and keep your
              recruitment process efficient and professional.
            </p>
            <button>Learn More</button>
          </Col>
          <Col md="6" className="position-relative snapcheck-about-us-image-container">
            <img src={AboutUs}   alt="about us image" />
          </Col>
        </Row>
      </section>
    </>
  );
};

// Exporting AboutUsSection component
export default AboutUsSection;
