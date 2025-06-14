import React from 'react';
import { Row, Col } from 'react-bootstrap';

const CompanyCultureSection = ({ labels }) => {
  return (
    <Row className="company-info-container">
      <Col md={7}>
        <div className="company-culture-subscription">
          <div className="company-culture">
            <div className="culture-title">{labels.companyInfo.companyCulture}</div>
            <div className="culture-tags">
              <span className="culture-tag">Fast-Paced</span>
              <span className="culture-tag">Collaborative</span>
              <span className="culture-tag">Structured</span>
            </div>
            <div className="culture-tags">
              <span className="culture-tag">Innovative</span>
              <span className="culture-tag">Collaborative</span>
              <span className="culture-tag">Collaborative</span>
            </div>
          </div>   
          <div className="subscription-section">
            <div className="subscription-title">
              {labels.companyInfo.subscription}
              <span className="subscription-status active">{labels.companyInfo.active}</span>
            </div>
            <div className="subscription-bar-container">
              <div className="subscription-bar">
                <div className="subscription-bar-fill" style={{ width: "60%" }}></div>
              </div>
              <div className="subscription-plan d-flex justify-content-between align-items-center">
                {labels.companyInfo.starterPlan} <span className="subscription-progress">3/5 {labels.companyInfo.referenceChecks}</span>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col md={5} className="d-flex align-items-center justify-content-center flex-column gap-3">
        <button className="btn-edit-company-culture">
          {labels.companyInfo.editCulture}
        </button>
        <button className="btn-update-sub-plan">
          {labels.companyInfo.updatePlan}
        </button>
      </Col>
    </Row>
  );
};

export default CompanyCultureSection;