import { Form } from "react-bootstrap";
import { memo } from "react";

const JobDetailSection = ({
  labels,
  vacancies,
  setVacancies,
  vacancyError,
  questionFormat,
  questionName,
  getTranslatedQuestionName,
  errorMessages,
}) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center w-100 job-header mb-4">
        <div className="d-flex align-items-center justify-content-center">
          <h4 className="d-flex gap-2 mb-0">
            <div className="job-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 14V13.2C0 12.6333 0.146 12.1127 0.438 11.638C0.73 11.1633 1.11733 10.8007 1.6 10.55C2.63333 10.0333 3.68333 9.646 4.75 9.388C5.81667 9.13 6.9 9.00067 8 9C9.1 8.99933 10.1833 9.12867 11.25 9.388C12.3167 9.64733 13.3667 10.0347 14.4 10.55C14.8833 10.8 15.271 11.1627 15.563 11.638C15.855 12.1133 16.0007 12.634 16 13.2V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14Z"
                  fill="white"
                />
              </svg>
            </div>
            {labels.applicantDetails}
          </h4>
        </div>
        <div className="fill-req-container">{labels.fillRequired}</div>
      </div>
      <Form.Group controlId="formVacancies" className="mb-4">
        <Form.Label className="mb-1 ">
          {labels.Vacancies}
          <span className="color-orange"> *</span>
        </Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={vacancies}
          onChange={(e) => {
            const value = e.target.value === '' ? '' : parseInt(e.target.value);
            setVacancies(value);
          }}
          isInvalid={!!vacancyError}
        />
        {vacancyError && (
          <div className="px-3 py-1 text-danger">{vacancyError}</div>
        )}
      </Form.Group>
      <Form.Group controlId="formReferenceFormat" className="mb-4">
        <Form.Label className="m-0" style={{ width: "220px", height: "38px" }}>
          {labels.referenceFormat}
          <span className="color-orange"> &nbsp;*</span>
        </Form.Label>

        <div className="w-100 reference-question-format-container d-flex gap-3">
          <div className="custom-dropdown-ref-req">
            <div
              className={`dropdown-header-ref-req ${
                questionFormat === "HR-HATCH-FORMAT" ? "active" : ""
              }`}
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            >
              {questionFormat === "HR-HATCH-FORMAT" && questionName
                ? getTranslatedQuestionName(questionName)
                : labels.hrHatch}
            </div>
          </div>

          <div className="custom-dropdown-ref-req">
            <div
              className={`dropdown-header-ref-req ${
                questionFormat === "CUSTOM-FORMAT" ? "active" : ""
              }`}
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            >
              {questionFormat === "CUSTOM-FORMAT" && questionName
                ? questionName
                : labels.custom}
            </div>
          </div>
          {errorMessages.question && (
            <div className="px-3 py-1 text-danger">
              {errorMessages.question}
            </div>
          )}
        </div>
      </Form.Group>
    </>
  );
};

export default memo(JobDetailSection);
