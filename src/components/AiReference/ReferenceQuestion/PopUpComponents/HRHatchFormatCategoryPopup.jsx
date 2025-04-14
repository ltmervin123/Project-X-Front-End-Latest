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
      <Modal.Body className="p-4">
        <div className="d-flex justify-content-center align-items-center mb-3">
            <h5 className=" mb-0 text-center">Select Preferred <span className="color-orange">HR</span>-HΛTCH Format to Customize</h5>


        </div>

        <div className="d-flex gap-2 hr-hatch-option flex-column align-items-center justify-content-center">
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