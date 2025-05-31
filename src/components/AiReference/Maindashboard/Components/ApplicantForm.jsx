import { memo } from "react";
import { Form, Row, Col } from "react-bootstrap";

const ApplicantFormSection = ({
  labels,
  candidates,
  handleInputChange,
  showRefereesDropdowns,
  handleShowRefereeDropdown,
  handleInputReferee,
}) => {
  return (
    <Col md={6}>
      <h4 className="d-flex gap-2 mb-4 ">
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
      <div className="applicant-details-container">
        {candidates.map((candidate, index) => (
          <div key={index} className="applicant-container mb-4">
            <b
              className="m-0 applicant-header-label d-flex mb-2 gap-2 align-items-center"
              style={{ width: "220px", height: "38px" }}
            >
              <div className="applicant-number">{index + 1}</div>
              {labels.applicant}
            </b>
            <Row className="mb-1">
              <Col md="4">
                <Form.Group controlId={`formFirstName${index}`}>
                  <Form.Label className="mb-1 applicant-label">
                    {labels.firstName}
                    <span className="color-orange"> *</span>
                  </Form.Label>
                  <Form.Control
                    value={candidate.firstName}
                    type="text"
                    onChange={(e) =>
                      handleInputChange(index, "firstName", e.target.value)
                    }
                    placeholder={labels.placeholders.firstName}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md="4">
                <Form.Group controlId={`formLastName${index}`}>
                  <Form.Label className="mb-1 applicant-label">
                    {labels.lastName}
                    <span className="color-orange"> *</span>
                  </Form.Label>
                  <Form.Control
                    value={candidate.lastName}
                    type="text"
                    onChange={(e) =>
                      handleInputChange(index, "lastName", e.target.value)
                    }
                    placeholder={labels.placeholders.lastName}
                    required
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  controlId={`formNumReferees${index}`}
                  className="mb-3"
                >
                  <Form.Label className="mb-1 applicant-label">
                    {labels.numReferees}
                    <span className="color-orange"> *</span>
                  </Form.Label>
                  <div className="custom-dropdown-job-req">
                    <div
                      className={`dropdown-header-job-req ${
                        showRefereesDropdowns[index] ? "dropdown-open" : ""
                      }`}
                      onClick={() => handleShowRefereeDropdown(index)}
                    >
                      {candidate.numberOfReferees}
                    </div>
                    {showRefereesDropdowns[index] && (
                      <div className="dropdown-list-job-req">
                        {[1, 2, 3].map((num) => (
                          <div
                            key={num}
                            className="dropdown-item-job-req"
                            onClick={() => handleInputReferee(index, num)}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId={`formEmail${index}`} className="mb-3">
              <Form.Label className="mb-1 applicant-label">
                {labels.email}
                <span className="color-orange"> *</span>
              </Form.Label>
              <Form.Control
                value={candidate.email}
                type="email"
                onChange={(e) =>
                  handleInputChange(index, "email", e.target.value)
                }
                placeholder={labels.placeholders.email}
                required
              />
            </Form.Group>
          </div>
        ))}
      </div>
    </Col>
  );
};

export default memo(ApplicantFormSection);
