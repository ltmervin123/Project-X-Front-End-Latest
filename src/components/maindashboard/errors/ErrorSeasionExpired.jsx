import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import errorImage from "../../../assets/error-image.png"; // Replace with the actual path to your error image
import '../../../styles/Error.css';

const ErrorSessionExpired = () => {
  const handleLogin = () => {
    window.location.href = "/HR_HATCH/login";
  };
  return (
    <Modal show={true} centered dialogClassName="custom-error-modal-width">
      <Modal.Body>
        <Row className="align-items-center">
          <Col md={5}>
            <img src={errorImage} alt="Error" className="img-fluid" />
          </Col>
          <Col md={7}>
            <h4>Your session has expired.</h4>
            <p>
              Please refresh your browser. To continue, please sign in again.
            </p>
            <div className="d-flex justify-content-center">
              <Button className="btn-analytics" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ErrorSessionExpired;