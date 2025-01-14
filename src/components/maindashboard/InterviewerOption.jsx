import React from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import interviewerImg from "../../assets/mock-avatar.png"; // Make sure to add this image to your assets

const InterviewerOption = ({ show, onSelectInterviewer }) => {
  return (
    <Modal
      show={show}
      backdrop="static" // This prevents closing when clicking outside
      keyboard={false} // This prevents closing with keyboard
      centered
      className="interviewer-option-modal"
    >
      <Modal.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Choose Your Interviewer</h4>

        </div>

        <Row>
          <Col md={7} className="d-flex align-items-center justify-content-center flex-column gap-3">
            <Button
              className="interviewer-btn "
              onClick={() => {
                onSelectInterviewer("Steve");
              }}
            >
              Steve
            </Button>
            <Button
              className="interviewer-btn"
              onClick={() => {
                onSelectInterviewer("Stella");
              }}
            >
              Stella
            </Button>
          </Col>
          <Col
            md={5}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src={interviewerImg}
              alt="Interviewer"
              className="interviewer-image"
            />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default InterviewerOption;
