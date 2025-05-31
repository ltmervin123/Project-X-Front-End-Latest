import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';
import HowItWorkImage from "../../assets/snappchecklanding/how-it-works.svg";

// HowItWorksSection functional component
const HowItWorksSection = () => {
  const { t } = useSnappcheckTranslation();

  return (
    <>
      {/* Hero Section Container */}
      <section
        id="how-it-works"
        className={
          "snappcheck-did-you-know-container d-flex align-items-center flex-column w-100 "
        }
      >
        <Row className="w-100  snappcheck-left-did-you-know-content">
          <Col md="6">
            <h3 className="color-blue mb-2">{t('howItWorks')}</h3>
            <h2 className="mb-4">
              {t('howItWorksTitle')}
            </h2>
          </Col>
          <Col md="6" className="position-relative"></Col>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img src={HowItWorkImage} alt="how it works image" />
          </div>
        </Row>
        <div className="d-flex justify-content-center align-items-center flex-column w-100">
          <h2 className="my-5">{t('trustedBusinesses')}</h2>
          <div className="slider-container">
            <div className="sliding-cards">
              <div className="business-company-card mx-2"></div>
              <div className="business-company-card mx-2"></div>
              <div className="business-company-card mx-2"></div>
              <div className="business-company-card mx-2"></div>
              <div className="business-company-card mx-2"></div>
              <div className="business-company-card mx-2"></div>
              {/* Duplicate cards for seamless loop */}
              <div className="business-company-card mx-2"></div>
              <div className="business-company-card mx-2"></div>
              <div className="business-company-card mx-2"></div>
              <div className="business-company-card mx-2"></div>
              <div className="business-company-card mx-2"></div>
              <div className="business-company-card mx-2"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Exporting HowItWorksSection component
export default HowItWorksSection;
