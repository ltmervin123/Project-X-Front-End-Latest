import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSnappcheckTranslation } from "./hooks/snappcheckTranslation";


// TheDataSection functional component
const TheDataSection = ({ isHowItWorksVisible }) => {
  const { t } = useSnappcheckTranslation();

  return (
    <>
      {/* The Data Section Container */}
      <section
        id="the-data"
        className={`snappcheck-the-data-container d-flex align-items-center flex-column w-100 fade-in ${
          isHowItWorksVisible ? "visible" : ""
        }`}
      >
        <Row className=" position-relative">
          <div className="snappcheck-the-data-content d-flex justify-content-center align-items-center flex-column">
            <h1>{t('theDataSectionTitle')}</h1>
            <h2 className="mb-5 text-center">
              <p className="the-data-subtitle m-0">
                <span className=" color-orange">{t('theDataSectionSubtitle1')}</span>
              </p>
              <p> {t('theDataSectionSubtitle2')}</p>
            </h2>
            <div className="the-data-content-container">
              <p>
                {t('theDataParagraph1')}
              </p>
              <p>{t('theDataKeyInsights')}</p>
              <ul>
                <li>
                  <span className="color-orange"></span> {t('theDataList1')}
                </li>
                <li> {t('theDataList2')}</li>
                <li>
                  {t('theDataList3')}
                </li>
              </ul>
              <small>
                {t('theDataSmall')}
              </small>
            </div>
          </div>
        </Row>
      </section>
    </>
  );
};

// Exporting TheDataSection component
export default TheDataSection;
