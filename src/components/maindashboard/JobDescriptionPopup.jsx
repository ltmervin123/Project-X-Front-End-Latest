import { React, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const JobDescriptionPopup = ({ show, onClose, onSubmit }) => {
  const [description, setDescription] = useState("");
  const [hasDescription, setHasDescription] = useState(false);
  const charLimit = 255;

  const handleDescriptionChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= charLimit) {
      setDescription(inputText);
    }
  };

  // Check if description is empty and set hasDescription state so the submit button is disabled
  useEffect(() => {
    setHasDescription(description.length === 0);
  }, [description]);

  const handleSubmit = () => {
    onSubmit(description); // Call onSubmit to open the VideoRecording component
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="custom-modal-width"
      backdrop={false}
    >
      <Modal.Body className="job-description-modal ">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Job Description</h5>
          <Button
          className='closebtn'
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        <div className="textarea-container position-relative mb-3">
          <textarea
            className="form-control"
            value={description}
            onChange={handleDescriptionChange}
            rows={7}
            placeholder="Type your Job Description Here..."
          />
          <p className="char-count">
            {description.length}/{charLimit}
          </p>
        </div>
        <div className="sample-description-container">
          <p>SAMPLE: </p>
          <p>
            We are seeking a dynamic and results-driven Marketing Specialist to
            join our growing team at [Company Name]. The ideal candidate will be
            responsible for developing and executing innovative marketing
            strategies that enhance brand awareness, drive customer engagement,
            and increase sales.
          </p>
        </div>
        <div className="submit-job-description d-flex align-items-center">
          <Button
            className="btnsumbitjobdescription"
            onClick={handleSubmit}
            disabled={hasDescription}
          >
            Submit
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default JobDescriptionPopup;
