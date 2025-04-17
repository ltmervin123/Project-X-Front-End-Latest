import React from "react";
import { Modal, Button } from "react-bootstrap";

const FORMATS = [
  { title: "Standard Format" },
  { title: "Management Format" },
  { title: "Executive Format" },
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
          <h5 className=" mb-0 text-center">
            Select Preferred <span className="color-orange">HR</span>-HΛTCH
            Format to Customize
          </h5>
        </div>

        <div className="d-flex gap-2 hr-hatch-option flex-column align-items-center justify-content-center">
          {FORMATS.map((format, index) => (
            <Button
              key={index}
              className="mb-2"
              onClick={() => {
                onSelectFormat(format.title);
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
