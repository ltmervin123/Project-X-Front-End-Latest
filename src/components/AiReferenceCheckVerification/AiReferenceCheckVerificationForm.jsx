import React, { useEffect, useState } from "react";
import RegisterCompanyAvatar from "../../assets/companyregisteravatar.png";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AiReferenceCheckVerificationForm = ({
  refereeName,
  referenceId,
  candidateName,
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
  });
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Save referee data to local storage
  const saveRefereeDataTemporary = () => {
    localStorage.setItem("refereeData", JSON.stringify(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getReferenceQuestions();
    saveRefereeDataTemporary();
    navigate("/reference-interview-method");
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
  }, [refereeName, referenceId, candidateName]);

  const isFormValid = () => {
    return (
      formData.refereeName &&
      formData.positionTitle &&
      formData.companyWorkedWith &&
      formData.relationship &&
      formData.startDate &&
      formData.endDate
    );
  };

  const getReferenceQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      setProcessing(true);
      const URL = `${API}/api/ai-referee/company-request-reference/get-reference-question-by-referenceId/${formData.referenceId}`;
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        localStorage.setItem(
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

      <div className="my-4 AiReferenceCheckVerification-container-form">
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
            <Col md={9} className="d-flex flex-column gap-2">
              <Form.Group controlId="referee-name">
                <Form.Label>Referee Name</Form.Label>
                <Form.Control
                  type="text"
                  name="refereeName"
                  value={formData.refereeName}
                  placeholder="Referee Name"
                  disabled={true}
                />
              </Form.Group>

              <Form.Group controlId="position-title">
                <Form.Label>Position Title</Form.Label>
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
                <Form.Label>Relationship to the Candidate</Form.Label>
                <Form.Control
                  as="select"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                >
                  <option value="">Select Relationship</option>
                  <option value="Manager">Manager</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Subordinate">Subordinate</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
  <Form.Group controlId="date-worked-together">
    <Form.Label>Date Worked Together</Form.Label>
    <Row>
      <Col md={6}>
        <Form.Label htmlFor="startdate">Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          id="startdate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </Col>
      <Col md={6}>
        <Form.Label htmlFor="enddate">End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          id="enddate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </Col>
    </Row>
  </Form.Group>
            </Col>

            <Col md={3} className="d-flex align-items-start position-relative">
              <img
                src={RegisterCompanyAvatar}
                className="referencheckavatar"
                alt="Image not found"
              />
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
  );
};

export default AiReferenceCheckVerificationForm;