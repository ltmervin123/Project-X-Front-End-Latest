import React from "react";
import { Modal, Button } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";

const PasswordChangeSuccessModal = ({
  show,
  onClose,
  title,
  description,
  btn,
}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
      aria-labelledby="password-success-modal"
    >
      <Modal.Body>
        <div className="text-center py-4">
          <CheckCircleFill size={56} className="text-success mb-3" />
          <h4 id="password-success-modal" className="mb-2">
            {title}
          </h4>
          <p className="mb-4 text-muted">{description}</p>
          <Button variant="success" onClick={onClose} autoFocus>
            {btn}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PasswordChangeSuccessModal;
