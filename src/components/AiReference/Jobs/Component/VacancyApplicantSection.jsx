import { Form } from "react-bootstrap";
import { memo } from "react";

const ApplicantSection = ({
  isPending,
  candidates,
  jobData,
  labels,
  handleInputChange,
  errorMessages,
  showRefereesDropdowns,
  setShowRefereesDropdowns,
}) => {
  if (isPending) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }
  return (
    <>
      {candidates.length > 0 ? (
        candidates.map((candidate, index) => (
          <div key={index} className="applicant-container mb-4">
            <Form.Group controlId={`formFirstName${index}`} className="mb-2">
              <b
                className="mb-2 applicant-header-label d-flex gap-2 align-items-center"
                style={{ width: "220px", height: "38px" }}
              >
                <div className="applicant-number">{index + 1}</div>
                {labels.applicant}
                {index < jobData.vacancies && (
                  <span className="text-muted ms-2">
                    {labels.staticContent.existing}
                  </span>
                )}
              </b>
              <div className="d-flex gap-3 w-100">
                <div className="positiom-relative w-50">
                  <Form.Label className="mb-2 applicant-label">
                    {labels.firstName}
                    <span className="color-orange"> &nbsp;*</span>
                  </Form.Label>
                  <Form.Control
                    value={candidate.firstName}
                    type="text"
                    onChange={(e) =>
                      handleInputChange(index, "firstName", e.target.value)
                    }
                    placeholder={labels.firstName}
                    required
                    disabled={index < jobData.vacancies}
                  />
                  {errorMessages.firstName && (
                    <div className="px-3 py-1 text-danger">
                      {errorMessages.firstName}
                    </div>
                  )}
                </div>
                <div className="positiom-relative w-50">
                  <Form.Label className="mb-2 applicant-label">
                    {labels.lastName}
                    <span className="color-orange"> &nbsp;*</span>
                  </Form.Label>
                  <Form.Control
                    value={candidate.lastName}
                    type="text"
                    onChange={(e) =>
                      handleInputChange(index, "lastName", e.target.value)
                    }
                    placeholder={labels.lastName}
                    required
                    disabled={index < jobData.vacancies}
                  />
                  {errorMessages.lastName && (
                    <div className="px-3 py-1 text-danger">
                      {errorMessages.lastName}
                    </div>
                  )}
                </div>
              </div>
            </Form.Group>
            <Form.Group controlId={`formNumReferees${index}`} className="mb-2">
              <Form.Label className="mb-2 applicant-label">
                {labels.numReferees}
                <span className="color-orange"> *</span>
              </Form.Label>
              <div className="custom-dropdown-job-req">
                <div
                  className={`dropdown-header-job-req ${
                    showRefereesDropdowns[index] ? "dropdown-open" : ""
                  }`}
                  onClick={() => {
                    if (!index < jobData.vacancies) {
                      const newShowDropdowns = [...showRefereesDropdowns];
                      newShowDropdowns[index] = !newShowDropdowns[index];
                      setShowRefereesDropdowns(newShowDropdowns);
                    }
                  }}
                  style={
                    index < jobData.vacancies
                      ? { opacity: 0.6, cursor: "not-allowed" }
                      : {}
                  }
                >
                  {candidate.numberOfReferees}
                </div>
                {!index < jobData.vacancies && showRefereesDropdowns[index] && (
                  <div className="dropdown-list-job-req">
                    {[1, 2, 3].map((num) => (
                      <div
                        key={num}
                        className="dropdown-item-job-req"
                        onClick={() => {
                          handleInputChange(index, "numberOfReferees", num);
                          const newShowDropdowns = [...showRefereesDropdowns];
                          newShowDropdowns[index] = false;
                          setShowRefereesDropdowns(newShowDropdowns);
                        }}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Form.Group>
            <Form.Group controlId={`formEmail${index}`} className="mb-2">
              <Form.Label className="mb-2 applicant-label">
                {labels.email}
                <span className="color-orange"> &nbsp;*</span>
              </Form.Label>
              <div className="w-100 position-relative">
                <Form.Control
                  value={candidate.email}
                  type="email"
                  onChange={(e) =>
                    handleInputChange(index, "email", e.target.value)
                  }
                  placeholder={`${labels.staticContent.emailPlaceholder}`}
                  required
                  disabled={index < jobData.vacancies}
                />
                {errorMessages.email && (
                  <div className="px-3 py-1 text-danger">
                    {errorMessages.email}
                  </div>
                )}
              </div>
            </Form.Group>
          </div>
        ))
      ) : (
        <div className="text-center my-4">
          <p className="text-muted">{labels.staticContent.noApplicants}</p>
        </div>
      )}
    </>
  );
};

export default memo(ApplicantSection);
