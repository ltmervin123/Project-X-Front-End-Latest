import React from "react";
import { Modal, Button } from "react-bootstrap";

const ReferenceRequestEmailSentPopup = ({ show, onClose }) => {
  // Retry email handler (you can expand this logic as needed)
  const handleCustomerService = () => {
    alert("Retrying email send...");
    // Your retry logic would go here
  };

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Body className="p-4">
        <div className="d-flex justify-content-between position-relative  align-items-center mb-0">
          <div>
            <h5 className="m-2"></h5>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              className="closebtn position-absolute end-0 top-5"
              variant="link"
              onClick={onClose}
              style={{ fontSize: "1.5rem", textDecoration: "none" }}
            >
              &times;
            </Button>
          </div>
        </div>
        <div className="d-flex align-items-center flex-column justify-content-center">
          {/* SVG Icon */}
          <div className="svg-icon">
            <svg
              width="121"
              height="121"
              viewBox="0 0 121 121"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80.4133 110.917L58.9862 89.4895L66.0445 82.4312L80.4133 96.8L108.899 68.3145L115.957 75.3729L80.4133 110.917ZM60.4987 55.4583L100.832 30.25H20.1654L60.4987 55.4583ZM60.4987 65.5416L20.1654 40.3333V90.75H46.1299L56.2133 100.833H20.1654C17.3924 100.833 15.0195 99.8468 13.0465 97.8738C11.0736 95.9009 10.0854 93.5262 10.082 90.75V30.25C10.082 27.477 11.0702 25.1041 13.0465 23.1311C15.0229 21.1582 17.3958 20.17 20.1654 20.1666H100.832C103.605 20.1666 105.98 21.1548 107.956 23.1311C109.932 25.1075 110.919 27.4804 110.915 30.25V52.1812L100.832 62.2645V40.3333L60.4987 65.5416Z"
                fill="#F46A05"
              />
            </svg>
          </div>

          {/* Popup Text */}
          <div className="text-center">
            <h3>Email Sent</h3>
            <p style={{ fontSize: "18px" }}>
              {" "}
              We have sent an email to{" "}
              <strong className="color-orange">sample@hr-hatch.com</strong> to
              confirm your reference request.
            </p>
            <p style={{ fontSize: "14px" }}>
            {" "}
              Not working? Contact{" "} 
              <strong className="color-blue" onClick={handleCustomerService}>
                Customer Service
              </strong>
              .
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReferenceRequestEmailSentPopup;
