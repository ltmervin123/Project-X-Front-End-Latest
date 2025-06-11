import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';

const OurPlatformsSection = ({ isPlatformsVisible }) => {
  const { t, language } = useSnappcheckTranslation();

  return (
    <section
      id="our-platforms"
      className={`snappcheck-platforms-container d-flex align-items-center flex-column w-100 fade-in ${
        isPlatformsVisible ? "visible" : ""
      }`}
    >
      <Row className="w-100 snappcheck-platforms-content">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <h3 className="color-grey text-center mb-2">{t('ourPlatforms')}</h3>
          <h2 className="mb-4 text-center">
            {language === 'English' ? (
              t('aiPlatformsSolutions').split('Solutions').map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && <span className="color-orange">Solutions</span>}
                </React.Fragment>
              ))
            ) : (
              t('aiPlatformsSolutions').split('ソリューション').map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array.length - 1 && <span className="color-orange">ソリューション</span>}
                </React.Fragment>
              ))
            )}
          </h2>
        </div>

        <div className="platforms-cards-container gap-5">
          <div className="platform-card">
            <div className="platform-status available">{t('availableNow')}</div>
            <h3>{t('aiReferenceCheck')}</h3>
            <p>{t('aiReferenceCheckDesc')}</p>
          </div>

          <div className="platform-card">
            <div className="platform-status coming-soon">{t('comingSoon')}</div>
            <h3>{t('languageAssessment')}</h3>
            <p>{t('languageAssessmentDesc')}</p>
          </div>
        </div>
      </Row>
    </section>
  );
};

export default OurPlatformsSection; 