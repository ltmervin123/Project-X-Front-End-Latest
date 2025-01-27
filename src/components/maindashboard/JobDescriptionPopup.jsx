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

  // Check if the description has reached the character limit
  const isLimitReached = description.length === charLimit;

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="custom-modal-width"
      backdrop={false}
    >
      <Modal.Body className="job-description-modal">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Job Description</h5>
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        <div className="textarea-container position-relative mb-3">
          <textarea
            className={`form-control ${isLimitReached}`}
            value={description}
            onChange={handleDescriptionChange}
            rows={7}
            placeholder="Ex. We are seeking a motivated Junior Software Developer to join our dynamic engineering team..."
          />
          <p className={`char-count ${isLimitReached ? 'text-danger' : ''}`}>
            {description.length}/{charLimit}
          </p>
          
        </div>

        <div className="sample-description-container">
          {/* Display the error message if the character limit is reached */}
          {isLimitReached && (
            <p className="text-danger mt-2">
              Exceeded character limit. Max: {charLimit}
            </p>
          )}
          <p>SAMPLE: </p>
          <p>
          I will be responsible for designing, developing, testing, and maintaining high-quality software applications that serve our users' needs.
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
