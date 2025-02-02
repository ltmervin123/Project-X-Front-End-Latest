import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../styles/BasicInterviewQuestionSelectorPopUp.css"; // Import the CSS file

const BasicInterviewQuestionSelectorPopUp = ({
  show,
  onClose,
  defaultQuestion,
  setSelectedQuestions,
  selectedQuestions,
  handleSaveInterviewTypeAndQuestions,
}) => {
  // const defaultQuestion = "Can you tell me about yourself?";
  // const [selectedQuestions, setSelectedQuestions] = useState([defaultQuestion]);
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

    handleSaveInterviewTypeAndQuestions();
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
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3072_1959)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13 22.75C14.2804 22.75 15.5482 22.4978 16.7312 22.0078C17.9141 21.5178 18.9889 20.7997 19.8943 19.8943C20.7997 18.9889 21.5178 17.9141 22.0078 16.7312C22.4978 15.5482 22.75 14.2804 22.75 13C22.75 11.7196 22.4978 10.4518 22.0078 9.26884C21.5178 8.08591 20.7997 7.01108 19.8943 6.10571C18.9889 5.20034 17.9141 4.48216 16.7312 3.99217C15.5482 3.50219 14.2804 3.25 13 3.25C10.4141 3.25 7.93419 4.27723 6.10571 6.10571C4.27723 7.93419 3.25 10.4141 3.25 13C3.25 15.5859 4.27723 18.0658 6.10571 19.8943C7.93419 21.7228 10.4141 22.75 13 22.75ZM12.7487 16.9433L18.1653 10.4433L16.5013 9.05667L11.843 14.6456L9.43258 12.2341L7.90075 13.7659L11.1508 17.0159L11.9893 17.8544L12.7487 16.9433Z"
                  fill="#F46A05"
                />
              </g>
              <defs>
                <clipPath id="clip0_3072_1959">
                  <rect width="26" height="26" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Please select 4 questions
          </p>
          <p>Select four questions you’d like to ask in your interview.</p>
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
          <p className="m-0 color-orange highlight-orange">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3072_1959)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13 22.75C14.2804 22.75 15.5482 22.4978 16.7312 22.0078C17.9141 21.5178 18.9889 20.7997 19.8943 19.8943C20.7997 18.9889 21.5178 17.9141 22.0078 16.7312C22.4978 15.5482 22.75 14.2804 22.75 13C22.75 11.7196 22.4978 10.4518 22.0078 9.26884C21.5178 8.08591 20.7997 7.01108 19.8943 6.10571C18.9889 5.20034 17.9141 4.48216 16.7312 3.99217C15.5482 3.50219 14.2804 3.25 13 3.25C10.4141 3.25 7.93419 4.27723 6.10571 6.10571C4.27723 7.93419 3.25 10.4141 3.25 13C3.25 15.5859 4.27723 18.0658 6.10571 19.8943C7.93419 21.7228 10.4141 22.75 13 22.75ZM12.7487 16.9433L18.1653 10.4433L16.5013 9.05667L11.843 14.6456L9.43258 12.2341L7.90075 13.7659L11.1508 17.0159L11.9893 17.8544L12.7487 16.9433Z"
                  fill="#F46A05"
                />
              </g>
              <defs>
                <clipPath id="clip0_3072_1959">
                  <rect width="26" height="26" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Random questions
          </p>
          <p>Randomly select 4 questions in your interview.</p>
          <div className="d-flex justify-content-between button-controller">
            <button
              className="btn-generate-question"
              onClick={handleGenerateQuestions}
            >
              Random Questions
            </button>
            <div className="d-flex justify-content-end gap-4">
              <button
                onClick={handleSubmit}
                disabled={selectedQuestions.length !== 5}
                className={selectedQuestions.length !== 5 ? "btn-disabled" : ""}
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
