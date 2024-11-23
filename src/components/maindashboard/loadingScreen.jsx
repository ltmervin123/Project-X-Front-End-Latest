import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal} from "react-bootstrap";
import loadAvatar from '../../assets/logo.png';
const LoadingScreen = () => {
  return (
    <Modal show={true} centered backdrop={true}>
      <Modal.Body className="text-center p-5">
        <img src={loadAvatar} alt="" style={{ height: '70px' }}/>
          <span
            className="visually-hidden loading"
            style={{ color: "#f46a05" }}
          >
            Loading...
          </span>

        <h4>Processing your interview...</h4>
        <p>Please wait while we analyze your responses.</p>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingScreen;
