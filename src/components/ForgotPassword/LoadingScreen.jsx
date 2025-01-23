import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal} from "react-bootstrap";
import loading from '../../assets/loading.gif';
const LoadingScreen = () => {
  return (
    <Modal show={true} centered backdrop={true}>
      <Modal.Body className="text-center p-5">
        <img className="loadinganimation" src={loading} alt=""/>
          <span
            className="visually-hidden loading"
            style={{ color: "#f46a05" }}
          >
            Loading...
          </span>

        <h4>Processing...</h4>

      </Modal.Body>
    </Modal>
  );
};

export default LoadingScreen;
