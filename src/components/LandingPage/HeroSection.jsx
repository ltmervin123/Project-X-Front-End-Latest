import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HeroSection = () => {
  return (
    <section className='hero-container d-flex justify-content-center '>
      <Container>
        <Row className="align-items-center">
          <Col md={7}>
            <h1>HR-HATCH:</h1>
            <h2>Your Support AI Companion</h2>
            <p className='hero-content'>
              HR-Hatch is your one-stop partner for seamless job searching and talent acquisition,
              empowering candidates and companies to connect and grow through tailored support and expertise.
            </p>
            <Button href="/get-started" className="btn-get d-flex align-items-center justify-content-center">
            <svg className="rocket-icon" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.79994 25.96L2.55994 24.4C2.55994 24.4 2.55994 19.72 4.11994 15.04C5.67994 10.36 16.5999 10.36 16.5999 10.36M8.79994 25.96L15.0399 32.2M8.79994 25.96C8.79994 25.96 15.0399 10.36 22.8399 5.68C30.6399 1 39.9999 1 39.9999 1C39.9999 1 39.9999 10.36 35.3199 18.16C30.6399 25.96 15.0399 32.2 15.0399 32.2M15.0399 32.2L16.5999 38.44C16.5999 38.44 21.2799 38.44 25.9599 36.88C30.6399 35.32 30.6399 24.4 30.6399 24.4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 40L7.24 36.88L4.12 33.76L1 40Z" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M27.52 15.04C28.3815 15.04 29.08 14.3416 29.08 13.48C29.08 12.6185 28.3815 11.92 27.52 11.92C26.6584 11.92 25.96 12.6185 25.96 13.48C25.96 14.3416 26.6584 15.04 27.52 15.04Z" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            GET STARTED
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;