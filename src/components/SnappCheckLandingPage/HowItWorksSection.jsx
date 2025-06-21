import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';

// HowItWorksSection functional component
const HowItWorksSection = ({ isHowItWorksVisible }) => {
  const { t } = useSnappcheckTranslation();

  return (
    <>
      {/* How It Works Section Container */}
      <section
        id="how-it-works"
        className={`snappcheck-how-it-works-container d-flex align-items-center flex-column w-100 fade-in ${isHowItWorksVisible ? "visible" : ""
          }`}
      >
        <Row className=" position-relative">

          <div className="snappcheck-how-it-works-content d-flex justify-content-center align-items-center flex-column">
            <h1>{t('howItWorksSectionTitle')}</h1>
            <h2 className="mb-5 "> <p className="how-it-works-subtitle m-0">
              <span className="color-orange">{t('howItWorksSectionSubtitle')}</span>
            </p>
            </h2>

            <div className="how-it-works-video-container">
            <video controls>
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  {t('videoNotSupported')}
</video>
            </div>
          </div>
        </Row>
      </section>
    </>
  );
};

// Exporting HowItWorksSection component
export default HowItWorksSection;
