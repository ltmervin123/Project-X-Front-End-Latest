import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';
import AboutUs from "../../assets/snappchecklanding/about-us.svg";

// Function to make SnappCheck bold
const makeSnappCheckBold = (text) => {
  if (!text) return '';
  return text.split('SnappCheck').map((part, index, array) => {
    if (index === array.length - 1) return part;
    return (
      <React.Fragment key={index}>
        {part}
        <span className="color-orange">SnappCheck</span>
      </React.Fragment>
    );
  });
};

// AboutUsSection functional component
const AboutUsSection = ({ isAboutVisible }) => {
  const { t } = useSnappcheckTranslation();

  return (
    <>
      {/* About Us Section Container */}
      <section
        id="about"
        className={`snappcheck-about-us-container d-flex align-items-center w-100 fade-in ${
          isAboutVisible ? "visible" : ""
        }`}
      >
        <Row className="w-100 snappcheck-left-content">
          <Col
            md="6"
            className="position-relative snapcheck-about-us-image-container"
          >
            <img src={AboutUs} alt="about us image" />
          </Col>
          <Col md="6">
            <h3 className="color-grey mb-4">
              {t('aboutUs')}
            </h3>
            <p className="snappcheck-about-us-desc1 mb-2">
              {makeSnappCheckBold(t('aboutDescription1'))}
            </p>
            <p className="snappcheck-about-us-desc1 mb-2">
              {makeSnappCheckBold(t('aboutDescription2'))}
            </p>
            <p className="snappcheck-about-us-desc2 mb-2">
              {makeSnappCheckBold(t('aboutDescription3'))}
            </p>
            <p className="snappcheck-about-us-desc3 mb-2">
              {makeSnappCheckBold(t('aboutDescription4'))}
            </p>
          </Col>
        </Row>
      </section>
    </>
  );
};

// Exporting AboutUsSection component
export default AboutUsSection;
