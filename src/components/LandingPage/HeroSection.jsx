// src/components/LandingPage/HeroSection.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaRocket } from 'react-icons/fa';
import heroImage from '../../assets/hero-img.png'; // Replace with the actual path to your image

const HeroSection = () => {
  return (
    <section>
      <Container className='hero-container'>
        <Row  className="align-items-center">
          <Col md={6}>
            <h1>HR-HATCH:</h1>
            <h2>Your Support AI Companion</h2>
            <p className='hero-content'>
              HR-Hatch is your one-stop partner for seamless job searching and talent acquisition,
              empowering candidates and companies to connect and grow through tailored support and expertise.
            </p>
            <Button href="/get-started" className="btn-get d-flex align-items-center justify-content-center">
              <FaRocket className="me-2" /> Get Started
            </Button>
          </Col>
          <Col md={5} className='hero-image-containers'> 
            <img src={heroImage} alt="Hero" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
