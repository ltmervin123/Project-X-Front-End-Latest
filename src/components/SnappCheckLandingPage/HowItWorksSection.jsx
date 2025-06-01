import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSnappcheckTranslation } from './hooks/snappcheckTranslation';
// import HowItWorkImage from "../../assets/snappchecklanding/how-it-works.svg";
import HowItWorkImage1 from "../../assets/snappchecklanding/howitwork1.svg";
import HowItWorkImage2 from "../../assets/snappchecklanding/howitwork2.svg";
import HowItWorkImage3 from "../../assets/snappchecklanding/howitwork3.svg";
import HowItWorkImage4 from "../../assets/snappchecklanding/howitwork4.svg";
import HowItWorkImage5 from "../../assets/snappchecklanding/howitwork5.svg";
import HowItWorkImage6 from "../../assets/snappchecklanding/howitwork6.svg";

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
          {/* Cards Section */}
          <div className="d-flex justify-content-center align-items-center flex-column w-100">
            {/* Header Content */}
            <div className="text-center my-4">
              <h2 className="how-it-works-title" style={{ letterSpacing: '2px' }}>{t('referenceCheckFlow')}</h2>
              <h2 className="how-it-works-title color-grey" style={{ fontWeight: 500 }}>{t('visualGuide')}</h2>
            </div>
            <div className="how-it-works-cards-container">
              {[
                { img: HowItWorkImage1, title: t('howItWorksStep1') },
                { img: HowItWorkImage2, title: t('howItWorksStep2') },
                { img: HowItWorkImage3, title: t('howItWorksStep3') },
                { img: HowItWorkImage4, title: t('howItWorksStep4') },
                { img: HowItWorkImage5, title: t('howItWorksStep5') },
                { img: HowItWorkImage6, title: t('howItWorksStep6') },
              ].map((card, idx) => (
                <div key={idx} className="how-it-works-card d-flex flex-column align-items-center p-3 m-2">
                  <div className="how-it-works-card-number mb-2" >{idx + 1}</div>
                  <img src={card.img} alt={`how it works step ${idx + 1}`} />
                  <div className="how-it-works-card-title text-center " >{card.title}</div>
                </div>
              ))}
            </div>
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
