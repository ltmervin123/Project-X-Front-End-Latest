import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddCreditsPopUp from '../../Maindashboard/PopUpComponents/AddCreditsPopUp';

const CompanyCultureSection = ({ labels }) => {
  const navigate = useNavigate();
  const [showAddCredits, setShowAddCredits] = useState(false);

  const handleEditCulture = () => {
    navigate('/edit-company-culture-fit');
  };

  const handleShowAddCredits = () => {
    setShowAddCredits(true);
  };

  const cultureTagsGroups = [
    [
      'FAST_PACED_LABEL',
      'COLLABORATIVE_LABEL',
      'STRUCTURED_LABEL'
    ],
    [
      'INNOVATIVE_LABEL',
      'TRANSPARENT_LABEL',
      'WORK_LIFE_BALANCE_LABEL'
    ]
  ];

  // Check if any culture tags are selected and have valid values
  const isAnyTagSelected = cultureTagsGroups.flat().some(tag => {
    const tagValue = labels?.companyInfo?.[tag];
    return tagValue && tagValue.trim() !== '';
  });

  console.log('Culture tags status:', {
    isAnyTagSelected,
    tagValues: cultureTagsGroups.flat().map(tag => ({
      tag,
      value: labels?.companyInfo?.[tag]
    }))
  });

  return (
    <Row className="company-info-container mt-1">
      <Col md={7}>
        <div className="company-culture-subscription">
          <div className="company-culture">
            <div className="culture-title">{labels.companyInfo.companyCulture}</div>
            {cultureTagsGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="culture-tags">
                {group.map((tag) => (
                  labels.companyInfo[tag] && (
                    <span key={tag} className="culture-tag">
                      {labels.companyInfo[tag]}
                    </span>
                  )
                ))}
              </div>
            ))}
          </div>
          <div className="subscription-section mt-3">
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
        <button 
          type="submit" 
          className={`btn-update-company-profile ${!isAnyTagSelected ? 'disabled' : ''}`}
          disabled={!isAnyTagSelected}
        >
          {labels.companyInfo.updateProfile}
        </button>
        <button className="btn-edit-company-culture" onClick={handleEditCulture}>
          {labels.companyInfo.editCulture}
        </button>
        <button className="btn-update-sub-plan" onClick={handleShowAddCredits}>
          {labels.companyInfo.updatePlan}
        </button>
      </Col>
      {showAddCredits && (
        <AddCreditsPopUp 
          onClose={() => setShowAddCredits(false)}
          currentBalance={0} // You may want to pass the actual current balance here
        />
      )}
    </Row>
  );
};

export default CompanyCultureSection;