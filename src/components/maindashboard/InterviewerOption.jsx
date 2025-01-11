import React from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import interviewerImg from "../../assets/mock-avatar.png"; // Make sure to add this image to your assets

const InterviewerOption = ({ show, onHide, onSelectInterviewer }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="interviewer-option-modal"
    >
      <Modal.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Choose Your Interviewer</h4>
          <Button
            className="closebtn"
            variant="link"
            onClick={onHide}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>

        <Row>
          <Col md={6} className="d-flex flex-column gap-3">
            <Button
              className="interviewer-btn"
              onClick={() => {
                onSelectInterviewer("Steve");
              }}
            >
              Steve
            </Button>
            <Button
              className="interviewer-btn"
              onClick={() => {
                onSelectInterviewer("Stela");
              }}
            >
              Stela
            </Button>
          </Col>
          <Col
            md={6}
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
