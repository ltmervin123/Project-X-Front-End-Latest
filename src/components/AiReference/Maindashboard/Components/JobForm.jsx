import { Form, Row, Col } from "react-bootstrap";
import { memo } from "react";

const JobFormSection = ({
  labels,
  jobName,
  handleSetJobName,
  errorMessages,
  vacancies,
  handleSetVacancies,
  department,
  handleSetDepartment,
  firstName,
  handleSetFirstName,
  lastName,
  handleSetLastName,
  agencies,
  isHrHatchOpen,
  selectedFormat,
  handleSetHrHatchOpen,
  handleSetCustomOpen,
  selectedQuestion,
  hrHatchQuestion,
  handleQuestionSelect,
  isCustomOpen,
  customQuestion,
  handleSetCancelConfirmation,
  isCreatingCandidate,
  isCreatingJob,
  handleSubmit,
  isJobFieldsFilled,
  areCandidateFieldsFilled,
  handleSetAgency,
}) => {
  return (
    <Col md={6}>
      <h4 className="d-flex gap-2 mb-4">
        <div className="job-icon">
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
              d="M4.40385 2.06462V3.48462L2.70986 3.62262C2.12789 3.66945 1.57842 3.91007 1.14933 4.30599C0.720225 4.70192 0.436268 5.23029 0.342855 5.80662C0.301521 6.06462 0.263521 6.32295 0.228855 6.58161C0.221074 6.6442 0.233215 6.70765 0.263554 6.76294C0.293893 6.81823 0.340885 6.86256 0.397855 6.88962L0.474855 6.92561C5.90385 9.49562 12.4049 9.49562 17.8329 6.92561L17.9099 6.88962C17.9666 6.8624 18.0134 6.81801 18.0436 6.76273C18.0737 6.70746 18.0857 6.64409 18.0779 6.58161C18.0439 6.32275 18.0063 6.06439 17.9649 5.80662C17.8714 5.23029 17.5875 4.70192 17.1584 4.30599C16.7293 3.91007 16.1798 3.66945 15.5979 3.62262L13.9039 3.48562V2.06562C13.904 1.64647 13.7536 1.2412 13.4802 0.923535C13.2067 0.605864 12.8284 0.396889 12.4139 0.334615L11.1939 0.151615C9.84137 -0.0505385 8.46634 -0.0505385 7.11385 0.151615L5.89385 0.334615C5.47953 0.396863 5.10129 0.605694 4.82786 0.923155C4.55444 1.24062 4.40399 1.64564 4.40385 2.06462ZM10.9709 1.63462C9.7662 1.45469 8.54151 1.45469 7.33685 1.63462L6.11686 1.81762C6.05766 1.82647 6.00361 1.85627 5.96453 1.9016C5.92544 1.94692 5.90391 2.00477 5.90385 2.06462V3.37962C8.06876 3.25598 10.239 3.25598 12.4039 3.37962V2.06462C12.4038 2.00477 12.3823 1.94692 12.3432 1.9016C12.3041 1.85627 12.25 1.82647 12.1909 1.81762L10.9709 1.63462Z"
              fill="white"
            />
            <path
              d="M18.2737 8.67359C18.2717 8.64126 18.2619 8.6099 18.2451 8.58219C18.2283 8.55449 18.2051 8.53128 18.1773 8.51456C18.1496 8.49783 18.1182 8.4881 18.0859 8.48619C18.0535 8.48428 18.0212 8.49025 17.9917 8.50359C12.4207 10.9706 5.8907 10.9706 0.319704 8.50359C0.290188 8.49025 0.257872 8.48428 0.225537 8.48619C0.193201 8.4881 0.161814 8.49783 0.134073 8.51456C0.106332 8.53128 0.0830678 8.55449 0.0662813 8.58219C0.0494948 8.6099 0.0396879 8.64126 0.0377042 8.67359C-0.0635784 10.5881 0.0393353 12.5079 0.344704 14.4006C0.437915 14.9771 0.721783 15.5057 1.1509 15.9018C1.58002 16.2979 2.12959 16.5387 2.7117 16.5856L4.5837 16.7356C7.6267 16.9816 10.6837 16.9816 13.7277 16.7356L15.5997 16.5856C16.1818 16.5387 16.7314 16.2979 17.1605 15.9018C17.5896 15.5057 17.8735 14.9771 17.9667 14.4006C18.2727 12.5056 18.3767 10.5856 18.2737 8.67459"
              fill="white"
            />
          </svg>
        </div>
        {labels.jobDetails}
      </h4>
      <div className="job-details-container">
        <Form.Group controlId="formJobName" className="mb-4">
          <div className="d-flex justify-content-between">
            <Form.Label className="mb-3">
              {labels.jobName}
              <span className="color-orange"> *</span>
            </Form.Label>
            <div className="color-orange">{labels.fillRequired}</div>
          </div>

          <Form.Control
            type="text"
            value={jobName}
            onChange={(e) => handleSetJobName(e.target.value)}
            placeholder={labels.placeholders.jobName}
            required
          />
          {errorMessages.jobName && (
            <div className="text-danger">{errorMessages.jobName}</div>
          )}
        </Form.Group>

        <Row className="mb-4">
          <Col>
            <Form.Group controlId="formVacancies">
              <Form.Label className="mb-3">
                {labels.vacancy}
                <span className="color-orange"> *</span>
              </Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={vacancies}
                onChange={(e) =>
                  handleSetVacancies(parseInt(e.target.value) || 1)
                }
                placeholder={labels.placeholders.vacancy}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formDepartment">
              <Form.Label className="mb-3">
                {labels.department}
                <span className="color-orange"> *</span>
              </Form.Label>
              <Form.Select
                value={department}
                onChange={(e) => handleSetDepartment(e.target.value)}
                required
              >
                <option value="" disabled selected>
                  {labels.placeholders.selectDepartment}
                </option>
                <option value="Sales">{labels.departments.sales}</option>
                <option value="Marketing">
                  {labels.departments.marketing}
                </option>
                <option value="Customer Service">
                  {labels.departments.customerService}
                </option>
                <option value="Human Resources (HR)">
                  {labels.departments.hr}
                </option>
                <option value="Finance">{labels.departments.finance}</option>
                <option value="Accounting">
                  {labels.departments.accounting}
                </option>
                <option value="Operations">
                  {labels.departments.operations}
                </option>
                <option value="IT (Information Technology)">
                  {labels.departments.it}
                </option>
                <option value="Legal">{labels.departments.legal}</option>
                <option value="Administration">
                  {labels.departments.administration}
                </option>
                <option value="Product Development">
                  {labels.departments.productDevelopment}
                </option>
                <option value="Research and Development (R&D)">
                  {labels.departments.rAndD}
                </option>
                <option value="Logistics, Supply Chain & Procurement">
                  {labels.departments.logistics}
                </option>
                <option value="Business Development">
                  {labels.departments.businessDev}
                </option>
                <option value="Public Relations (PR)">
                  {labels.departments.pr}
                </option>
                <option value="Design">{labels.departments.design}</option>
                <option value="Compliance">
                  {labels.departments.compliance}
                </option>
                <option value="Risk Management">
                  {labels.departments.riskManagement}
                </option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formHiringManager" className="mb-4">
          <Form.Label className="mb-3">
            {labels.hiringManager}
            <span className="color-orange"> *</span>
          </Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => handleSetFirstName(e.target.value)}
                placeholder={labels.placeholders.firstName}
                required
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => handleSetLastName(e.target.value)}
                placeholder={labels.placeholders.lastName}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formDepartment" className="mb-4">
          <Form.Label className="mb-3">
            {labels.referredBy}
            <span className="color-orange"> *</span>
          </Form.Label>
          <Form.Select onChange={(e) => handleSetAgency(e.target.value)}>
            <option value="" disabled selected>
              {labels.placeholders.selectAgency || "Select Agency"}
            </option>
            {agencies.length > 0 ? (
              agencies.map((agency) => (
                <option value={agency._id} key={agency._id}>
                  {agency.name}
                </option>
              ))
            ) : (
              <option>No Agency record</option>
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formReferenceFormat" className="mb-4">
          <Form.Label className="mb-3">
            {labels.referenceFormat}
            <span className="color-orange"> *</span>
          </Form.Label>
          <Row>
            <Col>
              <div className="custom-dropdown-ref-req">
                <div
                  className={`dropdown-header-ref-req ${
                    !isHrHatchOpen && selectedFormat === "HR-HATCH-FORMAT"
                      ? "active"
                      : ""
                  } ${isHrHatchOpen ? "dropdown-open" : ""}`}
                  onClick={() => handleSetHrHatchOpen(isHrHatchOpen)}
                >
                  {selectedFormat === "HR-HATCH-FORMAT" && selectedQuestion
                    ? selectedQuestion.name
                    : labels.hrHatch}
                </div>
                {isHrHatchOpen && (
                  <div className="dropdown-list-ref-req">
                    {hrHatchQuestion.map((question) => (
                      <div
                        key={question._id}
                        className="dropdown-item-ref-req"
                        onClick={() =>
                          handleQuestionSelect(question, "HR-HATCH-FORMAT")
                        }
                      >
                        {question.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Col>

            <Col>
              <div className="custom-dropdown-ref-req">
                <div
                  className={`dropdown-header-ref-req ${
                    !isCustomOpen && selectedFormat === "CUSTOM-FORMAT"
                      ? "active"
                      : ""
                  } ${isCustomOpen ? "dropdown-open" : ""}`}
                  onClick={() => handleSetCustomOpen(isCustomOpen)}
                >
                  {selectedFormat === "CUSTOM-FORMAT" && selectedQuestion
                    ? selectedQuestion.name
                    : labels.custom}
                </div>
                {isCustomOpen && (
                  <div className="dropdown-list-ref-req">
                    {customQuestion.length > 0 ? (
                      customQuestion.map((question) => (
                        <div
                          key={question._id}
                          className="dropdown-item-ref-req"
                          onClick={() =>
                            handleQuestionSelect(question, "CUSTOM-FORMAT")
                          }
                        >
                          {question.name}
                        </div>
                      ))
                    ) : (
                      <div className="dropdown-item-ref-req" disabled>
                        {labels.noCustomQuestions}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Form.Group>
        <div className="d-flex justify-content-center gap-4 mt-4 ">
          <button
            className="btn-cancel-ref-req"
            type="button"
            onClick={handleSetCancelConfirmation}
            disabled={isCreatingCandidate || isCreatingJob}
          >
            {labels.cancel}
          </button>
          <button
            className="btn-proceed"
            type="button"
            onClick={handleSubmit}
            disabled={
              isCreatingCandidate ||
              isCreatingJob ||
              !isJobFieldsFilled ||
              !areCandidateFieldsFilled ||
              !selectedQuestion
            }
          >
            {isCreatingCandidate || isCreatingJob ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></div>
            ) : (
              labels.proceed
            )}
          </button>
        </div>
      </div>
    </Col>
  );
};

export default memo(JobFormSection);
