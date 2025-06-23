import React from "react";
import { Row } from "react-bootstrap";
import { useSnappcheckTranslation } from "./hooks/snappcheckTranslation";

const AboutUsSection = ({ isAboutVisible }) => {
  const { t } = useSnappcheckTranslation();

  return (
    <>
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
