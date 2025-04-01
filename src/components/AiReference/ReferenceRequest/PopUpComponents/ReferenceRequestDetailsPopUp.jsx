import React, { useState, useCallback } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const USER = JSON.parse(localStorage.getItem("user"));
const { token, id: companyId } = USER;

const ReferenceRequestDetailsPopUp = ({
  candidate,
  referee,
  onClose,
  onViewReference,
}) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "#F8BD00";
      case "Expired":
        return "#FF0000";
      case "Completed":
        return "#1877F2";
      case "New":
        return "#319F43";
      default:
        return "black"; // Default color for unknown statuses
    }
  };
  const formatDate = (date) => {
    if (!date) return ""; // Return an empty string or a fallback value if the date is invalid
    return date.split("T")[0]; // Extract only YYYY-MM-DD
  };

  const formatQuestion = (question) => {
    switch (question) {
      case "HR-HATCH-FORMAT":
        return "HR-Hatch Format";
      case "CUSTOM-FORMAT":
        return "Custom Format";
      default:
        return "N/A";
    }
  };

  const sendReminder = useCallback(async () => {
    try {
      setIsSending(true);
      const URL = `${API}/api/ai-referee/company-request-reference/send-reference-reminder/${referee._id}`;
      const response = await axios.post(
        URL,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsSent(true);
        setTimeout(() => {
          setIsSent(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error sending reminder:", error);
    } finally {
      setIsSending(false);
    }
  }, []);

  const handleSendReminder = async () => {
    await sendReminder();
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-reference"
      backdrop={true}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-0">
          <div>
            <h5 className="m-0">
              Professional Reference for{" "}
              <span
                className="color-orange reference-candidate-name"
                style={{ textTransform: "capitalize" }}
              >
                {" "}
                {candidate.candidate || "N/A"}
              </span>
            </h5>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              className="closebtn"
              variant="link"
              onClick={onClose}
              style={{ fontSize: "1.5rem", textDecoration: "none" }}
            >
              &times;
            </Button>
          </div>
        </div>

        <div className="Reference-details">
          <Row>
            <Col md={6}>
              <b className="mb-3">Reference Status</b>
              <div className="Request-container-status d-flex justify-content-between align-items-center mt-3 mb-3">
                <p className="d-flex align-items-center">
                  {/* Check icon */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_4265_3150)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.4154 6.99998C13.4154 10.5437 10.5424 13.4166 6.9987 13.4166C3.45495 13.4166 0.582031 10.5437 0.582031 6.99998C0.582031 3.45623 3.45495 0.583313 6.9987 0.583313C10.5424 0.583313 13.4154 3.45623 13.4154 6.99998ZM4.08203 7.58331L4.95703 6.70831L6.1237 7.87498L9.04037 4.95831L9.91537 5.83331L6.1237 9.62498L4.08203 7.58331Z"
                        fill="#319F43"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4265_3150">
                        <rect width="14" height="14" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  &nbsp; Status: &nbsp;
                  <span
                    style={{
                      backgroundColor: getStatusColor(referee.status),
                    }}
                  >
                    {" "}
                    {referee.status || "N/A"}
                  </span>{" "}
                </p>
              </div>
              <div className="Request-information-container w-100">
                <b>Request Information</b>
                <div className="request-information-container d-flex flex-column">
                  <div className="d-flex">
                    <div className="request-label">Question Format:</div>
                    <div className="request-details">
                      {formatQuestion(referee.questionFormat)}
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="request-label">Date Sent:</div>
                    <div className="request-details">
                      {formatDate(candidate.dateSent) || "N/A"}
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="request-label">Date Due:</div>
                    <div className="request-details">
                      {formatDate(candidate.dueDate) || "N/A"}
                    </div>
                  </div>
                  {/* <p>
                    Question Format:{" "}
                    <span>{referee.questionFormat || "N/A"}</span>
                  </p>
                  <p>
                    Date Sent:{" "}
                    <span>{formatDate(candidate.dateSent) || "N/A"}</span>
                  </p>
                  <p>
                    Date Due:{" "}
                    <span>{formatDate(candidate.dueDate) || "N/A"}</span>
                  </p> */}
                </div>
              </div>
            </Col>
            <Col md={6}>
              <b className="mb-3">Reference Details</b>

              <div className="candidate-info-container  mt-3">
                <b>Candidate Information</b>
                <div className="candidate-labels-and-details w-100">
                  <div className="d-flex">
                    <div className="candidate-labels">Name:</div>
                    <div className="candidate-details">
                      {candidate.candidate || "N/A"}
                    </div>
                  </div>
                  <div className="d-flex ">
                    <div className="candidate-labels">Email:</div>
                    <div className="candidate-details">
                      {candidate.candidateEmail || "N/A"}
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="candidate-labels">Position:</div>
                    <div className="candidate-details">
                      {candidate.position || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="reference-information-container mt-3">
                <b>Referee Information</b>
                <div className="d-flex">
                  <div className="reference-labels">Name: </div>
                  <div className="reference-details">
                    {referee.name || "N/A"}
                  </div>
                </div>
                <div className="d-flex ">
                  <div className="reference-labels">Email:</div>
                  <div className="reference-details">
                    {referee.email || "N/A"}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <div className="button-controls-job d-flex justify-content-center gap-3 w-100 mt-4">
            {referee.status === "Completed" ? (
              <button
                className="btn-viewreference d-flex gap-2 align-items-center justify-content-center"
                onClick={onViewReference}
              >
                View Reference
              </button>
            ) : null}
            {referee.status === "In Progress" ? (
              <>
                <button
                  className="btn-senRemider d d-flex gap-2 align-items-center justify-content-center"
                  onClick={handleSendReminder}
                  disabled={isSending || isSent}
                >
                  {isSending ? "Sending..." : "Send Reminder"}
                </button>
                {isSent ? <p>Email sent successfully</p> : null}
              </>
            ) : null}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReferenceRequestDetailsPopUp;
