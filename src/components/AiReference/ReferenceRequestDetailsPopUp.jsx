import React from "react";
import { Modal, Button } from "react-bootstrap";

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
      className="custom-modal-job"
      backdrop={true}
    >
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-0">
          <div>
            <h5 className="m-0">Reference Request Details</h5>
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

        <div className="candidate-details">
          <div className="my-3">
            <p className="d-flex gap-2 align-items-center justify-content-between">
              <strong className="d-flex gap-2 align-items-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_3637_3155)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948211 11.3869 0 9 0C6.61305 0 4.32387 0.948211 2.63604 2.63604C0.948211 4.32387 0 6.61305 0 9C0 11.3869 0.948211 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18ZM4.5 7.125C4.5 6.82663 4.61853 6.54048 4.8295 6.3295C5.04048 6.11853 5.32663 6 5.625 6H12.375C12.6734 6 12.9595 6.11853 13.1705 6.3295C13.3815 6.54048 13.5 6.82663 13.5 7.125C13.5 7.42337 13.3815 7.70952 13.1705 7.9205C12.9595 8.13147 12.6734 8.25 12.375 8.25H5.625C5.32663 8.25 5.04048 8.13147 4.8295 7.9205C4.61853 7.70952 4.5 7.42337 4.5 7.125ZM4.5 10.875C4.5 10.5766 4.61853 10.2905 4.8295 10.0795C5.04048 9.86853 5.32663 9.75 5.625 9.75H10.875C11.1734 9.75 11.4595 9.86853 11.6705 10.0795C11.8815 10.2905 12 10.5766 12 10.875C12 11.1734 11.8815 11.4595 11.6705 11.6705C11.4595 11.8815 11.1734 12 10.875 12H5.625C5.32663 12 5.04048 11.8815 4.8295 11.6705C4.61853 11.4595 4.5 11.1734 4.5 10.875Z"
                      fill="#F46A05"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3637_3155">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Status:
              </strong>
              <span style={{ color: getStatusColor(candidate.status) }}>
                {" "}
                {candidate.status}
              </span>
            </p>
          </div>
          <div className="my-3 d-flex gap-4 justify-content-between align-items-center">
            <div className="card mb-3">
              <b>Candidate Information</b>
              <p>{candidate.candidate || "N/A"}</p>
              <small>{candidate.candidateEmail || "N/A"}</small>
              <small>
                {" "}
                <span>{candidate.position || "N/A"}</span>{" "}
              </small>
            </div>
            <div className="card mb-3">
              <b>Referee Information</b>
              <p>{candidate.referee || "N/A"}</p>
              <small>{candidate.refereeEmail || "N/A"}</small>
            </div>
          </div>

          <p className="my-3 d-flex gap-2 align-items-center justify-content-between">
            <strong className="d-flex gap-2 align-items-center">
              <svg
                width="19"
                height="17"
                viewBox="0 0 19 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.40776 2.06462V3.48462L2.71376 3.62262C2.13179 3.66945 1.58233 3.91007 1.15323 4.30599C0.724132 4.70192 0.440174 5.23029 0.346761 5.80662C0.305428 6.06462 0.267428 6.32295 0.232761 6.58161C0.22498 6.6442 0.237121 6.70765 0.26746 6.76294C0.297799 6.81823 0.344792 6.86256 0.401761 6.88962L0.478761 6.92561C5.90776 9.49562 12.4088 9.49562 17.8368 6.92561L17.9138 6.88962C17.9705 6.8624 18.0173 6.81801 18.0475 6.76273C18.0776 6.70746 18.0896 6.64409 18.0818 6.58161C18.0478 6.32275 18.0102 6.06439 17.9688 5.80662C17.8753 5.23029 17.5914 4.70192 17.1623 4.30599C16.7332 3.91007 16.1837 3.66945 15.6018 3.62262L13.9078 3.48562V2.06562C13.9079 1.64647 13.7575 1.2412 13.4841 0.923535C13.2106 0.605864 12.8323 0.396889 12.4178 0.334615L11.1978 0.151615C9.84527 -0.0505385 8.47025 -0.0505385 7.11776 0.151615L5.89776 0.334615C5.48343 0.396863 5.10519 0.605694 4.83177 0.923155C4.55835 1.24062 4.4079 1.64564 4.40776 2.06462ZM10.9748 1.63462C9.77011 1.45469 8.54541 1.45469 7.34076 1.63462L6.12076 1.81762C6.06157 1.82647 6.00752 1.85627 5.96843 1.9016C5.92935 1.94692 5.90782 2.00477 5.90776 2.06462V3.37962C8.07266 3.25598 10.2429 3.25598 12.4078 3.37962V2.06462C12.4077 2.00477 12.3862 1.94692 12.3471 1.9016C12.308 1.85627 12.254 1.82647 12.1948 1.81762L10.9748 1.63462Z"
                  fill="#F46A05"
                />
                <path
                  d="M18.2737 8.67359C18.2717 8.64126 18.2619 8.6099 18.2451 8.58219C18.2283 8.55449 18.2051 8.53128 18.1773 8.51456C18.1496 8.49783 18.1182 8.4881 18.0859 8.48619C18.0535 8.48428 18.0212 8.49025 17.9917 8.50359C12.4207 10.9706 5.8907 10.9706 0.319704 8.50359C0.290188 8.49025 0.257872 8.48428 0.225537 8.48619C0.193201 8.4881 0.161814 8.49783 0.134073 8.51456C0.106332 8.53128 0.0830678 8.55449 0.0662813 8.58219C0.0494948 8.6099 0.0396879 8.64126 0.0377042 8.67359C-0.0635784 10.5881 0.0393353 12.5079 0.344704 14.4006C0.437915 14.9771 0.721783 15.5057 1.1509 15.9018C1.58002 16.2979 2.12959 16.5387 2.7117 16.5856L4.5837 16.7356C7.6267 16.9816 10.6837 16.9816 13.7277 16.7356L15.5997 16.5856C16.1818 16.5387 16.7314 16.2979 17.1605 15.9018C17.5896 15.5057 17.8735 14.9771 17.9667 14.4006C18.2727 12.5056 18.3767 10.5856 18.2737 8.67459"
                  fill="#F46A05"
                />
              </svg>
              Date Sent:
            </strong>{" "}
            {formatDate(candidate.dateSent) || "N/A"}
          </p>
          <p className="mb-5 d-flex gap-2 align-items-center justify-content-between">
            <strong className="d-flex gap-2 align-items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 7C0 5.114 -5.96046e-08 4.172 0.586 3.586C1.172 3 2.114 3 4 3H16C17.886 3 18.828 3 19.414 3.586C20 4.172 20 5.114 20 7C20 7.471 20 7.707 19.854 7.854C19.707 8 19.47 8 19 8H1C0.529 8 0.293 8 0.146 7.854C-8.9407e-08 7.707 0 7.47 0 7ZM0 16C0 17.886 -5.96046e-08 18.828 0.586 19.414C1.172 20 2.114 20 4 20H16C17.886 20 18.828 20 19.414 19.414C20 18.828 20 17.886 20 16V11C20 10.529 20 10.293 19.854 10.146C19.707 10 19.47 10 19 10H1C0.529 10 0.293 10 0.146 10.146C-8.9407e-08 10.293 0 10.53 0 11V16Z"
                  fill="#F46A05"
                />
                <path
                  d="M5 1V4M15 1V4"
                  stroke="#F46A05"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              Due Date:
            </strong>{" "}
            {formatDate(candidate.dueDate) || "N/A"}
          </p>
        </div>

        <div className="button-controls-job d-flex justify-content-center gap-3 w-100 my-5">
          <button className="d-flex gap-2 align-items-center justify-content-center">
            <svg
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6 0H1.4C0.63 0 0.00699999 0.73125 0.00699999 1.625L0 11.375C0 12.2687 0.63 13 1.4 13H12.6C13.37 13 14 12.2687 14 11.375V1.625C14 0.73125 13.37 0 12.6 0ZM12.32 3.45312L7.371 7.04437C7.147 7.20687 6.853 7.20687 6.629 7.04437L1.68 3.45312C1.60981 3.40739 1.54834 3.3456 1.49932 3.27149C1.4503 3.19739 1.41474 3.11251 1.3948 3.02199C1.37486 2.93147 1.37095 2.8372 1.38331 2.74487C1.39567 2.65255 1.42404 2.5641 1.4667 2.48487C1.50936 2.40564 1.56543 2.33728 1.63151 2.28393C1.69759 2.23058 1.77231 2.19335 1.85115 2.17449C1.92998 2.15563 2.0113 2.15554 2.09017 2.17421C2.16904 2.19288 2.24382 2.22993 2.31 2.28312L7 5.6875L11.69 2.28312C11.7562 2.22993 11.831 2.19288 11.9098 2.17421C11.9887 2.15554 12.07 2.15563 12.1489 2.17449C12.2277 2.19335 12.3024 2.23058 12.3685 2.28393C12.4346 2.33728 12.4906 2.40564 12.5333 2.48487C12.576 2.5641 12.6043 2.65255 12.6167 2.74487C12.629 2.8372 12.6251 2.93147 12.6052 3.02199C12.5853 3.11251 12.5497 3.19739 12.5007 3.27149C12.4517 3.3456 12.3902 3.40739 12.32 3.45312Z"
                fill="white"
              />
            </svg>
            Send Reminder
          </button>

          <button onClick={onViewReference}>View Reference</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReferenceRequestDetailsPopUp;
