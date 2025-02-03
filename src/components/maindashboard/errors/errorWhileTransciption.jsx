import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import errorImage from "../../../assets/error-image.png"; // Replace with the actual path to your error image
import "../../../styles/Error.css";

const ErrorWhileTranscription = ({ onRetry }) => {
  return (
    <Modal show={true} centered dialogClassName="custom-error-modal-width">
      <Modal.Body>
        <Row className="align-items-center">
          <Col md={5}>
            <img src={errorImage} alt="Error" className="img-fluid" />
          </Col>
          <Col md={7}>
            <h4>Connection Lost: Audio Transcription Interrupted</h4>
            <p>
              We lost connection while transcribing your answer. This may have 
              happened due to an unstable internet connection or an unexpected 
              disconnection.
            </p>
            <p>
              To continue, please check your internet connection and try again. 
              If the issue persists, refresh the page and ensure a stable network 
              before retrying.
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

export default ErrorWhileTranscription;
