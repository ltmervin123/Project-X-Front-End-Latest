import React, { useState } from "react";
import RegisterCompanyAvatar from "../../assets/companyregisteravatar.png";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AiReferenceCheckVerificationForm = ({ refereeName }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);  


  // temporary redirect
  const handleClick = () => {
    navigate("/reference-interview-method");
  };
  const [formData, setFormData] = useState({
    refereeName,
    currentCompany: "",
    positionTitle: "",
    companyWorkedWith: "",
    relationship: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const validateInputfied = ()=>{
    
  }

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
                  value={refereeName}
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
                  <option value="manager">Manager</option>
                  <option value="colleague">Colleague</option>
                  <option value="subordinate">Subordinate</option>
                  <option value="mentor">Mentor</option>
                  <option value="other">Other</option>
                </Form.Control>
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
              onSubmit={handleSubmit}
              // onClick={handleClick} // Add the onClick handler
            >
              Proceed to Reference Check
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AiReferenceCheckVerificationForm;
