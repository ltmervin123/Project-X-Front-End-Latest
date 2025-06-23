import React from "react";
import { Row } from "react-bootstrap";
import { useSnappcheckTranslation } from "./hooks/snappcheckTranslation";

// Function to make SnappCheck bold
const makeSnappCheckBold = (text) => {
  if (!text) return "";
  return text.split("SnappCheck").map((part, index, array) => {
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
        className={`snappcheck-about-us-container d-flex align-items-center justify-content-center w-100 fade-in ${
          isAboutVisible ? "visible" : ""
        }`}
      >
        <Row className="position-relative d-flex justify-content-center align-items-center">
          <div className="snappcheck-about-us-content">
            <h4 className="mb-4">{t("aboutUs")}</h4>
            <p>{t("aboutUsParagraph1")}</p>
            <p>{t("aboutUsParagraph2")}</p>
            <p>{t("aboutUsParagraph3")}</p>
          </div>
        </Row>
      </section>
    </>
  );
};

export default AboutUsSection;
