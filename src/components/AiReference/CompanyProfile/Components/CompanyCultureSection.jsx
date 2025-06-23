import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import AddCreditsPopUp from "../../Maindashboard/PopUpComponents/AddCreditsPopUp";

const CompanyCultureSection = ({
  labels,
  handleEditCulture,
  formData,
  selectedCulture,
  companyProfile,
  handleUpdateProfile,
  isUpdating = false,
  companyProfilePicture,
}) => {
  const [showAddCredits, setShowAddCredits] = useState(false);
  const handleShowAddCredits = () => {
    setShowAddCredits(true);
  };

  const isFormChanged =
    companyProfile.name !== formData?.companyName?.trim() ||
    companyProfile.country !== formData?.country?.trim() ||
    companyProfile.cities !== formData?.cities?.trim() ||
    companyProfile.email !== formData?.email?.trim() ||
    companyProfilePicture !== null;

  const isFieldEmpthy =
    formData?.companyName?.trim() === "" ||
    formData?.country?.trim() === "" ||
    formData?.cities?.trim() === "" ||
    formData?.email?.trim() === "";

  const isDisabled = isFieldEmpthy || !isFormChanged;
  const handleOnUpdate = () => {
    handleUpdateProfile();
  };

  return (
    <Row className="company-info-container mt-1">
      <Col md={7}>
        <div className="company-culture-subscription">
          <div className="company-culture">
            <div className="culture-title">
              {labels.companyInfo.companyCulture}
            </div>

            <div className="culture-tags-container">
              {selectedCulture.map((item, index) => (
                <div key={index} className="culture-tags">
                  <span key={index} className="culture-tag">
                    {item?.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="subscription-section mt-3">
            <div className="subscription-title">
              {labels.companyInfo.subscription}
              <span className="subscription-status active">
                {labels.companyInfo.active}
              </span>
            </div>
            <div className="subscription-bar-container">
              <div className="subscription-bar">
                <div
                  className="subscription-bar-fill"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <div className="subscription-plan d-flex justify-content-between align-items-center">
                {labels.companyInfo.starterPlan}{" "}
                <span className="subscription-progress">
                  3/5 {labels.companyInfo.referenceChecks}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Col
        md={5}
        className="d-flex align-items-center justify-content-center flex-column gap-3"
      >
        <button
          type="submit"
          className={`btn-update-company-profile ${
            isDisabled || isUpdating ? "opacity-50" : ""
          }`}
          onClick={handleOnUpdate}
          disabled={isDisabled || isUpdating}
        >
          {isUpdating ? (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
            />
          ) : (
            labels.companyInfo.updateProfile
          )}
        </button>
        <button
          className={`btn-edit-company-culture ${
            isUpdating ? "opacity-50" : ""
          }`}
          disabled={isUpdating}
          onClick={handleEditCulture}
        >
          {labels.companyInfo.editCulture}
        </button>
        <button
          className={`btn-update-sub-plan ${isUpdating ? "opacity-50" : ""}`}
          disabled={isUpdating}
          onClick={handleShowAddCredits}
        >
          {labels.companyInfo.updatePlan}
        </button>
      </Col>
      {showAddCredits && (
        <AddCreditsPopUp
          onClose={() => setShowAddCredits(false)}
          currentBalance={0}
        />
      )}
    </Row>
  );
};

export default CompanyCultureSection;
