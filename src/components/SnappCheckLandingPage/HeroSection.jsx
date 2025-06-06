import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';

// HeroSection functional component
const HeroSection = () => {
  const { t } = useSnappcheckTranslation();

  return (
    <>
      {/* Hero Section Container */}
      <section
        id="hero"
        className={
          "snappcheck-hero-container d-flex align-items-center  w-100 h-100"
        }
      >
        <Row className="w-100 h-100 d-flex justify-content-center">
          <div className="snappcheck-hero-content d-flex justify-content-center flex-column gap-4">
            <h1 className="mb-5 mt-3">
              {t('heroTitle').split('SNAPPCHECK').map((part, index, array) => {
                if (index === array.length - 1) return part;
                return (
                  <>
                    {part}
                    <span className="color-orange">SNAPP</span>
                    <span className="color-grey">CHECK</span>
                  </>
                );
              })}
            </h1>
            <div className="d-flex gap-3 justify-content-center w-100 snappcheck-button-controller">
              <button>{t('subscribeNow')}</button>
              <button>{t('explorePlatforms')}</button>
            </div>
          </div>
         
        </Row>
      </section>
    </>
  );
};

// Exporting HeroSection component
export default HeroSection;
