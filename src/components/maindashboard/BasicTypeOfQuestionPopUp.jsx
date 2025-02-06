import React from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../styles/BasicTypeOfQuestionPopUp.css"; // Import the CSS file

const BasicTypeOfQuestionPopUp = ({
  show,
  onClose,
  onSelectType,
  setBasicInterviewType,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const questionTypes = [
    {
      title: "Selective Questioning",
    },
    {
      title: "Dynamic Questioning",
    },
  ];

  const handleTypeSelect = (type) => {
    onSelectType(); // Call the function passed from the parent component
    setBasicInterviewType(type); // Set the selected type in the parent component
    if (type === "Dynamic Questioning") {
      navigate("/basic-interview"); // Redirect to /basic-interview
    } else {
      onClose(); // Close the modal for other types
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="custom-modal-width-basic"
      backdrop={false}
    >
      <Modal.Body className="custom-modal">
        <div className="d-flex justify-content-end align-items-center mb-3">
          <h5 className="m-0 w-100 text-center">
            Please select the type of Basic Interview
          </h5>

          <Button
            className="closebtn"
            variant="link"
            onClick={onClose}
            style={{ fontSize: "1.5rem", textDecoration: "none" }}
          >
            &times;
          </Button>
        </div>
        <div className="question-types d-flex flex-wrap justify-content-center flex-column align-items-center">
          {questionTypes.map((questionType, index) => (
            <Card
              key={index}
              className="question-type-card m-3"
              onClick={() => handleTypeSelect(questionType.title)}
              style={{
                backgroundColor: questionType.color,
                cursor: "pointer",
              }}
            >
              <Card.Body>
                <div className="question-type-title">{questionType.title}</div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BasicTypeOfQuestionPopUp;
