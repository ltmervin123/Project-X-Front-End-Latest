import React from "react";
import { Modal, Button } from "react-bootstrap";

const HRHatchFormatCategoryPopup = ({ onClose, onSelectFormat }) => {
  const formats = [
    { title: "Standard Format" },
    { title: "Management Format" },
    { title: "Executive Format" },
  ];

  return (
    <Modal
      show={true}
      onHide={onClose}
      className="custom-modal-question"
      centered
      backdrop={true}
    >
      <Modal.Body className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-0 text-center">Select a preferred HR-Hatch Format to edit</h5>
          </div>
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>

        <div className="d-flex gap-3 hr-hatch-option">
          {formats.map((format, index) => (
            <Button
              key={index}
              className="mb-2"
              onClick={() => {
                console.log(`Editing ${format.title}`);
                onSelectFormat(format.title); // Call the function to handle format selection
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