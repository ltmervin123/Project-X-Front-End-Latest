import React from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";

const ReferenceRequestDetailsPopUp = ({
  candidate,
  onClose,
  onViewReference,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "#F8BD00";
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
            <h5 className="m-0">Professional Reference for Candidate Name</h5>
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
                <p>
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
                      backgroundColor: getStatusColor(candidate.status),
                    }}
                  >
                    {" "}
                    {candidate.status || "N/A"}
                  </span>{" "}
                </p>
                <p>
                  {/* update icon */}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.8"
                      d="M6 12C5.16666 12 4.38622 11.8418 3.65866 11.5253C2.93111 11.2089 2.29778 10.7811 1.75867 10.242C1.21956 9.70289 0.791778 9.06956 0.475334 8.342C0.15889 7.61444 0.000445376 6.83378 9.324e-07 6C-0.000443512 5.16622 0.158001 4.38578 0.475334 3.65867C0.792667 2.93156 1.22022 2.29822 1.758 1.75867C2.29578 1.21911 2.92911 0.791333 3.658 0.475333C4.38689 0.159333 5.16755 0.000888889 6 0C6.91111 0 7.77511 0.194444 8.59199 0.583333C9.40888 0.972222 10.1004 1.52222 10.6667 2.23333V1.33333C10.6667 1.14444 10.7307 0.986222 10.8587 0.858667C10.9867 0.731111 11.1449 0.667111 11.3333 0.666667C11.5218 0.666222 11.6802 0.730222 11.8087 0.858667C11.9371 0.987111 12.0009 1.14533 12 1.33333V4C12 4.18889 11.936 4.34733 11.808 4.47533C11.68 4.60333 11.5218 4.66711 11.3333 4.66667H8.66666C8.47777 4.66667 8.31955 4.60267 8.19199 4.47467C8.06444 4.34667 8.00044 4.18844 7.99999 4C7.99955 3.81156 8.06355 3.65333 8.19199 3.52533C8.32044 3.39733 8.47866 3.33333 8.66666 3.33333H9.83333C9.37777 2.71111 8.81666 2.22222 8.14999 1.86667C7.48333 1.51111 6.76666 1.33333 6 1.33333C4.7 1.33333 3.59733 1.78622 2.692 2.692C1.78667 3.59778 1.33378 4.70044 1.33333 6C1.33289 7.29956 1.78578 8.40244 2.692 9.30867C3.59822 10.2149 4.70089 10.6676 6 10.6667C7.05555 10.6667 7.99999 10.35 8.83333 9.71667C9.66666 9.08333 10.2167 8.26667 10.4833 7.26667C10.5389 7.08889 10.6389 6.95556 10.7833 6.86667C10.9278 6.77778 11.0889 6.74444 11.2667 6.76667C11.4555 6.78889 11.6055 6.86933 11.7167 7.008C11.8278 7.14667 11.8611 7.29956 11.8167 7.46667C11.4944 8.78889 10.7944 9.87511 9.71666 10.7253C8.63888 11.5756 7.39999 12.0004 6 12ZM6.66666 5.73333L8.33333 7.4C8.45555 7.52222 8.51666 7.67778 8.51666 7.86667C8.51666 8.05556 8.45555 8.21111 8.33333 8.33333C8.2111 8.45556 8.05555 8.51667 7.86666 8.51667C7.67777 8.51667 7.52222 8.45556 7.39999 8.33333L5.53333 6.46667C5.46666 6.4 5.41666 6.32511 5.38333 6.242C5.35 6.15889 5.33333 6.07267 5.33333 5.98333V3.33333C5.33333 3.14444 5.39733 2.98622 5.52533 2.85867C5.65333 2.73111 5.81155 2.66711 6 2.66667C6.18844 2.66622 6.34688 2.73022 6.47533 2.85867C6.60377 2.98711 6.66755 3.14533 6.66666 3.33333V5.73333Z"
                      fill="#319F43"
                    />
                  </svg>
                  &nbsp; Update
                </p>
              </div>
              <div className="Request-container-status">
                <b>Request Timeline:</b>
                <div className="Reference-list-of-status">
                  <div className=" d-flex gap-2 align-items-center">
                    <svg
                      width="20"
                      height="30"
                      viewBox="0 0 20 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 10C10.6935 10 11.8381 9.52589 12.682 8.68198C13.5259 7.83807 14 6.69347 14 5.5C14 4.30653 13.5259 3.16193 12.682 2.31802C11.8381 1.47411 10.6935 1 9.5 1C8.30653 1 7.16193 1.47411 6.31802 2.31802C5.47411 3.16193 5 4.30653 5 5.5C5 6.69347 5.47411 7.83807 6.31802 8.68198C7.16193 9.52589 8.30653 10 9.5 10Z"
                        fill="#319F43"
                        stroke="#319F43"
                        stroke-width="2"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 10.5C9.86739 10.5 9.74021 10.5527 9.64645 10.6464C9.55268 10.7402 9.5 10.8674 9.5 11V29C9.5 29.1326 9.55268 29.2598 9.64645 29.3536C9.74021 29.4473 9.86739 29.5 10 29.5C10.1326 29.5 10.2598 29.4473 10.3536 29.3536C10.4473 29.2598 10.5 29.1326 10.5 29V11C10.5 10.8674 10.4473 10.7402 10.3536 10.6464C10.2598 10.5527 10.1326 10.5 10 10.5Z"
                        fill="#B9B9B9"
                      />
                    </svg>

                    <div>
                      Request Created
                      <p>2022-01-01</p>
                    </div>
                  </div>
                  <div className=" d-flex gap-2 align-items-center">
                    <svg
                      width="20"
                      height="30"
                      viewBox="0 0 20 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 10C10.6935 10 11.8381 9.52589 12.682 8.68198C13.5259 7.83807 14 6.69347 14 5.5C14 4.30653 13.5259 3.16193 12.682 2.31802C11.8381 1.47411 10.6935 1 9.5 1C8.30653 1 7.16193 1.47411 6.31802 2.31802C5.47411 3.16193 5 4.30653 5 5.5C5 6.69347 5.47411 7.83807 6.31802 8.68198C7.16193 9.52589 8.30653 10 9.5 10Z"
                        fill="#319F43"
                        stroke="#319F43"
                        stroke-width="2"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 10.5C9.86739 10.5 9.74021 10.5527 9.64645 10.6464C9.55268 10.7402 9.5 10.8674 9.5 11V29C9.5 29.1326 9.55268 29.2598 9.64645 29.3536C9.74021 29.4473 9.86739 29.5 10 29.5C10.1326 29.5 10.2598 29.4473 10.3536 29.3536C10.4473 29.2598 10.5 29.1326 10.5 29V11C10.5 10.8674 10.4473 10.7402 10.3536 10.6464C10.2598 10.5527 10.1326 10.5 10 10.5Z"
                        fill="#B9B9B9"
                      />
                    </svg>

                    <div>
                      Email Sent to Referee
                      <p>2022-01-2</p>
                    </div>
                  </div>
                  <div className=" d-flex gap-2 align-items-center">
                    <svg
                      width="20"
                      height="30"
                      viewBox="0 0 20 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 10C10.6935 10 11.8381 9.52589 12.682 8.68198C13.5259 7.83807 14 6.69347 14 5.5C14 4.30653 13.5259 3.16193 12.682 2.31802C11.8381 1.47411 10.6935 1 9.5 1C8.30653 1 7.16193 1.47411 6.31802 2.31802C5.47411 3.16193 5 4.30653 5 5.5C5 6.69347 5.47411 7.83807 6.31802 8.68198C7.16193 9.52589 8.30653 10 9.5 10Z"
                        fill="#319F43"
                        stroke="#319F43"
                        stroke-width="2"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 10.5C9.86739 10.5 9.74021 10.5527 9.64645 10.6464C9.55268 10.7402 9.5 10.8674 9.5 11V29C9.5 29.1326 9.55268 29.2598 9.64645 29.3536C9.74021 29.4473 9.86739 29.5 10 29.5C10.1326 29.5 10.2598 29.4473 10.3536 29.3536C10.4473 29.2598 10.5 29.1326 10.5 29V11C10.5 10.8674 10.4473 10.7402 10.3536 10.6464C10.2598 10.5527 10.1326 10.5 10 10.5Z"
                        fill="#B9B9B9"
                      />
                    </svg>
                    <div>
                      Referee Started Response
                      <p>2022-01-03</p>
                    </div>
                  </div>
                  <div className=" d-flex gap-2 align-items-center">
                    <svg
                      width="20"
                      height="30"
                      viewBox="0 0 20 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 10C10.6935 10 11.8381 9.52589 12.682 8.68198C13.5259 7.83807 14 6.69347 14 5.5C14 4.30653 13.5259 3.16193 12.682 2.31802C11.8381 1.47411 10.6935 1 9.5 1C8.30653 1 7.16193 1.47411 6.31802 2.31802C5.47411 3.16193 5 4.30653 5 5.5C5 6.69347 5.47411 7.83807 6.31802 8.68198C7.16193 9.52589 8.30653 10 9.5 10Z"
                        fill="#319F43"
                        stroke="#319F43"
                        stroke-width="2"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 10.5C9.86739 10.5 9.74021 10.5527 9.64645 10.6464C9.55268 10.7402 9.5 10.8674 9.5 11V29C9.5 29.1326 9.55268 29.2598 9.64645 29.3536C9.74021 29.4473 9.86739 29.5 10 29.5C10.1326 29.5 10.2598 29.4473 10.3536 29.3536C10.4473 29.2598 10.5 29.1326 10.5 29V11C10.5 10.8674 10.4473 10.7402 10.3536 10.6464C10.2598 10.5527 10.1326 10.5 10 10.5Z"
                        fill="#B9B9B9"
                      />
                    </svg>
                    <div>
                      Reference Completed
                      <p> 2022-01-04</p>
                    </div>
                  </div>
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
                <b>Reference Information</b>
                <div className="d-flex">
                  <div className="reference-labels">Name: </div>
                  <div className="reference-details">Bob Williams</div>
                </div>
                <div className="d-flex ">
                  <div className="reference-labels">Email:</div>
                  <div className="reference-details">bobwills@company.com</div>
                </div>
                <div className="d-flex">
                  <div className="reference-labels">Relationship:</div>
                  <div className="reference-details">Former Manager</div>
                </div>
              </div>
            </Col>
            <Col md={12} className="mt-3">
              <div className="Request-information-container w-100">
                <b>Request Information</b>
                <div className="d-flex align-items-center">
                  <p>
                    Question Format: <span></span>
                  </p>
                  <p>
                    Date Sent:{" "}
                    <span>{formatDate(candidate.dateSent) || "N/A"}</span>
                  </p>
                  <p>
                    Date Due:{" "}
                    <span>{formatDate(candidate.dueDate) || "N/A"}</span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          <div className="button-controls-job d-flex justify-content-center gap-3 w-100 mt-3">
            <button className="d-flex gap-2 align-items-center justify-content-center">
              Send Reminder
            </button>

            {/* {candidate.status === "Completed" && ( */}
              <button onClick={onViewReference}>View Reference</button>
            {/* )} */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReferenceRequestDetailsPopUp;
