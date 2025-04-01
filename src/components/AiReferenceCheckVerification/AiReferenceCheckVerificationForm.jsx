import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AiReferenceCheckVerificationForm = ({
  refereeName,
  referenceId,
  candidateName,
  refereeId,
  companyId,
}) => {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    referenceId: "",
    refereeName: "",
    positionTitle: "",
    companyWorkedWith: "",
    relationship: "",
    candidateName: "",
    startDate: "",
    endDate: "",
    otherRelationship: "", // New field for "Other" relationship
  });
  const [processing, setProcessing] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

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
    await getReferenceQuestions();
    saveRefereeDataTemporary();
    navigate("/reference-choose-language"); // Updated navigation path
};
  // Sync refereeName when it changes
  useEffect(() => {
    if (refereeName) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        refereeName: refereeName,
      }));
    }

    if (referenceId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        referenceId: referenceId,
      }));
    }

    if (candidateName) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        candidateName: candidateName,
      }));
    }

    if (companyId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        companyId: companyId,
      }));
    }
  }, [refereeName, referenceId, candidateName, companyId]);

  const isFormValid = () => {
    return (
      formData.refereeName &&
      formData.positionTitle &&
      formData.companyWorkedWith &&
      (isOtherSelected ? formData.otherRelationship : formData.relationship) &&
      formData.startDate &&
      formData.endDate
    );
  };

  const getReferenceQuestions = async () => {
    try {
      const token = sessionStorage.getItem("token");

      setProcessing(true);
      const URL = `${API}/api/ai-referee/company-request-reference/get-reference-question-by-referenceId/${formData.referenceId}/${refereeId}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        sessionStorage.setItem(
          "referenceQuestions",
          JSON.stringify(response.data)
        );
      }
    } catch (error) {
      console.error("Error fetching reference questions:", error);
    } finally {
      setProcessing(false);
    }
  };

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
<div className="d-flex align-items-center justify-content-center h-100 w-100 my-2 mt-4">
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
                <Form.Control
                  type="text"
                  name="refereeName"
                  value={formData.refereeName}
                  placeholder="Referee Name"
                  disabled={true}
                />
              </Form.Group>

              <Form.Group controlId="position-title">
                <Form.Label className="mb-1">Position Title</Form.Label>
                <Form.Control
                  type="text"
                  name="positionTitle"
                  value={formData.positionTitle}
                  onChange={handleChange}
                  placeholder="Enter Position Title"
                />
              </Form.Group>

              <Form.Group controlId="company-worked-with">
                <Form.Label>Company You Worked With the Candidate</Form.Label>
                <Form.Control
                  type="text"
                  name="companyWorkedWith"
                  value={formData.companyWorkedWith}
                  onChange={handleChange}
                  placeholder="E.g HR-HATCH"
                />
              </Form.Group>

              <Form.Group controlId="relationship">
                <Form.Label className="mb-1">Relationship to the Candidate</Form.Label>
                {!isOtherSelected ? (
                  <Form.Control
                    as="select"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                  >
                    <option value="">Select Relationship</option>
                    <option value="Manager and or Report Line">Manager and or Report Line</option>
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
                    <Form.Label className="mb-1" htmlFor="startdate">Start Date</Form.Label>
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
                    <Form.Label className="mb-1" htmlFor="enddate">End Date</Form.Label>
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

          <div className="d-flex justify-content-center m-4 ">
            <Button
              variant="primary"
              type="submit"
              disabled={!isFormValid() || processing}
            >
              {processing ? "Processing..." : "Proceed to Questionnaire"}
            </Button>
          </div>
        </Form>
      </div>
</div>

    </div>
  );
};

export default AiReferenceCheckVerificationForm;
