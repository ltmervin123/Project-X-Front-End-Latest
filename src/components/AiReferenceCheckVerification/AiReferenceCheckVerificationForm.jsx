import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PrivacyAgreementForReferees from "./PrivacyAgreementForReferees"; // Import the Privacy Agreement component

const STEPS = [
  "Basic Information",
  "Select Language",
  "Choose Method",
  "Questionnaire",
  "Reference Completed",
];

const CURRENT_STEP = 1;

const AiReferenceCheckVerificationForm = ({
  refereeName,
  referenceId,
  candidateName,
  refereeId,
  companyId,
  selectedLanguage,
}) => {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    referenceId: referenceId,
    refereeName: {
      firstName: refereeName.firstName,
      lastName: refereeName.lastName,
    },
    candidateName: candidateName,
    refereeId: refereeId,
    companyId: companyId,
    currentCompany: "",
    positionTitle: "",
    companyWorkedWith: "",
    relationship: "",
    startDate: "",
    endDate: "",
    otherRelationship: "",
  });
  const [processing, setProcessing] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const [showPrivacyAgreement, setShowPrivacyAgreement] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Check if "Other" is selected
    if (name === "relationship" && value === "Other") {
      setIsOtherSelected(true);
    }
  };

  //Save the selected language to session storage
  useEffect(() => {
    if (selectedLanguage) {
      sessionStorage.setItem("selectedLanguage", selectedLanguage);
    }
  }, [selectedLanguage]);

  // Save referee data to local storage
  const saveRefereeDataTemporary = () => {
    // Create a copy of formData
    let updatedFormData = { ...formData };

    // Check if "Other" is selected and save the correct relationship
    if (isOtherSelected) {
      updatedFormData.relationship = updatedFormData.otherRelationship;
    }

    // Remove the `otherRelationship` property
    delete updatedFormData.otherRelationship;

    // Save the updated formData to session storage
    sessionStorage.setItem("refereeData", JSON.stringify(updatedFormData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await getReferenceQuestions();
    saveRefereeDataTemporary();

    navigate("/reference-choose-language", {
      state: { referenceId, refereeId },
    });
  };

  const isFormValid = () => {
    return (
      formData.refereeName.firstName &&
      formData.refereeName.lastName &&
      formData.positionTitle &&
      formData.currentCompany &&
      formData.companyWorkedWith &&
      (isOtherSelected ? formData.otherRelationship : formData.relationship) &&
      formData.startDate &&
      formData.endDate &&
      isAgreed
    );
  };

  // const getReferenceQuestions = async () => {
  //   try {
  //     const token = sessionStorage.getItem("token");

  //     setProcessing(true);
  //     const URL = `${API}/api/ai-referee/company-request-reference/get-reference-question-by-referenceId/${formData.referenceId}/${refereeId}`;
  //     const response = await axios.get(URL, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       sessionStorage.setItem(
  //         "referenceQuestions",
  //         JSON.stringify(response.data)
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching reference questions:", error);
  //   } finally {
  //     setProcessing(false);
  //   }
  // };

  useEffect(() => {
    if (refereeName) {
      const { firstName, lastName } = refereeName;
      setFormData((prevFormData) => ({
        ...prevFormData,
        refereeName: {
          firstName: firstName,
          lastName: lastName,
        },
      }));
    }
  }, [refereeName]);

  // Prevent user from leaving the page
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave this page?"; // Standard message for modern browsers
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="AiReferenceCheckVerification-container d-flex align-items-center flex-column justify-content-center">
      <h4 className="text-center">Reference Check Verification</h4>
      <i className="text-center">
        Your insights are valuable in helping us make informed decisions.
      </i>
      <div className="d-flex align-items-center justify-content-center flex-column h-100 w-100 my-2 mt-4">
        <div className="reference-progress-indicator">
          {STEPS.map((step, index) => (
            <div key={index} className="reference-step-container">
              <div
                className={`step ${CURRENT_STEP === index + 1 ? "active" : ""}`}
              >
                <div className="bullet">{index + 1}</div>
                {index < STEPS.length - 1 && <div className="line" />}{" "}
                {/* Line between steps */}
              </div>
              <div className="step-label">{step}</div>
            </div>
          ))}
        </div>
        <div className=" AiReferenceCheckVerification-container-form">
          <div className="AiReferenceCheckVerification-title">
            <h5 className="m-0">Verify Your Information</h5>
            <p className="m-0">
              Please verify your information below before proceeding to the
              questionnaire.
            </p>
          </div>

          <Form
            onSubmit={handleSubmit}
            className="form-AiReferenceCheckVerification "
          >
            <Row>
              <Col md={12} className="d-flex flex-column gap-3">
                <Form.Group controlId="referee-name">
                  <Form.Label className="mb-1">Referee Name</Form.Label>
                  <div className="d-flex gap-2 w-100">
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.refereeName.firstName}
                      placeholder="First Name"
                      onChange={handleChange}
                      disabled={true}
                    />

                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.refereeName.lastName}
                      placeholder="Last Name"
                      onChange={handleChange}
                      disabled={true}
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="current-company">
                  <Form.Label className="mb-1">Current Company</Form.Label>
                  <Form.Control
                    type="text"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    placeholder="Enter Current Company"
                  />
                </Form.Group>
                <Form.Group controlId="position-title">
                  <Form.Label className="mb-1">Current Position</Form.Label>
                  <Form.Control
                    type="text"
                    name="positionTitle"
                    value={formData.positionTitle}
                    onChange={handleChange}
                    placeholder="Enter Position Title"
                  />
                </Form.Group>

                <Form.Group controlId="company-worked-with">
                  <Form.Label>
                    Company you worked with <b>{candidateName}</b>{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="companyWorkedWith"
                    value={formData.companyWorkedWith}
                    onChange={handleChange}
                    placeholder="e.g HR-HATCH"
                  />
                </Form.Group>

                <Form.Group controlId="relationship">
                  <Form.Label className="mb-1">
                    Relationship to the Applicant
                  </Form.Label>
                  {!isOtherSelected ? (
                    <Form.Control
                      as="select"
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleChange}
                    >
                      <option value="">Select Relationship</option>
                      <option value="Manager and or Report Line">
                        Manager and or Report Line
                      </option>
                      <option value="Colleague">Colleague</option>
                      <option value="Subordinate">Subordinate</option>
                      <option value="Mentor">Mentor</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  ) : (
                    <Form.Control
                      type="text"
                      name="otherRelationship"
                      value={formData.otherRelationship} // Ensure this is correctly set
                      onChange={handleChange} // Update state on change
                      placeholder="Please specify your relationship"
                    />
                  )}
                </Form.Group>

                <Form.Group controlId="date-worked-together">
                  <Form.Label className="mb-1">Date Worked Together</Form.Label>
                  <Row>
                    <Col md={6}>
                      <Form.Label className="mb-1" htmlFor="startdate">
                        Start Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="startDate"
                        id="startdate"
                        value={formData.startDate}
                        onChange={handleChange}
                        max={currentDate}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label className="mb-1" htmlFor="enddate">
                        End Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="endDate"
                        id="enddate"
                        value={formData.endDate}
                        onChange={handleChange}
                        disabled={!formData.startDate}
                        min={formData.startDate}
                        max={currentDate}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            {/* Checkbox for Privacy Agreement */}
            <div className="d-flex align-items-center mt-3">
              <input
                type="checkbox"
                id="privacyAgreementCheckbox"
                checked={isAgreed}
                onChange={(e) => {
                  setIsAgreed(e.target.checked);
                  if (e.target.checked) {
                    setShowPrivacyAgreement(true); // Show the Privacy Agreement modal when checked
                  }
                }}
              />
              <label
                htmlFor="privacyAgreementCheckbox"
                className="ms-2 privacyAgreementCheckbox color-grey"
              >
                By continuing, you’ve read, understood and agreed to the Privacy
                Agreement for Referees
              </label>
            </div>
            <div className="d-flex justify-content-center m-4 ">
              <Button
                variant="primary"
                type="submit"
                disabled={!isFormValid() || processing}
              >
                {processing ? "Processing..." : "Proceed"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
      {/* Privacy Agreement Modal */}
      <PrivacyAgreementForReferees
        showModal={showPrivacyAgreement}
        setShowModal={setShowPrivacyAgreement}
        handleContinue={() => {
          setIsAgreed(true);
          setShowPrivacyAgreement(false);
        }}
      />
    </div>
  );
};

export default AiReferenceCheckVerificationForm;
