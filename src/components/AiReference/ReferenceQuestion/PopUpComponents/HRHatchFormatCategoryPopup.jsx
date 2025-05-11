import React from "react";
import { Modal, Button } from "react-bootstrap";

// Define language
const language = sessionStorage.getItem("preferred-language") || "English";

// Translation dictionary
const TRANSLATIONS = {
  English: {
    selectPreferred: "Select Preferred",
    formatToCustomize: "Format to Customize",
    standardFormat: "Standard Format",
    managementFormat: "Management Format",
    executiveFormat: "Executive Format"
  },
  Japanese: {
    selectPreferred: "希望する",
    formatToCustomize: "フォーマットをカスタマイズ",
    standardFormat: "標準フォーマット",
    managementFormat: "管理職フォーマット",
    executiveFormat: "エグゼクティブフォーマット"
  }
};

const FORMATS = [
  { title: TRANSLATIONS[language].standardFormat, englishTitle: "Standard Format" },
  { title: TRANSLATIONS[language].managementFormat, englishTitle: "Management Format" },
  { title: TRANSLATIONS[language].executiveFormat, englishTitle: "Executive Format" },
];

const HRHatchFormatCategoryPopup = ({ onClose, onSelectFormat }) => {
  return (
    <Modal
      show={true}
      onHide={onClose}
      className="custom-modal-question"
      centered
      backdrop={true}
    >
      <Modal.Body className="p-4">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <h5 className="mb-0 text-center">
            {TRANSLATIONS[language].selectPreferred} <span className="color-orange">HR</span>-HΛTCH{' '}
            {TRANSLATIONS[language].formatToCustomize}
          </h5>
        </div>

        <div className="d-flex gap-2 hr-hatch-option flex-column align-items-center justify-content-center">
          {FORMATS.map((format, index) => (
            <Button
              key={index}
              className="mb-2"
              onClick={() => {
                onSelectFormat(format.englishTitle);
              }}
            >
              {format.title}
            </Button>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default HRHatchFormatCategoryPopup;
