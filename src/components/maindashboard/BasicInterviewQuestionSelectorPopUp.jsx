import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../styles/BasicInterviewQuestionSelectorPopUp.css"; // Import the CSS file

const BasicInterviewQuestionSelectorPopUp = ({
  show,
  onClose,
  onSelectQuestions,
}) => {
  const defaultQuestion = "Can you tell me about yourself?";
  const [selectedQuestions, setSelectedQuestions] = useState([defaultQuestion]);
  const [activeCategory, setActiveCategory] = useState("general");
  const navigate = useNavigate(); // Initialize useNavigate
  const questions = {
    general: [
      defaultQuestion,
      "Why are you interested in this role?",
      "What do you know about our company?",
      "Why are you leaving your current job?",
      "What are your salary expectations?",
    ],
    skills: [
      "What are your greatest strengths?",
      "What are your biggest weaknesses?",
      "Can you describe a successful project you worked on?",
      "What skills do you bring to this role?",
      "What tools or software are you proficient in?",
    ],
    roleSpecific: [
      "How would you approach [specific task or responsibility] in this role?",
      "If hired, what would you prioritize in your first 90 days?",
      "What motivates you in your work?",
      "How do you stay updated on industry trends?",
      "Where do you see yourself in five years?",
    ],
  };

  useEffect(() => {
    // Reset selected questions when modal opens
    if (show) {
      setSelectedQuestions([defaultQuestion]);
    }
  }, [show]);

  const handleCheckboxChange = (question) => {
    // Prevent changing the default question
    if (question === defaultQuestion) return;

    setSelectedQuestions((prev) => {
      if (prev.includes(question)) {
        return prev.filter((q) => q !== question);
      } else {
        if (prev.length < 5) {
          return [...prev, question];
        }
        return prev; // Prevent adding more than 5 questions
      }
    });
  };
  const handleSubmit = () => {
    console.log("Selected questions:", selectedQuestions); // Log the selected questions
    onSelectQuestions(selectedQuestions);
    navigate("/basic-interview"); // Navigate to /basic-interview
  };
  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? "general" : category);
  };

  const handleGenerateQuestions = () => {
    const allQuestions = [
      ...questions.general,
      ...questions.skills,
      ...questions.roleSpecific,
    ];

    const randomQuestions = [];

    while (
      randomQuestions.length < 4 && // Allow 4 random questions
      randomQuestions.length < allQuestions.length
    ) {
      const randomIndex = Math.floor(Math.random() * allQuestions.length);
      const question = allQuestions[randomIndex];

      if (!randomQuestions.includes(question) && question !== defaultQuestion) {
        randomQuestions.push(question);
      }
    }

    setSelectedQuestions([defaultQuestion, ...randomQuestions]); // Include the default question
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      dialogClassName="custom-modal-width"
      backdrop="static"
    >
      <Modal.Body className="basic-category-select-modal">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0 w-100 text-center">
            Interview Question Selection
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
        <div className="basic-category-select-container">
          <p className="color-orange highlight-orange">
            Select up to 5 questions
          </p>
          <p>Choose the questions you'd like to ask in your interview.</p>
          <div className="basic-catergory-container">
            <button
              className={activeCategory === "general" ? "active-button" : ""}
              onClick={() => handleCategoryClick("general")}
            >
              General Questions
            </button>
            <button
              className={activeCategory === "skills" ? "active-button" : ""}
              onClick={() => handleCategoryClick("skills")}
            >
              Skills and Experience
            </button>
            <button
              className={
                activeCategory === "roleSpecific" ? "active-button" : ""
              }
              onClick={() => handleCategoryClick("roleSpecific")}
            >
              Role-Specific or Hypothetical Questions
            </button>
            {activeCategory && (
              <Form className="mt-3">
                {questions[activeCategory].map((q, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={q}
                    checked={selectedQuestions.includes(q)}
                    onChange={() => handleCheckboxChange(q)}
                    style={{
                      color: selectedQuestions.length > 5 ? "red" : "inherit",
                    }}
                  />
                ))}
              </Form>
            )}
          </div>
          <br />
          <p className="m-0 color-orange highlight-orange">Random questions</p>
          <p>Generate 4 random questions in your interview.</p>
          <div className="d-flex justify-content-between button-controller">
            <button
              className="btn-generate-question"
              onClick={handleGenerateQuestions}
            >
              Generate Questions
            </button>
            <div className="d-flex justify-content-end gap-4">
            <button
              onClick={handleSubmit}
              disabled={selectedQuestions.length !== 5}
              className={selectedQuestions.length !== 5 ? 'btn-disabled' : ''}
            >
              Start Interview
            </button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BasicInterviewQuestionSelectorPopUp;
