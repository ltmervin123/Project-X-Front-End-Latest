import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import errorImage from "../../../assets/error-image.png"; // Replace with the actual path to your error image
import "../../../styles/Error.css";

const ErrorTranscription = ({ onRetry }) => {
  return (
    <Modal show={true} centered dialogClassName="custom-error-modal-width">
      <Modal.Body>
        <Row className="align-items-center">
          <Col md={5}>
            <img src={errorImage} alt="Error" className="img-fluid" />
          </Col>
          <Col md={7}>
            <h4>ERROR: Unable to Transcribe Answer</h4>
            <p>
              We encountered an issue while transcribing your answer. This may
              have occurred because the recording was stopped too soon, the
              audio was not fully transcribed, or the microphone was muted.
              Please try recording your answer again, ensure you speak clearly
              until the end, and verify that your microphone is not muted.
            </p>
            <div className="d-flex justify-content-center">
              <button className="btn-retry" onClick={onRetry}>
                Retry
              </button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorTranscription;
