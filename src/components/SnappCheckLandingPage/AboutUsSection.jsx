import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';
import AboutUs from "../../assets/snappchecklanding/about-us.svg";

// AboutUsSection functional component
const AboutUsSection = () => {
  const { t, language, changeLanguage } = useSnappcheckTranslation();
  
  console.log('Current language:', language); // Debug current language

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
            <h3 className="color-blue mb-2">
              {t('aboutUs')}
            </h3>
            <h2 className="mb-4">
              {t('aboutUsTitle')}
            </h2>
            <p className="snappcheck-about-us-desc1 mb-4">
              {t('aboutDescription1')}
            </p>
            <p className="snappcheck-about-us-desc2 mb-4">
              {t('aboutDescription2')}
            </p>
            <button>{t('learnMore')}</button>
          </Col>
          <Col
            md="6"
            className="position-relative snapcheck-about-us-image-container"
          >
            <img src={AboutUs} alt="about us image" />
          </Col>
        </Row>
      </section>
    </>
  );
};

// Exporting AboutUsSection component
export default AboutUsSection;
