import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSnappcheckTranslation } from "./hooks/snappcheckTranslation";

const OurPlatformsSection = ({ isPlatformsVisible }) => {
  const { t, language } = useSnappcheckTranslation();

  return (
    <section
      id="our-platforms"
      className={`snappcheck-platforms-container d-flex align-items-center flex-column w-100 fade-in ${
        isPlatformsVisible ? "visible" : ""
      }`}
    >
      <Row className=" position-relative d-flex">
        <div className="snappcheck-platforms-content d-flex justify-content-center align-items-center flex-column">
          <h1>{t('ourPlatformsSectionTitle')}</h1>
          <h2 className="mb-5 ">
            {" "}
            <p className="about-us-subtitle m-0">
              <span className="color-orange">SNAPP</span>CHECK
            </p>
            <p>{t('ourPlatformsSectionSubtitle')}</p>
          </h2>
        </div>

        <div className="platforms-cards-container d-flex justify-content-center gap-5">
          <div className="platform-card">
            <div className="platform-status available mb-5">{t('availableNow')}</div>
            <p className="platform-card-title mb-5">{t('aiReferenceCheckTitle')}</p>
            <p className="platform-card-desc py-5">
              {t('aiReferenceCheckDesc')}
            </p>
          </div>

          <div className="platform-card">
            <div className="platform-status coming-soon mb-5">{t('comingSoon')}</div>
            <p className="platform-card-title mb-5">{t('languageAssessmentTitle')}</p>
            <p className="platform-card-desc py-5">
              {t('languageAssessmentDesc')}
            </p>
          </div>
        </div>
      </Row>
    </section>
  );
};

export default OurPlatformsSection;
