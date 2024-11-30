import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import HeroAvatar from "../../assets/hero-avatar.png";
const HeroSection = () => {
  return (
    <section className='hero-container d-flex justify-content-center '>
      <Container>
        <Row className="d-flex align-items-center ">
          <Col md={7}>
            <h1>HR-HATCH:</h1>
            <h2>Your Support AI Companion</h2>
            <p className='hero-content'>
              HR-Hatch is your one-stop partner for seamless job searching and talent acquisition,
              empowering candidates and companies to connect and grow through tailored support and expertise.
            </p>

          </Col>
          <Col md={5} >
          <div className='heroavatar'></div>
           </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;