import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Spinner } from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <Modal show={true} centered backdrop={true}>
      <Modal.Body className="text-center p-5">
        <Spinner animation="border" role="status" className="mb-3">
          <span
            className="visually-hidden loading"
            style={{ color: "#f46a05" }}
          >
            Loading...
          </span>
        </Spinner>
        <h4>Processing your interview...</h4>
        <p>Please wait while we analyze your responses.</p>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingScreen;
