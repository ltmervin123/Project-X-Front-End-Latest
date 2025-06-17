import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';

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
        className={`snappcheck-about-us-container d-flex align-items-center w-100 fade-in ${isAboutVisible ? "visible" : ""
          }`}
      >
        <Row className="w-100 snappcheck-left-content position-relative d-flex justify-content-center align-items-center">
          <div className="snappcheck-about-us-overlay-container">
            <h3 className="color-blue text-center mb-4">
              {t('aboutUs')}
            </h3>
            <p className="snappcheck-about-us-desc1 mb-2">
              {makeSnappCheckBold(t('aboutDescription'))}
            </p>

          </div>


        </Row>
      </section>
    </>
  );
};

// Exporting AboutUsSection component
export default AboutUsSection;
