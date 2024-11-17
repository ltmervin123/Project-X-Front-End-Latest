import React, { useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import "../../styles/InterviewDifficultyCategoryPopup.css";

const InterviewDifficultyCategoryPopup = ({
  show,
  onClose,
  onSelectDifficulty,
}) => {
  const handleDifficultyClick = (level) => {
    onSelectDifficulty(level); // Pass the selected difficulty level to the parent component
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="custom-modal-width"
      backdrop={false}
    >
      <Modal.Body className="custom-modal">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Tier</h5>
          <Button
            className='closebtn'
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>

        <Row className="text-center difficulty-container d-flex justify-content-around">
          {["Beginner", "Intermediate", "Advanced"].map((level, index) => (
            <Col key={index} md={3}>
              <div
                className="difficulty-card p-3 mb-3 d-flex justify-content-center"
                onClick={() => handleDifficultyClick(level)} // Pass level to handler
              >
                <img src="" alt="" className="difficulty-img" />
                {level}
              </div>
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default InterviewDifficultyCategoryPopup;
