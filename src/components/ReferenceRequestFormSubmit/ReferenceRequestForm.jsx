import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { capitalizeWords } from "../../utils/helpers/capitalizeFirstLetterOfAWord";
import { useLabels } from "./hooks/useLabel";
import { submitReferenceDetails } from "../../api/ai-reference/candidate/candidate-api";
import { getPayload } from "./utils/helper";
import PrivacyAgreementForApplicant from "./PrivacyAgreementForApplicant";

function ReferenceRequestForm() {
  // CONSTANTS
  const token = sessionStorage.getItem("candidateToken");
  const candidateData = JSON.parse(sessionStorage.getItem("candidateData"));
  const selectedLanguage = candidateData?.selectedLanguage || "English";
  const numReferees = candidateData?.numberOfReferees || 1;

  // STATES
  const [refereesData, setRefereesData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [emailErrors, setEmailErrors] = useState({});
  const [isAgreed, setIsAgreed] = useState(false);
  const [showPrivacyAgreement, setShowPrivacyAgreement] = useState(false);

  // HOOKS
  const { labels } = useLabels(selectedLanguage);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateAllEmails = () => {
    const errors = {};
    let isValid = true;

    refereesData.forEach((referee, index) => {
      if (referee["email-address"]) {
        if (!validateEmail(referee["email-address"])) {
          errors[index] = labels.invalidEmail;
          isValid = false;
        }
      }
    });

    setEmailErrors(errors);
    return isValid;
  };

  const isRefereeFieldMissing = refereesData.some(
    (referee) =>
      !referee["first-name"]?.trim() ||
      !referee["last-name"]?.trim() ||
      !referee["email-address"]?.trim()
  );

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRefereesData = [...refereesData];
    if (!newRefereesData[index]) {
      newRefereesData[index] = {};
    }
    newRefereesData[index][name] = value;
    setRefereesData(newRefereesData);

    // Clear email error when user starts typing
    if (name === "email-address" && emailErrors[index]) {
      setEmailErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }
  };

  const handleReferee = () => {
    return refereesData.map((referee) => {
      return {
        name: {
          firstName: capitalizeWords(referee["first-name"]),
          lastName: capitalizeWords(referee["last-name"]),
        },
        questionFormat: candidateData?.questionFormat,
        questionId: candidateData?.questionId,
        email: referee["email-address"],
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const referees = handleReferee();

    if (isRefereeFieldMissing || !validateAllEmails()) {
      return;
    }

    try {
      setIsLoading(true);

      const payload = getPayload({
        candidateData,
        selectedLanguage,
        referees,
      });

      const response = await submitReferenceDetails({ payload, token });

      if (response.status === 201) {
        sessionStorage.removeItem("candidateData");
        sessionStorage.removeItem("candidateToken");

        navigate("/reference-request-sent", { state: { selectedLanguage } });
      }
    } catch (error) {
      console.error("Something went wrong:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="my-2 reference-request-form-content">
        <div className="reference-request-form-header">
          <h5 className="m-0">{labels.title}</h5>
          <p className="m-0">{labels.subtitle}</p>
        </div>

        <Form className="reference-request-form  w-100" onSubmit={handleSubmit}>
          <Col>
            <div className="mb-0 d-flex justify-content-between gap-4 ">
              <div className="mb-0 p-0 w-100">
                <Form.Label
                  htmlFor="position"
                  className="reference-request-form-label mb-1 "
                >
                  {labels.position}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  value={candidateData?.position || ""}
                  disabled={true}
                  placeholder=""
                  className="reference-request-form-input"
                  id="position"
                />
              </div>
              <div className="mb-0 p-0 w-100">
                <Form.Label
                  htmlFor="candidate"
                  className="reference-request-form-label mb-1 "
                >
                  {labels.applicant}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="candidate"
                  value={
                    `${candidateData?.name?.firstName} ${candidateData?.name?.lastName}` ||
                    ""
                  }
                  disabled={true}
                  placeholder=""
                  className="reference-request-form-input"
                  id="candidate"
                />
              </div>
            </div>
            <div className="mb-0 d-flex justify-content-center flex-column ">
              <div className="referees-section">
                <h5 className="m-0">{labels.yourReferees}</h5>
              </div>
              {Array.from({ length: numReferees }).map((_, index) => (
                <Row
                  key={index}
                  className="reference-request-referees-field mb-0 d-flex justify-content-center"
                >
                  <div className="mb-0 py-0 px-0 form-field-title">
                    <div className="numbering-list">{index + 1}</div>
                    <span className="form-field-title-text">
                      {labels.referee}
                    </span>
                  </div>
                  <div className="mb-0 py-0 px-0 d-flex justify-content-between gap-4">
                    <div className="mb-0 your-reference-request-form-group w-100">
                      <Form.Label
                        htmlFor={`first-name-${index}`}
                        className="your-reference-request-form-label mb-1 "
                      >
                        {labels.firstName}
                        <span className="orange-text"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="first-name"
                        value={refereesData[index]?.["first-name"] || ""}
                        onChange={(event) => handleInputChange(index, event)}
                        placeholder={labels.enterFirstName}
                        className="your-reference-request-form-input"
                        id={`first-name-${index}`}
                      />
                    </div>
                    <div className="mb-0 your-reference-request-form-group w-100">
                      <Form.Label
                        htmlFor={`last-name-${index}`}
                        className="your-reference-request-form-label mb-1 "
                      >
                        {labels.lastName}
                        <span className="orange-text"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="last-name"
                        value={refereesData[index]?.["last-name"] || ""}
                        onChange={(event) => handleInputChange(index, event)}
                        placeholder={labels.enterLastName}
                        className="your-reference-request-form-input"
                        id={`last-name-${index}`}
                      />
                    </div>
                  </div>
                  <Row className="mb-0 py-0 px-0 d-flex justify-content-between">
                    <div className="mb-0 your-reference-request-form-group">
                      <Form.Label
                        htmlFor={`email-address-${index}`}
                        className="your-reference-request-form-label mb-1 "
                      >
                        {labels.email}
                        <span className="orange-text"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email-address"
                        value={refereesData[index]?.["email-address"] || ""}
                        onChange={(event) => handleInputChange(index, event)}
                        placeholder={labels.enterEmail}
                        className={`your-reference-request-form-input ${
                          emailErrors[index] ? "is-invalid" : ""
                        }`}
                        id={`email-address-${index}`}
                      />
                      {emailErrors[index] && (
                        <div className="invalid-feedback d-block">
                          {emailErrors[index]}
                        </div>
                      )}
                    </div>
                  </Row>
                </Row>
              ))}
            </div>

            <div className="d-flex align-items-center mt-3">
              <input
                type="checkbox"
                id="privacyAgreementCheckbox"
                className="form-check-input custom-checkbox"
                checked={isAgreed}
                onChange={(e) => {
                  setIsAgreed(e.target.checked);
                  if (e.target.checked) {
                    setShowPrivacyAgreement(true);
                  }
                }}
              />
              <label
                htmlFor="privacyAgreementCheckbox"
                className="ms-2 privacyAgreementCheckbox color-grey"
              >
                {labels.privacyAgreement}
              </label>
            </div>
            <div className="mb-0 d-flex flex-row justify-content-center btn-container">
              <button
                className="send-reference-request-referee-btn reference-request-referee-btn"
                disabled={isLoading || isRefereeFieldMissing || !isAgreed}
              >
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  ></div>
                ) : (
                  labels.sendRequest
                )}
              </button>
            </div>
          </Col>
        </Form>
        <PrivacyAgreementForApplicant
          showModal={showPrivacyAgreement}
          setShowModal={setShowPrivacyAgreement}
          handleContinue={() => {
            setIsAgreed(true);
            setShowPrivacyAgreement(false);
          }}
          language={selectedLanguage}
        />
      </div>
    </>
  );
}

export default ReferenceRequestForm;
