import React from 'react';
import { Row, Col} from 'react-bootstrap';

const PremiumPackageSection = () => {
  return (
    <>
        <section className='premium-package-container d-flex align-items-center flex-column' id="pricing">
            <h1>Available Premium Packages</h1>
            <h3>Mock Interview Pricing</h3>
            <div className="premium-box-container d-flex align-items-center justify-content-center flex-wrap gap-5">
                <Row>
                    <Col md={2}>

                    </Col>
                    <Col md={2}></Col>
                    <Col md={2}></Col>
                    <Col md={2}></Col>
                    <Col md={2}></Col>
                </Row>
            </div>
            <h3>AI Referee Pricing</h3>
            <div className="premium-box-container"></div>
        </section>

    </>

  );
};

export default PremiumPackageSection;