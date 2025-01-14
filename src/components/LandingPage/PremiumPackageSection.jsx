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
                        <div className="premium-box-header justify-content-center flex-column  align-items-center"> 
                            <div className="premium-card">

                            </div>
                            <div>
                            <b>Overview</b>

                            </div>
                            <div>
                            <p>Behavioral Interview</p>

                            </div>
                            <div>
                            <p>Basic Interview</p>

                            </div>
                            <div>
                            <p>Resume Based Interview</p>

                            </div>
                            <div>
                            <p>Resume  Builder</p>

                            </div>
                            <div>
                            <p>Job Tracker (Coming Soon)</p>

                            </div>
                            {/* <button className="btn btn-primary">Buy Now</button> */}
                        </div>
                    </Col>
                    {/* <Col md={2}></Col>
                    <Col md={2}></Col>
                    <Col md={2}></Col>
                    <Col md={2}></Col>
                    <Col md={2}></Col> */}
                </Row>
            </div>
            <h3>AI Referee Pricing</h3>
            <div className="premium-box-container"></div>
        </section>

    </>

  );
};

export default PremiumPackageSection;