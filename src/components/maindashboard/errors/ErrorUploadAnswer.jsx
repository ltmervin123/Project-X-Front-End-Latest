import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import errorImage from "../../../assets/error-image.png"; // Replace with the actual path to your error image
import "../../../styles/Error.css";

const ErrorUploadAnswer = ({ onRetry }) => {
  return (
    <Modal show={true} centered dialogClassName="custom-error-modal-width">
      <Modal.Body>
        <Row className="align-items-center">
          <Col md={5}>
            <img src={errorImage} alt="Error" className="img-fluid" />
          </Col>
          <Col md={7}>
            <h4>ERROR: Answer processing failed</h4>
            <p>Unable to process answer at the moment. Please try again!</p>
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

export default ErrorUploadAnswer;
