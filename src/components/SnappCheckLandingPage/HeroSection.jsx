import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HeroImg from "../../assets/snappchecklanding/hero.svg";

// HeroSection functional component
const HeroSection = () => {
  return (
    <>
      {/* Hero Section Container */}
      <section
        id="home"
        className={
          "snappcheck-hero-container d-flex align-items-center  w-100 h-100"
        }
      >
        <Row className="w-100 h-100">
          <Col md="7" className="d-flex justify-content-center flex-column">
            <h1 className="mb-4">Make Confident Hires with SNAPPCHECK</h1>
            <div className="d-flex gap-3 justify-content-start w-100 snappcheck-button-controller">
              <button>Subscribe Now</button>
              <button>User Guide</button>
            </div>
          </Col>
          <Col md="5" className="snappcheck-hero-img-container d-flex justify-content-center align-items-center">
            <img src={HeroImg} alt="Logo" />

          </Col>
        </Row>
      </section>
    </>
  );
};

// Exporting HeroSection component
export default HeroSection;
