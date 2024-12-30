import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
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
            <h4>ERROR: Unable to Transcribing Asnwer</h4>
            <p>
              We encountered an issue while transcribing your answer. Please
              answer again!
            </p>
            <div className="d-flex justify-content-center">
              <Button className="btn-retry" onClick={onRetry}>
                Retry
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorTranscription;
