import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddRequestPopUp = ({ onClose, onAddJob }) => {
  const candidatesData = {
    Manager: ["John Doe", "Jane Smith", "Michael Johnson"],
    Developer: ["Alice Brown", "Bob White", "Charlie Green"],
    Executive: ["James Bond", "Lara Croft", "Bruce Wayne"],
  };

  const refereeNameList = [
    "Steve", "Stella", "Bob Williams", "Carol Davis", "Mick Sam", "Kirk Aron"
  ];

  const customSets = [
    "Custom Set 1",
    "Custom Set 2",
    "Custom Set 3",
    "Custom Set 4",
  ];

  const [candidateName, setCandidateName] = useState("");
  const [refereeName, setRefereeName] = useState("");
  const [refereeEmail, setRefereeEmail] = useState("");
  const [position, setPosition] = useState("");
  const [questionFormat, setQuestionFormat] = useState("");
  const [candidateOptions, setCandidateOptions] = useState([]);
  const [isCustomSet, setIsCustomSet] = useState(false);

  const handlePositionChange = (e) => {
    const selectedPosition = e.target.value;
    setPosition(selectedPosition);
    setCandidateOptions(candidatesData[selectedPosition] || []);
    setCandidateName(""); // Reset candidate when position changes
  };

  const handleQuestionFormatChange = (e) => {
    const selectedFormat = e.target.value;

    if (selectedFormat === "Custom Sets") {
      setIsCustomSet(true); // Show custom sets when selected
      setQuestionFormat(""); // Reset question format
    } else if (selectedFormat === "Back to Format Options") {
      setIsCustomSet(false); // Return to format options
      setQuestionFormat(""); // Clear selected format
    } else {
      setIsCustomSet(false); // Show regular dropdown options
      setQuestionFormat(selectedFormat); // Set the selected question format
    }
  };

  const handleCustomSetChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "Back to Format Options") {
      setIsCustomSet(false); // Return to format options
      setQuestionFormat(""); // Reset question format
    } else {
      setQuestionFormat(selectedValue); // Set the selected custom set
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddJob({
      candidateName,
      refereeName,
      refereeEmail,
      position,
      questionFormat,
    });
    onClose();
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      className="custom-modal-job d-flex align-items-center justify-content-center"
      backdrop={true}
    >
      <Modal.Body className="w-100">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="m-0">New Reference Request</h5>
            <small>Create a new reference request for a candidate.</small>
          </div>
          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        <Form onSubmit={handleSubmit}>
          {/* Position input */}
          <Form.Group
            controlId="formPosition"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              Position
            </Form.Label>
            <Form.Select
              value={position}
              onChange={handlePositionChange}
              required
            >
              <option value="">Select Position</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="Executive">Executive</option>
            </Form.Select>
          </Form.Group>

          {/* Candidate Name input */}
          <Form.Group
            controlId="formCandidateName"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              Candidate
            </Form.Label>
            <Form.Select
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              disabled={!position} // Disable if no position is selected
              required
            >
              <option value="">Select Candidate</option>
              {candidateOptions.map((candidate, index) => (
                <option key={index} value={candidate}>
                  {candidate}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Referee's Name input */}
          <Form.Group
            controlId="formRefereeName"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              Referee Name
            </Form.Label>
            <Form.Select
              value={refereeName}
              onChange={(e) => setRefereeName(e.target.value)}
              required
            >
              <option value="">Select Referee</option>
              {refereeNameList.map((referee, index) => (
                <option key={index} value={referee}>
                  {referee}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Referee's Email input */}
          <Form.Group
            controlId="formRefereeEmail"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              Referee's Email
            </Form.Label>
            <Form.Control
              type="email"
              value={refereeEmail}
              onChange={(e) => setRefereeEmail(e.target.value)}
              placeholder="sample@hrhatch.com"
              required
            />
          </Form.Group>

          {/* Reference Question dropdown */}
          <Form.Group
            controlId="formQuestionFormat"
            className="d-flex align-items-center mb-3"
          >
            <Form.Label className="me-2" style={{ width: "150px" }}>
              Reference Question
            </Form.Label>
            {!isCustomSet ? (
              <Form.Select
                value={questionFormat}
                onChange={handleQuestionFormatChange}
                required
              >
                <option value="">Select Format</option>
                <option value="Standard Format">Standard Format</option>
                <option value="Management Format">Management Format</option>
                <option value="Executive Format">Executive Format</option>
                <option value="Custom Sets">Custom Sets</option>
              </Form.Select>
            ) : (
              <Form.Select
                value={questionFormat}
                onChange={handleCustomSetChange}
                required
              >
                <option value="">Select Custom Set</option>
                {customSets.map((set, index) => (
                  <option key={index} value={set}>
                    {set}
                  </option>
                ))}
                <option value="Back to Format Options">Back to Format Options</option>
              </Form.Select>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end">
            <button className="btn-add-candidate" type="submit">
              Send Request
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRequestPopUp;
