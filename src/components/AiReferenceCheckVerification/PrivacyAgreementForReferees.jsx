import React, { useState } from "react"; // Add useState import
import { Modal } from "react-bootstrap";
import "../../styles/DPA.css";

const PrivacyAgreementForReferees = ({ showModal, setShowModal, handleContinue }) => {
  const [isChecked, setIsChecked] = useState(false); // Track the checkbox state

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      className="cr-privacy-modal-agreement"
      backdrop="static"
    >
      <Modal.Body>
        <div className="cr-privacy-container d-flex justify-content-between align-items-center">
          <div className="cr-privacy-content d-flex flex-column align-items-center justify-content-start">
            <h2>Privacy Agreement for Referees</h2>
            <p>
              As a referee participating in this reference check, you acknowledge and agree to the following:
            </p>
            <div className="cr-section">
              <span className="cr-section-title">Purpose of Information Use:</span>
              <p className="cr-section-description">
                The information you provide will be used solely for the purpose of evaluating the candidate's suitability for employment.
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">Confidentiality:</span>
              <p className="cr-section-description">
                Your responses will be treated with the strictest confidentiality. They will only be shared with authorized individuals directly involved in the hiring process.
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">Data Handling:</span>
              <p className="cr-section-description">
                Your personal details (e.g., name, title, company, contact information, ID) will be collected to verify your identity and professional relationship with the candidate. This data will be stored securely and only for as long as necessary for recruitment purposes.
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">Voluntary Participation:</span>
              <p className="cr-section-description">
                Providing a reference is voluntary. By submitting your responses, you confirm that you are doing so of your own free will and that the information you provide is accurate to the best of your knowledge.
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">Compliance with Data Protection Laws:</span>
              <p className="cr-section-description">
                The company conducting this reference check complies with all applicable data protection laws, including but not limited to the General Data Protection Regulation (GDPR) and Japan’s Act on the Protection of Personal Information (APPI), as applicable.
              </p>
            </div>
            <div className="cr-section">
              <span className="cr-section-title">Acceptance:</span>
              <div className="d-flex gap-2 align-items-center justify-content-start p-1">
                <input
                  type="checkbox"
                  id="agreeCheckbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <p className="cr-section-description m-0">
                  Click Agree to confirm that you have read, understood, and agreed to the terms of this Privacy Agreement.
                </p>
              </div>
            </div>

            <button
              className={`btn-cr-continue ${!isChecked ? "disable" : ""}`} // Add 'disable' class when checkbox is not checked
              variant="link"
              onClick={handleContinue}
              disabled={!isChecked} // Disable button if checkbox is not checked
            >
              Agree
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PrivacyAgreementForReferees;