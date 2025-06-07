import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const DPAPopUp = ({ showModal, setShowModal, handleContinue, t }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      className="cr-dpa-modal-agreement"
      backdrop="static"
    >
      <Modal.Body>
        <div className="cr-dpa-container d-flex justify-content-between align-items-center">
          <div className="cr-dpa-content d-flex flex-column align-items-center justify-content-start">
            <h2>{t('DPA_TITLE')}</h2>
            <p>{t('DPA_INTRO')}</p>

            <div className="cr-section">
              <span className="cr-section-title">{t('DPA_PURPOSE_TITLE')}</span>
              <p className="cr-section-description">{t('DPA_PURPOSE_TEXT')}</p>
            </div>

            <div className="cr-section">
              <span className="cr-section-title">{t('DPA_DATA_COLLECTED_TITLE')}</span>
              <p className="cr-section-description">
                {t('DPA_DATA_COLLECTED_TEXT')}
                <ul>
                  {Object.values(t('DPA_DATA_COLLECTED_ITEMS')).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                {t('DPA_DATA_COLLECTION_METHODS')}
              </p>
            </div>

            <div className="cr-section">
              <span className="cr-section-title">{t('DPA_PURPOSE_PROCESSING_TITLE')}</span>
              <p className="cr-section-description">
                {t('DPA_PURPOSE_PROCESSING_TEXT')}
                <ul>
                  {Object.values(t('DPA_PURPOSE_PROCESSING_ITEMS')).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </p>
            </div>

            <div className="cr-section">
              <span className="cr-section-title">{t('DPA_STORAGE_TITLE')}</span>
              <p className="cr-section-description">
                {t('DPA_STORAGE_TEXT')}
                <ul>
                  {Object.values(t('DPA_STORAGE_ITEMS')).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                {t('DPA_STORAGE_ADDITIONAL')}
              </p>
            </div>

            <div className="cr-section">
              <span className="cr-section-title">{t('DPA_SHARING_TITLE')}</span>
              <p className="cr-section-description">{t('DPA_SHARING_TEXT')}</p>
            </div>

            <div className="cr-section">
              <span className="cr-section-title">{t('DPA_RIGHTS_TITLE')}</span>
              <p className="cr-section-description">
                {t('DPA_RIGHTS_TEXT')}
                <ul>
                  {Object.values(t('DPA_RIGHTS_ITEMS')).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </p>
            </div>

            <div className="cr-section">
              <span className="cr-section-title">{t('DPA_TRANSFERS_TITLE')}</span>
              <p className="cr-section-description">{t('DPA_TRANSFERS_TEXT')}</p>
            </div>

            <div className="cr-section">
              <span className="cr-section-title">{t('DPA_CHANGES_TITLE')}</span>
              <p className="cr-section-description">{t('DPA_CHANGES_TEXT')}</p>
            </div>

            <div className="cr-section">
              <span className="cr-section-title">{t('DPA_CONTACT_TITLE')}</span>
              <p className="cr-section-description">
                {t('DPA_CONTACT_TEXT')}
                <ul>
                  {Object.values(t('DPA_CONTACT_ITEMS')).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </p>
            </div>

            <div className="cr-section">
              <span className="cr-section-title">{t('DPA_ACCEPTANCE_TITLE')}</span>
              <div className="d-flex gap-2 align-items-start justify-content-start p-1">
                <input
                  type="checkbox"
                  className="custom-checkbox form-check-input"
                  id="agreeCheckbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <p className="cr-section-description m-0">
                  {t('DPA_ACCEPTANCE_TEXT')}
                </p>
              </div>
            </div>

            <button
              className={`btn-cr-continue ${!isChecked ? "disable" : ""}`}
              variant="link"
              onClick={handleContinue}
              disabled={!isChecked}
            >
              {t('DPA_AGREE_BUTTON')}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DPAPopUp;
